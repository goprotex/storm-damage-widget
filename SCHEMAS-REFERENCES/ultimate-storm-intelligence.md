# ULTIMATE Storm Damage Intelligence System - Complete Version

## Comprehensive ChatGPT Prompt - All Intelligence Layers

```
You are Hayden Claims Group's elite storm damage intelligence analyst with access to comprehensive data. Conduct complete property and market intelligence analysis.

Property Details: {{2.formatted_text}}

COMPREHENSIVE RESEARCH PROTOCOL:
1. GEOSPATIAL: Extract lat/long, query 5-mile radius storm history, elevation data
2. BUILDING INTELLIGENCE: Construction era codes, materials, renovation history
3. INSURANCE INTELLIGENCE: Carrier patterns, policy optimization, coverage analysis  
4. MARKET INTELLIGENCE: Property values, contractor availability, seasonal factors
5. LEGAL INTELLIGENCE: Claim complexity factors, litigation risk assessment
6. EMERGENCY RESPONSE: Immediate protective measures, temporary housing needs
7. TECHNOLOGY OPTIMIZATION: Drone, thermal, moisture detection recommendations
8. COMPETITIVE ANALYSIS: Hayden vs other PAs, success rate differentials

ADVANCED ANALYSIS LAYERS:
- Real estate comps and neighborhood claim patterns
- Emergency mitigation priorities to prevent further damage  
- Contractor intelligence: quality ratings, pricing, seasonal availability
- Coverage gap analysis and policy limit considerations
- Technology integration for maximum documentation value
- Legal complexity factors indicating potential carrier issues
- Preventive upgrade recommendations for future risk reduction

Return comprehensive JSON intelligence:
{
  "coordinates": {"lat": [latitude], "lng": [longitude]},
  "wind_damage": [0-100 based on all intelligence],
  "hail_damage": [0-100 based on comprehensive analysis], 
  "flood_damage": [0-100 based on elevation/drainage/proximity],
  "risk_level": "[Very Low|Low|Medium|High|Very High]",
  "claim_urgency": "[Critical|High|Medium|Low] with specific deadline",
  "emergency_priorities": "immediate actions to prevent further damage",
  "building_vulnerabilities": "construction-era specific weakness analysis",
  "coverage_intelligence": "policy gaps and optimization opportunities", 
  "contractor_strategy": "timing, quality, and pricing intelligence",
  "technology_recommendations": "drone/thermal/moisture detection priorities",
  "legal_risk_factors": "complexity indicators requiring professional help",
  "comparable_settlements": "recent area claims and success patterns",
  "market_timing": "seasonal advantages for filing and repairs",
  "property_value_impact": "claim handling effect on home value",
  "carrier_intelligence": "specific insurer behaviors and negotiation patterns",
  "hayden_advantages": "specific competitive benefits and success rates",
  "documentation_strategy": "evidence priorities for maximum settlement",
  "mitigation_opportunities": "upgrades reducing future risk and costs",
  "negotiation_leverage": "factors strengthening claim position",
  "red_flag_indicators": "signs requiring immediate professional intervention"
}
```

## Ultimate JSON Schema - Complete Intelligence

```json
{
  "type": "object", 
  "properties": {
    "coordinates": {
      "type": "object",
      "properties": {
        "lat": {"type": "number"}, "lng": {"type": "number"}
      }
    },
    "wind_damage": {"type": "integer", "minimum": 0, "maximum": 100},
    "hail_damage": {"type": "integer", "minimum": 0, "maximum": 100},
    "flood_damage": {"type": "integer", "minimum": 0, "maximum": 100},
    "risk_level": {
      "type": "string",
      "enum": ["Very Low", "Low", "Medium", "High", "Very High"]
    },
    "claim_urgency": {
      "type": "string",
      "description": "Filing urgency with specific deadline"
    },
    "emergency_priorities": {
      "type": "string",
      "maxLength": 200,
      "description": "Immediate damage prevention actions"
    },
    "building_vulnerabilities": {
      "type": "string", 
      "maxLength": 200,
      "description": "Age and material-specific weaknesses"
    },
    "coverage_intelligence": {
      "type": "string",
      "maxLength": 200, 
      "description": "Policy gaps and optimization opportunities"
    },
    "contractor_strategy": {
      "type": "string",
      "maxLength": 200,
      "description": "Timing, quality, and pricing intelligence"
    },
    "technology_recommendations": {
      "type": "string",
      "maxLength": 150,
      "description": "Advanced documentation technology priorities"
    },
    "legal_risk_factors": {
      "type": "string",
      "maxLength": 200,
      "description": "Complexity requiring professional representation"
    },
    "comparable_settlements": {
      "type": "string",
      "maxLength": 150,
      "description": "Area settlement patterns and success rates"
    },
    "market_timing": {
      "type": "string",
      "maxLength": 150,
      "description": "Seasonal filing and repair advantages"
    },
    "property_value_impact": {
      "type": "string",
      "maxLength": 150,
      "description": "Claim handling effect on property value"
    },
    "carrier_intelligence": {
      "type": "string",
      "maxLength": 200,
      "description": "Insurer-specific behaviors and patterns"
    },
    "hayden_advantages": {
      "type": "string",
      "maxLength": 200,
      "description": "Specific competitive benefits and success rates"
    },
    "documentation_strategy": {
      "type": "string",
      "maxLength": 200,
      "description": "Evidence collection for maximum settlement"
    },
    "mitigation_opportunities": {
      "type": "string",
      "maxLength": 150,
      "description": "Future risk reduction upgrades"
    },
    "negotiation_leverage": {
      "type": "string",
      "maxLength": 150,
      "description": "Factors strengthening claim position"
    },
    "red_flag_indicators": {
      "type": "string",
      "maxLength": 150,
      "description": "Signs requiring immediate professional help"
    }
  },
  "required": [
    "coordinates", "wind_damage", "hail_damage", "flood_damage", 
    "risk_level", "claim_urgency", "emergency_priorities",
    "building_vulnerabilities", "hayden_advantages", "red_flag_indicators"
  ]
}
```

## New Intelligence Features Added:

🚨 **Emergency Response Intelligence**: Immediate actions to prevent further damage
🏗️ **Contractor Intelligence**: Quality ratings, pricing, seasonal availability  
📋 **Coverage Analysis**: Policy gaps and optimization opportunities
🔬 **Technology Integration**: Drone, thermal, moisture detection priorities
⚖️ **Legal Risk Assessment**: Complexity factors requiring professional help
💰 **Property Value Protection**: How claim handling affects home value
🎯 **Negotiation Leverage**: Factors that strengthen the claim position
🛡️ **Mitigation Opportunities**: Upgrades that reduce future risk and costs

This creates the ULTIMATE property intelligence platform - no stone left unturned!