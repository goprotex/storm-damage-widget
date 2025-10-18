# Step 6: CraftMyPDF Integration - Professional PDF Generation

## Overview

This step converts the comprehensive analysis from Step 5 into a professional PDF report using CraftMyPDF API integration. The system receives structured data with 6 professional tables and generates client-ready documentation.

## Implementation Files

### 1. PDF Generation Script (`pdf-generator.js`)

```javascript
/**
 * CraftMyPDF Integration for Storm Damage Reports
 * Transforms Step 5 analysis into professional PDF reports
 */

class StormReportPDFGenerator {
    constructor(apiKey, templateId) {
        this.apiKey = apiKey;
        this.templateId = templateId;
        this.apiUrl = 'https://api.craftmypdf.com/v1/create';
    }

    /**
     * Generate PDF from Step 5 analysis data
     * @param {Object} analysisData - Complete GPT-5 analysis with tables
     * @param {Object} propertyInfo - Original form submission data
     * @returns {Promise<Object>} PDF generation result
     */
    async generateStormReport(analysisData, propertyInfo) {
        try {
            // Parse the JSON response from Step 5
            const analysis = typeof analysisData === 'string' 
                ? JSON.parse(analysisData) 
                : analysisData;

            // Prepare template data
            const templateData = this.prepareTemplateData(analysis, propertyInfo);
            
            // Generate PDF
            const pdfResult = await this.callCraftMyPDF(templateData);
            
            return {
                success: true,
                pdfUrl: pdfResult.file,
                downloadUrl: pdfResult.file,
                reportId: this.generateReportId(),
                generatedAt: new Date().toISOString()
            };
            
        } catch (error) {
            return {
                success: false,
                error: error.message,
                timestamp: new Date().toISOString()
            };
        }
    }

    /**
     * Prepare data for PDF template
     */
    prepareTemplateData(analysis, propertyInfo) {
        return {
            // Report metadata
            current_date: new Date().toLocaleDateString(),
            analysis_id: this.generateReportId(),
            
            // Company branding
            company: {
                name: "Hayden Claims Group",
                phone: "(469) 434-2121",
                website: "haydenclaim.com",
                logo_url: "https://haydenclaim.com/logo.png"
            },
            
            // Property information
            property: {
                address: propertyInfo.property_address || 'Property Address Not Provided',
                city: propertyInfo.city || '',
                state: propertyInfo.state || '',
                zip: propertyInfo.zip || ''
            },
            
            // Analysis summary (from Step 5)
            analysis_summary: analysis.analysis_summary || {},
            
            // Professional tables (from Step 5)
            pdf_tables: analysis.pdf_tables || {},
            
            // Detailed sections
            property_intelligence: analysis.property_intelligence || {},
            storm_correlation: analysis.storm_correlation || {},
            damage_assessment: analysis.damage_assessment || {},
            emergency_response: analysis.emergency_response || {},
            insurance_strategy: analysis.insurance_strategy || {},
            legal_risk_assessment: analysis.legal_risk_assessment || {},
            technology_recommendations: analysis.technology_recommendations || {},
            market_intelligence: analysis.market_intelligence || {},
            
            // Business intelligence
            hayden_advantage: analysis.hayden_advantage || {}
        };
    }

    /**
     * Call CraftMyPDF API
     */
    async callCraftMyPDF(templateData) {
        const response = await fetch(this.apiUrl, {
            method: 'POST',
            headers: {
                'X-API-KEY': this.apiKey,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                template_id: this.templateId,
                data: templateData,
                export_type: 'pdf',
                expiration: 3600, // 1 hour expiration
                output_file: `storm-report-${this.generateReportId()}.pdf`
            })
        });

        if (!response.ok) {
            throw new Error(`CraftMyPDF API error: ${response.status} ${response.statusText}`);
        }

        return await response.json();
    }

    /**
     * Generate unique report ID
     */
    generateReportId() {
        const timestamp = Date.now();
        const random = Math.random().toString(36).substring(2, 8);
        return `HCG-${timestamp}-${random}`;
    }
}

// Export for use in automation workflows
if (typeof module !== 'undefined' && module.exports) {
    module.exports = StormReportPDFGenerator;
}

// Global function for direct integration
function generateStormDamageReport(analysisData, propertyInfo, apiKey, templateId) {
    const generator = new StormReportPDFGenerator(apiKey, templateId);
    return generator.generateStormReport(analysisData, propertyInfo);
}
```

### 2. Zapier Integration (`zapier-pdf-step.js`)

