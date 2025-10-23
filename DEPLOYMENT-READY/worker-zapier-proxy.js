// Cloudflare Worker - Zapier Proxy
// Deploy this on your haydenclaim.com domain (e.g., api.haydenclaim.com or haydenclaim.com/api/*)
// This worker forwards form submissions to Zapier, avoiding CORS issues

const ALLOWED_ORIGINS = [
  'https://haydenclaim.com',
  'https://www.haydenclaim.com',
  'https://storm-report.pages.dev'
];

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      const origin = request.headers.get('Origin') || '*';
      const reqHeaders = request.headers.get('Access-Control-Request-Headers');
      const allowHeaders = reqHeaders || 'Content-Type, X-Widget-Client, X-Submit-Secret, Accept, X-Requested-With';
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': allowHeaders,
          'Access-Control-Max-Age': '86400',
          'Vary': 'Origin'
        }
      });
    }
    
    // Handle form submission to Zapier
    if (url.pathname === '/api/submit' && request.method === 'POST') {
      return handleZapierSubmission(request, env, ctx);
    }
    
    // Handle progress polling
    if (url.pathname === '/api/progress' && request.method === 'GET') {
      return handleProgressCheck(request, env);
    }
    
    // Handle storm results retrieval (proxy to prevent CORS)
    if (url.pathname.startsWith('/api/storm-results/') && request.method === 'GET') {
      return handleStormResults(request, env, url);
    }

    // Allow Zapier to POST final results back to the worker for the widget to poll
    if (url.pathname === '/api/results' && request.method === 'POST') {
      return handleResultsSubmission(request, env, ctx);
    }

    // Poll inbox for Zapier "Retrieve Poll" trigger
    if (url.pathname === '/api/poll' && request.method === 'GET') {
      return handlePoll(request, env);
    }
    
    // Health check
    if (url.pathname === '/api/health') {
      return new Response(JSON.stringify({ 
        status: 'ok', 
        timestamp: new Date().toISOString() 
      }), {
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }
    
    return new Response('Not Found', { status: 404 });
  }
};

