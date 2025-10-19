# CraftMyPDF Template Data Mapping Guide

## Optimized Storm Damage Report Integration

This guide shows how to map the optimized GPT analysis data to your CraftMyPDF template for professional storm damage reports.

## Template Data Structure Overview

The optimized PDF generator provides a flattened, template-friendly data structure:

### 1. Report Identification

```text
{{report_id}}                    // Unique report identifier
{{generated_date}}               // Long format date
{{generated_time}}               // Time generated
```

### 2. Company Branding

```text
{{company.name}}                 // "Hayden Claims Group"
{{company.tagline}}              // Company tagline
{{company.phone}}                // Phone number
{{company.email}}                // Email address
{{company.website}}              // Website URL
{{company.logoUrl}}              // Logo image URL
{{company.address}}              // Company address
{{company.license}}              // License information
{{company.report_header}}        // Header text for pages
{{company.footer_text}}          // Footer text
```

### 3. Styling Variables

```text
{{styling.primaryColor}}         // #bfa76f (Hayden gold)
{{styling.secondaryColor}}       // #2c3e50 (Dark blue)
{{styling.accentColor}}          // #343a40 (Dark gray)
{{styling.successColor}}         // #28a745 (Green)
{{styling.warningColor}}         // #fd7e14 (Orange)
{{styling.dangerColor}}          // #dc3545 (Red)
```

### 4. Property Information

```text
{{property.address}}             // Street address
{{property.city}}                // City
{{property.state}}               // State
{{property.zip}}                 // ZIP code
{{property.full_address}}        // Complete formatted address
{{property.property_type}}       // Property type
{{property.year_built}}          // Year built
{{property.contact_name}}        // Contact name
{{property.contact_phone}}       // Contact phone
{{property.contact_email}}       // Contact email
```

### 5. Executive Summary

```text
{{executive_summary.overall_risk}}           // Risk level text
{{executive_summary.risk_color}}             // Color code for risk level
{{executive_summary.damage_probability}}     // Probability text
{{executive_summary.estimated_value}}        // Claim value range
{{executive_summary.confidence_level}}       // Analysis confidence
{{executive_summary.hayden_advantage}}       // Value proposition

// Arrays for lists:
{{#executive_summary.key_findings}}
  <li>{{.}}</li>
{{/executive_summary.key_findings}}

{{#executive_summary.critical_actions}}
  <li>{{.}}</li>
{{/executive_summary.critical_actions}}
```

### 6. Professional Tables

Each table follows this structure:

```handlebars
{{tables.storm_risk_summary.title}}
{{tables.storm_risk_summary.subtitle}}
{{#tables.storm_risk_summary.headers}}
  <th>{{.}}</th>
{{/tables.storm_risk_summary.headers}}

{{#tables.storm_risk_summary.rows}}
  <tr>
    {{#.}}
      <td>{{.}}</td>
    {{/.}}
  </tr>
{{/tables.storm_risk_summary.rows}}

{{#tables.storm_risk_summary.insights}}
  <li>{{.}}</li>
{{/tables.storm_risk_summary.insights}}
```

Available tables:

- `storm_risk_summary`
- `property_damage_assessment`
- `repair_cost_analysis`
- `insurance_claim_strategy`
- `contractor_market_intelligence`
- `risk_mitigation_plan`

### 7. Emergency Response

```handlebars
{{emergency.habitability}}                  // Habitability status
{{emergency.habitability_color}}            // Color for status
{{emergency.safety_level}}                  // Safety level text

{{#emergency.immediate_actions}}
  <li>{{.}}</li>
{{/emergency.immediate_actions}}

{{#emergency.emergency_contacts}}
  <div>{{type}}: {{number}}</div>
{{/emergency.emergency_contacts}}
```

### 8. Recommendations

