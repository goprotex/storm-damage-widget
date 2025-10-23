# Live Progress Backend Implementation Guide

## Overview
The widget now supports real-time progress updates from your backend. When enabled, the progress bar reflects actual processing stages instead of just polling attempts.

## How It Works

### Widget Side (Already Configured)
- `CONFIG.enableLiveProgress = true` - Live progress is now enabled
- `CONFIG.progressEndpoint` - Points to your Zapier progress webhook
- Widget polls this endpoint every 2 seconds during processing
- Updates progress bar, status messages, and progress dots based on server response

### Server Side (What You Need to Build)

The widget expects your progress endpoint to return JSON like this:

```json
{
  "request_id": "req_1234567890_abc123",
  "current_step": "chatgpt_analysis",
  "step_number": 3,
  "total_steps": 5,
  "percentage": 60,
  "status": "processing",
  "status_message": "AI analyzing storm patterns..."
}
```

## Implementation Options

### Option 1: Zapier Storage (Recommended for Quick Setup)

**Step 1: Create a Zapier Storage Endpoint**
1. Create a new Zap: "Catch Hook → Storage by Zapier"
2. Trigger: Webhook - Catch Hook
3. Action: Storage by Zapier - Set Value
   - Key: `progress_{{querystring__request_id}}`
   - Value: Map your progress data as JSON
   - TTL: 300 seconds (5 minutes)

**Step 2: Create a Progress Retrieval Zap**
1. New Zap: "Catch Hook → Storage by Zapier → Webhook Response"
2. Trigger: Catch Hook (this is your progress endpoint)
3. Action: Storage - Get Value
   - Key: `progress_{{querystring__request_id}}`
4. Action: Webhook Response
   - Return the storage value as JSON

**Step 3: Update Progress During Main Workflow**
In your main storm analysis Zap, add "Storage by Zapier - Set Value" actions after each major step:

```javascript
// After geocoding
{
  "request_id": inputData.request_id,
  "current_step": "coordinates",
  "percentage": 20,
  "status": "processing"
}

// After weather data
{
  "request_id": inputData.request_id,
  "current_step": "weather_data",
  "percentage": 40,
  "status": "processing"
}

// After GPT analysis
{
  "request_id": inputData.request_id,
  "current_step": "chatgpt_analysis",
  "percentage": 70,
  "status": "processing"
}

// Before PDF generation
{
  "request_id": inputData.request_id,
  "current_step": "pdf_generation",
  "percentage": 85,
  "status": "processing"
}

// Complete
{
  "request_id": inputData.request_id,
  "current_step": "complete",
  "percentage": 100,
  "status": "complete"
}
```

### Option 2: Database (For Production)

Use a real database like:
- **Airtable** - Easy Zapier integration
- **Google Sheets** - Free, simple
- **MySQL/PostgreSQL** - Via Zapier Database actions

**Example with Airtable:**
1. Create "Progress" table with columns:
   - request_id (text)
   - current_step (text)
   - percentage (number)
   - status (text)
   - timestamp (datetime)

2. Update progress: "Update Record" action in your main Zap
3. Retrieve progress: "Find Record" action in your progress endpoint Zap

### Option 3: Custom API (Advanced)

Build a simple Node.js/Python API:
- Store progress in Redis or memory
- Expose GET endpoint: `/progress?request_id=xxx`
- Update from Zapier using "Webhook POST" actions

## Widget Expected Response Format

### Recognized Step Names
The widget has built-in messages for these steps:
- `coordinates` - "Converting address to coordinates..."
- `weather_data` - "Gathering historical weather data..."
- `chatgpt_analysis` - "AI analyzing storm patterns and risks..."
- `pdf_generation` - "Generating your detailed report..."
- `email_sending` - "Preparing to send your report..."
- `complete` - "Analysis complete - preparing results..."

### Required Fields
- `request_id` (string) - The request identifier
- `percentage` (number) - 0-100, drives the progress bar
- `current_step` (string) - One of the step names above
- `status` (string) - "processing" or "complete"

