# Storm Swath Integration Guide

## ✅ What Was Changed

The main HTML generator (`zapier-simple-html-code.js`) has been updated to use **real storm swath visualizations** instead of the placeholder static visualization.

### Before:
- Static placeholder with hardcoded gradients
- No real storm data
- No animation

### After:
- Dynamic storm swath from real weather API data
- Animated visualization showing storm movement
- Real property location markers
- Fallback to default data if API unavailable

---

## 🔧 Zapier Workflow Setup

### Step 1: Add Storm Swath Generator (Code by Zapier)
**File to use:** `zapier-storm-swath-generator.js`

**Input Fields Required:**
```
GPT_Analysis: {{Your GPT Analysis Step Output}}
location: {{Your Form Data - Address}}
storm_date: {{Your Form Data - Storm Date}}
WEATHER_API_KEY: {{process.env.WEATHER_API_KEY}}
GOOGLE_MAPS_API_KEY: {{process.env.GOOGLE_MAPS_API_KEY}}
```

**This step outputs:**
- `storm_swath_html` - Ready-to-use HTML visualization
- `storm_data` - Extracted storm information
- `property_images` - Google Maps URLs

---

### Step 2: Pass Output to HTML Generator
**File:** `zapier-simple-html-code.js` (already updated)

**Add this new input field:**
```
storm_swath_html: {{storm_swath_generator.storm_swath_html}}
```

**Existing input fields remain the same:**
```
analysis_json: {{Your GPT Analysis}}
form_data_json: {{Your Form Data}}
// ... all other existing inputs
```

---

## 📋 Complete Zapier Flow

```
1. Form Submission
   └── Trigger: Webhook/Form

2. Format with PowerTools
   └── Action: Format data

3. GPT Storm Analysis
   └── Action: ChatGPT conversation
   └── Output: analysis_json

4. ⭐ NEW: Storm Swath Generator (Code by Zapier)
   └── Input: GPT_Analysis, location, storm_date, API keys
   └── Output: storm_swath_html, storm_data, property_images

5. HTML Generator (Code by Zapier)
   └── Input: analysis_json, form_data_json, storm_swath_html ⭐ NEW
   └── Output: final_html

6. PDF Generation
   └── Action: Convert HTML to PDF

7. Email Results
   └── Action: Send email with PDF
```

---

## 🔐 Environment Variables Setup

In your Zapier Code by Zapier steps, add these environment variables:

**Storm Swath Generator Step:**
- `WEATHER_API_KEY`: Your WeatherAPI.com key
- `GOOGLE_MAPS_API_KEY`: Your Google Maps API key

**No changes needed for HTML Generator step** - it just receives the pre-generated HTML.

---

## ✨ What You Get

### Real Storm Data:
- Actual historical weather conditions
- Verified storm intensity and timing
- Real hail size and wind speed data

### Professional Visualization:
- Animated storm swath showing storm movement
- Property location marker with red pin
- Storm intensity gradients (yellow to red)
- Professional styling matching your brand

### Fallback Protection:
- If API keys missing → Uses default storm data
- If API call fails → Graceful degradation
- If JSON parse errors → Uses fallback data
- System always produces output

---

## 🧪 Testing

### Test with Real Data:
1. Run your Zapier workflow with a real address
2. Check the Storm Swath Generator output
3. Verify `storm_swath_html` contains HTML
4. Check final PDF includes animated storm visualization

### Test Fallback:
1. Temporarily remove API keys
2. Run workflow
3. Verify it still generates PDF with default storm data

---

## 📝 Notes

- **No code changes needed in main HTML generator** - Just add the new input field
- **Legacy function preserved** - `generateStormImageUrls()` still exists but isn't called
- **Backward compatible** - If `storm_swath_html` is empty, no storm section appears
- **API usage** - Each run makes 1 WeatherAPI call and generates Google Maps URLs

---

## 🚀 Ready to Deploy

The code is ready! Just:
1. Upload `zapier-storm-swath-generator.js` as a new Code by Zapier step
2. Add the input field mapping shown above
3. Connect its output to the HTML generator
4. Test and enjoy real storm visualizations! 🌪️
