/**
 * HTML PDF Template Builder
 * Converts your optimized analysis data into beautiful HTML for PDF generation
 */

function buildPDFTemplate(analysis, formData) {
    const company = {
        name: "Hayden Claims Group",
        tagline: "Mother Nature isn't fair but insurance should be",
        phone: "(830)-777-9111",
        email: "office@haydenclaim.com",
        website: "haydenclaim.com",
        address: "Austin, Texas",
        license: "TDI License #3378204"
    };
    
    const colors = {
        primary: "#bfa76f",
        secondary: "#2c3e50",
        success: "#28a745",
        warning: "#fd7e14",
        danger: "#dc3545",
        light: "#f8f9fa"
    };
    
    // Get risk color
    const riskColors = {
        'critical': colors.danger,
        'high': '#ff6b35',
        'moderate': colors.warning,
        'low': colors.success
    };
    const riskColor = riskColors[analysis.executive_summary?.overall_risk?.toLowerCase()] || colors.secondary;
    
    // Build property address
    const propertyAddress = formData.property_address 
        ? `${formData.property_address}, ${formData.city || ''}, ${formData.state || ''} ${formData.zip || ''}`.replace(/,\s*,/g, ',').trim()
        : 'Property Address Not Provided';
    
    const reportId = `HCG-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    const generatedDate = new Date().toLocaleDateString('en-US', { 
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
    });
    
    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        @page {
            margin: 0.75in;
            size: letter;
        }
        
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }
        
        body {
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            font-size: 11pt;
            line-height: 1.6;
            color: ${colors.secondary};
        }
        
        .page {
            page-break-after: always;
        }
        
        .no-break {
            page-break-inside: avoid;
        }
        
        /* Header */
        .header {
            background: ${colors.primary};
            color: white;
            padding: 20px;
            margin: -0.75in -0.75in 30px -0.75in;
            text-align: center;
        }
        
        .header h1 {
            font-size: 28pt;
            margin-bottom: 5px;
        }
        
        .header p {
            font-size: 12pt;
            font-style: italic;
        }
        
        /* Headings */
        h1, h2, h3 {
            color: ${colors.secondary};
            margin-top: 20px;
            margin-bottom: 10px;
        }
        
        h1 {
            font-size: 24pt;
            border-bottom: 3px solid ${colors.primary};
            padding-bottom: 10px;
        }
        
        h2 {
            font-size: 18pt;
            border-bottom: 2px solid ${colors.primary};
            padding-bottom: 5px;
        }
        
        h3 {
            font-size: 14pt;
            color: #343a40;
        }
        
        /* Tables */
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 15px 0;
            font-size: 10pt;
        }
        
        th {
            background-color: ${colors.primary};
            color: white;
            padding: 12px 8px;
            text-align: left;
            font-weight: bold;
            border: 1px solid ${colors.primary};
        }
        
        td {
            padding: 10px 8px;
            border: 1px solid #dee2e6;
        }
        
        tr:nth-child(even) {
            background-color: ${colors.light};
        }
        
        /* Lists */
        ul, ol {
            margin: 10px 0 10px 25px;
        }
        
        li {
            margin: 5px 0;
        }
        
        /* Boxes */
        .box {
            border: 2px solid ${colors.primary};
            padding: 15px;
            margin: 15px 0;
            border-radius: 5px;
        }
        
        .risk-box {
            background: ${colors.light};
            border-left: 5px solid ${riskColor};
        }
        
        .emergency-box {
            background: #fff3cd;
            border-left: 5px solid ${colors.warning};
        }
        
        /* Text Styles */
        .text-center { text-align: center; }
        .text-right { text-align: right; }
        .text-large { font-size: 14pt; }
        .text-small { font-size: 9pt; color: #6c757d; }
        
        strong { color: ${colors.secondary}; }
        
        .risk-level {
            display: inline-block;
            padding: 5px 15px;
            background: ${riskColor};
            color: white;
            font-weight: bold;
            border-radius: 3px;
            font-size: 12pt;
        }
        
        /* Footer */
        .footer {
            margin-top: 30px;
            padding-top: 15px;
            border-top: 2px solid ${colors.primary};
            text-align: center;
            font-size: 9pt;
            color: #6c757d;
        }
        
        /* Insights */
        .insights {
            background: ${colors.light};
            border-left: 4px solid ${colors.primary};
            padding: 10px 15px;
            margin: 10px 0;
        }
        
        .insights h4 {
            color: ${colors.primary};
            margin-bottom: 5px;
        }
    </style>
</head>
<body>

<!-- Cover Page -->
<div class="page">
    <div class="header">
        <h1>${company.name}</h1>
        <p>${company.tagline}</p>
    </div>
    
    <div class="text-center" style="margin-top: 100px;">
        <h1 style="border: none;">Storm Damage Intelligence Report</h1>
        <p class="text-large" style="margin: 20px 0;"><strong>${propertyAddress}</strong></p>
        <p style="margin: 10px 0;">Report ID: ${reportId}</p>
        <p style="margin: 10px 0;">Generated: ${generatedDate}</p>
    </div>
    
    <div class="box" style="margin-top: 100px;">
        <h3>Contact Information</h3>
        <p><strong>${company.name}</strong></p>
        <p>Phone: ${company.phone}</p>
        <p>Email: ${company.email}</p>
        <p>Website: ${company.website}</p>
        <p>${company.license}</p>
    </div>
</div>

<!-- Executive Summary -->
<div class="no-break">
    <h1>Executive Summary</h1>
    
    <div class="risk-box box">
        <h3>Overall Risk Assessment</h3>
        <p><strong>Risk Level:</strong> <span class="risk-level">${analysis.executive_summary?.overall_risk || 'Not Assessed'}</span></p>
        <p><strong>Damage Probability:</strong> ${analysis.executive_summary?.damage_probability || 'Under Review'}</p>
        <p><strong>Estimated Claim Value:</strong> <strong>${analysis.executive_summary?.estimated_claim_value_range || 'To Be Determined'}</strong></p>
        <p><strong>Analysis Confidence:</strong> ${analysis.report_metadata?.confidence_level || 'High'}</p>
    </div>
    
    <h3>Key Findings</h3>
    <ul>
        ${(analysis.executive_summary?.primary_findings || []).map(finding => `<li>${finding}</li>`).join('')}
    </ul>
    
    <div class="emergency-box box">
        <h3>⚠️ Critical Actions Required</h3>
        <ul>
            ${(analysis.executive_summary?.critical_actions || []).map(action => `<li><strong>${action}</strong></li>`).join('')}
        </ul>
    </div>
</div>

${buildTables(analysis.professional_tables, colors)}

<!-- Emergency Response -->
<div class="no-break">
    <h1>Emergency Response Assessment</h1>
    
    <div class="emergency-box box">
        <h3>Habitability Status: ${analysis.emergency_response?.habitability_status || 'Under Assessment'}</h3>
        
        <h4>Immediate Priorities:</h4>
        <ul>
            ${(analysis.emergency_response?.immediate_priorities || []).map(priority => `<li>⚠️ ${priority}</li>`).join('')}
        </ul>
    </div>
</div>

<!-- Recommendations -->
<div class="no-break">
    <h1>Professional Recommendations</h1>
    
    <h3>Next Steps</h3>
    ${buildNextSteps(analysis.recommendations?.next_steps || [])}
    
    <h3>Required Professional Inspections</h3>
    ${buildInspections(analysis.recommendations?.professional_inspections || [])}
</div>

<!-- Hayden Value Proposition -->
<div class="no-break">
    <h1>Hayden Claims Group Advantage</h1>
    
    <div class="box" style="border-color: ${colors.primary}; background: ${colors.light};">
        <h3>Our Value Proposition</h3>
        <p>${analysis.business_intelligence?.hayden_value_proposition || analysis.executive_summary?.hayden_competitive_advantage || ''}</p>
        
        <h4 style="margin-top: 15px;">Competitive Advantages:</h4>
        <ul>
            ${(analysis.business_intelligence?.competitive_advantages || []).map(adv => `<li>✓ ${adv}</li>`).join('')}
        </ul>
        
        <p style="margin-top: 15px;"><strong>Potential Savings:</strong> ${analysis.business_intelligence?.potential_savings || 'Significant savings on claim settlement'}</p>
        <p><strong>Success Probability:</strong> ${analysis.business_intelligence?.success_probability_with_hayden || 'High'}</p>
    </div>
</div>

<!-- Footer -->
<div class="footer">
    <p><strong>${company.name}</strong> | ${company.phone} | ${company.email}</p>
    <p>${company.address} | ${company.license}</p>
    <p style="margin-top: 10px;">This report is confidential and prepared exclusively for the property owner.</p>
    <p>Report ID: ${reportId} | Generated: ${generatedDate}</p>
</div>

</body>
</html>
    `.trim();
}

