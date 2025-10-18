# Step 6: PDF Generation - Professional Storm Damage Report

## CraftMyPDF Configuration with Enhanced Tables

### PDF Template Structure

This step takes the comprehensive analysis from Step 5 and generates a professional PDF report using CraftMyPDF with structured tables and business intelligence.

### Input Data Sources:
- **Form Data**: {{1.raw__body}} - Original property submission
- **Property Research**: {{3.choices.0.message.content}} - Building intelligence from Step 3  
- **Storm Data**: {{4.choices.0.message.content}} - Storm events table from Step 4
- **GPT-5 Analysis**: {{5.choices.0.message.content}} - Comprehensive analysis with tables from Step 5

## PDF Template Design

### Cover Page
```html
<div class="cover-page">
  <img src="https://haydenclaim.com/logo.png" class="company-logo">
  <h1>Storm Damage Assessment Report</h1>
  <h2>{{analysis_summary.property_address}}</h2>
  <div class="report-info">
    <p><strong>Report Date:</strong> {{current_date}}</p>
    <p><strong>Analysis ID:</strong> {{analysis_id}}</p>
    <p><strong>Risk Level:</strong> {{analysis_summary.overall_damage_likelihood}}</p>
  </div>
  <div class="hayden-branding">
    <h3>Prepared by Hayden Claims Group</h3>
    <p>Expert Storm Damage Assessment</p>
    <p>Phone: (469) 434-2121</p>
  </div>
</div>
```

### Executive Summary
```html
<div class="executive-summary">
  <h2>Executive Summary</h2>
  <div class="risk-overview">
    <h3>Overall Risk Assessment: {{analysis_summary.overall_damage_likelihood}}</h3>
    <p>{{analysis_summary.highest_risk_event}}</p>
  </div>
  
  <div class="key-findings">
    <h3>Primary Risk Factors:</h3>
    <ul>
    {{#each analysis_summary.primary_risk_factors}}
      <li>{{this}}</li>
    {{/each}}
    </ul>
  </div>
  
  <div class="competitive-advantage">
    <h3>Hayden Claims Advantage:</h3>
    <p>{{analysis_summary.hayden_competitive_advantage}}</p>
  </div>
</div>
```

### Storm Visual Intelligence Section
```html
<div class="storm-imagery-section">
  <h2>Storm Visual Intelligence</h2>
  <p class="imagery-intro">Professional meteorological evidence supporting damage assessment</p>
  
  {{#if storm_imagery.featured_images.pdf_images}}
  <div class="pdf-image-layout">
    {{#each storm_imagery.featured_images.pdf_images}}
    <div class="storm-image-container">
      <img src="{{this.processed_url}}" alt="{{this.description}}" class="storm-image">
      <div class="image-caption">
        <h4>{{this.title}}</h4>
        <p><strong>{{this.category}}:</strong> {{this.description}}</p>
        <div class="image-metadata">
          <span class="timestamp">{{this.formatted_timestamp}}</span>
          {{#if this.metadata.storm_intensity}}
          <span class="intensity">Intensity: {{this.metadata.storm_intensity}}</span>
          {{/if}}
          {{#if this.metadata.distance}}
          <span class="distance">Distance: {{this.metadata.distance}}</span>
          {{/if}}
        </div>
      </div>
    </div>
    {{/each}}
  </div>
  {{/if}}
  
  <div class="visual-evidence-summary">
    <h3>Visual Evidence Analysis</h3>
    <div class="evidence-grid">
      <div class="evidence-item">
        <strong>Satellite Analysis:</strong>
        <p>{{storm_imagery.analysis_summary.satellite_evidence}}</p>
      </div>
      <div class="evidence-item">
        <strong>Radar Signatures:</strong>
        <p>{{storm_imagery.analysis_summary.radar_evidence}}</p>
      </div>
      <div class="evidence-item">
        <strong>Storm Tracking:</strong>
        <p>{{storm_imagery.analysis_summary.track_evidence}}</p>
      </div>
      <div class="evidence-item">
        <strong>Damage Correlation:</strong>
        <p>{{storm_imagery.analysis_summary.damage_correlation}}</p>
      </div>
    </div>
  </div>
</div>
```

### Table 1: Storm Damage Risk Assessment Summary
```html
<div class="table-section">
  <h2>{{pdf_tables.storm_damage_summary_table.title}}</h2>
  <table class="professional-table">
    <thead>
      <tr>
      {{#each pdf_tables.storm_damage_summary_table.headers}}
        <th>{{this}}</th>
      {{/each}}
      </tr>
    </thead>
    <tbody>
    {{#each pdf_tables.storm_damage_summary_table.rows}}
      <tr>
      {{#each this}}
        <td>{{this}}</td>
      {{/each}}
      </tr>
    {{/each}}
    </tbody>
  </table>
</div>
```

