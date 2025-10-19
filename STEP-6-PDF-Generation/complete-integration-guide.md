# Complete CraftMyPDF Integration Guide

## Optimized Storm Damage Report System

This guide provides complete instructions for implementing the optimized GPT analysis and CraftMyPDF integration for professional storm damage reports.

## System Overview

The optimized system includes:

1. **Simplified GPT Analysis Schema** - Focused on PDF-ready data structures
2. **Enhanced PDF Generator** - Better error handling and data mapping  
3. **Optimized Template Data** - Flattened structure for easier template integration
4. **Professional Report Output** - Client-ready PDF reports

## Implementation Steps

### Step 1: Update Your GPT Analysis Prompt

Replace your current Step 5 prompt with the optimized version:

**File:** `STEP-5-GPT5-Analysis/optimized-gpt5-analysis-prompt.md`

Key improvements:

- Simplified schema focused on essential data
- Better table structure for PDF rendering
- Enhanced business intelligence section
- Clearer output requirements

### Step 2: Replace PDF Generator Code

Use the new optimized PDF generator:

**File:** `STEP-6-PDF-Generation/optimized-pdf-generator.js`

Key features:

- Enhanced error handling with retry logic
- Better data validation
- Flattened template data structure
- Professional styling integration
- Comprehensive success/error responses

### Step 3: Configure CraftMyPDF Integration

#### A. API Configuration

```javascript
const config = {
    apiKey: 'your_craftmypdf_api_key',
    templateId: 'your_template_id'
};

const generator = new OptimizedStormReportGenerator(config);
```

#### B. Generate Report

```javascript
// From Zapier or direct integration
const result = await generator.generateProfessionalReport(
    optimizedAnalysisData,  // From Step 5 with new schema
    formData               // From Step 1
);

if (result.success) {
    // PDF generated successfully
    console.log('PDF URL:', result.pdfDetails.downloadUrl);
    console.log('Report ID:', result.reportMetadata.reportId);
} else {
    // Handle error
    console.error('Error:', result.error.message);
}
```

### Step 4: CraftMyPDF Template Setup

#### A. Create HTML Template

Use the structure from `craftmypdf-template-mapping.md` as your starting point.

Key template sections:

1. Cover page with company branding
2. Executive summary with risk assessment
3. Professional tables (all 6 required tables)
4. Emergency response section
5. Recommendations and next steps
6. Hayden value proposition
7. Footer with report metadata

#### B. CSS Styling

```css
:root {
    --primary-color: {{styling.primaryColor}};
    --secondary-color: {{styling.secondaryColor}};
    --success-color: {{styling.successColor}};
    --warning-color: {{styling.warningColor}};
    --danger-color: {{styling.dangerColor}};
}

.risk-critical { color: var(--danger-color); }
.risk-high { color: #ff6b35; }
.risk-moderate { color: var(--warning-color); }
.risk-low { color: var(--success-color); }
.risk-minimal { color: #20c997; }

.professional-table {
    width: 100%;
    border-collapse: collapse;
    margin: 20px 0;
}

.professional-table th {
    background-color: var(--primary-color);
    color: white;
    padding: 12px 8px;
    text-align: left;
}

.professional-table td {
    padding: 10px 8px;
    border: 1px solid #ddd;
}

.professional-table tr:nth-child(even) {
    background-color: #f8f9fa;
}

.insights {
    background: #f8f9fa;
    padding: 15px;
    margin-top: 15px;
    border-left: 4px solid var(--primary-color);
}
```

### Step 5: Zapier Integration

#### Updated Zapier Code Step

```javascript
// Input data from previous steps
const formData = inputData.step1_form_data || {};
const optimizedAnalysis = inputData.step5_optimized_analysis || {};

// CraftMyPDF configuration
const config = {
    apiKey: 'your_craftmypdf_api_key_here',
    templateId: 'your_storm_report_template_id_here'
};

// Import the optimized generator (or copy the class code)
const OptimizedStormReportGenerator = /* class definition or import */;

// Generate PDF
async function generateOptimizedPDF() {
    try {
        const generator = new OptimizedStormReportGenerator(config);
        const result = await generator.generateProfessionalReport(
            optimizedAnalysis,
            formData
        );
        
        return {
            success: result.success,
            pdf_url: result.pdfDetails?.downloadUrl || null,
            report_id: result.reportMetadata?.reportId || null,
            error_message: result.error?.message || null,
            report_summary: result.reportSummary || {},
            next_steps: result.nextSteps || {},
            hayden_advantage: result.reportSummary?.haydensAdvantage || ''
        };
        
    } catch (error) {
        return {
            success: false,
            error_message: error.message,
            timestamp: new Date().toISOString()
        };
    }
}

// Execute and return result
const pdfResult = await generateOptimizedPDF();
output = [pdfResult];
```

