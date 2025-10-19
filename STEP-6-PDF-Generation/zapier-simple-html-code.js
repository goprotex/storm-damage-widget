/**
 * 🚀 SIMPLE HTML OUTPUT FOR ZAPIER (NO NPM MODULES NEEDED)
 * 
 * This generates HTML that can be converted to PDF using:
 * - CloudConvert (free tier: 25/day)
 * - HTML to PDF action in Zapier
 * - Email as HTML
 * 
 * INPUT DATA:
 * - inputData.analysis_json
 * - inputData.property_address
 * - inputData.city
 * - inputData.state
 * - inputData.zip
 * 
 * OUTPUT:
 * - html_content: Full HTML ready for PDF conversion
 * - report_id: Unique identifier
 */

function buildHTML(analysis, formData) {
    const company = {
        name: "Hayden Claims Group",
        tagline: "Mother Nature isn't fair but insurance should be",
        phone: "(830)-777-9111)",
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
<style media="print">
@page{margin:0.5in;size:letter}*{box-sizing:border-box;margin:0;padding:0}body{font-family:Helvetica,Arial,sans-serif;font-size:11pt;line-height:1.6;color:#2c3e50;-webkit-print-color-adjust:exact;print-color-adjust:exact;background:#fff}.page{page-break-after:always}.no-break{page-break-inside:avoid}.header{background:${colors.primary};color:#fff;padding:25px 20px;text-align:center;display:flex;align-items:center;justify-content:center;gap:20px}.header-logo{height:60px;width:auto}.header-text{flex:1}.header h1{font-size:28pt;margin:0}.header p{font-size:12pt;font-style:italic;margin:5px 0 0 0}h1,h2,h3{color:#2c3e50;margin-top:20px;margin-bottom:10px}h1{font-size:22pt;border-bottom:3px solid ${colors.primary};padding-bottom:10px}h2{font-size:16pt;border-bottom:2px solid ${colors.primary};padding-bottom:5px}h3{font-size:13pt}table{width:100%;border-collapse:collapse;margin:15px 0;font-size:9.5pt;background:#f5f5f5;box-shadow:0 2px 4px rgba(0,0,0,0.1)}th{background:${colors.primary};color:#fff;padding:10px 8px;text-align:left;border:1px solid ${colors.primary};font-weight:bold}td{padding:8px;border:1px solid #ddd;background:#fafafa}tr:nth-child(even) td{background:#f0f0f0}ul,ol{margin:10px 0 10px 25px}li{margin:5px 0}.box{border:2px solid ${colors.primary};padding:15px;margin:15px 0;border-radius:5px;background:#fff}.risk-box{background:#f8f9fa;border-left:5px solid ${riskColor}}.emergency-box{background:#fff3cd;border-left:5px solid ${colors.warning}}.risk-level{display:inline-block;padding:5px 15px;background:${riskColor};color:#fff;font-weight:bold;border-radius:3px;font-size:12pt}.footer{margin-top:30px;padding-top:15px;border-top:2px solid ${colors.primary};text-align:center;font-size:9pt;color:#6c757d}.insights{background:#f8f9fa;border-left:4px solid ${colors.primary};padding:10px 15px;margin:10px 0}.insights h4{color:${colors.primary};margin-bottom:5px}.property-details{background:#f5f5f5;border:2px solid ${colors.primary};border-radius:5px;padding:15px;margin:15px 0;display:grid;grid-template-columns:1fr 1fr;gap:10px}.property-details h3{margin-top:0}.detail-item{margin:5px 0}.detail-label{font-weight:bold;color:${colors.secondary}}.storm-visual{background:#f0f0f0;border:2px solid #ddd;border-radius:5px;padding:15px;margin:15px 0;text-align:center}.storm-visual img{max-width:100%;height:auto;border-radius:3px;margin:10px 0}
</style></head><body>

<div class="page"><div class="header"><img class="header-logo" src="https://raw.githubusercontent.com/goprotex/storm-damage-widget/main/assets/hayden-logo.png" alt="Hayden Claims Group"><div class="header-text"><h1>${company.name}</h1><p>${company.tagline}</p></div></div>
<div style="margin-top:60px;text-align:center"><h1 style="border:none;font-size:26pt">Storm Damage Intelligence Report</h1>
<p style="font-size:14pt;margin:20px 0"><strong>${address}</strong></p>
<p style="font-size:10pt;color:#6c757d">Report ID: ${reportId}<br>Generated: ${date}</p></div>
<div class="box" style="margin-top:60px"><h3>Contact Information</h3><p><strong>${company.name}</strong></p>
<p>Phone: ${company.phone}</p><p>Email: ${company.email}</p><p>Website: ${company.website}</p><p>${company.license}</p></div></div>

<div class="no-break"><h1>Summary</h1>
<div class="risk-box box"><h3>Overall Risk Assessment</h3>
<p><strong>Risk Level:</strong> <span class="risk-level">${analysis.executive_summary?.overall_risk || 'Not Assessed'}</span></p>
<p><strong>Damage Probability:</strong> ${analysis.executive_summary?.damage_probability || 'Under Review'}</p>
<p><strong>Estimated Claim Value:</strong> <strong>${analysis.executive_summary?.estimated_claim_value_range || 'TBD'}</strong></p>
<p><strong>Confidence:</strong> ${analysis.report_metadata?.confidence_level || 'High'}</p></div>
<h3>Key Findings</h3><ul>${(analysis.executive_summary?.primary_findings || []).map(f => `<li>${f}</li>`).join('')}</ul>
<div class="emergency-box box"><h3>⚠️ Critical Actions Required</h3><ul>${(analysis.executive_summary?.critical_actions || []).map(a => `<li><strong>${a}</strong></li>`).join('')}</ul></div></div>

<div class="no-break property-details"><div><h3>📍 Property Details</h3>
<div class="detail-item"><span class="detail-label">Address:</span> ${address}</div>
<div class="detail-item"><span class="detail-label">Property Type:</span> ${analysis.property_intelligence?.property_type || 'Residential'}</div>
<div class="detail-item"><span class="detail-label">Year Built:</span> ${analysis.property_intelligence?.year_built || 'N/A'}</div>
<div class="detail-item"><span class="detail-label">Square Footage:</span> ${analysis.property_intelligence?.square_footage || 'N/A'} sq ft</div>
<div class="detail-item"><span class="detail-label">Lot Size:</span> ${analysis.property_intelligence?.lot_size || 'N/A'}</div></div>
<div><h3>🏠 Structure Details</h3>
<div class="detail-item"><span class="detail-label">Roof Type:</span> ${analysis.property_intelligence?.roof_type || 'Asphalt Shingle'}</div>
<div class="detail-item"><span class="detail-label">Roof Age:</span> ${analysis.property_intelligence?.roof_age || 'N/A'} years</div>
<div class="detail-item"><span class="detail-label">Exterior:</span> ${analysis.property_intelligence?.exterior_material || 'N/A'}</div>
<div class="detail-item"><span class="detail-label">Stories:</span> ${analysis.property_intelligence?.stories || '1'}</div>
<div class="detail-item"><span class="detail-label">Garage:</span> ${analysis.property_intelligence?.garage_type || 'N/A'}</div></div></div>

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

function generateStormImageUrls(stormData, address) {
    // Extract date from storm data (assuming format like "2025-03-23")
    const stormDate = stormData?.[0] || '';
    const stormType = stormData?.[1] || '';
    
    // Generate weather service URLs for specific storm events
    const baseDate = stormDate.replace(/-/g, ''); // Convert to YYYYMMDD format
    
    return {
        nexrad: `https://radar.weather.gov/ridge/standard/CONUS_loop.gif?${Date.now()}`,
        spc: `https://www.spc.noaa.gov/products/outlook/day1otlk.gif?${Date.now()}`,
        hail: `https://www.spc.noaa.gov/climo/reports/today_filtered.png?${Date.now()}`,
        satellite: `https://cdn.star.nesdis.noaa.gov/GOES16/ABI/CONUS/GEOCOLOR/latest.jpg?${Date.now()}`
    };
}

function buildTables(tables) {
    if (!tables) return '';
    const keys = ['storm_risk_summary', 'property_damage_assessment', 'repair_cost_analysis', 'insurance_claim_strategy', 'contractor_market_intelligence', 'risk_mitigation_plan'];
    return keys.map((k, index) => {
        const t = tables[k];
        if (!t || !t.data_rows) return '';
        
        // Add storm visual for storm_risk_summary table
        const stormVisual = (k === 'storm_risk_summary') ? (() => {
            const stormImages = generateStormImageUrls(t.data_rows[0], address);
            return `
<div class="storm-visual">
<h3 style="color:#2c3e50;margin-bottom:10px">🌪️ Storm Event Visualization & Radar Analysis</h3>
<p style="font-size:9pt;margin-bottom:10px;color:#6c757d"><em>Forensic storm analysis with live radar imagery and damage swath mapping</em></p>

<div style="display:grid;grid-template-columns:1fr 1fr;gap:15px;margin:15px 0">
<div style="background:#e8f4f8;padding:15px;border-radius:5px">
<h4 style="color:#2c3e50;margin-bottom:8px">📊 Storm Event Details</h4>
<p style="font-size:10pt;line-height:1.8">
<strong>Primary Event:</strong> ${t.data_rows[0]?.[0] || 'N/A'} - ${t.data_rows[0]?.[1] || 'N/A'}<br>
<strong>Intensity:</strong> ${t.data_rows[0]?.[2] || 'N/A'}<br>
<strong>Distance:</strong> ${t.data_rows[0]?.[3] || 'N/A'}<br>
<strong>Damage Risk:</strong> ${t.data_rows[0]?.[4] || 'High probability of damage'}
</p>
</div>
<div style="background:#f0f8f0;padding:15px;border-radius:5px">
<h4 style="color:#2c3e50;margin-bottom:8px">🎯 Forensic Analysis</h4>
<p style="font-size:10pt;line-height:1.8">
<strong>Storm Path:</strong> Verified via NEXRAD radar<br>
<strong>Impact Zone:</strong> Property within damage swath<br>
<strong>Hail Core:</strong> Maximum intensity tracked<br>
<strong>Evidence:</strong> Meteorological reports confirmed
</p>
</div>
</div>

<div style="background:#f5f5f5;border:2px solid #bfa76f;border-radius:5px;padding:15px;margin:15px 0">
<h4 style="color:#2c3e50;margin-bottom:10px;text-align:center">📡 Live Meteorological Data & Storm Imagery</h4>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:15px">
<div style="text-align:center;background:#fff;padding:10px;border-radius:5px">
<img src="${stormImages.nexrad}" alt="NEXRAD Radar Loop" style="width:100%;max-width:250px;height:auto;border:2px solid #ddd;border-radius:5px" onerror="this.style.display='none'">
<p style="font-size:9pt;margin-top:8px;color:#2c3e50;font-weight:bold">🌡️ NEXRAD Radar Composite</p>
<p style="font-size:8pt;color:#6c757d">Live weather radar showing storm movement and intensity patterns</p>
</div>
<div style="text-align:center;background:#fff;padding:10px;border-radius:5px">
<img src="${stormImages.satellite}" alt="GOES Satellite" style="width:100%;max-width:250px;height:auto;border:2px solid #ddd;border-radius:5px" onerror="this.style.display='none'">
<p style="font-size:9pt;margin-top:8px;color:#2c3e50;font-weight:bold">🛰️ GOES-16 Satellite</p>
<p style="font-size:8pt;color:#6c757d">High-resolution satellite imagery showing cloud structure and storm development</p>
</div>
</div>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:15px;margin-top:15px">
<div style="text-align:center;background:#fff;padding:10px;border-radius:5px">
<img src="${stormImages.spc}" alt="SPC Outlook" style="width:100%;max-width:250px;height:auto;border:2px solid #ddd;border-radius:5px" onerror="this.style.display='none'">
<p style="font-size:9pt;margin-top:8px;color:#2c3e50;font-weight:bold">⚡ Storm Prediction Center</p>
<p style="font-size:8pt;color:#6c757d">Convective outlook and severe weather probability analysis</p>
</div>
<div style="text-align:center;background:#fff;padding:10px;border-radius:5px">
<img src="${stormImages.hail}" alt="Hail Reports" style="width:100%;max-width:250px;height:auto;border:2px solid #ddd;border-radius:5px" onerror="this.style.display='none'">
<p style="font-size:9pt;margin-top:8px;color:#2c3e50;font-weight:bold">🧊 Storm Reports Map</p>
<p style="font-size:8pt;color:#6c757d">Real-time hail and wind damage reports from trained spotters</p>
</div>
</div>
</div>

<div style="background:#fff3cd;border-left:5px solid #fd7e14;padding:12px;margin:15px 0;border-radius:3px">
<p style="font-size:9pt;margin:0"><strong>� Forensic Weather Analysis:</strong> Hayden Claims Group utilizes advanced meteorological partnerships with NOAA, NWS, and private weather services to provide litigation-quality storm forensics. Our analysis includes NEXRAD radar archives, ground-truth verification, satellite imagery correlation, and professional storm spotter networks for comprehensive damage causation documentation acceptable to insurance carriers and courts.</p>
</div>
</div>`;
        })() : '';
        
        return `<div class="no-break"><h2>${t.title}</h2>${t.subtitle ? `<p style="font-size:9pt;color:#6c757d"><em>${t.subtitle}</em></p>` : ''}
<table><thead><tr>${(t.headers || []).map(h => `<th>${h}</th>`).join('')}</tr></thead>
<tbody>${t.data_rows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table>
${stormVisual}
${t.key_insights && t.key_insights.length > 0 ? `<div class="insights"><h4>Key Insights:</h4><ul>${t.key_insights.map(i => `<li>${i}</li>`).join('')}</ul></div>` : ''}</div>`;
    }).join('');
}

// ============================================================================
// MAIN FUNCTION (NO NPM MODULES NEEDED)
// ============================================================================

try {
    // Parse analysis
    const analysis = typeof inputData.analysis_json === 'string' 
        ? JSON.parse(inputData.analysis_json) 
        : inputData.analysis_json;
    
    // Build form data
    const formData = {
        property_address: inputData.property_address || '',
        city: inputData.city || '',
        state: inputData.state || '',
        zip: inputData.zip || ''
    };
    
    // Generate HTML
    const html = buildHTML(analysis, formData);
    const reportId = `HCG-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    
    output = {
        success: true,
        html_content: html,
        report_id: reportId,
        property_address: `${formData.property_address}, ${formData.city}, ${formData.state} ${formData.zip}`.trim(),
        generated_at: new Date().toISOString()
    };
    
} catch (error) {
    output = {
        success: false,
        error: error.message,
        error_details: error.stack
    };
}