function buildTables(tables, colors) {
    if (!tables) return '';
    
    const tableKeys = [
        'storm_risk_summary',
        'property_damage_assessment',
        'repair_cost_analysis',
        'insurance_claim_strategy',
        'contractor_market_intelligence',
        'risk_mitigation_plan'
    ];
    
    return tableKeys.map(key => {
        const table = tables[key];
        if (!table || !table.data_rows) return '';
        
        return `
<div class="no-break">
    <h2>${table.title || key}</h2>
    ${table.subtitle ? `<p class="text-small"><em>${table.subtitle}</em></p>` : ''}
    
    <table>
        <thead>
            <tr>
                ${(table.headers || []).map(header => `<th>${header}</th>`).join('')}
            </tr>
        </thead>
        <tbody>
            ${table.data_rows.map(row => `
                <tr>
                    ${row.map(cell => `<td>${cell}</td>`).join('')}
                </tr>
            `).join('')}
        </tbody>
    </table>
    
    ${table.key_insights && table.key_insights.length > 0 ? `
    <div class="insights">
        <h4>Key Insights:</h4>
        <ul>
            ${table.key_insights.map(insight => `<li>${insight}</li>`).join('')}
        </ul>
    </div>
    ` : ''}
</div>
        `;
    }).join('\n');
}

