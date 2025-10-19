# 🚀 FREE PDF GENERATION WITH PUPPETEER IN ZAPIER

**100% FREE | UNLIMITED PDFs | NO API KEYS NEEDED**

This replaces CraftMyPDF with a completely free solution that generates professional PDFs directly in Zapier.

---

## 📋 SETUP STEPS

### Step 1: Add "Code by Zapier" Action

1. In your Zapier workflow, add a new action step after your ChatGPT step
2. Search for **"Code by Zapier"**
3. Select **"Run JavaScript"**

### Step 2: Map Input Data

In the "Input Data" section, create these fields:

| Field Name | Map From Previous Step |
|------------|------------------------|
| `analysis_json` | ChatGPT → Message (the full JSON output) |
| `property_address` | Form → Property Address |
| `city` | Form → City |
| `state` | Form → State |
| `zip` | Form → ZIP Code |

**Example:**
```
Input Data:
  analysis_json = {{step_GPT_analysis__message}}
  property_address = {{step_form_submission__property_address}}
  city = {{step_form_submission__city}}
  state = {{step_form_submission__state}}
  zip = {{step_form_submission__zip}}
```

### Step 3: Paste the Code

1. Open `zapier-puppeteer-code.js` from this folder
2. **Select ALL code** (Ctrl+A)
3. **Copy** (Ctrl+C)
4. In Zapier Code by Zapier step, **paste into the Code field**

### Step 4: Configure NPM Modules

In the "npm modules" section, add these two packages:

```
puppeteer-core
chrome-aws-lambda
```

**Zapier will automatically install these for you!**

### Step 5: Test the Step

1. Click **"Test action"**
2. Wait 10-30 seconds (PDF generation takes a moment)
3. You should see output like:

```json
{
  "success": true,
  "pdf_base64": "JVBERi0xLjQKJeLjz9MKNSAwIG9iago8PC9UeXBlL...",
  "pdf_size": 125847,
  "report_id": "HCG-1234567890-ABC123",
  "property_address": "1112 Krystal Vista, Kerrville, TX 78028",
  "generated_at": "2024-01-15T10:30:00.000Z"
}
```

---

## 💾 SAVING THE PDF

### Option A: Save to Google Drive (Recommended)

1. Add **"Google Drive"** action after Code step
2. Action: **"Upload File"**
3. Configure:
   - **File**: Select "Attachment" mode
   - **Name**: `Storm Report - {{property_address}} - {{report_id}}.pdf`
   - **Content**: Map to `pdf_base64` from Code step
   - **Folder**: Choose your folder

### Option B: Save to Dropbox

1. Add **"Dropbox"** action after Code step
2. Action: **"Upload File"**
3. Configure:
   - **File**: Map to `pdf_base64` from Code step
   - **Path**: `/Storm Reports/{{report_id}}.pdf`

### Option C: Email as Attachment

1. Add **"Gmail"** or **"Email by Zapier"** action
2. In **"Attachment"**:
   - Select "Attachment" from Code step
   - Use `pdf_base64` field

### Option D: Send to Webhook/API

Use the `pdf_base64` output in any subsequent API call or webhook.

---

## 📤 OUTPUT FIELDS

The Code step returns these fields (use in subsequent steps):

| Field | Description | Example |
|-------|-------------|---------|
| `success` | Whether PDF generated successfully | `true` |
| `pdf_base64` | Base64-encoded PDF file | `JVBERi0xLjQK...` |
| `pdf_size` | Size of PDF in bytes | `125847` |
| `report_id` | Unique report identifier | `HCG-1234567890-ABC123` |
| `property_address` | Full property address | `1112 Krystal Vista, Kerrville, TX 78028` |
| `generated_at` | ISO timestamp | `2024-01-15T10:30:00.000Z` |

---

## 🎨 PDF FEATURES

The generated PDF includes:

✅ **Professional Cover Page** with Hayden Claims Group branding  
✅ **Executive Summary** with color-coded risk levels  
✅ **6 Professional Tables:**
   - Storm Risk Summary
   - Property Damage Assessment
   - Repair Cost Analysis
   - Insurance Claim Strategy
   - Contractor Market Intelligence
   - Risk Mitigation Plan  
✅ **Emergency Response** section with warnings  
✅ **Recommendations** with next steps and timelines  
✅ **Hayden Value Proposition** section  
✅ **Professional Footer** with contact info and report ID  

---

## 🔧 CUSTOMIZATION

### Change Company Info

Edit the `company` object in the code:

```javascript
const company = {
    name: "Your Company Name",
    tagline: "Your tagline",
    phone: "(123) 456-7890",
    email: "your@email.com",
    website: "yourwebsite.com",
    license: "Your License #"
};
```

### Change Colors

Edit the `colors` object:

```javascript
const colors = {
    primary: "#bfa76f",      // Gold accent color
    secondary: "#2c3e50",    // Dark blue/gray
    success: "#28a745",      // Green
    warning: "#fd7e14",      // Orange
    danger: "#dc3545"        // Red
};
```

---

## ⚠️ TROUBLESHOOTING

### Error: "Cannot find module 'puppeteer-core'"

**Solution:** Make sure you added both npm modules:
- `puppeteer-core`
- `chrome-aws-lambda`

### Error: "Timeout waiting for page"

**Solution:** This is normal on first run. Try again.

### Error: "JSON parsing failed"

**Solution:** Make sure `analysis_json` field is mapped to the ChatGPT message output.

### PDF Size Too Large

**Solution:** The PDF is automatically optimized. If still too large, you can compress images in the HTML template.

### Need to Test Locally First?

Run this in Node.js:

```bash
cd STEP-6-PDF-Generation
node test-puppeteer-local.js
```

---

## 💰 COST COMPARISON

| Service | Monthly Cost | PDFs/Month | Cost per PDF |
|---------|-------------|------------|--------------|
| **Puppeteer (This)** | **$0** | **Unlimited** | **$0** |
| CraftMyPDF | $24 | 500 | $0.048 |
| PDFMonkey | $19 | 300 | $0.063 |
| DocRaptor | $49 | 125 | $0.392 |

**You save 100% by using this free solution! 🎉**

---

## ✅ NEXT STEPS

1. ✅ Paste code into Code by Zapier
2. ✅ Add npm modules
3. ✅ Map input data
4. ✅ Test the step
5. ✅ Add Google Drive/Dropbox save step
6. ✅ Add email step with PDF attachment
7. ✅ Test end-to-end workflow

---

## 📞 NEED HELP?

If you get stuck, check:
1. All input fields are mapped correctly
2. Both npm modules are added
3. ChatGPT output is valid JSON

---

**Created:** 2024  
**Version:** 1.0  
**Status:** ✅ Production Ready
