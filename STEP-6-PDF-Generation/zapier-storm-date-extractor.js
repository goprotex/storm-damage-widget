// 🎯 ZAPIER CODE BY ZAPIER: Storm Date Extractor
// Extract primary_storm_date from GPT analysis output for real storm data integration

// ======================================
// INPUT MAPPING - Update these field names to match your Zapier step names
// ======================================

// Assuming your GPT output comes from a previous step called "GPT Analysis"
// Update "GPT_Analysis" to match your actual step name in Zapier
const gptOutput = inputData.GPT_Analysis || inputData.gpt_analysis || inputData.analysis_json;

// Fallback options - add any other field names you might use
const formStormDate = inputData.storm_date || inputData.incident_date || inputData.date_of_loss;

// ======================================
// STORM DATE EXTRACTION LOGIC
// ======================================

let extractedStormDate = null;
let extractionMethod = 'unknown';
let confidence = 'unknown';
let extractionSource = 'unknown';

try {
  // Parse GPT output if it's a string
  let analysisData;
  if (typeof gptOutput === 'string') {
    analysisData = JSON.parse(gptOutput);
  } else {
    analysisData = gptOutput;
  }

  // Method 1: Extract from executive_summary.primary_storm_date (PRIMARY)
  if (analysisData?.executive_summary?.primary_storm_date) {
    extractedStormDate = analysisData.executive_summary.primary_storm_date;
    extractionMethod = 'executive_summary';
    confidence = analysisData.executive_summary.storm_date_confidence || 'unknown';
    extractionSource = analysisData.executive_summary.storm_date_source || 'GPT analysis';
    console.log('✅ Storm date found in executive_summary:', extractedStormDate);
  }
  
  // Method 2: Extract from risk_assessment.storm_date_intelligence (FALLBACK)
  else if (analysisData?.risk_assessment?.storm_date_intelligence?.primary_storm_date) {
    extractedStormDate = analysisData.risk_assessment.storm_date_intelligence.primary_storm_date;
    extractionMethod = 'storm_date_intelligence';
    confidence = 'medium';
    extractionSource = analysisData.risk_assessment.storm_date_intelligence.date_extraction_method || 'Risk assessment';
    console.log('✅ Storm date found in risk_assessment:', extractedStormDate);
  }
  
  // Method 3: Extract from storm_impact_events (FALLBACK)
  else if (analysisData?.risk_assessment?.storm_impact_events?.length > 0) {
    // Get the most recent storm event
    const stormEvents = analysisData.risk_assessment.storm_impact_events;
    const mostRecentEvent = stormEvents.sort((a, b) => new Date(b.event_date) - new Date(a.event_date))[0];
    extractedStormDate = mostRecentEvent.event_date;
    extractionMethod = 'storm_impact_events';
    confidence = 'medium';
    extractionSource = 'Storm events analysis';
    console.log('✅ Storm date found in storm_impact_events:', extractedStormDate);
  }
  
  // Method 4: Form/manual input fallback
  else if (formStormDate) {
    extractedStormDate = formStormDate;
    extractionMethod = 'form_input';
    confidence = 'manual';
    extractionSource = 'Form submission';
    console.log('✅ Storm date found in form data:', extractedStormDate);
  }

} catch (error) {
  console.error('❌ Error parsing GPT output:', error.message);
  
  // Emergency fallback to form data
  if (formStormDate) {
    extractedStormDate = formStormDate;
    extractionMethod = 'emergency_fallback';
    confidence = 'manual';
    extractionSource = 'Form fallback due to parsing error';
    console.log('⚠️ Using form fallback due to error:', extractedStormDate);
  }
}

// ======================================
// VALIDATION AND FORMATTING
// ======================================

function validateStormDate(dateString) {
  if (!dateString) return false;
  
  // Check format: YYYY-MM-DD
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(dateString)) {
    console.error('❌ Invalid date format. Expected YYYY-MM-DD, got:', dateString);
    return false;
  }
  
  // Check if it's a valid date
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    console.error('❌ Invalid date value:', dateString);
    return false;
  }
  
  // Check if date is not in the future
  const now = new Date();
  if (date > now) {
    console.error('❌ Storm date cannot be in the future:', dateString);
    return false;
  }
  
  // Check if date is not too old (more than 3 years)
  const threeYearsAgo = new Date();
  threeYearsAgo.setFullYear(threeYearsAgo.getFullYear() - 3);
  if (date < threeYearsAgo) {
    console.warn('⚠️ Storm date is more than 3 years old:', dateString);
    // Don't reject, just warn
  }
  
  return true;
}

// ======================================
// FINAL VALIDATION AND OUTPUT
// ======================================

if (!extractedStormDate || !validateStormDate(extractedStormDate)) {
  // CRITICAL ERROR - Cannot proceed without valid storm date
  const errorMessage = `❌ CRITICAL ERROR: No valid storm date found!
  
  Checked sources:
  - GPT executive_summary.primary_storm_date
  - GPT risk_assessment.storm_date_intelligence.primary_storm_date  
  - GPT risk_assessment.storm_impact_events[].event_date
  - Form inputs: storm_date, incident_date, date_of_loss
  
  Required format: YYYY-MM-DD (e.g., "2024-03-15")
  
  Fix by:
  1. Updating GPT prompt to include primary_storm_date
  2. Adding storm date to form submission
  3. Checking field names in this script match your Zapier step names`;
  
  console.error(errorMessage);
  throw new Error(errorMessage);
}

// ======================================
// SUCCESS OUTPUT
// ======================================

const extractionResults = {
  // Main output - ready for real storm data integration
  primary_storm_date: extractedStormDate,
  
  // Metadata for debugging and tracking
  extraction_metadata: {
    method: extractionMethod,
    confidence: confidence,
    source: extractionSource,
    timestamp: new Date().toISOString(),
    validation_status: 'passed'
  },
  
  // For logging and monitoring
  extraction_log: {
    success: true,
    date_found: extractedStormDate,
    extraction_path: extractionMethod,
    confidence_level: confidence,
    data_source: extractionSource
  }
};

// Log success
console.log('🎯 STORM DATE EXTRACTION SUCCESSFUL!');
console.log('📅 Primary Storm Date:', extractedStormDate);
console.log('📊 Extraction Method:', extractionMethod);
console.log('🎯 Confidence Level:', confidence);
console.log('📋 Data Source:', extractionSource);
console.log('✅ Ready for real storm data integration!');

// Return the results
output = extractionResults;

// ======================================
// USAGE NOTES FOR NEXT STEPS
// ======================================

/*
🔧 NEXT STEP: Use the extracted storm date in your real storm integration

In your next Zapier step, use:
- {{step_name.primary_storm_date}} for the storm date
- {{step_name.extraction_metadata.confidence}} for confidence level

Example for real storm data integration:
const stormData = await getHistoricalStormData(
  propertyLocation,                    // "123 Main St, Austin, TX 78701"
  {{step_name.primary_storm_date}},   // Dynamic storm date (e.g., "2024-03-15")
  process.env.WEATHER_API_KEY         // Secure API key
);

🎯 FIELD MAPPING FOR YOUR ZAPIER WORKFLOW:
- Update "GPT_Analysis" variable name to match your actual GPT step
- Update form field names (storm_date, incident_date) to match your form
- The output primary_storm_date is ready for real storm data functions

⚠️ TROUBLESHOOTING:
- If this fails, check that your GPT output includes primary_storm_date
- Verify field names match your Zapier step configuration  
- Check the error logs for specific validation failures
*/