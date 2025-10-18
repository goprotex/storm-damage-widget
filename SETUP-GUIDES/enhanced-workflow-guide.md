# Enhanced Zapier Workflow with Property Research

## Updated Workflow Architecture

```
STEP 1: Form Submission (Trigger)
↓
STEP 2: PowerTools - Format Data  
↓
STEP 3: Property Research ChatGPT (NEW!)
   → Web search for building details
   → Construction year, materials, vulnerability factors
↓
STEP 4: Storm Data ChatGPT (Updated)
   → Search vector store with property coordinates
   → Apply distance-based priority filters
↓  
STEP 5: Enhanced Analysis Code (Updated)
   → Combine property research + storm data
   → Calculate vulnerability-adjusted risk scores
   → Generate comprehensive assessment
↓
STEP 6: CraftMyPDF - Generate Report
↓
STEP 7: Gmail - Send Results
```

## New Step 3: Property Research ChatGPT

**ChatGPT Model**: GPT-4 with Web Browsing (Required for property research)

**Prompt Source**: 
```
https://raw.githubusercontent.com/goprotex/storm-damage-widget/main/property-research-prompt.md
```

**Input from Step 2**:
```
Property Address: {{2.formatted_text}}
```

**Output Schema**:
```
https://raw.githubusercontent.com/goprotex/storm-damage-widget/main/property-research-schema.json
```

## Updated Step 4: Enhanced Storm Data Analysis

**Input Variables**:
- Property Address: {{2.formatted_text}}
- Property Research: {{3.choices.0.message.content}}

**Updated Prompt**:
```
You now have BOTH property research data AND storm event data. 
Combine these to create a comprehensive risk assessment that considers:
- Building age and construction era
- Material vulnerabilities (roof, siding)  
- Storm event proximity and severity
- Construction code era vs. storm intensity
```

## Updated Step 5: Comprehensive Analysis Code

**New Input Variables**:
- Form Data: {{1.raw__body}}
- Property Research: {{3.choices.0.message.content}}  
- Storm Data: {{4.choices.0.message.content}}

**Enhanced Processing**:
- Parse property research JSON
- Parse storm data JSON
- Calculate age-adjusted vulnerability scores
- Apply material-specific damage probabilities
- Generate building-specific recommendations

## Implementation Benefits

✅ **Building Intelligence**: Knows construction year, materials, code era
✅ **Vulnerability Scoring**: Adjusts risk based on actual building characteristics  
✅ **Material-Specific Analysis**: Different damage probabilities for brick vs. vinyl
✅ **Code Era Assessment**: 1980s construction vs. modern wind standards
✅ **Comprehensive Reports**: Property details + storm history + risk assessment

## Next Steps

1. **Add Step 3** to your Zapier workflow (Property Research ChatGPT)
2. **Update Step 4** prompt to include property research context
3. **Update Step 5** code to process both data streams
4. **Test with sample property** to verify web research accuracy

This creates a much more sophisticated assessment that considers both storm exposure AND building vulnerability!