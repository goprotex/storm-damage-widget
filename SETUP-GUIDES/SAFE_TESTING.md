Safe testing with Zapier Catch Hooks

To avoid Zapier capturing unusable "querystring" samples:

- Always send form submissions to the worker endpoint:
  - POST https://haydenclaim.com/api/submit (Content-Type: application/json)
- Never call the Zapier Catch Hook URL directly from the browser (GET or POST).
  - Do not use any pages/scripts that fetch `https://hooks.zapier.com/hooks/catch/...`.
- Progress polling should go to the worker endpoint only:
  - GET https://haydenclaim.com/api/progress?request_id=...
- If you need to test from a terminal, post JSON to the worker (the worker converts to x-www-form-urlencoded for Zapier):
  - Windows PowerShell example:
    - $body = '{"name":"Test","email":"t@test.com","address":"1 a","city":"Dallas","zip":"75201"}'
    - curl.exe -X POST "https://haydenclaim.com/api/submit" -H "Content-Type: application/json" --data-binary $body

Why: Zapier's Catch Hook adds "querystring" records when it receives GET requests. The worker handles proper x-www-form-urlencoded posting to Zapier server-to-server and prevents those artifacts.