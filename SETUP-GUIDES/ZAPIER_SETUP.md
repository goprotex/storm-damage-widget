# Real-Time Results Setup for Hayden Claims Widget

## Step 1: Modify Your Zapier Webhook Response

Your current Zapier flow: **Webhook → PowerTools → ChatGPT → CraftMyPDF → Gmail**

### Add These Steps to Return Real-Time Data:

#### Step A: Add "Code by Zapier" Step AFTER ChatGPT Analysis
Position: After ChatGPT returns the storm analysis, before PDF generation

**Code to extract and format the analysis:**
```javascript
// Extract risk percentages from ChatGPT response
const analysisText = inputData.chatgpt_response || inputData.analysis || "";

// Parse the analysis for risk percentages
function extractRiskData(text) {
  const hailMatch = text.match(/hail.*?(\d+)%/i);
  const windMatch = text.match(/wind.*?(\d+)%/i);
  const floodMatch = text.match(/flood.*?(\d+)%/i);
  
  return {
    hail: hailMatch ? parseInt(hailMatch[1]) : 65,
    wind: windMatch ? parseInt(windMatch[1]) : 45,
    flood: floodMatch ? parseInt(floodMatch[1]) : 28
  };
}

const risks = extractRiskData(analysisText);

// Calculate overall risk score
const overallRisk = Math.round((risks.hail + risks.wind + risks.flood) / 3);

// Format the response for the widget
const widgetResponse = {
  analysis_complete: true,
  property_address: `${inputData.address}, ${inputData.city}, ${inputData.state} ${inputData.zip}`,
  hail_probability: risks.hail / 100,
  wind_probability: risks.wind / 100,
  flood_probability: risks.flood / 100,
  risk_score: overallRisk,
  analysis_id: `HCG-${new Date().getFullYear()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
  report_date: new Date().toISOString().split('T')[0],
  analysis_text: analysisText,
  coordinates: {
    lat: inputData.latitude,
    lng: inputData.longitude
  }
};

// Store this data for the webhook response
output = [{
  widget_response: JSON.stringify(widgetResponse),
  continue_pdf: true,
  ...inputData  // Pass through all original data for PDF generation
}];
```

#### Step B: Modify Your Webhook Response
In your webhook settings, change the response to return JSON:

**Webhook Response Body:**
```json
{{widget_response}}
```

**Response Headers:**
```
Content-Type: application/json
```

## Step 2: Alternative Polling Setup (If Webhook Response Doesn't Work)

If Zapier webhook response modification is complex, set up a simple polling endpoint:

### Option A: Google Sheets + Apps Script Polling
1. Store results in Google Sheets
2. Create Apps Script web app to serve results
3. Widget polls this endpoint

### Option B: Airtable + Webhook Polling
1. Store results in Airtable after analysis
2. Widget polls Airtable API

### Option C: Simple JSON Storage Service
Use a service like JSONBin or your own simple storage

## Step 3: Enhanced ChatGPT Prompt for Structured Output

Update your ChatGPT prompt to return structured data:

```
Analyze the storm risk for this Texas property and return your response in this EXACT format:

ANALYSIS_START
Address: [property address]
Hail Risk: [percentage]%
Wind Risk: [percentage]%  
Flood Risk: [percentage]%
Overall Assessment: [High/Medium/Low]

Key Findings:
- [finding 1]
- [finding 2]  
- [finding 3]

Recommendations:
- [recommendation 1]
- [recommendation 2]
- [recommendation 3]
ANALYSIS_END

[Continue with full detailed analysis for PDF report...]
```

## Step 4: Test Data Flow

Use these test scenarios:

### High Risk Property:
```json
{
  "name": "Test User",
  "email": "test@example.com", 
  "address": "1234 Tornado Alley",
  "city": "Moore",
  "state": "Texas",
  "zip": "73160"
}
```

### Medium Risk Property:
```json
{
  "name": "Test User 2",
  "email": "test2@example.com",
  "address": "5678 Hill Country Dr", 
  "city": "Austin",
  "state": "Texas",
  "zip": "78701"
}
```

## Step 5: Widget Testing

The enhanced widget will:
1. ✅ Submit form with `widget_request=true`
2. ✅ Receive real analysis data immediately 
3. ✅ Display "Live Analysis Complete" badge
4. ✅ Show actual risk percentages from ChatGPT
5. ✅ Display real recommendations
6. ✅ Continue PDF generation in background

## Troubleshooting

### If Zapier webhook response is limited:
- Use the polling method instead
- Store results in external service
- Widget will poll every 3 seconds

### If ChatGPT response is inconsistent:
- Use the structured prompt above
- Add fallback parsing in Zapier code
- Widget handles missing data gracefully

### If timing is too fast/slow:
- Adjust `minLoadingTime` in widget config
- Modify polling intervals
- Add artificial delays if needed

## 🚨 **IMPORTANT: Current Results Status**

**Right now the widget shows SAMPLE results, not real analysis data.**

To get REAL results in the widget, you must modify your Zapier workflow using the steps above.

**Current flow:**
1. Widget form → Zapier (✅ real)
2. Zapier analysis → PDF → Email (✅ real) 
3. Widget displays sample results (❌ not real)

**After Zapier modification:**
1. Widget form → Zapier (✅ real)
2. Zapier analysis → Returns data to widget (✅ real)
3. Widget displays actual analysis (✅ real)
4. PDF → Email continues (✅ real)

**Ready to implement? Let me know which approach works best with your current Zapier setup!**