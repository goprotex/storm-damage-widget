/**
 * Step 6: PDF Generation - CraftMyPDF Integration
 * Professional Storm Damage Report Generator
 */

class StormReportPDFGenerator {
    constructor(config) {
        this.apiKey = config.apiKey;
        this.templateId = config.templateId;
        this.apiUrl = 'https://api.craftmypdf.com/v1/create';
        this.companyInfo = {
            name: "Hayden Claims Group",
            phone: "(469) 434-2121",
            website: "haydenclaim.com",
            logoUrl: "https://haydenclaim.com/logo.png"
        };
    }

    /**
     * Main PDF generation function
     * @param {Object} step5Analysis - Complete analysis from Step 5 with tables
     * @param {Object} formData - Original form submission from Step 1
     * @returns {Promise<Object>} PDF generation result
     */
    async generateProfessionalReport(step5Analysis, formData) {
        try {
            // Validate input data
            this.validateInputData(step5Analysis, formData);
            
            // Parse analysis data if needed
            const analysis = typeof step5Analysis === 'string' 
                ? JSON.parse(step5Analysis) 
                : step5Analysis;

            // Prepare comprehensive template data
            const templateData = this.buildTemplateData(analysis, formData);
            
            // Generate PDF via CraftMyPDF API
            const pdfResult = await this.callCraftMyPDFAPI(templateData);
            
            // Return success response
            return {
                success: true,
                reportId: templateData.reportMetadata.analysisId,
                pdfUrl: pdfResult.file,
                downloadUrl: pdfResult.file,
                expiresAt: new Date(Date.now() + (24 * 60 * 60 * 1000)).toISOString(),
                generatedAt: new Date().toISOString(),
                reportSummary: {
                    propertyAddress: templateData.propertyInfo.fullAddress,
                    riskLevel: analysis.analysis_summary?.overall_damage_likelihood || 'Not Assessed',
                    totalTables: Object.keys(analysis.pdf_tables || {}).length
                }
            };
            
        } catch (error) {
            return {
                success: false,
                error: error.message,
                errorCode: this.getErrorCode(error),
                timestamp: new Date().toISOString()
            };
        }
    }

    /**
     * Build comprehensive template data structure
     */
    buildTemplateData(analysis, formData) {
        const reportId = this.generateUniqueReportId();
        
        return {
            // Report metadata
            reportMetadata: {
                analysisId: reportId,
                generatedDate: new Date().toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long', 
                    day: 'numeric'
                }),
                generatedTime: new Date().toLocaleTimeString('en-US'),
                reportVersion: '1.0',
                reportType: 'Storm Damage Assessment'
            },

            // Company branding
            companyBranding: this.companyInfo,

            // Property information
            propertyInfo: {
                address: formData.property_address || 'Property Address Not Provided',
                city: formData.city || '',
                state: formData.state || '',
                zipCode: formData.zip || '',
                fullAddress: this.formatFullAddress(formData),
                propertyType: formData.property_type || 'Residential',
                yearBuilt: formData.year_built || 'Unknown'
            },

            // Executive summary from Step 5
            executiveSummary: {
                overallRisk: analysis.analysis_summary?.overall_damage_likelihood || 'Not Assessed',
                primaryConcerns: analysis.analysis_summary?.primary_risk_factors || [],
                keyFindings: analysis.analysis_summary?.key_findings || [],
                haydensAdvantage: analysis.analysis_summary?.hayden_competitive_advantage || '',
                criticalPriority: analysis.analysis_summary?.highest_risk_event || ''
            },

            // All 6 professional tables from Step 5
            professionalTables: {
                stormDamageSummary: analysis.pdf_tables?.storm_damage_summary_table || this.getEmptyTable('Storm Damage Summary'),
                propertyVulnerability: analysis.pdf_tables?.property_vulnerability_table || this.getEmptyTable('Property Vulnerability'),
                repairCostBreakdown: analysis.pdf_tables?.repair_cost_breakdown_table || this.getEmptyTable('Repair Cost Breakdown'),
                insuranceCoverage: analysis.pdf_tables?.insurance_coverage_analysis_table || this.getEmptyTable('Insurance Coverage'),
                contractorMarket: analysis.pdf_tables?.contractor_market_analysis_table || this.getEmptyTable('Contractor Market'),
                riskMitigation: analysis.pdf_tables?.risk_mitigation_opportunities_table || this.getEmptyTable('Risk Mitigation')
            },

            // Detailed analysis sections
            detailedAnalysis: {
                propertyIntelligence: analysis.property_intelligence || {},
                stormCorrelation: analysis.storm_correlation || {},
                damageAssessment: analysis.damage_assessment || {},
                emergencyResponse: analysis.emergency_response || {},
                insuranceStrategy: analysis.insurance_strategy || {},
                legalRiskAssessment: analysis.legal_risk_assessment || {},
                technologyRecommendations: analysis.technology_recommendations || {},
                marketIntelligence: analysis.market_intelligence || {},
                haydensAdvantage: analysis.hayden_advantage || {}
            },

            // Storm imagery intelligence (from Step 3.5)
            stormImagery: {
                featuredImages: analysis.storm_imagery?.featured_images || {},
                visualEvidence: analysis.storm_imagery?.visual_evidence_summary || {},
                analysisContext: analysis.storm_imagery?.analysis_summary || {}
            },

