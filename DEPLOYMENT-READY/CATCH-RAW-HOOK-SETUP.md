# Using Zapier "Catch Raw Hook" with Worker Proxy

This solves the CORS issue by using Zapier's "Catch Raw Hook" which accepts ANY headers and formats.

## Why This Works

**Regular "Catch Hook":**
- ❌ Blocks CORS preflight requests with Content-Type headers from browsers
- ❌ Only parses specific formats

**"Catch Raw Hook":**
- ✅ Accepts ANY headers (including Content-Type)
- ✅ Accepts requests from servers (no CORS)
- ✅ Provides raw request data for parsing
- ✅ Perfect for Worker proxy pattern

## Setup Steps

### 1. Change Zapier Trigger to "Catch Raw Hook"

1. Open your Zap in Zapier
2. Click on the trigger step
3. Click "Change Trigger"
4. Search for and select **"Webhooks by Zapier"**
5. Choose **"Catch Raw Hook"** (NOT "Catch Hook")
6. Click Continue
7. Copy the new webhook URL (it will look like: `https://hooks.zapier.com/hooks/catch/14608681/XXXXX/`)

### 2. Update Worker Environment Variable

```bash
# Set the new Catch Raw Hook URL in the worker
wrangler secret put ZAPIER_WEBHOOK_URL
# When prompted, paste your new Catch Raw Hook URL
```

OR update line 84 in `worker-zapier-proxy.js`:
```javascript
const zapierUrl = env.ZAPIER_WEBHOOK_URL || 'https://hooks.zapier.com/hooks/catch/14608681/YOUR_NEW_URL/';
```

### 3. Deploy the Worker

```bash
cd DEPLOYMENT-READY
wrangler deploy worker-zapier-proxy.js --name storm-proxy
```

### 4. Configure Cloudflare Route

In Cloudflare Dashboard:
1. Go to your domain (haydenclaim.com)
2. Workers Routes → Add Route
3. Route: `*haydenclaim.com/api/*`
4. Worker: `storm-proxy`
5. Save

### 5. Parse Raw Data in Zapier (Step 2)

Add a **"Code by Zapier"** step after the Catch Raw Hook to parse the JSON:

```javascript
// Parse the raw JSON body from the webhook
const rawBody = inputData.rawBody || inputData.body;

let data;
try {
  data = JSON.parse(rawBody);
} catch (e) {
  // If it's already an object, use it directly
  data = inputData;
}

// Return all the fields for use in subsequent steps
return {
  name: data.name,
  email: data.email,
  phone: data.phone,
  address: data.address,
  city: data.city,
  state: data.state,
  zip: data.zip,
  request_id: data.request_id,
  timestamp: data.timestamp,
  ip: data.ip,
  country: data.country,
  userAgent: data.userAgent,
  referer: data.referer
};
```

### 6. Use Parsed Fields in Rest of Zap

In all subsequent steps (geocoding, weather, GPT, PDF, email), use the fields from the **Code by Zapier** step instead of the raw webhook step.

## Architecture

```
Widget (Cloudflare Pages)
    ↓ POST JSON
Worker (haydenclaim.com/api/submit)
    ↓ POST JSON with headers
Zapier Catch Raw Hook
    ↓ Parse with Code step
Rest of Zap (geocoding, weather, GPT, etc.)
```

## Benefits

✅ No CORS issues (Widget → Worker on same domain)
✅ Full header support (Worker → Zapier server-to-server)
✅ Catch Raw Hook accepts any format/headers
✅ Worker can add metadata (IP, country, timestamp)
✅ Complete control over data format

## Testing

```bash
# Test the worker health endpoint
curl https://haydenclaim.com/api/health

# Test form submission
curl -X POST https://haydenclaim.com/api/submit \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "512-555-1234",
    "address": "123 Main St",
    "city": "Austin",
    "state": "Texas",
    "zip": "78701"
  }'
```

## Widget Configuration

The widget is already configured to use:
- Submit: `https://haydenclaim.com/api/submit`
- Progress: `https://haydenclaim.com/api/progress`

Use the `storm-widget-final.zip` file for deployment.

## Troubleshooting

**Worker not responding?**
- Verify route is configured: `*haydenclaim.com/api/*`
- Check worker is deployed: `wrangler deployments list`
- Test health endpoint: `curl https://haydenclaim.com/api/health`

**Data not appearing in Zapier?**
- Check Zap History for incoming requests
- Verify you're using "Catch Raw Hook" not "Catch Hook"
- Check the Code step is parsing correctly
- Look at worker logs: `wrangler tail storm-proxy`

**CORS errors still appearing?**
- Verify widget is using `haydenclaim.com/api/submit` not direct Zapier URL
- Check browser console for the exact error
- Verify CORS headers in worker OPTIONS response