```handlebars
// Next steps with enhanced formatting
{{#recommendations.next_steps}}
  <div class="action-item">
    <div class="action" style="color: {{priority_color}}">{{action}}</div>
    <div class="timeline">{{timeline}}</div>
    <div class="priority">{{priority}}</div>
    <div class="responsible">{{responsible}}</div>
    <div class="cost">{{cost}}</div>
  </div>
{{/recommendations.next_steps}}

// Professional inspections
{{#recommendations.inspections}}
  <div class="inspection-item">
    <div class="type">{{type}}</div>
    <div class="urgency" style="color: {{urgency_color}}">{{urgency}}</div>
    <div class="purpose">{{purpose}}</div>
    <div class="cost">{{cost}}</div>
    {{#hayden_coordination}}
      <div class="coordination">✓ Hayden Coordinated</div>
    {{/hayden_coordination}}
  </div>
{{/recommendations.inspections}}

{{recommendations.insurance_timeline}}      // Insurance timeline text
```

### 9. Hayden Value Proposition

```handlebars
{{hayden_value.value_proposition}}          // Main value statement
{{hayden_value.potential_savings}}          // Savings estimate
{{hayden_value.success_probability}}        // Success probability
{{hayden_value.risk_without_help}}          // Risk statement

{{#hayden_value.competitive_advantages}}
  <li>{{.}}</li>
{{/hayden_value.competitive_advantages}}
```

### 10. Risk Summary

```handlebars
{{risk_summary.vulnerability_score}}        // 0-10 score
{{risk_summary.vulnerability_level}}        // Text level
{{risk_summary.storm_events_count}}         // Number of events
{{risk_summary.data_quality}}               // Data quality score

{{#risk_summary.cumulative_factors}}
  <li>{{.}}</li>
{{/risk_summary.cumulative_factors}}
```

### 11. Report Metadata

```handlebars
{{metadata.analysis_methodology}}           // Methodology description
{{metadata.data_sources}}                   // Number of sources
{{metadata.update_recommendation}}          // When to update
{{metadata.report_version}}                 // Version info

{{#metadata.limitations}}
  <li>{{.}}</li>
{{/metadata.limitations}}
```

## Sample HTML Template Structure