### Table 2: Property Vulnerability Analysis
```html
<div class="table-section">
  <h2>{{pdf_tables.property_vulnerability_table.title}}</h2>
  <table class="professional-table">
    <thead>
      <tr>
      {{#each pdf_tables.property_vulnerability_table.headers}}
        <th>{{this}}</th>
      {{/each}}
      </tr>
    </thead>
    <tbody>
    {{#each pdf_tables.property_vulnerability_table.rows}}
      <tr class="{{#if (eq @index 0)}}high-risk{{/if}}{{#if (eq @index 1)}}medium-risk{{/if}}">
      {{#each this}}
        <td>{{this}}</td>
      {{/each}}
      </tr>
    {{/each}}
    </tbody>
  </table>
</div>
```

### Table 3: Repair Cost Breakdown
```html
<div class="table-section">
  <h2>{{pdf_tables.repair_cost_breakdown_table.title}}</h2>
  <table class="professional-table cost-table">
    <thead>
      <tr>
      {{#each pdf_tables.repair_cost_breakdown_table.headers}}
        <th>{{this}}</th>
      {{/each}}
      </tr>
    </thead>
    <tbody>
    {{#each pdf_tables.repair_cost_breakdown_table.rows}}
      <tr class="{{#if (eq this.[4] 'Critical')}}critical-priority{{/if}}{{#if (eq this.[4] 'High')}}high-priority{{/if}}">
      {{#each this}}
        <td>{{this}}</td>
      {{/each}}
      </tr>
    {{/each}}
    </tbody>
  </table>
</div>
```

### Table 4: Insurance Coverage Analysis
```html
<div class="table-section">
  <h2>{{pdf_tables.insurance_coverage_analysis_table.title}}</h2>
  <table class="professional-table coverage-table">
    <thead>
      <tr>
      {{#each pdf_tables.insurance_coverage_analysis_table.headers}}
        <th>{{this}}</th>
      {{/each}}
      </tr>
    </thead>
    <tbody>
    {{#each pdf_tables.insurance_coverage_analysis_table.rows}}
      <tr class="{{#if this.[3]}}coverage-gap{{/if}}">
      {{#each this}}
        <td>{{this}}</td>
      {{/each}}
      </tr>
    {{/each}}
    </tbody>
  </table>
</div>
```

### Table 5: Contractor Market Intelligence
```html
<div class="table-section">
  <h2>{{pdf_tables.contractor_market_analysis_table.title}}</h2>
  <table class="professional-table contractor-table">
    <thead>
      <tr>
      {{#each pdf_tables.contractor_market_analysis_table.headers}}
        <th>{{this}}</th>
      {{/each}}
      </tr>
    </thead>
    <tbody>
    {{#each pdf_tables.contractor_market_analysis_table.rows}}
      <tr class="{{#if (eq this.[1] 'Limited')}}limited-availability{{/if}}">
      {{#each this}}
        <td>{{this}}</td>
      {{/each}}
      </tr>
    {{/each}}
    </tbody>
  </table>
</div>
```

### Table 6: Risk Mitigation Opportunities
```html
<div class="table-section">
  <h2>{{pdf_tables.risk_mitigation_opportunities_table.title}}</h2>
  <table class="professional-table mitigation-table">
    <thead>
      <tr>
      {{#each pdf_tables.risk_mitigation_opportunities_table.headers}}
        <th>{{this}}</th>
      {{/each}}
      </tr>
    </thead>
    <tbody>
    {{#each pdf_tables.risk_mitigation_opportunities_table.rows}}
      <tr>
      {{#each this}}
        <td>{{this}}</td>
      {{/each}}
      </tr>
    {{/each}}
    </tbody>
  </table>
</div>
```

### Emergency Response Section
```html
<div class="emergency-section">
  <h2>Emergency Response Plan</h2>
  <div class="habitability-status {{emergency_response.habitability_assessment}}">
    <h3>Property Status: {{emergency_response.habitability_assessment}}</h3>
  </div>
  
  <div class="immediate-actions">
    <h3>Immediate Actions Required:</h3>
    <ol class="priority-list">
    {{#each emergency_response.immediate_actions}}
      <li class="urgent-action">{{this}}</li>
    {{/each}}
    </ol>
  </div>
  
  <div class="time-sensitive">
    <h3>Time-Sensitive Priorities:</h3>
    <ul class="deadline-list">
    {{#each emergency_response.time_sensitive_priorities}}
      <li class="deadline-item">{{this}}</li>
    {{/each}}
    </ul>
  </div>
</div>
```

### Technology Recommendations Section
```html
<div class="technology-section">
  <h2>Technology Integration Recommendations</h2>
  
  <div class="drone-priority">
    <h3>Drone Survey Priority: {{technology_recommendations.drone_survey_priority}}</h3>
  </div>
  
  <div class="thermal-imaging">
    <h3>Thermal Imaging Areas:</h3>
    <ul>
    {{#each technology_recommendations.thermal_imaging_areas}}
      <li>{{this}}</li>
    {{/each}}
    </ul>
  </div>
  
  <div class="moisture-detection">
    <h3>Critical Moisture Detection Zones:</h3>
    <ul>
    {{#each technology_recommendations.moisture_detection_critical_zones}}
      <li>{{this}}</li>
    {{/each}}
    </ul>
  </div>
</div>
```