## Testing and Validation

### Step 1: Test Data Flow

1. **Form Submission** → Step 1 data structure ✓
2. **Storm Research** → Step 3 data integration ✓  
3. **Property Research** → Step 4 data integration ✓
4. **GPT Analysis** → New optimized schema ✓
5. **PDF Generation** → Enhanced template data ✓

### Step 2: Validate PDF Output

Test with various scenarios:

```javascript
// Test scenarios
const testScenarios = [
    {
        name: 'High Risk Property',
        risk_level: 'critical',
        damage_probability: 'very_likely',
        expected_tables: 6
    },
    {
        name: 'Moderate Risk Property', 
        risk_level: 'moderate',
        damage_probability: 'possible',
        expected_tables: 6
    },
    {
        name: 'Low Risk Property',
        risk_level: 'low',
        damage_probability: 'unlikely',
        expected_tables: 6
    }
];

// Run tests
for (const scenario of testScenarios) {
    const result = await generateTestReport(scenario);
    console.log(`${scenario.name}: ${result.success ? 'PASS' : 'FAIL'}`);
}
```

## Quality Assurance Checklist

### PDF Content Validation

- [ ] All 6 professional tables render correctly
- [ ] Executive summary displays risk level with proper color coding
- [ ] Company branding appears consistently throughout
- [ ] Emergency response section shows habitability status
- [ ] Recommendations are clearly formatted and prioritized
- [ ] Hayden value proposition is prominently displayed

### Technical Validation  

- [ ] PDF generation completes within 45 seconds
- [ ] Error handling provides useful feedback
- [ ] Retry logic works for transient failures
- [ ] Template data mapping covers all schema fields
- [ ] Styling variables apply correctly

### Business Validation

- [ ] Reports demonstrate Hayden's competitive advantages
- [ ] Risk assessments are conservative but realistic
- [ ] Cost estimates align with current market conditions
- [ ] Recommendations are actionable and prioritized
- [ ] Professional tone throughout

## Troubleshooting

### Common Issues

1. **Template Data Missing**

   ```javascript
   // Check data structure
   console.log('Template data keys:', Object.keys(templateData));
   console.log('Tables available:', Object.keys(templateData.tables || {}));
   ```

2. **PDF Generation Timeout**

   ```javascript
   // Increase timeout in config
   const config = {
       apiKey: 'your_key',
       templateId: 'your_template',
       timeout: 60000  // 60 seconds
   };
   ```

3. **Missing Table Data**

   ```javascript
   // Validate analysis has all required tables
   const requiredTables = [
       'storm_risk_summary',
       'property_damage_assessment', 
       'repair_cost_analysis',
       'insurance_claim_strategy',
       'contractor_market_intelligence',
       'risk_mitigation_plan'
   ];
   
   requiredTables.forEach(table => {
       if (!analysis.professional_tables[table]) {
           console.warn(`Missing table: ${table}`);
       }
   });
   ```

## Performance Optimization

### Data Efficiency

- Pre-validate input data before API calls
- Cache frequently used styling configurations
- Implement request deduplication for similar reports

### Template Optimization

- Minimize template complexity for faster rendering
- Use conditional rendering for optional sections
- Optimize images and styling for PDF generation

### Error Recovery

- Implement exponential backoff for retries
- Provide fallback templates for critical failures
- Log detailed error information for debugging

## Support and Maintenance

### Regular Updates

- Review and update risk assessment criteria quarterly
- Update cost estimates based on market conditions
- Refresh contractor intelligence and availability data

### Performance Monitoring

- Track PDF generation success rates
- Monitor average generation times
- Collect user feedback on report quality

This optimized system provides a robust, professional PDF generation workflow that enhances the value proposition for Hayden Claims Group while providing clients with comprehensive, actionable storm damage intelligence.
