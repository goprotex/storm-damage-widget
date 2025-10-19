# 🎯 GPT STORM DATE EXTRACTION GUIDE 

## 📋 **UPDATED SCHEMA REQUIREMENTS**

### **🔴 CRITICAL: Storm Date is Now REQUIRED**

The GPT schema has been updated to **REQUIRE** storm date extraction. This is essential for the real storm data integration system.

#### **Required Fields Added:**
```json
{
  "executive_summary": {
    "primary_storm_date": "2024-03-15",           // REQUIRED: YYYY-MM-DD format
    "storm_date_confidence": "high",              // OPTIONAL: Confidence level
    "storm_date_source": "Claim report analysis" // OPTIONAL: How date was determined
  },
  
  "risk_assessment": {
    "storm_date_intelligence": {                  // REQUIRED: Detailed storm date info
      "primary_storm_date": "2024-03-15",        // REQUIRED: Same as executive summary
      "date_extraction_method": "claim_report_analysis",
      "date_confidence_factors": [
        "Property owner reported damage on March 16th",
        "Severe weather alerts issued for area on March 15th",
        "Damage patterns consistent with March 15th storm"
      ],
      "storm_event_description": "Severe thunderstorm with large hail and 70+ mph winds"
    }
  }
}
```

---

## 🔍 **STORM DATE EXTRACTION METHODS**

### **Method 1: Claim Report Analysis (Most Common)**
```
PROMPT INSTRUCTION:
"Carefully analyze the claim description, incident report, and any timestamps. 
Look for phrases like:
- 'damage occurred on [date]'
- 'storm hit on [date]'  
- 'noticed damage after the [date] storm'
- 'incident date: [date]'

Extract the most likely storm date in YYYY-MM-DD format."
```

### **Method 2: Weather Data Correlation**
```
PROMPT INSTRUCTION:
"If the claim mentions a general timeframe (e.g., 'early March', 'last week'), 
cross-reference with known severe weather events in the area during that period.
Use your knowledge of significant storm events to identify the most likely date."
```

### **Method 3: Property Owner Statement**
```
PROMPT INSTRUCTION:
"Look for direct statements from the property owner about when they noticed damage
or when they believe the storm occurred. Consider the reliability of this source."
```

### **Method 4: Damage Pattern Analysis**
```
PROMPT INSTRUCTION:
"Analyze the type and extent of damage described. Correlate with known storm 
patterns and intensities for the area during the claimed timeframe."
```

---

## 🎯 **GPT PROMPT TEMPLATE**

### **Add This to Your GPT System Prompt:**

```
## STORM DATE EXTRACTION - CRITICAL REQUIREMENT

You MUST extract and provide a primary storm date for every analysis. This date is used for real meteorological data integration.

### Storm Date Extraction Process:
1. **Scan the entire claim** for any date references related to the storm/damage
2. **Look for keywords**: "storm date", "incident date", "damage occurred", "noticed damage after"
3. **Analyze timestamps**: Look for dates in reports, photos, or communications
4. **Consider context clues**: References to specific weather events, holidays, or timeframes
5. **Use weather knowledge**: Cross-reference with known severe weather in the area

### Required Format:
- **primary_storm_date**: Must be in YYYY-MM-DD format (e.g., "2024-03-15")
- **NEVER use placeholder dates** like "2024-01-01" or current date
- **If uncertain**, provide your best estimate with lower confidence level

### If No Clear Date is Found:
- Make educated guess based on claim context
- Set storm_date_confidence to "low" or "medium"  
- Explain reasoning in storm_date_source field
- Use damage patterns and location to estimate timeframe

### Examples of Good Storm Date Extraction:
✅ "2024-03-15" - Specific date from claim report
✅ "2024-04-26" - Major tornado outbreak date referenced
✅ "2024-05-08" - Severe hail storm affecting region

### Examples to AVOID:
❌ "2024-01-01" - Obviously placeholder
❌ "Unknown" - Must provide a date estimate
❌ Future dates - Cannot be after analysis date
```

---

