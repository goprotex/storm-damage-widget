/**
 * 🧪 LOCAL PUPPETEER PDF TEST
 * 
 * This tests the PDF generation locally before deploying to Zapier.
 * 
 * REQUIREMENTS:
 * npm install puppeteer
 * 
 * RUN:
 * node test-puppeteer-local.js
 */

const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

// Load sample data
const sampleData = require('./sample-template-data.json');

// ============================================================================
// HTML TEMPLATE BUILDER (Same as Zapier code)
// ============================================================================

function buildHTML(analysis, formData) {
    const company = {
        name: "Hayden Claims Group",
        tagline: "Mother Nature isn't fair but insurance should be",
        phone: "(469) 434-2121",
        email: "office@haydenclaim.com",
        website: "haydenclaim.com",
        license: "TDI License #3378204"
    };
    
    const colors = {
        primary: "#bfa76f",
        secondary: "#2c3e50",
        success: "#28a745",
        warning: "#fd7e14",
        danger: "#dc3545"
    };
    
    const riskColors = {
        'critical': colors.danger,
        'high': '#ff6b35',
        'moderate': colors.warning,
        'low': colors.success
    };
    
    const riskColor = riskColors[analysis.executive_summary?.overall_risk?.toLowerCase()] || colors.secondary;
    const address = `${formData.property_address || ''}, ${formData.city || ''}, ${formData.state || ''} ${formData.zip || ''}`.replace(/,\s*,/g, ',').trim();
    const reportId = `HCG-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    const date = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    
    return `<!DOCTYPE html>
<html><head><meta charset="UTF-8">
<style>
@page{margin:0.75in;size:letter}*{box-sizing:border-box;margin:0;padding:0}body{font-family:Helvetica,Arial,sans-serif;font-size:11pt;line-height:1.6;color:#2c3e50}.page{page-break-after:always}.no-break{page-break-inside:avoid}.header{background:${colors.primary};color:#fff;padding:20px;margin:-0.75in -0.75in 30px -0.75in;text-align:center}.header h1{font-size:28pt;margin-bottom:5px}.header p{font-size:12pt;font-style:italic}h1,h2,h3{color:#2c3e50;margin-top:20px;margin-bottom:10px}h1{font-size:24pt;border-bottom:3px solid ${colors.primary};padding-bottom:10px}h2{font-size:18pt;border-bottom:2px solid ${colors.primary};padding-bottom:5px}h3{font-size:14pt}table{width:100%;border-collapse:collapse;margin:15px 0;font-size:10pt}th{background:${colors.primary};color:#fff;padding:12px 8px;text-align:left;border:1px solid ${colors.primary}}td{padding:10px 8px;border:1px solid #dee2e6}tr:nth-child(even){background:#f8f9fa}ul,ol{margin:10px 0 10px 25px}li{margin:5px 0}.box{border:2px solid ${colors.primary};padding:15px;margin:15px 0;border-radius:5px}.risk-box{background:#f8f9fa;border-left:5px solid ${riskColor}}.emergency-box{background:#fff3cd;border-left:5px solid ${colors.warning}}.risk-level{display:inline-block;padding:5px 15px;background:${riskColor};color:#fff;font-weight:bold;border-radius:3px;font-size:12pt}.footer{margin-top:30px;padding-top:15px;border-top:2px solid ${colors.primary};text-align:center;font-size:9pt;color:#6c757d}.insights{background:#f8f9fa;border-left:4px solid ${colors.primary};padding:10px 15px;margin:10px 0}.insights h4{color:${colors.primary};margin-bottom:5px}
</style></head><body>

<div class="page"><div class="header"><h1>${company.name}</h1><p>${company.tagline}</p></div>
<div style="margin-top:100px;text-align:center"><h1 style="border:none">Storm Damage Intelligence Report</h1>
<p style="font-size:14pt;margin:20px 0"><strong>${address}</strong></p>
<p>Report ID: ${reportId}</p><p>Generated: ${date}</p></div>
<div class="box" style="margin-top:100px"><h3>Contact Information</h3><p><strong>${company.name}</strong></p>
<p>Phone: ${company.phone}</p><p>Email: ${company.email}</p><p>Website: ${company.website}</p><p>${company.license}</p></div></div>

<div class="no-break"><h1>Executive Summary</h1>
<div class="risk-box box"><h3>Overall Risk Assessment</h3>
<p><strong>Risk Level:</strong> <span class="risk-level">${analysis.executive_summary?.overall_risk || 'Not Assessed'}</span></p>
<p><strong>Damage Probability:</strong> ${analysis.executive_summary?.damage_probability || 'Under Review'}</p>
<p><strong>Estimated Claim Value:</strong> <strong>${analysis.executive_summary?.estimated_claim_value_range || 'TBD'}</strong></p>
<p><strong>Confidence:</strong> ${analysis.report_metadata?.confidence_level || 'High'}</p></div>
<h3>Key Findings</h3><ul>${(analysis.executive_summary?.primary_findings || []).map(f => `<li>${f}</li>`).join('')}</ul>
<div class="emergency-box box"><h3>⚠️ Critical Actions Required</h3><ul>${(analysis.executive_summary?.critical_actions || []).map(a => `<li><strong>${a}</strong></li>`).join('')}</ul></div></div>

${buildTables(analysis.professional_tables)}

<div class="no-break"><h1>Emergency Response</h1>
<div class="emergency-box box"><h3>Status: ${analysis.emergency_response?.habitability_status || 'Under Assessment'}</h3>
<h4>Immediate Priorities:</h4><ul>${(analysis.emergency_response?.immediate_priorities || []).map(p => `<li>⚠️ ${p}</li>`).join('')}</ul></div></div>

<div class="no-break"><h1>Professional Recommendations</h1><h3>Next Steps</h3>
${(analysis.recommendations?.next_steps || []).map(s => `<div class="box"><h4>${s.action}</h4><p><strong>Timeline:</strong> ${s.timeline}</p><p><strong>Priority:</strong> ${s.priority}</p><p><strong>Cost:</strong> ${s.estimated_cost}</p></div>`).join('')}</div>

<div class="no-break"><h1>Hayden Claims Group Advantage</h1>
<div class="box" style="background:#f8f9fa"><h3>Value Proposition</h3>
<p>${analysis.business_intelligence?.hayden_value_proposition || analysis.executive_summary?.hayden_competitive_advantage || ''}</p>
<h4>Competitive Advantages:</h4><ul>${(analysis.business_intelligence?.competitive_advantages || []).map(a => `<li>✓ ${a}</li>`).join('')}</ul>
<p><strong>Potential Savings:</strong> ${analysis.business_intelligence?.potential_savings || 'Significant savings'}</p></div></div>

<div class="footer"><p><strong>${company.name}</strong> | ${company.phone} | ${company.email}</p>
<p>${company.license}</p><p>Report ID: ${reportId} | ${date}</p></div>

</body></html>`;
}

function buildTables(tables) {
    if (!tables) return '';
    const keys = ['storm_risk_summary', 'property_damage_assessment', 'repair_cost_analysis', 'insurance_claim_strategy', 'contractor_market_intelligence', 'risk_mitigation_plan'];
    return keys.map(k => {
        const t = tables[k];
        if (!t || !t.data_rows) return '';
        return `<div class="no-break"><h2>${t.title}</h2>${t.subtitle ? `<p style="font-size:9pt;color:#6c757d"><em>${t.subtitle}</em></p>` : ''}
<table><thead><tr>${(t.headers || []).map(h => `<th>${h}</th>`).join('')}</tr></thead>
<tbody>${t.data_rows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table>
${t.key_insights && t.key_insights.length > 0 ? `<div class="insights"><h4>Key Insights:</h4><ul>${t.key_insights.map(i => `<li>${i}</li>`).join('')}</ul></div>` : ''}</div>`;
    }).join('');
}

// ============================================================================
// MAIN TEST FUNCTION
// ============================================================================

async function testPuppeteerPDF() {
    console.log('🧪 Testing Puppeteer PDF Generation...\n');
    
    try {
        // Build form data
        const formData = {
            property_address: "1112 Krystal Vista",
            city: "Kerrville",
            state: "TX",
            zip: "78028"
        };
        
        console.log('📝 Building HTML template...');
        const html = buildHTML(sampleData, formData);
        
        // Save HTML for inspection
        const htmlPath = path.join(__dirname, 'test-output.html');
        fs.writeFileSync(htmlPath, html);
        console.log(`✅ HTML saved to: ${htmlPath}`);
        
        console.log('\n🚀 Launching Puppeteer...');
        const browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        
        const page = await browser.newPage();
        
        console.log('📄 Loading HTML content...');
        await page.setContent(html, { waitUntil: 'networkidle0' });
        
        console.log('🖨️  Generating PDF...');
        const pdfBuffer = await page.pdf({
            format: 'Letter',
            printBackground: true,
            margin: { top: '0', bottom: '0', left: '0', right: '0' }
        });
        
        await browser.close();
        
        // Save PDF
        const pdfPath = path.join(__dirname, 'test-output.pdf');
        fs.writeFileSync(pdfPath, pdfBuffer);
        
        const sizeKB = (pdfBuffer.length / 1024).toFixed(2);
        
        console.log(`\n✅ SUCCESS! PDF Generated!`);
        console.log(`📁 Location: ${pdfPath}`);
        console.log(`📊 Size: ${sizeKB} KB (${pdfBuffer.length} bytes)`);
        console.log(`\n🎉 Open the PDF to see your professional storm report!`);
        
    } catch (error) {
        console.error('\n❌ ERROR:', error.message);
        console.error('\nFull error:', error);
        process.exit(1);
    }
}

// Run the test
testPuppeteerPDF();
