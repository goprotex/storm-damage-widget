# 🎯 CLOUDCONVERT SOLUTION (NPM MODULE ISSUES FIX)

**If you're getting "Cannot find module 'puppeteer-core'" error, use this instead!**

This uses CloudConvert's free tier (25 PDFs/day) with Zapier integration.

---

## 🚀 QUICK SETUP (5 Minutes)

### Step 1: Replace Code in "Code by Zapier"

1. Open your Code by Zapier step
2. **Delete all the Puppeteer code**
3. Open `zapier-simple-html-code.js`
4. **Copy ALL code** (Ctrl+A, Ctrl+C)
5. **Paste** into Code field
6. **No npm modules needed!** ✅

### Step 2: Test the Code Step

1. Keep the same Input Data mappings:
   - `analysis_json` → ChatGPT output
   - `property_address` → Form address
   - `city` → Form city  
   - `state` → Form state
   - `zip` → Form ZIP

2. Click **"Test action"**

3. You should see output:
   ```json
   {
     "success": true,
     "html_content": "<!DOCTYPE html>...",
     "report_id": "HCG-1234567890-ABC123",
     "property_address": "1112 Krystal Vista, Kerrville, TX 78028"
   }
   ```

### Step 3: Add CloudConvert Action

1. Add new action after Code by Zapier
2. Search for **"CloudConvert"**
3. If not installed, click **"Connect a new account"**

### Step 4: Get Free CloudConvert API Key

1. Go to https://cloudconvert.com/register
2. Sign up for free account
3. Go to **Dashboard** → **API Keys**
4. Create new API key
5. Copy the key
6. Paste into Zapier when prompted

**Free Tier:** 25 conversions/day (perfect for testing!)

### Step 5: Configure CloudConvert Action

Select action: **"Convert a File"**

Configure these fields:

| Field | Value |
|-------|-------|
| **Input** | "Raw Content" |
| **Input Format** | `html` |
| **Output Format** | `pdf` |
| **File Content** | Map to `html_content` from Code step |
| **Filename** | `Storm-Report-{{report_id}}.pdf` |
| **Engine** | Leave default |

Advanced Options (optional):
- **Page Size**: `letter`
- **Margin Top**: `0`
- **Margin Bottom**: `0`
- **Print Background**: `true`

### Step 6: Test CloudConvert

1. Click **"Test action"**
2. Wait 5-10 seconds
3. Should see output with `file` URL

### Step 7: Save PDF

Add **Google Drive** or **Dropbox** action:

**For Google Drive:**
- Action: **"Upload File"**
- **File**: Select from CloudConvert → File URL
- **Folder**: Choose your folder
- **Filename**: `Storm Report - {{property_address}}.pdf`

**For Email:**
- Add **Gmail** action
- **Attachment**: CloudConvert → File URL
- Subject: `Storm Report - {{property_address}}`

---

## 💰 COST COMPARISON

| Solution | Setup | Monthly Cost | PDFs/Day | Notes |
|----------|-------|--------------|----------|-------|
| **CloudConvert Free** | 5 min | **$0** | 25 | Perfect for testing! |
| CloudConvert Paid | 5 min | $9.99 | 1000/mo | Great for production |
| Puppeteer | 10 min | $0 | Unlimited | Requires npm modules ⚠️ |
| CraftMyPDF | 30 min | $24 | ~16/day | Terrible UI |

---

## 🔄 UPGRADE PATH

### If You Need More Than 25 PDFs/Day:

**Option 1: CloudConvert Paid ($9.99/mo)**
- 1000 conversions/month
- Still cheaper than CraftMyPDF
- Same setup, just upgrade account

**Option 2: Fix Puppeteer NPM Modules**
- In Code by Zapier step, scroll down
- Find "npm modules" or "NPM Modules" field
- Add: `puppeteer-core` (first line)
- Add: `chrome-aws-lambda` (second line)
- Use original `zapier-puppeteer-code.js`

**Option 3: Use Make.com (Integromat)**
- Make.com has better Code support
- Puppeteer works perfectly there
- Free tier: 1000 operations/month

---

## ⚠️ TROUBLESHOOTING

### CloudConvert: "Invalid API Key"

✅ **Fix:** 
1. Go to https://cloudconvert.com/dashboard/api/v2/keys
2. Create new API key
3. Copy the full key (starts with `eyJ...`)
4. Reconnect CloudConvert in Zapier

### Code Step: "JSON parsing failed"

✅ **Fix:** Make sure `analysis_json` is mapped to ChatGPT output

### CloudConvert: "Conversion failed"

✅ **Fix:** Check that `html_content` from Code step contains HTML (starts with `<!DOCTYPE html>`)

### Need to test HTML without converting?

✅ **Save to Google Drive as HTML file first:**
- Add Google Drive action
- Upload `html_content` as `.html` file
- Open in browser to preview

---

## 📊 WORKFLOW DIAGRAM

```
Form Submission
     ↓
ChatGPT Analysis (with schema)
     ↓
Code by Zapier (generates HTML) ← YOU ARE HERE
     ↓
CloudConvert (HTML → PDF) ← ADD THIS
     ↓
Google Drive / Email
```

---

## ✅ NEXT STEPS

1. ✅ Replace code with `zapier-simple-html-code.js`
2. ✅ Test Code step (should output HTML)
3. ✅ Sign up for CloudConvert free account
4. ✅ Add CloudConvert action in Zapier
5. ✅ Configure HTML → PDF conversion
6. ✅ Test CloudConvert step
7. ✅ Add Google Drive/Email step
8. ✅ Test end-to-end!

---

## 🎁 BONUS: Email HTML Directly

If you don't need PDF, you can email the HTML directly:

1. Skip CloudConvert step
2. Add **Gmail** action
3. **Body Type**: HTML
4. **Body**: Map to `html_content` from Code step

Recipients will see a beautiful HTML email!

---

**Created:** October 2025  
**Status:** ✅ Works 100% (No NPM module issues!)  
**Cost:** Free (25/day) or $9.99/mo (1000/mo)
