# Step 6: PDF Generation - Setup and Testing Guide

## Quick Setup Checklist

### 1. CraftMyPDF Account Setup
- [ ] Create account at [CraftMyPDF.com](https://craftmypdf.com)
- [ ] Obtain API key from dashboard
- [ ] Create new template project
- [ ] Upload HTML template (see implementation guide)
- [ ] Test template with sample data
- [ ] Note Template ID for configuration

### 2. Template Configuration
- [ ] Configure paper size: Letter (8.5" x 11")
- [ ] Set orientation: Portrait
- [ ] Set margins: 0.75" all sides
- [ ] Upload company logo
- [ ] Test table rendering
- [ ] Verify color scheme matches branding

### 3. API Integration
- [ ] Add API key to environment variables
- [ ] Configure `pdf-generator.js` with credentials
- [ ] Test API connection
- [ ] Implement error handling
- [ ] Set up retry logic
- [ ] Configure timeout settings

### 4. Zapier Integration
- [ ] Add Code step after Step 5 in Zapier workflow
- [ ] Copy `zapier-pdf-step.js` code
- [ ] Configure input data mapping
- [ ] Add error handling step
- [ ] Set up success notifications
- [ ] Test end-to-end workflow

## Environment Variables

```bash
# Required Environment Variables
CRAFTMYPDF_API_KEY=your_api_key_here
CRAFTMYPDF_TEMPLATE_ID=your_template_id_here

# Optional Configuration
PDF_EXPIRATION_HOURS=24
PDF_QUALITY=high
COMPANY_LOGO_URL=https://haydenclaim.com/logo.png
```

## Testing Scenarios

### Test Case 1: Complete Analysis Data
```json
{
  "step5_analysis": {
    "analysis_summary": {
      "overall_damage_likelihood": "High",
      "primary_risk_factors": ["Wind damage to roof", "Hail impact on siding"],
      "hayden_competitive_advantage": "Advanced drone technology and local expertise"
    },
    "pdf_tables": {
      "storm_damage_summary_table": {
        "title": "Storm Damage Risk Assessment Summary",
        "headers": ["Risk Category", "Severity", "Probability", "Impact"],
        "rows": [
          ["Roof Damage", "High", "85%", "$15,000"],
          ["Siding Damage", "Medium", "60%", "$8,000"]
        ]
      }
    },
    "emergency_response": {
      "habitability_assessment": "habitable",
      "immediate_actions": ["Document damage with photos"],
      "time_sensitive_priorities": ["Contact insurance within 24 hours"]
    }
  },
  "form_data": {
    "property_address": "123 Main Street",
    "city": "Dallas",
    "state": "TX",
    "zip": "75201"
  }
}
```

### Test Case 2: Missing Table Data
```json
{
  "step5_analysis": {
    "analysis_summary": {
      "overall_damage_likelihood": "Medium"
    },
    "pdf_tables": {}
  },
  "form_data": {
    "property_address": "456 Oak Avenue"
  }
}
```

### Test Case 3: Emergency Status
```json
{
  "step5_analysis": {
    "analysis_summary": {
      "overall_damage_likelihood": "Very High"
    },
    "emergency_response": {
      "habitability_assessment": "uninhabitable",
      "immediate_actions": ["Evacuate property", "Contact emergency services"],
      "time_sensitive_priorities": ["Secure temporary housing"]
    }
  }
}
```

## Quality Assurance Tests

### Visual Verification
1. **Cover Page**
   - [ ] Company logo displays correctly
   - [ ] Property address is accurate
   - [ ] Date and report ID are present
   - [ ] Branding colors match specification

2. **Tables**
   - [ ] All 6 tables render properly
   - [ ] Headers have correct background color (#bfa76f)
   - [ ] Row alternating colors work
   - [ ] Risk level color coding applies
   - [ ] Text is readable and properly aligned

3. **Content Sections**
   - [ ] Executive summary is complete
   - [ ] Emergency response section highlights critical issues
   - [ ] Technology recommendations display
   - [ ] Legal risk assessment is comprehensive

### Functional Testing
1. **API Response**
   - [ ] PDF generates within 30 seconds
   - [ ] Download URL is accessible
   - [ ] File expires after specified time
   - [ ] Error handling works for invalid data

2. **Data Mapping**
   - [ ] Form data populates correctly
   - [ ] Analysis data maps to proper sections
   - [ ] Missing data shows placeholders
   - [ ] Risk levels trigger correct styling

3. **Integration**
   - [ ] Zapier step executes successfully
   - [ ] Output data passes to next step
   - [ ] Error messages are descriptive
   - [ ] Retry logic functions properly

## Troubleshooting Guide

### Common Issues

#### PDF Generation Fails
**Symptoms**: API returns error, no PDF generated
**Solutions**:
1. Verify API key is correct
2. Check template ID matches
3. Validate JSON data structure
4. Review CraftMyPDF quota limits
5. Test with minimal data set

#### Missing Tables
**Symptoms**: Tables show as empty or missing
**Solutions**:
1. Verify Step 5 output includes `pdf_tables` object
2. Check table structure matches expected format
3. Validate headers and rows arrays exist
4. Test with fallback empty table structure

#### Styling Issues
**Symptoms**: Colors wrong, formatting broken
**Solutions**:
1. Verify CSS in CraftMyPDF template
2. Check color codes in configuration
3. Test responsive design settings
4. Validate HTML structure integrity

#### Data Mapping Errors
**Symptoms**: Wrong data in PDF, missing sections
**Solutions**:
1. Trace data flow from Step 5 to PDF generator
2. Validate property names match exactly
3. Check for null/undefined values
4. Test with complete sample data

### Performance Optimization
- Use async: false for synchronous generation
- Implement request batching for multiple reports
- Cache template responses when possible
- Monitor API rate limits and usage

### Error Codes Reference
- `API_ERROR`: CraftMyPDF API issue
- `VALIDATION_ERROR`: Data structure problem
- `TIMEOUT_ERROR`: Request took too long
- `TEMPLATE_ERROR`: Template configuration issue
- `UNKNOWN_ERROR`: Unexpected failure

## Deployment Checklist

### Pre-Production
- [ ] All test cases pass
- [ ] Error handling tested
- [ ] Performance benchmarks met
- [ ] Security review completed
- [ ] Documentation updated

### Production Deployment
- [ ] Environment variables configured
- [ ] Monitoring alerts set up
- [ ] Backup template created
- [ ] Usage tracking enabled
- [ ] Support procedures documented

### Post-Deployment
- [ ] Generate test reports in production
- [ ] Monitor error rates
- [ ] Verify PDF quality
- [ ] Check download performance
- [ ] Validate data accuracy

This setup guide ensures successful implementation and operation of the Step 6 PDF generation system with comprehensive testing and quality assurance.