```html
<!DOCTYPE html>
<html>
<head>
    <title>Storm Damage Intelligence Report</title>
    <style>
        :root {
            --primary-color: {{styling.primaryColor}};
            --secondary-color: {{styling.secondaryColor}};
            --success-color: {{styling.successColor}};
            --warning-color: {{styling.warningColor}};
            --danger-color: {{styling.dangerColor}};
        }
        
        .risk-{{executive_summary.overall_risk}} {
            color: {{executive_summary.risk_color}};
            font-weight: bold;
        }
        
        .table-container {
            margin: 20px 0;
            page-break-inside: avoid;
        }
        
        .insights {
            background: #f8f9fa;
            padding: 10px;
            margin-top: 10px;
            border-left: 4px solid var(--primary-color);
        }
    </style>
</head>
<body>
    <!-- Cover Page -->
    <div class="cover-page">
        <img src="{{company.logoUrl}}" alt="{{company.name}} Logo">
        <h1>Storm Damage Intelligence Report</h1>
        <h2>{{property.full_address}}</h2>
        <div class="generated-info">
            Generated: {{generated_date}} at {{generated_time}}
        </div>
        <div class="company-info">
            <p>{{company.name}}</p>
            <p>{{company.tagline}}</p>
            <p>{{company.phone}} | {{company.website}}</p>
            <p>{{company.license}}</p>
        </div>
    </div>

    <!-- Executive Summary -->
    <div class="section executive-summary">
        <h2>Executive Summary</h2>
        <div class="risk-assessment">
            <h3>Overall Risk Level: 
                <span class="risk-{{executive_summary.overall_risk}}">
                    {{executive_summary.overall_risk}}
                </span>
            </h3>
            <p><strong>Damage Probability:</strong> {{executive_summary.damage_probability}}</p>
            <p><strong>Estimated Claim Value:</strong> {{executive_summary.estimated_value}}</p>
        </div>
        
        <div class="key-findings">
            <h4>Key Findings:</h4>
            <ul>
                {{#executive_summary.key_findings}}
                <li>{{.}}</li>
                {{/executive_summary.key_findings}}
            </ul>
        </div>
        
        <div class="critical-actions">
            <h4>Critical Actions Required:</h4>
            <ul>
                {{#executive_summary.critical_actions}}
                <li>{{.}}</li>
                {{/executive_summary.critical_actions}}
            </ul>
        </div>
    </div>

    <!-- Professional Tables -->
    {{#tables}}
    <div class="table-container">
        <h3>{{title}}</h3>
        {{#subtitle}}<p class="subtitle">{{subtitle}}</p>{{/subtitle}}
        
        <table class="professional-table">
            <thead>
                <tr>
                    {{#headers}}
                    <th>{{.}}</th>
                    {{/headers}}
                </tr>
            </thead>
            <tbody>
                {{#rows}}
                <tr>
                    {{#.}}
                    <td>{{.}}</td>
                    {{/.}}
                </tr>
                {{/rows}}
            </tbody>
        </table>
        
        {{#insights}}
        <div class="insights">
            <h5>Key Insights:</h5>
            <ul>
                {{#.}}
                <li>{{.}}</li>
                {{/.}}
            </ul>
        </div>
        {{/insights}}
    </div>
    {{/tables}}

    <!-- Emergency Response -->
    <div class="section emergency-response">
        <h2>Emergency Response Assessment</h2>
        <div class="habitability-status">
            <h3>Habitability Status: 
                <span style="color: {{emergency.habitability_color}}">
                    {{emergency.habitability}}
                </span>
            </h3>
            <p><strong>Safety Level:</strong> {{emergency.safety_level}}</p>
        </div>
        
        <div class="immediate-actions">
            <h4>Immediate Priorities:</h4>
            <ul>
                {{#emergency.immediate_actions}}
                <li>{{.}}</li>
                {{/emergency.immediate_actions}}
            </ul>
        </div>
    </div>

    <!-- Recommendations -->
    <div class="section recommendations">
        <h2>Professional Recommendations</h2>
        
        <h3>Next Steps:</h3>
        {{#recommendations.next_steps}}
        <div class="action-item">
            <div class="action-header">
                <span class="action-text">{{action}}</span>
                <span class="priority" style="color: {{priority_color}}">{{priority}}</span>
            </div>
            <div class="action-details">
                <span>Timeline: {{timeline}}</span> | 
                <span>Responsible: {{responsible}}</span> | 
                <span>Cost: {{cost}}</span>
            </div>
        </div>
        {{/recommendations.next_steps}}
    </div>

    <!-- Hayden Value Proposition -->
    <div class="section hayden-value">
        <h2>Hayden Claims Group Advantage</h2>
        <p class="value-prop">{{hayden_value.value_proposition}}</p>
        
        <h4>Our Competitive Advantages:</h4>
        <ul>
            {{#hayden_value.competitive_advantages}}
            <li>{{.}}</li>
            {{/hayden_value.competitive_advantages}}
        </ul>
        
        <div class="savings-highlight">
            <p><strong>Potential Savings:</strong> {{hayden_value.potential_savings}}</p>
            <p><strong>Success Probability:</strong> {{hayden_value.success_probability}}</p>
        </div>
    </div>

    <!-- Footer -->
    <div class="footer">
        <p>{{company.footer_text}}</p>
        <p>Report ID: {{report_id}} | Confidence: {{executive_summary.confidence_level}}</p>
    </div>
</body>
</html>
```

## Integration Tips

1. **Use conditional rendering** for optional data:

   ```html
   {{#property.year_built}}
     <p>Year Built: {{property.year_built}}</p>
   {{/property.year_built}}
   ```

2. **Style based on data values**:

   ```html
   <div class="risk-level" style="background-color: {{executive_summary.risk_color}}">
     {{executive_summary.overall_risk}}
   </div>
   ```

3. **Handle empty arrays gracefully**:

   ```html
   {{#executive_summary.key_findings}}
     <ul>
       {{#.}}
       <li>{{.}}</li>
       {{/.}}
     </ul>
   {{/executive_summary.key_findings}}
   {{^executive_summary.key_findings}}
     <p>Analysis in progress...</p>
   {{/executive_summary.key_findings}}
   ```

This structure provides maximum flexibility for creating professional PDF reports while maintaining consistency with the optimized data schema.