async function handleZapierSubmission(request, env, ctx) {
  try {
    // Basic origin and client checks to reduce bot/crawler noise
    const origin = request.headers.get('Origin') || '';
    const referer = request.headers.get('Referer') || '';
    const clientHdr = request.headers.get('X-Widget-Client') || '';
    const providedSecret = request.headers.get('X-Submit-Secret') || new URL(request.url).searchParams.get('key') || '';

    // If an Origin is present (browser request), require it to be from our known hosts
    if (origin && !ALLOWED_ORIGINS.includes(origin)) {
      return new Response(JSON.stringify({ error: 'Origin not allowed' }), {
        status: 403,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }

    // If no Origin (server-to-server), require either our client header OR a shared secret
    const secretOk = env.SUBMIT_SECRET && providedSecret && providedSecret === env.SUBMIT_SECRET;
    if (!origin && clientHdr !== 'storm-widget/1' && !secretOk) {
      return new Response(JSON.stringify({ error: 'Unauthorized client' }), {
        status: 401,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }

    // Parse incoming JSON from widget
    const data = await request.json();
    
    console.log('Received form data:', data);
    
    // Honeypot check: if hidden field is filled, silently accept but do not forward
    if (data && (data.hp || data.honeypot || data.website)) {
      return new Response(JSON.stringify({ status: 'ok', ignored: true }), {
        status: 204,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }

    // Add server-side metadata
    const enrichedData = {
      ...data,
      timestamp: new Date().toISOString(),
      ip: request.headers.get('CF-Connecting-IP'),
      country: request.cf?.country || 'Unknown',
      userAgent: request.headers.get('User-Agent'),
      referer: request.headers.get('Referer')
    };

    // Ensure a stable request_id exists for tracing
    if (!enrichedData.request_id) {
      enrichedData.request_id = `req_${Date.now()}_${Math.random().toString(36).slice(2,8)}`;
    }
    
    // Validate required fields
    const requiredFields = ['name', 'email', 'address', 'city', 'zip'];
    for (const field of requiredFields) {
      if (!enrichedData[field]) {
        return new Response(JSON.stringify({ 
          error: 'Missing required field', 
          field: field 
        }), {
          status: 400,
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        });
      }
    }
    
    // Get Zapier Catch Hook URL from environment or use default
    const zapierUrl = env.ZAPIER_WEBHOOK_URL || 'https://hooks.zapier.com/hooks/catch/14608681/u5q2jca/';
    
    console.log('Forwarding to Zapier:', zapierUrl);
    console.log('Data being sent:', enrichedData);
    
    // Convert to URL-encoded form data for Zapier Catch Hook
    // We send three representations to maximize Zapier compatibility:
    // 1) Top-level fields (name, email, ...)
    // 2) payload[<field>] bracketed keys, so you can "Pick off a Child Key" = payload
    // 3) raw_json as a JSON string backup
    const formData = new URLSearchParams();
    const rawJsonString = JSON.stringify(enrichedData);

    // 1) Top-level fields
    for (const [key, value] of Object.entries(enrichedData)) {
      formData.append(key, value == null ? '' : String(value));
    }

    // 2) Bracketed child key fields under payload[...]
    for (const [key, value] of Object.entries(enrichedData)) {
      formData.append(`payload[${key}]`, value == null ? '' : String(value));
    }

    // 3) Raw JSON string copy
    formData.append('raw_json', rawJsonString);
    const bodyToSend = formData.toString();
    console.log('Body string length:', bodyToSend.length);
    console.log('Body preview:', bodyToSend.substring(0, 200));
    
    // Forward to Zapier with full headers (server-to-server, no CORS)
    const zapierResponse = await fetch(zapierUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'Cloudflare-Worker-Proxy/1.0',
        'X-Forwarded-For': enrichedData.ip || 'Unknown'
      },
      body: bodyToSend
    });
    
    console.log('Zapier fetch completed');
    
    console.log('Zapier response status:', zapierResponse.status);
    
    let result;
    const responseText = await zapierResponse.text();
    
    try {
      result = JSON.parse(responseText);
    } catch (e) {
      // If Zapier doesn't return JSON, create success response
      result = { 
        status: 'success', 
        message: 'Form submitted successfully'
      };
    }

    // Attach debug echo fields so the client can verify forwarding details
    const debugEcho = {
      forwarded_to: zapierUrl,
      forward_mode: 'application/x-www-form-urlencoded',
      received_fields: Object.keys(enrichedData),
      child_key_hint: 'payload',
      raw_json_present: true,
      request_id: enrichedData.request_id || `req_${Date.now()}`
    };
    result = { ...result, ...debugEcho };
    
    // Enqueue KV write for polling inbox (non-blocking)
    try {
      if (env.INBOX) {
        const item = {
          ...enrichedData,
          zapier_status: result.status || 'success',
          created_at: new Date().toISOString()
        };
        const key = `inbox:${enrichedData.request_id}`;
        // Store for 24 hours
        const putPromise = env.INBOX.put(key, JSON.stringify(item), {
          expirationTtl: 86400,
          metadata: { created_at: item.created_at }
        });
        if (ctx && typeof ctx.waitUntil === 'function') {
          ctx.waitUntil(putPromise);
        } else {
          await putPromise;
        }
      }
    } catch (kvErr) {
      // Swallow KV errors to not impact client success
      console.log('KV write failed:', kvErr?.message || kvErr);
    }

    // Return response to widget
    return new Response(JSON.stringify(result), {
      status: zapierResponse.ok ? 200 : 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
    
  } catch (error) {
    console.error('Worker error:', error);
    return new Response(JSON.stringify({ 
      error: 'Submission failed', 
      message: error.message 
    }), {
      status: 500,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
}

// Provide a polling endpoint for Zapier "Retrieve Poll"
async function handlePoll(request, env) {
  try {
    if (!env.INBOX) {
      return new Response(JSON.stringify({ error: 'INBOX KV not configured' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
      });
    }

    const url = new URL(request.url);
    const limit = Math.min(parseInt(url.searchParams.get('limit') || '25', 10), 100);
    const sinceParam = url.searchParams.get('since');
    const secretParam = url.searchParams.get('key');

    if (env.POLL_SECRET) {
      if (!secretParam || secretParam !== env.POLL_SECRET) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), {
          status: 401,
          headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
        });
      }
    }

    const sinceTs = sinceParam ? Date.parse(sinceParam) : null;

    // List recent inbox keys
    const list = await env.INBOX.list({ prefix: 'inbox:', limit });
    const keys = list.keys || [];

    // Fetch all values in parallel
    const values = await Promise.all(
      keys.map(async (k) => {
        const val = await env.INBOX.get(k.name, 'json');
        return val ? { ...val } : null;
      })
    );

    // Filter nulls and apply optional since filter
    let items = values.filter(Boolean);
    if (sinceTs) {
      items = items.filter((it) => {
        const t = Date.parse(it.created_at || 0);
        return isFinite(t) && t > sinceTs;
      });
    }

    // Sort newest first
    items.sort((a, b) => Date.parse(b.created_at || 0) - Date.parse(a.created_at || 0));

    // Return array of items; Zapier will use the Deduplication Key = request_id
    return new Response(JSON.stringify(items), {
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Poll failed', message: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    });
  }
}

async function handleProgressCheck(request, env) {
  const url = new URL(request.url);
  const requestId = url.searchParams.get('request_id');
  
  if (!requestId) {
    return new Response(JSON.stringify({ error: 'Missing request_id' }), {
      status: 400,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
  
  // Do NOT call Zapier Catch Hook here. Previously this sent GET requests
  // to the Catch Hook with ?request_id=..., which caused Zapier to capture
  // misleading "Querystring" samples. We simply return a local pending state.
  return new Response(JSON.stringify({
    status: 'pending',
    request_id: requestId,
    message: 'Processing...'
  }), {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  });
}

async function handleStormResults(request, env, url) {
  const requestId = url.pathname.split('/').pop();
  
  if (!requestId) {
    return new Response(JSON.stringify({ error: 'Missing request_id' }), {
      status: 400,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
  
  try {
    // If KV is configured, check for stored results first
    if (env.INBOX) {
      const kvKey = `results:${requestId}`;
      const kvVal = await env.INBOX.get(kvKey, 'json');
      if (kvVal) {
        return new Response(JSON.stringify(kvVal), {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        });
      }
    }

    // Try fetching from Zapier results endpoint
    const resultsUrl = `https://hooks.zapier.com/hooks/catch/14608681/results?id=${requestId}`;
    
    const zapierResponse = await fetch(resultsUrl, {
      method: 'GET'
    });
    
    if (zapierResponse.ok) {
      const results = await zapierResponse.json();
      return new Response(JSON.stringify(results), {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    } else {
      return new Response(JSON.stringify({ 
        status: 'pending',
        message: 'Results not ready yet' 
      }), {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }
  } catch (error) {
    return new Response(JSON.stringify({ 
      status: 'error',
      message: 'Unable to fetch results'
    }), {
      status: 404,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
}

// Accept final analysis JSON from Zapier and store it for polling
async function handleResultsSubmission(request, env, ctx) {
  try {
    if (!env.INBOX) {
      return new Response(JSON.stringify({ error: 'INBOX KV not configured' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
      });
    }

    // Require secret for server-to-server POST
    const providedSecret = request.headers.get('X-Submit-Secret') || new URL(request.url).searchParams.get('key') || '';
    const secretOk = env.SUBMIT_SECRET && providedSecret && providedSecret === env.SUBMIT_SECRET;
    if (!secretOk) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
      });
    }

    // Parse body robustly: support JSON, form-encoded, and raw text JSON
    const ct = (request.headers.get('Content-Type') || '').toLowerCase();
    let body = null;
    try {
      if (ct.includes('application/json')) {
        body = await request.json();
      } else if (ct.includes('application/x-www-form-urlencoded')) {
        const text = await request.text();
        const params = new URLSearchParams(text);
        body = Object.fromEntries(params.entries());
      } else if (ct.includes('multipart/form-data')) {
        const fd = await request.formData();
        body = {};
        for (const [k, v] of fd.entries()) {
          body[k] = typeof v === 'string' ? v : (v?.name || '[binary]');
        }
      } else {
        // Try JSON parse from raw text
        const raw = await request.text();
        try { body = JSON.parse(raw); }
        catch { body = { raw }; }
      }
    } catch (e) {
      // Fallback to text if parsing failed unexpectedly
      const raw = await request.text();
      try { body = JSON.parse(raw); }
      catch { body = { raw }; }
    }

    // Normalize array-wrapped bodies (Zapier's "Wrap Request in Array")
    if (Array.isArray(body) && body.length > 0) {
      body = body[0];
    }

    // Helper: recursively search for keys
    const findKey = (obj, matchers, depth = 0) => {
      if (!obj || typeof obj !== 'object' || depth > 4) return undefined;
      for (const [k, v] of Object.entries(obj)) {
        const norm = String(k).toLowerCase().replace(/[^a-z0-9]/g, '');
        if (matchers.some(m => norm === m)) {
          return v;
        }
        if (v && typeof v === 'object') {
          const found = findKey(v, matchers, depth + 1);
          if (found !== undefined) return found;
        }
      }
      return undefined;
    };

    const url = new URL(request.url);
    const header = (name) => request.headers.get(name) || request.headers.get(name.toLowerCase()) || '';

    // Try multiple sources for request_id
    let requestId = undefined;

    // 1) Direct fields (JSON or form urlencode)
    requestId = body?.request_id
      || body?.requestId
      // Accept any non-empty string id, not just ones starting with req_
      || (typeof body?.id === 'string' && body.id.trim().length > 0 ? body.id : undefined)
      || body?.['payload[request_id]']
      || body?.['payload.request_id']
      || body?.['payload[id]']
      || body?.['payload.id'];

    // 2) Nested search
    if (!requestId) {
      const candidate = findKey(body, ['requestid','request_id']);
      if (typeof candidate === 'string' && candidate) requestId = candidate;
    }

    // 3) raw_json field containing JSON
    if (!requestId && typeof body?.raw_json === 'string') {
      try {
        const rawObj = JSON.parse(body.raw_json);
        requestId = rawObj?.request_id || rawObj?.requestId || (typeof rawObj?.id === 'string' && rawObj.id.startsWith('req_') ? rawObj.id : undefined);
      } catch {}
    }

    // 4) Known fields containing JSON strings (common in Zapier)
    if (!requestId && typeof body?.data === 'string') {
      try {
        const d = JSON.parse(body.data);
        requestId = d?.request_id || d?.requestId || (typeof d?.id === 'string' && d.id.startsWith('req_') ? d.id : undefined);
        if (!requestId && typeof d?.raw_json === 'string') {
          const rr = JSON.parse(d.raw_json);
          requestId = rr?.request_id || rr?.requestId || (typeof rr?.id === 'string' && rr.id.startsWith('req_') ? rr.id : undefined);
        }
      } catch {}
    }
    if (!requestId && typeof body?.json === 'string') {
      try {
        const j = JSON.parse(body.json);
        requestId = j?.request_id || j?.requestId || (typeof j?.id === 'string' && j.id.startsWith('req_') ? j.id : undefined);
      } catch {}
    }
    if (!requestId && typeof body?.raw === 'string') {
      try {
        const r = JSON.parse(body.raw);
        requestId = r?.request_id || r?.requestId || (typeof r?.id === 'string' && r.id.startsWith('req_') ? r.id : undefined);
      } catch {}
    }

    // 5) Header overrides
    if (!requestId) {
      requestId = header('X-Request-Id') || header('X-Request-ID') || header('X-RequestId') || header('Request-Id') || '';
    }

    // 6) Querystring fallback (accept any non-empty value)
    if (!requestId) {
      const qId = url.searchParams.get('request_id') || url.searchParams.get('requestId') || url.searchParams.get('id') || url.searchParams.get('req');
      if (qId && String(qId).trim().length > 0) requestId = qId;
    }

    if (!requestId) {
      return new Response(JSON.stringify({ error: 'Missing request_id (send in body, X-Request-Id header, or ?request_id query)' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
      });
    }

    const kvKey = `results:${requestId}`;
    const item = {
      ...body,
      request_id: requestId,
      stored_at: new Date().toISOString()
    };

    // Store for 24 hours
    await env.INBOX.put(kvKey, JSON.stringify(item), { expirationTtl: 86400, metadata: { stored_at: item.stored_at } });

    return new Response(JSON.stringify({ status: 'stored', request_id: requestId }), {
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Store failed', message: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    });
  }
}
