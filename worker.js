// Cloudflare Worker for Storm Widget
// This provides server-side handling and can serve static files

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return handleCORS();
    }
    
    // Handle static assets
    if (url.pathname === '/' || url.pathname === '/index.html') {
      return new Response(HTML_CONTENT, {
        headers: { 
          'Content-Type': 'text/html',
          'Cache-Control': 'public, max-age=3600'
        }
      });
    }
    
    if (url.pathname === '/style.css') {
      return new Response(CSS_CONTENT, {
        headers: { 
          'Content-Type': 'text/css',
          'Cache-Control': 'public, max-age=86400'
        }
      });
    }
    
    if (url.pathname === '/script.js') {
      return new Response(JS_CONTENT, {
        headers: { 
          'Content-Type': 'application/javascript',
          'Cache-Control': 'public, max-age=86400'
        }
      });
    }
    
    // Handle API requests
    if (url.pathname === '/api/submit' && request.method === 'POST') {
      return handleFormSubmission(request, env);
    }
    
    // Handle health check
    if (url.pathname === '/health') {
      return new Response(JSON.stringify({ status: 'ok', timestamp: new Date().toISOString() }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    return new Response('Not Found', { 
      status: 404,
      headers: { 'Content-Type': 'text/plain' }
    });
  }
};

function handleCORS() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
}

async function handleFormSubmission(request, env) {
  try {
    const contentType = request.headers.get('Content-Type');
    let data = {};
    
    if (contentType && contentType.includes('application/x-www-form-urlencoded')) {
      const formData = await request.formData();
      for (let [key, value] of formData.entries()) {
        data[key] = value;
      }
    } else if (contentType && contentType.includes('application/json')) {
      data = await request.json();
    }
    
    // Add server-side metadata
    data.timestamp = new Date().toISOString();
    data.ip = request.headers.get('CF-Connecting-IP');
    data.country = request.cf?.country || 'Unknown';
    data.userAgent = request.headers.get('User-Agent');
    data.referer = request.headers.get('Referer');
    
    // Validate required fields
    const requiredFields = ['name', 'email', 'address', 'city', 'zip'];
    for (const field of requiredFields) {
      if (!data[field]) {
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
    
    // Forward to Zapier webhook
    const zapierUrl = env.ZAPIER_WEBHOOK_URL || 'https://hooks.zapier.com/hooks/catch/14608681/u5q2jca/';
    
    const zapierResponse = await fetch(zapierUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams(data)
    });
    
    let result = {};
    if (zapierResponse.ok) {
      try {
        result = await zapierResponse.json();
      } catch (e) {
        result = { status: 'success', message: 'Form submitted successfully' };
      }
    } else {
      throw new Error(`Zapier error: ${zapierResponse.status}`);
    }
    
    return new Response(JSON.stringify(result), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
    
  } catch (error) {
    console.error('Form submission error:', error);
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

// Static content (you would include the full content here)
const HTML_CONTENT = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Storm Damage Assessment - Hayden Claims Group</title>
    <link rel="stylesheet" href="style.css">
    <meta name="description" content="Get your personalized Texas storm risk analysis from Hayden Claims Group">
</head>
<body>
    <!-- Include your full HTML content here -->
    <script>
        // Override the CONFIG for Worker deployment
        const CONFIG = {
            zapierWebhookUrl: '/api/submit', // Use Worker endpoint
            apiEndpoint: 'https://haydenclaim.com/api/storm-stream',
            timings: {
                factRotation: 4000,
                statusRotation: 3000,
                minLoadingTime: 8000
            }
        };
    </script>
    <script src="script.js"></script>
</body>
</html>`;

const CSS_CONTENT = `/* Include your full CSS content here */`;

const JS_CONTENT = `/* Include your full JavaScript content here */`;