### Optional Fields
- `status_message` (string) - Custom status text (overrides built-in messages)
- `step_number` (number) - Current step number (e.g., 3)
- `total_steps` (number) - Total steps (e.g., 5)

## Quick Start with Zapier

**Minimal Setup (Just Progress Bar):**

1. In your main analysis Zap, add a Code step before GPT:
```javascript
// Code by Zapier - Update Progress
const requestId = inputData.request_id;
const percentage = 50; // Halfway through

// Make a quick POST to your progress storage webhook
await fetch('https://hooks.zapier.com/hooks/catch/YOUR_ID/progress_update', {
  method: 'POST',
  body: JSON.stringify({
    request_id: requestId,
    percentage: percentage,
    current_step: 'chatgpt_analysis'
  })
});

return { updated: true };
```

2. Widget automatically polls and updates the bar

## Testing

### Test the Progress Endpoint
```bash
# Should return progress JSON
curl "https://hooks.zapier.com/hooks/catch/14608681/progress?request_id=test123"
```

Expected response:
```json
{
  "request_id": "test123",
  "percentage": 45,
  "current_step": "weather_data",
  "status": "processing"
}
```

### Widget Console Logs
Open browser DevTools and watch for:
- `Live progress tracking enabled for request: req_xxx`
- `Live progress received: {percentage: 45, ...}`
- `Progress bar updated: 45%`
- `Server reported completion, stopping live progress tracking`

## Configuration in Widget

Current settings in `script.js`:
```javascript
enableLiveProgress: true,  // Now active
progressEndpoint: 'https://hooks.zapier.com/hooks/catch/14608681/progress'
```

Update the `progressEndpoint` URL to your actual Zapier progress webhook.

## Fallback Behavior

If the progress endpoint fails or isn't configured:
- Widget falls back to polling-based progress (attempt count)
- Logs: `Live progress check failed (this is normal if endpoint not configured)`
- No errors shown to user
- Progress bar still updates based on polling attempts

## Best Practices

1. **Set Progress Early** - Update progress at 10-20% right after form submission
2. **Regular Updates** - Update every 15-20% of progress
3. **Don't Skip 100%** - Always set percentage=100 when complete
4. **Use TTL** - Set storage TTL to 5-10 minutes to auto-cleanup
5. **Log Everything** - Log progress updates for debugging

## Troubleshooting

**Progress bar doesn't update:**
- Check browser console for "Live progress received" logs
- Verify progress endpoint returns valid JSON
- Check CORS settings if using external API

**Widget shows "Analysis is still processing":**
- Progress endpoint might not be returning data
- Check request_id matches between submission and progress
- Verify progress is being stored/updated in backend

**Progress jumps or goes backwards:**
- Ensure percentage always increases
- Use step-based logic, not time-based
- Store last percentage and only update if higher

## Example Full Implementation

```javascript
// In your main Zapier workflow, add this Code step after each major action:

const progressUpdates = {
  'after_geocode': { step: 'coordinates', pct: 20 },
  'after_weather': { step: 'weather_data', pct: 45 },
  'after_gpt': { step: 'chatgpt_analysis', pct: 75 },
  'after_pdf': { step: 'pdf_generation', pct: 90 },
  'complete': { step: 'complete', pct: 100 }
};

const current = progressUpdates['after_gpt']; // Change based on current step

// Update storage
await fetch('YOUR_PROGRESS_STORAGE_WEBHOOK', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    request_id: inputData.request_id,
    current_step: current.step,
    percentage: current.pct,
    status: current.pct === 100 ? 'complete' : 'processing',
    timestamp: new Date().toISOString()
  })
});

return { progress_updated: true };
```

## Next Steps

1. ✅ Widget is configured and ready
2. 🔨 Create your progress endpoint in Zapier (Option 1 above)
3. 🔨 Update your main Zap to store progress at key steps
4. ✅ Update `CONFIG.progressEndpoint` in widget if needed
5. 🧪 Test end-to-end with a real form submission

---

**Questions?** The widget will gracefully fall back to polling-based progress if the endpoint isn't ready yet, so you can deploy incrementally.