## 🔄 **INTEGRATION WITH ZAPIER WORKFLOW**

### **Step 1: GPT Analysis with Storm Date**
```javascript
// GPT returns analysis with required storm date
const gptResponse = {
  executive_summary: {
    primary_storm_date: "2024-03-15",  // ✅ Required for real storm data
    storm_date_confidence: "high",
    // ... other fields
  },
  risk_assessment: {
    storm_date_intelligence: {
      primary_storm_date: "2024-03-15", // ✅ Same date, detailed info
      date_extraction_method: "claim_report_analysis",
      // ... other fields
    }
  }
};
```

### **Step 2: Extract Storm Date in Zapier**
```javascript
// Zapier Code by Zapier - Extract storm date
const analysisData = JSON.parse(inputData.gpt_analysis);

// Extract storm date (multiple fallback options)
const stormDate = analysisData.executive_summary?.primary_storm_date 
  || analysisData.risk_assessment?.storm_date_intelligence?.primary_storm_date
  || inputData.incident_date
  || inputData.storm_date;

// Validate storm date
if (!stormDate || !stormDate.match(/^\d{4}-\d{2}-\d{2}$/)) {
  throw new Error('❌ CRITICAL: No valid storm date found! GPT must provide primary_storm_date');
}

console.log('✅ Storm date extracted:', stormDate);
```

### **Step 3: Pass to Real Storm Integration**  
```javascript
// Use extracted date for real weather data
const stormData = await getHistoricalStormData(
  propertyLocation,    // Property address
  stormDate,          // ✅ Dynamic date from GPT analysis
  weatherApiKey       // Secure API key
);
```

---

## 🧪 **TESTING STORM DATE EXTRACTION**

### **Test Cases:**

#### **Test 1: Clear Date in Claim**
```
INPUT: "Property damaged during the March 15, 2024 hailstorm"
EXPECTED: "2024-03-15"
CONFIDENCE: "very_high"
METHOD: "claim_report_analysis"
```

#### **Test 2: Relative Date Reference**
```
INPUT: "Noticed roof damage after the big storm last Tuesday" (if today is March 20, 2024)
EXPECTED: "2024-03-12" (calculated from relative date)
CONFIDENCE: "medium"
METHOD: "damage_pattern_analysis"
```

#### **Test 3: Vague Timeframe**
```
INPUT: "House was damaged sometime in early spring during severe weather"
EXPECTED: "2024-03-15" (based on known severe weather events)
CONFIDENCE: "low"
METHOD: "weather_data_correlation"
```

---

## ⚠️ **VALIDATION RULES**

### **✅ Valid Storm Dates:**
- Must be in YYYY-MM-DD format
- Must be in the past (not future dates)
- Must be reasonable (not more than 2 years old typically)
- Must match pattern: `^\d{4}-\d{2}-\d{2}$`

### **❌ Invalid Storm Dates:**
- `null`, `undefined`, or empty string
- Placeholder dates like "2024-01-01"
- Future dates beyond analysis date
- Malformed dates like "03/15/2024" or "March 15, 2024"

---

## 🎯 **SUCCESS METRICS**

### **Schema Compliance:**
- ✅ `primary_storm_date` present in `executive_summary`
- ✅ `storm_date_intelligence` present in `risk_assessment`  
- ✅ Both dates match exactly
- ✅ Date format is YYYY-MM-DD

### **Data Quality:**
- ✅ Date is reasonable for claim context
- ✅ Confidence level reflects uncertainty appropriately
- ✅ Extraction method documented
- ✅ Supporting factors provided

---

## 🚀 **IMPLEMENTATION CHECKLIST**

- [ ] **Update GPT system prompt** with storm date extraction requirements
- [ ] **Test with sample claims** to verify date extraction works  
- [ ] **Validate Zapier workflow** can extract dates from GPT response
- [ ] **Confirm real storm data integration** receives proper dates
- [ ] **Monitor for placeholder dates** and fix GPT prompting if found

**Result: Dynamic storm dates powering real meteorological data integration! 🌪️📊**