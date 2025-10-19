# 🚀 ZAPIER IMPLEMENTATION GUIDE

## Copy & Paste Instructions for Optimized System

---

## 📋 **STEP 1: UPDATE YOUR GPT ANALYSIS PROMPT**

**Replace your current GPT prompt with this:**

```text
You are an expert storm damage analyst and public adjuster with deep expertise in property insurance claims, construction, and risk assessment. Generate a comprehensive analysis that will be used to create a professional PDF report for property owners.

## Input Data Analysis
You will receive:
1. **Property Information**: Address, construction details, ownership info
2. **Storm Event Data**: Historical storm impacts, hail reports, wind damage events  
3. **Property Research**: Building characteristics, vulnerability factors
4. **Storm Imagery**: Weather radar, satellite data, damage photos if available

## Required Output Structure
Generate your analysis following this EXACT JSON schema for optimal PDF generation:

{
  "report_metadata": {
    "analysis_id": "Generate unique ID like 'HCG-ANALYSIS-2024-001'",
    "confidence_level": "high|medium|low - based on data quality",
    "generated_timestamp": "Current ISO timestamp",
    "data_sources_analyzed": "Number of sources analyzed (integer)"
  },

  "executive_summary": {
    "overall_risk_level": "critical|high|moderate|low|minimal",
    "damage_probability": "very_likely|likely|possible|unlikely|very_unlikely", 
    "primary_findings": [
      "3-5 key bullet points of most important discoveries",
      "Focus on actionable insights that drive decisions",
      "Include specific damage indicators or risk factors found"
    ],
    "critical_actions": [
      "1-4 most urgent actions needed immediately",
      "Emergency safety measures if applicable",
      "Time-sensitive opportunities or risks"
    ],
    "hayden_competitive_advantage": "Clear 2-3 sentence statement of how Hayden Claims Group provides superior value for this specific situation",
    "estimated_claim_value_range": "Range like '$15,000 - $45,000' or 'Minimal claim potential' or 'Substantial claim likely'"
  },

  "risk_assessment": {
    "property_vulnerability_score": "Number 0-10, where 10 = extremely vulnerable",
    "storm_impact_events": [
      {
        "event_date": "YYYY-MM-DD",
        "storm_type": "hail|wind|tornado|severe_thunderstorm|hurricane",
        "impact_severity": "severe|moderate|light|minimal",
        "damage_potential": "high|moderate|low|negligible",
        "distance_from_property": "Distance with units like '0.2 miles SE'",
        "storm_intensity": "Specific details like '2.5 inch hail' or '75 mph winds'",
        "affected_systems": ["List of building components at risk"]
      }
    ],
    "cumulative_risk_factors": [
      "Factors that compound risk like age, materials, exposure, etc."
    ]
  },

  "professional_tables": {
    "storm_risk_summary": {
      "title": "Storm Risk Assessment Summary",
      "subtitle": "Analysis of storm events and damage probability",
      "headers": ["Storm Event", "Date", "Severity", "Distance", "Damage Risk", "Confidence"],
      "data_rows": [
        ["Event description", "Date", "Severity level", "Distance", "Risk level", "Confidence %"]
      ],
      "key_insights": [
        "2-3 bullet points highlighting most important findings from this table"
      ]
    },

    "property_damage_assessment": {
      "title": "Property Vulnerability & Damage Assessment", 
      "subtitle": "Component-by-component vulnerability analysis",
      "headers": ["Property Component", "Vulnerability Level", "Damage Indicators", "Replacement Value", "Priority"],
      "data_rows": [
        ["Roof system", "High/Medium/Low", "Specific signs found", "Cost estimate", "Critical/High/Medium/Low"]
      ],
      "key_insights": [
        "Key takeaways about property condition and vulnerabilities"
      ]
    },

    "repair_cost_analysis": {
      "title": "Repair Cost Analysis & Market Pricing",
      "subtitle": "Detailed cost breakdown with current market conditions",
      "headers": ["Repair Category", "Scope of Work", "Material Cost", "Labor Cost", "Total Estimate", "Market Factors"],
      "data_rows": [
        ["Category like 'Roofing'", "Specific work needed", "$X,XXX", "$X,XXX", "$X,XXX", "Market conditions affecting cost"]
      ],
      "total_estimate_range": "Overall range like '$25,000 - $40,000'",
      "key_insights": [
        "Important cost factors and market conditions"
      ]
    },

    "insurance_claim_strategy": {
      "title": "Insurance Claim Strategy & Coverage Analysis",
      "subtitle": "Optimal approach for insurance claim success",
      "headers": ["Coverage Type", "Policy Limits", "Deductible", "Claim Potential", "Strategy", "Expected Outcome"],
      "data_rows": [
        ["Dwelling", "Coverage amount", "Deductible", "Claim amount", "Approach", "Probability of success"]
      ],
      "claim_success_probability": "High|Medium|Low with brief explanation",
      "key_insights": [
        "Key strategies for maximizing claim success"
      ]
    },

    "contractor_market_intelligence": {
      "title": "Contractor Market Intelligence & Selection",
      "subtitle": "Current market conditions and contractor recommendations",
      "headers": ["Contractor Type", "Availability", "Pricing Level", "Quality Rating", "Recommended Timing", "Hayden Network"],
      "data_rows": [
        ["Roofing", "Limited/Moderate/Good", "High/Normal/Low", "A/B/C rating", "Immediate/Spring/etc", "Yes/No"]
      ],
      "market_conditions": "Brief description of current contractor market",
      "key_insights": [
        "Key contractor market insights and timing recommendations"
      ]
    },

    "risk_mitigation_plan": {
      "title": "Risk Mitigation & Preventive Measures",
      "subtitle": "Strategies to reduce future risk and improve property resilience",
      "headers": ["Mitigation Strategy", "Implementation Cost", "Risk Reduction", "ROI Timeline", "Priority Level", "Hayden Support"],
      "data_rows": [
        ["Strategy description", "Cost estimate", "% risk reduction", "Payback period", "Critical/High/Medium/Low", "How Hayden helps"]
      ],
      "overall_strategy": "Summary of recommended mitigation approach",
      "key_insights": [
        "Most important mitigation opportunities"
      ]
    }
  },

  "emergency_response": {
    "habitability_status": "safe_habitable|caution_required|temporary_relocation|uninhabitable_dangerous",
    "immediate_priorities": [
      "Most urgent actions needed within 24-48 hours",
      "Safety measures and emergency repairs",
      "Documentation and protection priorities"
    ],
    "safety_concerns": [
      "Specific safety issues identified"
    ],
    "emergency_vs_permanent_repairs": "Strategy for emergency stabilization vs permanent repairs",
    "temporary_living_arrangements": "Recommendations if relocation needed"
  },

  "recommendations": {
    "next_steps": [
      {
        "action": "Specific action to take",
        "timeline": "When to do it",
        "priority": "critical|high|medium|low",
        "responsible_party": "Who should do it",
        "estimated_cost": "Cost if applicable"
      }
    ],
    "professional_inspections": [
      {
        "inspection_type": "Type of inspection needed",
        "urgency": "immediate|within_week|within_month|routine", 
        "purpose": "Why this inspection is needed",
        "estimated_cost": "Expected cost",
        "hayden_can_coordinate": true|false
      }
    ],
    "documentation_priorities": [
      "Critical documentation needed for claims and repairs"
    ],
    "insurance_claim_timeline": "Recommended timeline for claim filing and processing"
  },

  "business_intelligence": {
    "hayden_value_proposition": "Specific value Hayden provides for this situation - 2-3 sentences",
    "competitive_advantages": [
      "Specific advantages Hayden provides over competitors",
      "Unique capabilities or resources",
      "Track record or expertise areas"
    ],
    "potential_savings": "How much Hayden can save the client (time and money)",
    "risk_without_professional_help": "Specific risks of proceeding without Hayden",
    "success_probability_with_hayden": "very_high|high|moderate"
  },

  "technical_appendix": {
    "analysis_methodology": "Brief explanation of how analysis was conducted",
    "data_quality_score": "0-10 score for data quality used",
    "limitations": [
      "Known limitations of this analysis"
    ],
    "recommended_updates": "When to update this analysis"
  }
}

## Analysis Instructions

### 1. Executive Summary Focus
- Provide clear, decisive assessment of overall risk and damage probability
- Highlight the most critical findings that drive decision-making
- Emphasize time-sensitive actions and opportunities
- Position Hayden's competitive advantage for this specific situation

### 2. Professional Tables Requirements
- **All 6 tables are required** - ensure each has meaningful data
- Use consistent terminology and formatting across tables
- Include specific cost estimates where possible
- Provide actionable insights for each table
- Ensure data in tables supports executive summary conclusions

### 3. Risk Assessment Principles
- Base vulnerability scores on actual property characteristics and storm history
- Consider cumulative impacts of multiple storm events
- Factor in property age, construction type, maintenance condition
- Account for geographic and microclimate factors

### 4. Emergency Response Assessment
- Prioritize life safety and habitability concerns
- Distinguish between emergency stabilization and permanent repairs
- Consider insurance claim implications of different repair approaches
- Provide clear guidance on immediate actions needed

### 5. Business Intelligence Focus
- Articulate specific value Hayden provides for this situation
- Highlight risks of DIY or inexperienced claim handling
- Demonstrate expertise in storm damage claims
- Position Hayden as the obvious choice for professional representation

## Quality Standards
- All monetary estimates should be realistic and based on current market conditions
- Risk assessments should be conservative but not alarmist
- Recommendations should be prioritized and actionable
- Professional tone throughout while remaining accessible to property owners
- Tables should have consistent formatting and complete data

## Output Format
Return ONLY the JSON object following the exact schema above. No additional text, explanations, or formatting. The JSON will be used directly for PDF generation.

**IMPORTANT**: Your analysis will be used to generate a professional PDF report that represents Hayden Claims Group's expertise. Ensure all content is accurate, professional, and demonstrates the value of professional public adjuster services.
```

