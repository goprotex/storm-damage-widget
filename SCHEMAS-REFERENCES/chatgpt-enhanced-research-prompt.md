# Enhanced ChatGPT Storm Analysis - With Web Search & Vector Store

## Updated ChatGPT Prompt (Step 3) - Research-Enhanced

```
You are a storm damage risk analyst for Hayden Claims Group. Analyze this Texas property using ALL available data sources.

Property Details: {{2.formatted_text}}

RESEARCH REQUIRED:
1. Search web for current weather patterns and recent storms in the property's area
2. Query vector store for historical claims data and damage patterns in this region  
3. Look up local climate risks, flood zones, and tornado frequency data
4. Research property type vulnerability and construction material resilience

ANALYSIS FRAMEWORK:
- Cross-reference property details with regional storm history
- Factor in current weather trends and seasonal patterns
- Apply Hayden Claims Group's historical damage data
- Consider building code changes and construction era  
- Evaluate micro-climate and topographical factors

Return ONLY valid JSON with no additional text:
{
  "wind_damage": [0-100 integer based on research],
  "hail_damage": [0-100 integer based on research], 
  "flood_damage": [0-100 integer based on research],
  "risk_level": "[Very Low|Low|Medium|High|Very High]",
  "primary_concerns": "[research-backed concerns, 1-2 sentences]",
  "recommendations": "[data-driven actionable items]",
  "property_type_factor": "[vulnerability based on construction research]",
  "location_factor": "[risk based on weather/climate data]",
  "data_sources": "[brief mention of key sources used]"
}
```

## ChatGPT Configuration for Enhanced Analysis

### Required Settings:
- **Model**: GPT-4 (required for web search and complex analysis)
- **Web Search**: ENABLED 
- **Vector Store Access**: ENABLED (if you have claims data uploaded)
- **Temperature**: 0.3
- **Max Tokens**: 500 (increased for research-based response)

### Zapier ChatGPT Step Configuration:
1. **Enable Web Search**: Check "Search the web" option
2. **Vector Store**: If you have historical claims data, enable vector store access
3. **System Message**: "You are a storm damage analyst with access to Hayden Claims historical data and current weather information"

## Updated JSON Schema (includes data sources):

```json
{
  "type": "object",
  "properties": {
    "wind_damage": {
      "type": "integer",
      "minimum": 0,
      "maximum": 100,
      "description": "Research-based percentage risk of wind damage"
    },
    "hail_damage": {
      "type": "integer", 
      "minimum": 0,
      "maximum": 100,
      "description": "Research-based percentage risk of hail damage"
    },
    "flood_damage": {
      "type": "integer",
      "minimum": 0, 
      "maximum": 100,
      "description": "Research-based percentage risk of flood damage"
    },
    "risk_level": {
      "type": "string",
      "enum": ["Very Low", "Low", "Medium", "High", "Very High"],
      "description": "Overall risk assessment based on all data"
    },
    "primary_concerns": {
      "type": "string",
      "maxLength": 200,
      "description": "Research-backed summary of main risk factors"
    },
    "recommendations": {
      "type": "string", 
      "maxLength": 250,
      "description": "Data-driven actionable recommendations"
    },
    "property_type_factor": {
      "type": "string",
      "maxLength": 150,
      "description": "Vulnerability assessment based on construction research"
    },
    "location_factor": {
      "type": "string",
      "maxLength": 150, 
      "description": "Risk assessment based on weather/climate data"
    },
    "data_sources": {
      "type": "string",
      "maxLength": 100,
      "description": "Brief mention of key research sources used"
    }
  },
  "required": ["wind_damage", "hail_damage", "flood_damage", "risk_level", "primary_concerns", "recommendations", "data_sources"],
  "additionalProperties": false
}
```

## Benefits of Research-Enhanced Analysis:
1. **Real-Time Data**: Current weather patterns and recent storm activity
2. **Historical Context**: Your claims database provides actual damage patterns  
3. **Location Precision**: Micro-climate and topographical factors
4. **Construction Intelligence**: Building material vulnerability research
5. **Regulatory Awareness**: Current building codes and flood zone data
6. **Seasonal Factors**: Current weather trends and seasonal risk patterns

This approach transforms your analysis from generic estimates to data-driven, research-backed risk assessments that reflect real conditions and your company's actual experience!