### Legal Risk Assessment Section
```html
<div class="legal-section">
  <h2>Legal Risk Assessment</h2>
  
  <div class="denial-risk {{legal_risk_assessment.carrier_denial_risk}}">
    <h3>Carrier Denial Risk: {{legal_risk_assessment.carrier_denial_risk}}</h3>
  </div>
  
  <div class="bad-faith-indicators">
    <h3>Bad Faith Warning Signs:</h3>
    <ul class="warning-list">
    {{#each legal_risk_assessment.bad_faith_indicators}}
      <li class="warning-item">{{this}}</li>
    {{/each}}
    </ul>
  </div>
  
  <div class="negotiation-leverage">
    <h3>Negotiation Advantages:</h3>
    <ul>
    {{#each legal_risk_assessment.negotiation_leverage}}
      <li>{{this}}</li>
    {{/each}}
    </ul>
  </div>
</div>
```

## Professional CSS Styling

```css
/* Cover Page Styling */
.cover-page {
  text-align: center;
  padding: 60px 40px;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border: 3px solid #bfa76f;
  margin-bottom: 40px;
}

.company-logo {
  max-width: 200px;
  margin-bottom: 30px;
}

.cover-page h1 {
  color: #2c3e50;
  font-size: 32px;
  margin-bottom: 15px;
}

.cover-page h2 {
  color: #bfa76f;
  font-size: 24px;
  margin-bottom: 30px;
}

/* Professional Table Styling */
.professional-table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  font-size: 12px;
  background: white;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.professional-table th {
  background: #bfa76f;
  color: white;
  padding: 12px 8px;
  text-align: left;
  font-weight: bold;
  border: 1px solid #ddd;
}

.professional-table td {
  padding: 10px 8px;
  border: 1px solid #ddd;
  vertical-align: top;
}

.professional-table tbody tr:nth-child(even) {
  background: #f8f9fa;
}

/* Risk Level Color Coding */
.high-risk {
  background-color: #ffebee !important;
  border-left: 4px solid #f44336;
}

.medium-risk {
  background-color: #fff3e0 !important;
  border-left: 4px solid #ff9800;
}

.low-risk {
  background-color: #e8f5e8 !important;
  border-left: 4px solid #4caf50;
}

/* Priority Level Styling */
.critical-priority {
  background-color: #ffcdd2 !important;
  font-weight: bold;
}

.high-priority {
  background-color: #ffe0b2 !important;
}

/* Coverage Gap Highlighting */
.coverage-gap {
  background-color: #ffebee !important;
}

.coverage-gap td:nth-child(4) {
  color: #d32f2f;
  font-weight: bold;
}

/* Section Styling */
.table-section {
  margin: 30px 0;
  page-break-inside: avoid;
}

.table-section h2 {
  color: #2c3e50;
  border-bottom: 2px solid #bfa76f;
  padding-bottom: 10px;
  margin-bottom: 20px;
}

/* Emergency Section Styling */
.emergency-section {
  background: #fff3cd;
  border: 2px solid #ffc107;
  padding: 20px;
  margin: 20px 0;
  border-radius: 8px;
}

.habitability-status.uninhabitable {
  background: #f8d7da;
  color: #721c24;
  padding: 15px;
  border-radius: 5px;
  font-weight: bold;
}

.habitability-status.habitable {
  background: #d4edda;
  color: #155724;
  padding: 15px;
  border-radius: 5px;
  font-weight: bold;
}

/* Legal Risk Styling */
.legal-section .high {
  color: #dc3545;
  font-weight: bold;
}

.legal-section .medium {
  color: #fd7e14;
  font-weight: bold;
}

.legal-section .low {
  color: #28a745;
  font-weight: bold;
}

/* Print Optimization */
@media print {
  .professional-table {
    font-size: 10px;
  }
  
  .table-section {
    page-break-inside: avoid;
  }
  
  .cover-page {
    page-break-after: always;
  }
}
```

## CraftMyPDF Integration

### Template Configuration:
- **Template Format**: HTML with Handlebars
- **Paper Size**: Letter (8.5" x 11")
- **Margins**: 0.75" all sides
- **Header**: Company logo and report title
- **Footer**: Page numbers and contact information

### Data Mapping:
```json
{
  "template_data": "{{5.choices.0.message.content}}",
  "current_date": "{{current_timestamp}}",
  "analysis_id": "{{analysis_id}}",
  "company_info": {
    "name": "Hayden Claims Group",
    "phone": "(469) 434-2121",
    "website": "haydenclaim.com"
  }
}
```

This comprehensive PDF template will generate professional storm damage assessment reports with all the structured tables and analysis from Step 5, formatted for client presentation and insurance submission.