---

## 📋 **STEP 2: UPDATE YOUR PDF GENERATOR CODE**

**Replace your current PDF code with this Zapier-ready implementation:**

```javascript
// Input data from previous steps
const formData = inputData.step1_form_data || {};
const optimizedAnalysis = inputData.step5_optimized_analysis || {};

// CraftMyPDF configuration
const CRAFTMYPDF_API_KEY = 'your_craftmypdf_api_key_here'; // Replace with your actual key
const TEMPLATE_ID = 'your_storm_report_template_id_here';   // Replace with your actual template ID

// Optimized Storm Report Generator Class
class OptimizedStormReportGenerator {
    constructor(config) {
        this.apiKey = config.apiKey;
        this.templateId = config.templateId;
        this.apiUrl = 'https://api.craftmypdf.com/v1/create';
        this.maxRetries = 3;
        this.retryDelay = 2000;
        
        this.companyInfo = {
            name: "Hayden Claims Group",
            tagline: "Mother Nature isn't fair but insurance should be",
            phone: "(469) 434-2121",
            email: "office@haydenclaim.com", 
            website: "haydenclaim.com",
            logoUrl: "https://haydenclaim.com/logo.png",
            address: "Austin, Texas",
            license: "TDI License #3378204"
        };

        this.styling = {
            primaryColor: "#bfa76f",
            secondaryColor: "#2c3e50", 
            accentColor: "#343a40",
            successColor: "#28a745",
            warningColor: "#fd7e14",
            dangerColor: "#dc3545",
            lightGray: "#f8f9fa",
            mediumGray: "#6c757d"
        };
    }

    async generateProfessionalReport(optimizedAnalysis, formData) {
        try {
            const analysis = typeof optimizedAnalysis === 'string' 
                ? JSON.parse(optimizedAnalysis) 
                : optimizedAnalysis;

            const templateData = this.buildOptimizedTemplateData(analysis, formData);
            const pdfResult = await this.generatePDFWithRetry(templateData);
            
            return {
                success: true,
                reportMetadata: {
                    reportId: templateData.report_id,
                    analysisId: analysis.report_metadata?.analysis_id,
                    generatedAt: new Date().toISOString(),
                    expiresAt: new Date(Date.now() + (24 * 60 * 60 * 1000)).toISOString()
                },
                pdfDetails: {
                    downloadUrl: pdfResult.file,
                    fileName: `hayden-storm-report-${templateData.report_id}.pdf`,
                    fileSize: pdfResult.file_size || 'Unknown',
                    pages: pdfResult.pages || 'Unknown'
                },
                reportSummary: {
                    propertyAddress: templateData.property.full_address,
                    riskLevel: analysis.executive_summary?.overall_risk_level,
                    claimPotential: analysis.executive_summary?.estimated_claim_value_range,
                    confidenceLevel: analysis.report_metadata?.confidence_level,
                    tablesGenerated: Object.keys(analysis.professional_tables || {}).length,
                    haydensAdvantage: analysis.business_intelligence?.hayden_value_proposition?.substring(0, 100) + "..."
                }
            };
            
        } catch (error) {
            return {
                success: false,
                error: {
                    message: error.message,
                    code: this.getErrorCode(error),
                    timestamp: new Date().toISOString()
                }
            };
        }
    }

    buildOptimizedTemplateData(analysis, formData) {
        const reportId = this.generateReportId();
        const currentDate = new Date();
        
        return {
            report_id: reportId,
            generated_date: currentDate.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }),
            generated_time: currentDate.toLocaleTimeString('en-US'),
            
            company: {
                ...this.companyInfo,
                report_header: `${this.companyInfo.name} - Professional Storm Damage Assessment`,
                footer_text: `Confidential Report - Generated ${currentDate.toLocaleDateString()}`
            },
            
            styling: this.styling,
            
            property: {
                address: formData.property_address || 'Property Address Not Provided',
                city: formData.city || '',
                state: formData.state || '',
                zip: formData.zip || '',
                full_address: this.buildFullAddress(formData),
                property_type: formData.property_type || 'Residential',
                year_built: formData.year_built || 'Unknown',
                contact_name: formData.contact_name || 'Property Owner',
                contact_phone: formData.contact_phone || '',
                contact_email: formData.contact_email || ''
            },
            
            executive_summary: {
                overall_risk: analysis.executive_summary?.overall_risk_level || 'Not Assessed',
                risk_color: this.getRiskColor(analysis.executive_summary?.overall_risk_level),
                damage_probability: analysis.executive_summary?.damage_probability || 'Under Review',
                estimated_value: analysis.executive_summary?.estimated_claim_value_range || 'To Be Determined',
                key_findings: analysis.executive_summary?.primary_findings || [],
                critical_actions: analysis.executive_summary?.critical_actions || [],
                hayden_advantage: analysis.executive_summary?.hayden_competitive_advantage || analysis.business_intelligence?.hayden_value_proposition || '',
                confidence_level: analysis.report_metadata?.confidence_level || 'High'
            },
            
            tables: this.formatTablesForPDF(analysis.professional_tables),
            
            emergency: {
                habitability: analysis.emergency_response?.habitability_status || 'Under Assessment',
                habitability_color: this.getHabitabilityColor(analysis.emergency_response?.habitability_status),
                immediate_actions: analysis.emergency_response?.immediate_priorities || [],
                safety_level: this.determineSafetyLevel(analysis.emergency_response)
            },
            
            hayden_value: {
                value_proposition: analysis.business_intelligence?.hayden_value_proposition || '',
                competitive_advantages: analysis.business_intelligence?.competitive_advantages || [],
                potential_savings: analysis.business_intelligence?.potential_savings || 'Significant savings on claim settlement',
                success_probability: analysis.business_intelligence?.success_probability_with_hayden || 'High'
            }
        };
    }

    formatTablesForPDF(tables) {
        if (!tables) return {};
        
        const formattedTables = {};
        Object.keys(tables).forEach(tableKey => {
            const table = tables[tableKey];
            if (table && table.data_rows) {
                formattedTables[tableKey] = {
                    title: table.title,
                    subtitle: table.subtitle || '',
                    headers: table.headers || [],
                    rows: table.data_rows,
                    insights: table.key_insights || [],
                    total_rows: table.data_rows.length
                };
            }
        });
        return formattedTables;
    }

    async generatePDFWithRetry(templateData) {
        let lastError;
        
        for (let attempt = 1; attempt <= this.maxRetries; attempt++) {
            try {
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
                        expiration: 86400,
                        output_file: `hayden-storm-report-${templateData.report_id}.pdf`
                    })
                });

                if (!response.ok) {
                    const errorData = await response.json().catch(() => ({}));
                    throw new Error(`CraftMyPDF API Error (${response.status}): ${errorData.message || response.statusText}`);
                }

                return await response.json();

            } catch (error) {
                lastError = error;
                if (attempt < this.maxRetries) {
                    await this.delay(this.retryDelay * attempt);
                }
            }
        }

        throw new Error(`PDF generation failed after ${this.maxRetries} attempts: ${lastError.message}`);
    }

    // Utility methods
    buildFullAddress(formData) {
        const parts = [
            formData.property_address,
            formData.city,
            formData.state,
            formData.zip
        ].filter(Boolean);
        return parts.length > 0 ? parts.join(', ') : 'Address Not Available';
    }

    generateReportId() {
        const timestamp = Date.now();
        const random = Math.random().toString(36).substring(2, 8).toUpperCase();
        return `HCG-${timestamp}-${random}`;
    }

    getRiskColor(riskLevel) {
        const colorMap = {
            'critical': this.styling.dangerColor,
            'high': '#ff6b35',
            'moderate': this.styling.warningColor,
            'low': this.styling.successColor,
            'minimal': '#20c997'
        };
        return colorMap[riskLevel?.toLowerCase()] || this.styling.mediumGray;
    }

    getHabitabilityColor(status) {
        const colorMap = {
            'safe_habitable': this.styling.successColor,
            'caution_required': this.styling.warningColor,
            'temporary_relocation': '#ff6b35',
            'uninhabitable_dangerous': this.styling.dangerColor
        };
        return colorMap[status] || this.styling.mediumGray;
    }

    determineSafetyLevel(emergencyResponse) {
        if (!emergencyResponse) return 'Unknown';
        const habitability = emergencyResponse.habitability_status;
        if (habitability === 'uninhabitable_dangerous') return 'Dangerous';
        if (habitability === 'temporary_relocation') return 'Unsafe';
        if (habitability === 'caution_required') return 'Caution';
        if (habitability === 'safe_habitable') return 'Safe';
        return 'Under Assessment';
    }

    getErrorCode(error) {
        if (error.message.includes('API Error')) return 'API_ERROR';
        if (error.message.includes('validation')) return 'VALIDATION_ERROR';
        if (error.message.includes('timeout')) return 'TIMEOUT_ERROR';
        return 'UNKNOWN_ERROR';
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Main execution function
async function generateOptimizedPDF() {
    try {
        const config = {
            apiKey: CRAFTMYPDF_API_KEY,
            templateId: TEMPLATE_ID
        };
        
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

// Execute and return result for Zapier
const pdfResult = await generateOptimizedPDF();
output = [pdfResult];
```

---

## 🎯 **IMPLEMENTATION SUMMARY**

### What You Need to Do

1. **Update GPT Prompt**: Copy the prompt from Step 1 above
2. **Update PDF Code**: Copy the JavaScript from Step 2 above
3. **Replace API Keys**: Update `CRAFTMYPDF_API_KEY` and `TEMPLATE_ID` with your actual values
4. **Test the Workflow**: Run a test to ensure everything works

### Key Changes

- ✅ Simplified but comprehensive schema
- ✅ Better error handling and retry logic
- ✅ Enhanced data mapping for templates
- ✅ Professional styling with Hayden branding
- ✅ Stronger business intelligence focus

### Files Updated

- ❌ **No GitHub updates** - All changes are local to your workspace
- ❌ **No URL changes** - Schema structure is in your files
- ✅ **Ready to implement immediately**

### Ready to copy and paste these into your Zapier workflow! 🚀
