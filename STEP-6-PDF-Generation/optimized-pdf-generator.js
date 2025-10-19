/**
 * Optimized PDF Generator for Storm Damage Reports
 * Enhanced CraftMyPDF integration with better error handling and data mapping
 */

class OptimizedStormReportGenerator {
    constructor(config) {
        this.apiKey = config.apiKey;
        this.templateId = config.templateId;
        this.apiUrl = 'https://api.craftmypdf.com/v1/create';
        this.maxRetries = 3;
        this.retryDelay = 2000;
        
        // Enhanced company branding
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

        // Enhanced styling configuration
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

    /**
     * Main PDF generation method with enhanced error handling
     */
    async generateProfessionalReport(optimizedAnalysis, formData) {
        try {
            // Validate inputs
            this.validateInputs(optimizedAnalysis, formData);
            
            // Parse analysis if needed
            const analysis = typeof optimizedAnalysis === 'string' 
                ? JSON.parse(optimizedAnalysis) 
                : optimizedAnalysis;

            // Build optimized template data
            const templateData = this.buildOptimizedTemplateData(analysis, formData);
            
            // Generate PDF with retry logic
            const pdfResult = await this.generatePDFWithRetry(templateData);
            
            // Return enhanced success response
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
                },
                nextSteps: {
                    recommendedActions: analysis.recommendations?.next_steps?.slice(0, 3) || [],
                    emergencyPriority: analysis.emergency_response?.habitability_status,
                    insuranceStrategy: analysis.recommendations?.insurance_claim_timeline
                }
            };
            
        } catch (error) {
            console.error('PDF Generation Error:', error);
            return {
                success: false,
                error: {
                    message: error.message,
                    code: this.getErrorCode(error),
                    timestamp: new Date().toISOString(),
                    retryable: this.isRetryableError(error)
                },
                fallbackOptions: {
                    basicReportAvailable: true,
                    contactSupport: this.companyInfo.phone,
                    expectedResolution: "Within 2 hours"
                }
            };
        }
    }

    /**
     * Build optimized template data for CraftMyPDF
     */
    buildOptimizedTemplateData(analysis, formData) {
        const reportId = this.generateReportId();
        const currentDate = new Date();
        
        return {
            // Report identification
            report_id: reportId,
            generated_date: currentDate.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }),
            generated_time: currentDate.toLocaleTimeString('en-US'),
            
            // Enhanced company branding
            company: {
                ...this.companyInfo,
                report_header: `${this.companyInfo.name} - Professional Storm Damage Assessment`,
                footer_text: `Confidential Report - Generated ${currentDate.toLocaleDateString()}`
            },
            
            // Styling configuration for template
            styling: this.styling,
            
            // Property information (flattened for easier template access)
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
            
            // Executive summary (optimized for PDF layout)
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
            
            // Professional tables (with enhanced formatting)
            tables: this.formatTablesForPDF(analysis.professional_tables),
            
            // Emergency response (simplified for quick reference)
            emergency: {
                habitability: analysis.emergency_response?.habitability_status || 'Under Assessment',
                habitability_color: this.getHabitabilityColor(analysis.emergency_response?.habitability_status),
                immediate_actions: analysis.emergency_response?.immediate_priorities || [],
                safety_level: this.determineSafetyLevel(analysis.emergency_response),
                emergency_contacts: this.getEmergencyContacts()
            },
            
            // Recommendations (structured for action items)
            recommendations: {
                next_steps: this.formatNextSteps(analysis.recommendations?.next_steps),
                inspections: this.formatInspections(analysis.recommendations?.professional_inspections),
                documentation: analysis.recommendations?.documentation_priorities || [],
                insurance_timeline: analysis.recommendations?.insurance_claim_timeline || 'File claim within 60 days of discovery',
                hayden_coordination: "Hayden Claims Group can coordinate all recommended inspections and contractor services"
            },
            
            // Business intelligence (Hayden value proposition)
            hayden_value: {
                value_proposition: analysis.business_intelligence?.hayden_value_proposition || '',
                competitive_advantages: analysis.business_intelligence?.competitive_advantages || [],
                potential_savings: analysis.business_intelligence?.potential_savings || 'Significant savings on claim settlement',
                success_probability: analysis.business_intelligence?.success_probability_with_hayden || 'High',
                risk_without_help: analysis.business_intelligence?.risk_without_professional_help || 'Substantial risk of claim underpayment'
            },
            
            // Risk assessment summary
            risk_summary: {
                vulnerability_score: analysis.risk_assessment?.property_vulnerability_score || 5,
                vulnerability_level: this.getVulnerabilityLevel(analysis.risk_assessment?.property_vulnerability_score),
                storm_events_count: analysis.risk_assessment?.storm_impact_events?.length || 0,
                cumulative_factors: analysis.risk_assessment?.cumulative_risk_factors || [],
                data_quality: analysis.technical_appendix?.data_quality_score || 8
            },
            
            // Report metadata
            metadata: {
                analysis_methodology: analysis.technical_appendix?.analysis_methodology || 'Comprehensive multi-source storm data analysis',
                data_sources: analysis.report_metadata?.data_sources_analyzed || 5,
                limitations: analysis.technical_appendix?.limitations || [],
                update_recommendation: analysis.technical_appendix?.recommended_updates || 'Annual review recommended',
                report_version: '2.0 - Optimized for Professional Use'
            }
        };
    }

    /**
     * Format tables specifically for PDF rendering
     */
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
                    total_rows: table.data_rows.length,
                    has_insights: (table.key_insights && table.key_insights.length > 0),
                    // Special formatting for specific tables
                    ...this.getTableSpecificFormatting(tableKey, table)
                };
            }
        });
        
        return formattedTables;
    }

    /**
     * Get table-specific formatting
     */
    getTableSpecificFormatting(tableKey, table) {
        switch(tableKey) {
            case 'repair_cost_analysis':
                return {
                    show_totals: true,
                    total_estimate: table.total_estimate_range || 'Estimate Pending',
                    highlight_totals: true
                };
            case 'insurance_claim_strategy':
                return {
                    claim_probability: table.claim_success_probability || 'Good',
                    highlight_strategy: true
                };
            case 'contractor_market_intelligence':
                return {
                    market_conditions: table.market_conditions || 'Normal',
                    show_market_indicator: true
                };
            default:
                return {};
        }
    }

    /**
     * Generate PDF with retry logic
     */
    async generatePDFWithRetry(templateData) {
        let lastError;
        
        for (let attempt = 1; attempt <= this.maxRetries; attempt++) {
            try {
                const response = await fetch(this.apiUrl, {
                    method: 'POST',
                    headers: {
                        'X-API-KEY': this.apiKey,
                        'Content-Type': 'application/json',
                        'User-Agent': 'Hayden-Claims-PDF-Generator/2.0'
                    },
                    body: JSON.stringify({
                        template_id: this.templateId,
                        data: templateData,
                        export_type: 'pdf',
                        expiration: 86400, // 24 hours
                        output_file: `hayden-storm-report-${templateData.report_id}.pdf`,
                        async: false,
                        load_data_from: 'json',
                        webhook_url: null,
                        compression: 'medium',
                        orientation: 'portrait',
                        format: 'letter'
                    })
                });

                if (!response.ok) {
                    const errorData = await response.json().catch(() => ({}));
                    throw new Error(`CraftMyPDF API Error (${response.status}): ${errorData.message || response.statusText}`);
                }

                return await response.json();

            } catch (error) {
                lastError = error;
                console.log(`PDF generation attempt ${attempt} failed:`, error.message);
                
                if (attempt < this.maxRetries) {
                    await this.delay(this.retryDelay * attempt);
                }
            }
        }

        throw new Error(`PDF generation failed after ${this.maxRetries} attempts: ${lastError.message}`);
    }

    /**
     * Utility methods
     */
    validateInputs(analysis, formData) {
        if (!analysis) {
            throw new Error('Analysis data is required for PDF generation');
        }
        if (!formData) {
            throw new Error('Form data is required for PDF generation');
        }
        
        // Validate required analysis fields
        const requiredFields = ['executive_summary', 'professional_tables'];
        requiredFields.forEach(field => {
            if (!analysis[field]) {
                throw new Error(`Missing required analysis field: ${field}`);
            }
        });
    }

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

    getVulnerabilityLevel(score) {
        if (!score) return 'Unknown';
        if (score >= 8) return 'Very High';
        if (score >= 6) return 'High';
        if (score >= 4) return 'Moderate';
        if (score >= 2) return 'Low';
        return 'Very Low';
    }

    formatNextSteps(nextSteps) {
        if (!nextSteps || !Array.isArray(nextSteps)) return [];
        
        return nextSteps.map(step => ({
            action: step.action || 'Action needed',
            timeline: step.timeline || 'ASAP',
            priority: step.priority || 'medium',
            priority_color: this.getPriorityColor(step.priority),
            responsible: step.responsible_party || 'Property owner',
            cost: step.estimated_cost || 'TBD'
        }));
    }

    formatInspections(inspections) {
        if (!inspections || !Array.isArray(inspections)) return [];
        
        return inspections.map(inspection => ({
            type: inspection.inspection_type || 'General inspection',
            urgency: inspection.urgency || 'routine',
            urgency_color: this.getUrgencyColor(inspection.urgency),
            purpose: inspection.purpose || 'Assessment needed',
            cost: inspection.estimated_cost || 'Quote required',
            hayden_coordination: inspection.hayden_can_coordinate || false
        }));
    }

    getPriorityColor(priority) {
        const colorMap = {
            'critical': this.styling.dangerColor,
            'high': '#ff6b35',
            'medium': this.styling.warningColor,
            'low': this.styling.successColor
        };
        return colorMap[priority] || this.styling.mediumGray;
    }

    getUrgencyColor(urgency) {
        const colorMap = {
            'immediate': this.styling.dangerColor,
            'within_week': this.styling.warningColor,
            'within_month': '#17a2b8',
            'routine': this.styling.successColor
        };
        return colorMap[urgency] || this.styling.mediumGray;
    }

    getEmergencyContacts() {
        return [
            { type: 'Emergency Services', number: '911' },
            { type: 'Hayden Claims Group', number: this.companyInfo.phone },
            { type: 'Insurance Company', number: 'Your carrier number' }
        ];
    }

    getErrorCode(error) {
        if (error.message.includes('API Error')) return 'API_ERROR';
        if (error.message.includes('validation')) return 'VALIDATION_ERROR';
        if (error.message.includes('timeout')) return 'TIMEOUT_ERROR';
        if (error.message.includes('network')) return 'NETWORK_ERROR';
        return 'UNKNOWN_ERROR';
    }

    isRetryableError(error) {
        const retryableErrors = ['TIMEOUT_ERROR', 'NETWORK_ERROR', 'API_ERROR'];
        return retryableErrors.includes(this.getErrorCode(error));
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Export for various environments
if (typeof module !== 'undefined' && module.exports) {
    module.exports = OptimizedStormReportGenerator;
}

// Global function for direct use
function generateOptimizedStormReport(analysisData, formData, config) {
    const generator = new OptimizedStormReportGenerator(config);
    return generator.generateProfessionalReport(analysisData, formData);
}

// Zapier-ready function with enhanced error handling
function zapierOptimizedPDFGeneration(inputData) {
    const config = {
        apiKey: inputData.craftmypdf_api_key,
        templateId: inputData.template_id
    };
    
    const generator = new OptimizedStormReportGenerator(config);
    
    return generator.generateProfessionalReport(
        inputData.optimized_analysis,
        inputData.form_data
    ).then(result => {
        // Return Zapier-friendly output
        return {
            success: result.success,
            pdf_url: result.pdfDetails?.downloadUrl || null,
            report_id: result.reportMetadata?.reportId || null,
            error_message: result.error?.message || null,
            next_steps: result.nextSteps || {},
            report_summary: result.reportSummary || {}
        };
    });
}