function buildNextSteps(steps) {
    if (!steps || steps.length === 0) return '<p>No specific steps identified at this time.</p>';
    
    return steps.map(step => `
        <div class="box" style="margin: 10px 0;">
            <h4>${step.action || 'Action needed'}</h4>
            <p><strong>Timeline:</strong> ${step.timeline || 'ASAP'}</p>
            <p><strong>Priority:</strong> ${step.priority || 'medium'}</p>
            <p><strong>Responsible Party:</strong> ${step.responsible_party || 'Property owner'}</p>
            <p><strong>Estimated Cost:</strong> ${step.estimated_cost || 'TBD'}</p>
        </div>
    `).join('');
}

function buildInspections(inspections) {
    if (!inspections || inspections.length === 0) return '<p>No inspections required at this time.</p>';
    
    return inspections.map(inspection => `
        <div class="box" style="margin: 10px 0;">
            <h4>${inspection.inspection_type || 'General inspection'}</h4>
            <p><strong>Urgency:</strong> ${inspection.urgency || 'routine'}</p>
            <p><strong>Purpose:</strong> ${inspection.purpose || 'Assessment needed'}</p>
            <p><strong>Estimated Cost:</strong> ${inspection.estimated_cost || 'Quote required'}</p>
            ${inspection.hayden_can_coordinate ? '<p>✓ <strong>Hayden Can Coordinate This Service</strong></p>' : ''}
        </div>
    `).join('');
}

module.exports = { buildPDFTemplate };
