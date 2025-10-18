# Hayden Claims Group - Storm Analysis API Endpoint
# This shows how to set up the real-time results endpoint

## Option 1: Simple JSON Response from Zapier

Your Zapier webhook should return JSON in this format:

```json
{
  "analysis_complete": true,
  "request_id": "req_1234567890",
  "property_address": "123 Main St, Dallas, TX 75001",
  "hail_probability": 0.65,
  "wind_probability": 0.45,
  "flood_probability": 0.28,
  "risk_score": 58,
  "analysis_id": "HCG-2025-001234",
  "report_date": "2025-10-16",
  "recommendations": [
    "Consider impact-resistant roofing materials",
    "Schedule annual roof inspections",
    "Review insurance coverage limits"
  ],
  "pdf_url": "https://your-server.com/reports/HCG-2025-001234.pdf"
}
```

## Option 2: Polling Endpoint Setup

Create an endpoint at: `https://haydenclaim.com/api/storm-results`

### Example Express.js Implementation:

```javascript
app.get('/api/storm-results', async (req, res) => {
  const requestId = req.query.request_id;
  
  try {
    // Check if analysis is complete
    const analysis = await checkAnalysisStatus(requestId);
    
    if (analysis.complete) {
      res.json({
        analysis_complete: true,
        request_id: requestId,
        property_address: analysis.address,
        hail_probability: analysis.hail_risk,
        wind_probability: analysis.wind_risk,
        flood_probability: analysis.flood_risk,
        risk_score: analysis.overall_score,
        analysis_id: analysis.id,
        report_date: new Date().toISOString().split('T')[0],
        pdf_url: analysis.pdf_url
      });
    } else {
      res.json({
        analysis_complete: false,
        request_id: requestId,
        status: analysis.status || 'processing'
      });
    }
  } catch (error) {
    res.status(500).json({
      error: 'Analysis failed',
      request_id: requestId
    });
  }
});
```

## Option 3: Cloudflare Worker Endpoint

```javascript
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    if (url.pathname === '/api/storm-results') {
      const requestId = url.searchParams.get('request_id');
      
      // Check your data source (KV storage, database, etc.)
      const analysis = await env.STORM_RESULTS.get(requestId);
      
      if (analysis) {
        return new Response(analysis, {
          headers: { 'Content-Type': 'application/json' }
        });
      } else {
        return new Response(JSON.stringify({
          analysis_complete: false,
          request_id: requestId,
          status: 'processing'
        }), {
          headers: { 'Content-Type': 'application/json' }
        });
      }
    }
  }
};
```

## Zapier Webhook Modifications

To enable real-time results, modify your Zapier webhook to:

1. **Store the request_id** in your database/storage
2. **Process the analysis** (PowerTools → ChatGPT → results)
3. **Return immediate response** with analysis data
4. **OR store results** for the polling endpoint to retrieve

### Quick Zapier Setup:
1. Add a "Code by Zapier" step at the end
2. Return the analysis results as JSON
3. Use this code in Zapier:

```javascript
const output = {
  analysis_complete: true,
  property_address: inputData.address + ', ' + inputData.city + ', ' + inputData.state + ' ' + inputData.zip,
  hail_probability: inputData.hail_risk || 0.65,
  wind_probability: inputData.wind_risk || 0.45, 
  flood_probability: inputData.flood_risk || 0.28,
  risk_score: Math.round((inputData.hail_risk + inputData.wind_risk + inputData.flood_risk) * 100 / 3),
  report_date: new Date().toISOString().split('T')[0],
  analysis_id: 'HCG-' + new Date().getFullYear() + '-' + Math.random().toString(36).substr(2, 6).toUpperCase()
};

return [output];
```

## Testing

The widget will:
1. ✅ Submit form data to your Zapier webhook
2. ✅ Poll for results every 3 seconds (up to 45 seconds)
3. ✅ Show "Live Analysis Complete" badge for real data
4. ✅ Fall back to sample results if polling fails
5. ✅ Display comprehensive risk analysis either way

Choose the option that works best with your current infrastructure!