            // Emergency status indicators
            emergencyStatus: {
                habitabilityStatus: analysis.emergency_response?.habitability_assessment || 'Unknown',
                immediateActions: analysis.emergency_response?.immediate_actions || [],
                timeSensitivePriorities: analysis.emergency_response?.time_sensitive_priorities || [],
                safetyLevel: this.determinePropertySafety(analysis.emergency_response)
            },

            // Risk assessment colors and styling
            riskStyling: this.generateRiskStyling(analysis),

            // Report statistics
            reportStats: {
                totalSections: 9,
                totalTables: 6,
                dataPoints: this.countDataPoints(analysis),
                confidenceLevel: 'High'
            }
        };
    }

    /**
     * Call CraftMyPDF API with retry logic
     */
    async callCraftMyPDFAPI(templateData) {
        const maxRetries = 3;
        let lastError;

        for (let attempt = 1; attempt <= maxRetries; attempt++) {
            try {
                const response = await fetch(this.apiUrl, {
                    method: 'POST',
                    headers: {
                        'X-API-KEY': this.apiKey,
                        'Content-Type': 'application/json',
                        'User-Agent': 'Hayden-Claims-PDF-Generator/1.0'
                    },
                    body: JSON.stringify({
                        template_id: this.templateId,
                        data: templateData,
                        export_type: 'pdf',
                        expiration: 86400, // 24 hours
                        output_file: `storm-report-${templateData.reportMetadata.analysisId}.pdf`,
                        async: false // Synchronous generation
                    })
                });

                if (!response.ok) {
                    const errorData = await response.json().catch(() => ({}));
                    throw new Error(`CraftMyPDF API Error (${response.status}): ${errorData.message || response.statusText}`);
                }

                return await response.json();

            } catch (error) {
                lastError = error;
                if (attempt < maxRetries) {
                    await this.delay(1000 * attempt); // Progressive delay
                }
            }
        }

        throw new Error(`PDF generation failed after ${maxRetries} attempts: ${lastError.message}`);
    }

    /**
     * Utility functions
     */
    validateInputData(analysis, formData) {
        if (!analysis) {
            throw new Error('Step 5 analysis data is required');
        }
        if (!formData) {
            throw new Error('Form data is required');
        }
    }

    formatFullAddress(formData) {
        const parts = [
            formData.property_address,
            formData.city,
            formData.state,
            formData.zip
        ].filter(Boolean);
        
        return parts.join(', ') || 'Address Not Available';
    }

    generateUniqueReportId() {
        const timestamp = Date.now();
        const random = Math.random().toString(36).substring(2, 8).toUpperCase();
        return `HCG-${timestamp}-${random}`;
    }

    getEmptyTable(title) {
        return {
            title: title,
            headers: ['Category', 'Details', 'Status'],
            rows: [['No data available', 'Analysis pending', 'In Progress']]
        };
    }

    determinePropertySafety(emergencyResponse) {
        if (!emergencyResponse) return 'Unknown';
        
        const habitability = emergencyResponse.habitability_assessment;
        if (habitability === 'uninhabitable') return 'Unsafe';
        if (habitability === 'habitable') return 'Safe';
        return 'Caution Required';
    }

    generateRiskStyling(analysis) {
        const overallRisk = analysis.analysis_summary?.overall_damage_likelihood?.toLowerCase();
        
        return {
            primaryColor: this.getRiskColor(overallRisk),
            riskLevel: overallRisk || 'unknown',
            alertClass: this.getRiskAlertClass(overallRisk)
        };
    }

    getRiskColor(riskLevel) {
        const colorMap = {
            'high': '#dc3545',
            'medium': '#fd7e14', 
            'low': '#28a745',
            'very high': '#8b0000',
            'very low': '#20c997'
        };
        return colorMap[riskLevel] || '#6c757d';
    }

    getRiskAlertClass(riskLevel) {
        const classMap = {
            'high': 'alert-danger',
            'medium': 'alert-warning',
            'low': 'alert-success',
            'very high': 'alert-critical',
            'very low': 'alert-minimal'
        };
        return classMap[riskLevel] || 'alert-secondary';
    }

    countDataPoints(analysis) {
        let count = 0;
        
        // Count table rows
        if (analysis.pdf_tables) {
            Object.values(analysis.pdf_tables).forEach(table => {
                if (table.rows) count += table.rows.length;
            });
        }
        
        // Count analysis sections
        const sections = [
            'property_intelligence', 'storm_correlation', 'damage_assessment',
            'emergency_response', 'insurance_strategy', 'legal_risk_assessment'
        ];
        
        sections.forEach(section => {
            if (analysis[section]) {
                count += Object.keys(analysis[section]).length;
            }
        });
        
        return count;
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

// Export for various environments
if (typeof module !== 'undefined' && module.exports) {
    module.exports = StormReportPDFGenerator;
}

// Global function for direct use
function generateStormDamageReport(step5Analysis, formData, config) {
    const generator = new StormReportPDFGenerator(config);
    return generator.generateProfessionalReport(step5Analysis, formData);
}

// Zapier-ready function
function zapierGeneratePDF(inputData) {
    const config = {
        apiKey: inputData.craftmypdf_api_key,
        templateId: inputData.template_id
    };
    
    const generator = new StormReportPDFGenerator(config);
    return generator.generateProfessionalReport(
        inputData.step5_analysis,
        inputData.form_data
    );
}