```javascript
/**
 * Zapier Integration for Step 6 - PDF Generation
 * Connects to CraftMyPDF for professional report generation
 */

// Zapier Code Step Implementation
const inputData = inputData || {};

// Extract data from previous steps
const formData = inputData.step1_form_data || {};
const analysisData = inputData.step5_analysis || {};

// CraftMyPDF Configuration
const CRAFTMYPDF_API_KEY = 'your_craftmypdf_api_key_here';
const TEMPLATE_ID = 'your_storm_report_template_id_here';

/**
 * Generate PDF Report
 */
async function generatePDFReport() {
    try {
        // Parse analysis data if it's a string
        const analysis = typeof analysisData === 'string' 
            ? JSON.parse(analysisData) 
            : analysisData;

        // Prepare template data
        const templateData = {
            // Report metadata
            current_date: new Date().toLocaleDateString(),
            analysis_id: generateReportId(),
            
            // Property information
            property_address: formData.property_address || 'Address Not Provided',
            property_city: formData.city || '',
            property_state: formData.state || '',
            property_zip: formData.zip || '',
            
            // Company branding
            company_name: "Hayden Claims Group",
            company_phone: "(469) 434-2121",
            company_website: "haydenclaim.com",
            
            // Analysis results - all tables and sections from Step 5
            ...analysis
        };

        // Call CraftMyPDF API
        const response = await fetch('https://api.craftmypdf.com/v1/create', {
            method: 'POST',
            headers: {
                'X-API-KEY': CRAFTMYPDF_API_KEY,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                template_id: TEMPLATE_ID,
                data: templateData,
                export_type: 'pdf',
                expiration: 3600
            })
        });

        const result = await response.json();
        
        if (!response.ok) {
            throw new Error(`PDF generation failed: ${result.message}`);
        }

        return {
            success: true,
            pdf_url: result.file,
            download_url: result.file,
            report_id: templateData.analysis_id,
            generated_at: new Date().toISOString(),
            expires_at: new Date(Date.now() + 3600000).toISOString() // 1 hour
        };

    } catch (error) {
        return {
            success: false,
            error: error.message,
            timestamp: new Date().toISOString()
        };
    }
}

/**
 * Generate unique report ID
 */
function generateReportId() {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 8);
    return `HCG-${timestamp}-${random}`;
}

// Execute PDF generation
const pdfResult = await generatePDFReport();

// Return result for next Zapier step
output = [{
    pdf_generation_result: pdfResult,
    report_url: pdfResult.pdf_url || null,
    success: pdfResult.success,
    error_message: pdfResult.error || null
}];
```

### 3. Configuration File (`pdf-config.json`)

```json
{
  "craftmypdf": {
    "api_endpoint": "https://api.craftmypdf.com/v1/create",
    "template_settings": {
      "paper_size": "letter",
      "orientation": "portrait",
      "margins": {
        "top": "0.75in",
        "right": "0.75in",
        "bottom": "0.75in",
        "left": "0.75in"
      }
    },
    "export_options": {
      "format": "pdf",
      "quality": "high",
      "expiration_hours": 24
    },
    "branding": {
      "company_name": "Hayden Claims Group",
      "phone": "(469) 434-2121",
      "website": "haydenclaim.com",
      "logo_url": "https://haydenclaim.com/logo.png",
      "primary_color": "#bfa76f",
      "secondary_color": "#2c3e50"
    }
  },
  "report_structure": {
    "sections": [
      "cover_page",
      "executive_summary", 
      "storm_damage_summary_table",
      "property_vulnerability_table",
      "repair_cost_breakdown_table",
      "insurance_coverage_analysis_table",
      "contractor_market_analysis_table",
      "risk_mitigation_opportunities_table",
      "emergency_response_section",
      "technology_recommendations",
      "legal_risk_assessment",
      "appendix"
    ],
    "table_styling": {
      "header_color": "#bfa76f",
      "header_text_color": "#ffffff",
      "row_alternating": true,
      "border_style": "1px solid #ddd",
      "font_size": "12px"
    }
  },
  "data_mapping": {
    "input_sources": {
      "form_data": "step_1_output",
      "property_research": "step_3_output", 
      "storm_data": "step_4_output",
      "gpt5_analysis": "step_5_output"
    },
    "required_fields": [
      "analysis_summary",
      "pdf_tables",
      "property_intelligence",
      "emergency_response",
      "insurance_strategy"
    ]
  }
}
```

## Integration Instructions

### Step 1: CraftMyPDF Template Setup
1. Create account at CraftMyPDF.com
2. Upload the HTML template (see `pdf-template-guide.md`)
3. Configure template settings using the CSS styling
4. Test template with sample data
5. Note the Template ID for integration

### Step 2: API Integration
1. Add CraftMyPDF API key to your environment
2. Configure the `pdf-generator.js` with your credentials
3. Test API connection with sample data
4. Implement error handling and retry logic

### Step 3: Zapier Workflow Integration
1. Add the Zapier code step after Step 5
2. Configure input data mapping from previous steps
3. Add error handling and notification steps
4. Test complete workflow end-to-end

### Step 4: Quality Assurance
1. Generate test reports with various data scenarios
2. Verify all 6 tables render correctly
3. Test responsive design across different PDF viewers
4. Validate professional formatting and branding

This implementation provides a complete PDF generation system that transforms the comprehensive analysis from Step 5 into professional, client-ready storm damage assessment reports.