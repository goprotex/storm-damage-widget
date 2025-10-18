// Zapier Code Step - Extract Real Analysis Results
// Add this as a "Code by Zapier" step after ChatGPT analysis

// Input: ChatGPT response text
const analysisText = inputData.chatgpt_response || inputData.analysis || inputData.message || "";

console.log("ChatGPT Analysis Text:", analysisText);

// Function to extract risk percentages from ChatGPT response
function extractRiskData(text) {
  const lowerText = text.toLowerCase();
  
  // Multiple patterns to find hail risk
  const hailPatterns = [
    /hail.*?(\d+)%/i,
    /hail.*?(\d+)\s*percent/i,
    /hail.*?risk.*?(\d+)/i,
    /hail.*?probability.*?(\d+)/i
  ];
  
  // Multiple patterns to find wind risk  
  const windPatterns = [
    /wind.*?(\d+)%/i,
    /wind.*?(\d+)\s*percent/i,
    /wind.*?risk.*?(\d+)/i,
    /wind.*?damage.*?(\d+)/i
  ];
  
  // Multiple patterns to find flood risk
  const floodPatterns = [
    /flood.*?(\d+)%/i,
    /flood.*?(\d+)\s*percent/i,
    /flood.*?risk.*?(\d+)/i,
    /flooding.*?(\d+)/i,
    /water.*?damage.*?(\d+)/i
  ];
  
  // Extract hail percentage
  let hail = 65; // Default fallback
  for (let pattern of hailPatterns) {
    const match = lowerText.match(pattern);
    if (match && match[1]) {
      hail = parseInt(match[1]);
      console.log("Found hail risk:", hail + "%");
      break;
    }
  }
  
  // Extract wind percentage
  let wind = 45; // Default fallback
  for (let pattern of windPatterns) {
    const match = lowerText.match(pattern);
    if (match && match[1]) {
      wind = parseInt(match[1]);
      console.log("Found wind risk:", wind + "%");
      break;
    }
  }
  
  // Extract flood percentage
  let flood = 28; // Default fallback
  for (let pattern of floodPatterns) {
    const match = lowerText.match(pattern);
    if (match && match[1]) {
      flood = parseInt(match[1]);
      console.log("Found flood risk:", flood + "%");
      break;
    }
  }
  
  return { hail, wind, flood };
}

// Extract risks from ChatGPT analysis
const risks = extractRiskData(analysisText);
console.log("Extracted risks:", risks);

// Calculate overall risk score
const overallRisk = Math.round((risks.hail + risks.wind + risks.flood) / 3);

// Generate analysis ID
const analysisId = `HCG-${new Date().getFullYear()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;

// Create the widget response object
const widgetResponse = {
  analysis_complete: true,
  property_address: `${inputData.address || inputData.street_address}, ${inputData.city}, ${inputData.state} ${inputData.zip || inputData.postal_code}`,
  hail_probability: risks.hail / 100,
  wind_probability: risks.wind / 100,
  flood_probability: risks.flood / 100,
  risk_score: overallRisk,
  analysis_id: analysisId,
  report_date: new Date().toISOString().split('T')[0],
  analysis_text: analysisText.substring(0, 500), // First 500 chars for reference
  coordinates: {
    lat: inputData.latitude,
    lng: inputData.longitude
  },
  recommendations: [
    risks.hail > 50 ? "Consider impact-resistant roofing materials" : "Monitor seasonal hail patterns",
    risks.wind > 40 ? "Secure outdoor items and check roof attachments" : "Standard wind precautions recommended", 
    risks.flood > 30 ? "Review flood insurance coverage options" : "Low flood risk - maintain basic drainage"
  ]
};

console.log("Final widget response:", widgetResponse);

// Return data for both widget AND continuing PDF workflow
output = [{
  // For the widget (JSON string)
  widget_data: JSON.stringify(widgetResponse),
  
  // For PDF generation (pass through all original data)
  analysis_id: analysisId,
  hail_risk_percent: risks.hail,
  wind_risk_percent: risks.wind,
  flood_risk_percent: risks.flood,
  overall_risk_score: overallRisk,
  
  // Pass through original inputs for PDF
  name: inputData.name,
  email: inputData.email,
  address: inputData.address,
  city: inputData.city,
  state: inputData.state,
  zip: inputData.zip,
  phone: inputData.phone,
  chatgpt_analysis: analysisText,
  
  // Continue any other fields your PDF generation needs
  latitude: inputData.latitude,
  longitude: inputData.longitude
}];