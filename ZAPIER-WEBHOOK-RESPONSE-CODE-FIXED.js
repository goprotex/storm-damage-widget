// ============================================================================
// ZAPIER CODE: Run JavaScript - Format Response for Widget Webhook
// ============================================================================
// Place this BEFORE the "Webhooks by Zapier > POST" step that sends to:
// https://haydenclaim.com/api/results
//
// This step formats all the analysis data into the exact shape the widget expects.
// ============================================================================

// Inputs expected via the "Input Data" panel for this step:
// - request_id: from the Catch Hook trigger (required to match the widget submission)
// - analysis_complete: true/false
// - property_address OR (address, city, state, zip) to compose
// - overall_risk: e.g., "HIGH"
// - risk_score: number (0-100)
// - hail_probability, wind_probability, flood_probability: numbers (0..1 or 0..100; we coerce)
// - report_date: ISO date string or any string (optional; will use today if missing)
// - analysis_id: your generated ID
// - memory_used_mb, duration_ms, async: optional runtime metadata

const toNumber = (v, d = 0) => {
  if (v === null || v === undefined || v === '') return d;
  const n = Number(v);
  return Number.isFinite(n) ? n : d;
};

const toBool = (v) => {
  if (typeof v === 'boolean') return v;
  if (v === null || v === undefined) return false;
  const s = String(v).trim().toLowerCase();
  return s === 'true' || s === '1' || s === 'yes';
};

const joinAddress = (addr, city, state, zip) => {
  const parts = [addr, city, state].filter(Boolean).join(', ');
  return [parts, zip].filter(Boolean).join(' ');
};

const {
  request_id,
  analysis_complete,
  property_address,
  address,
  city,
  state,
  zip,
  overall_risk,
  risk_score,
  hail_probability,
  wind_probability,
  flood_probability,
  report_date,
  analysis_id,
  memory_used_mb,
  duration_ms,
  async
} = inputData;

// Build property address from either property_address or components
const finalAddress = property_address || joinAddress(address, city, state, zip);

// Normalize numbers (accept "0.65" or "65" — adjust if you always use 0..1)
const normProb = (v) => {
  const n = toNumber(v, 0);
  // If it looks like a percentage ( > 1 ), convert to 0..1
  return n > 1 ? Math.min(1, n / 100) : Math.max(0, n);
};

// ============================================================================
// CRITICAL FIX: Return ONLY the response object
// Do NOT add extra wrapper keys or stringify the response
// The webhook step will receive this object and POST it as-is
// ============================================================================
const response = {
  analysis_complete: toBool(analysis_complete),
  property_address: finalAddress || '',
  overall_risk: overall_risk || '',
  risk_score: toNumber(risk_score, 0),
  hail_probability: normProb(hail_probability),
  wind_probability: normProb(wind_probability),
  flood_probability: normProb(flood_probability),
  report_date: report_date || new Date().toISOString().slice(0, 10),
  analysis_id: analysis_id || `HCG-${Date.now()}`,
  request_id: request_id || `req_${Date.now()}`,
  runtime_meta: {
    memory_used_mb: toNumber(memory_used_mb, 0),
    duration_ms: toNumber(duration_ms, 0),
    async: toBool(async)
  }
};

// Return the clean response object directly
// The next Webhook POST step will send this structure to your worker
return response;
