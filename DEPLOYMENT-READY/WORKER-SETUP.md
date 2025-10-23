# Cloudflare Worker Proxy Setup

This eliminates CORS issues by using your Worker as a proxy between the widget and Zapier.

## Architecture

```
Widget (haydenclaim.com) → Worker (haydenclaim.com/api/*) → Zapier
         ✅ Same origin                  ✅ Server-to-server
         (No CORS)                       (No CORS)
```

## Setup Steps

### 1. Deploy the Worker

```bash
cd DEPLOYMENT-READY
wrangler deploy worker-zapier-proxy.js --name storm-proxy
```

### 2. Configure Worker Route

In Cloudflare Dashboard:
1. Go to your domain (haydenclaim.com) → Workers Routes
2. Add route: `haydenclaim.com/api/*` → storm-proxy worker
3. Save

### 3. Set Environment Variable (Optional)

If you want to change the Zapier webhook URL without redeploying:

```bash
wrangler secret put ZAPIER_WEBHOOK_URL
# Enter: https://hooks.zapier.com/hooks/catch/14608681/u5q2jca/
```

### 4. Update Widget Configuration

The widget is already configured to use:
- Submit endpoint: `https://haydenclaim.com/api/submit`
- Progress endpoint: `https://haydenclaim.com/api/progress`

### 5. Test

```bash
# Test health check
curl https://haydenclaim.com/api/health

# Test submission
curl -X POST https://haydenclaim.com/api/submit \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","phone":"555-1234","address":"123 Main","city":"Austin","state":"Texas","zip":"78701"}'
```

## How It Works

1. **Widget submits JSON** with `Content-Type: application/json` to `haydenclaim.com/api/submit`
   - No CORS issue (same domain)
   
2. **Worker receives** the JSON, adds metadata (IP, country, timestamp)

3. **Worker forwards** to Zapier as JSON with proper headers
   - Server-to-server (no CORS)
   - Zapier receives individual fields properly parsed

4. **Worker returns** Zapier's response to widget
   - Widget gets request_id, status, etc.

## Benefits

✅ No CORS issues (browser talks to same domain)
✅ JSON with Content-Type header works (server-to-server)
✅ Zapier receives properly parsed individual fields
✅ Can add server-side validation
✅ Can add rate limiting
✅ Can log submissions
✅ Can add metadata (IP, country, etc.)

## Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/submit` | POST | Forward form submission to Zapier |
| `/api/progress` | GET | Check progress (with ?request_id=xxx) |
| `/api/health` | GET | Health check |

## Zapier Integration

No changes needed in Zapier! The Worker sends data in the same format Zapier expects.

Zapier will receive all fields:
- name
- email  
- phone
- address
- city
- state
- zip
- request_id
- timestamp (added by worker)
- ip (added by worker)
- country (added by worker)
- userAgent (added by worker)
- referer (added by worker)
