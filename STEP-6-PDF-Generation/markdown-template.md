# Storm Damage Intelligence Report

---

**{{company.name}}**  
*{{company.tagline}}*

**Report Generated:** {{generated_date}} at {{generated_time}}  
**Report ID:** {{report_id}}

---

## Property Information

**Address:** {{property.full_address}}  
**Property Type:** {{property.property_type}}  
**Year Built:** {{property.year_built}}  
**Contact:** {{property.contact_name}}  
**Phone:** {{property.contact_phone}}

---

## Executive Summary

### Overall Risk Assessment

**Risk Level:** <span style="color: {{executive_summary.risk_color}}; font-weight: bold;">{{executive_summary.overall_risk}}</span>  
**Damage Probability:** {{executive_summary.damage_probability}}  
**Estimated Claim Value:** **{{executive_summary.estimated_value}}**  
**Analysis Confidence:** {{executive_summary.confidence_level}}

### Key Findings

{{#executive_summary.key_findings}}
- {{.}}

{{/executive_summary.key_findings}}

### Critical Actions Required

{{#executive_summary.critical_actions}}
- **{{.}}**

{{/executive_summary.critical_actions}}

---

## {{tables.storm_risk_summary.title}}

*{{tables.storm_risk_summary.subtitle}}*

| {{#tables.storm_risk_summary.headers}}{{.}} | {{/tables.storm_risk_summary.headers}}
|{{#tables.storm_risk_summary.headers}}------|{{/tables.storm_risk_summary.headers}}
{{#tables.storm_risk_summary.rows}}| {{#.}}{{.}} | {{/.}}
{{/tables.storm_risk_summary.rows}}

**Key Insights:**

{{#tables.storm_risk_summary.insights}}
- {{.}}
{{/tables.storm_risk_summary.insights}}

---

## {{tables.property_damage_assessment.title}}

*{{tables.property_damage_assessment.subtitle}}*

| {{#tables.property_damage_assessment.headers}}{{.}} | {{/tables.property_damage_assessment.headers}}
|{{#tables.property_damage_assessment.headers}}------|{{/tables.property_damage_assessment.headers}}
{{#tables.property_damage_assessment.rows}}| {{#.}}{{.}} | {{/.}}
{{/tables.property_damage_assessment.rows}}

**Key Insights:**

{{#tables.property_damage_assessment.insights}}
- {{.}}
{{/tables.property_damage_assessment.insights}}

---

## {{tables.repair_cost_analysis.title}}

*{{tables.repair_cost_analysis.subtitle}}*

| {{#tables.repair_cost_analysis.headers}}{{.}} | {{/tables.repair_cost_analysis.headers}}
|{{#tables.repair_cost_analysis.headers}}------|{{/tables.repair_cost_analysis.headers}}
{{#tables.repair_cost_analysis.rows}}| {{#.}}{{.}} | {{/.}}
{{/tables.repair_cost_analysis.rows}}

**Total Estimate Range:** **{{tables.repair_cost_analysis.total_estimate}}**

**Key Insights:**

{{#tables.repair_cost_analysis.insights}}
- {{.}}
{{/tables.repair_cost_analysis.insights}}

---

## {{tables.insurance_claim_strategy.title}}

*{{tables.insurance_claim_strategy.subtitle}}*

**Claim Success Probability:** <span style="color: #28a745; font-weight: bold;">{{tables.insurance_claim_strategy.claim_probability}}</span>

| {{#tables.insurance_claim_strategy.headers}}{{.}} | {{/tables.insurance_claim_strategy.headers}}
|{{#tables.insurance_claim_strategy.headers}}------|{{/tables.insurance_claim_strategy.headers}}
{{#tables.insurance_claim_strategy.rows}}| {{#.}}{{.}} | {{/.}}
{{/tables.insurance_claim_strategy.rows}}

**Strategic Insights:**

{{#tables.insurance_claim_strategy.insights}}
- {{.}}
{{/tables.insurance_claim_strategy.insights}}

---

## {{tables.contractor_market_intelligence.title}}

*{{tables.contractor_market_intelligence.subtitle}}*

**Market Conditions:** {{tables.contractor_market_intelligence.market_conditions}}

| {{#tables.contractor_market_intelligence.headers}}{{.}} | {{/tables.contractor_market_intelligence.headers}}
|{{#tables.contractor_market_intelligence.headers}}------|{{/tables.contractor_market_intelligence.headers}}
{{#tables.contractor_market_intelligence.rows}}| {{#.}}{{.}} | {{/.}}
{{/tables.contractor_market_intelligence.rows}}

**Market Intelligence:**

{{#tables.contractor_market_intelligence.insights}}
- {{.}}
{{/tables.contractor_market_intelligence.insights}}

---

## {{tables.risk_mitigation_plan.title}}

*{{tables.risk_mitigation_plan.subtitle}}*

| {{#tables.risk_mitigation_plan.headers}}{{.}} | {{/tables.risk_mitigation_plan.headers}}
|{{#tables.risk_mitigation_plan.headers}}------|{{/tables.risk_mitigation_plan.headers}}
{{#tables.risk_mitigation_plan.rows}}| {{#.}}{{.}} | {{/.}}
{{/tables.risk_mitigation_plan.rows}}

**Mitigation Strategy:**

{{#tables.risk_mitigation_plan.insights}}
- {{.}}
{{/tables.risk_mitigation_plan.insights}}

---

## Emergency Response Assessment

**Habitability Status:** <span style="color: {{emergency.habitability_color}}; font-weight: bold;">{{emergency.habitability}}</span>  
**Safety Level:** **{{emergency.safety_level}}**

### Immediate Priorities

{{#emergency.immediate_actions}}
- ⚠️ {{.}}

{{/emergency.immediate_actions}}

---

## Professional Recommendations

### Next Steps

{{#recommendations.next_steps}}
#### {{action}}

- **Timeline:** {{timeline}}
- **Priority:** <span style="color: {{priority_color}};">{{priority}}</span>
- **Responsible Party:** {{responsible}}
- **Estimated Cost:** {{cost}}

{{/recommendations.next_steps}}

### Required Professional Inspections

{{#recommendations.inspections}}
#### {{type}}

- **Urgency:** <span style="color: {{urgency_color}};">{{urgency}}</span>
- **Purpose:** {{purpose}}
- **Cost:** {{cost}}
{{#hayden_coordination}}- ✓ **Hayden Can Coordinate This Service**{{/hayden_coordination}}

{{/recommendations.inspections}}

### Documentation Priorities

{{#recommendations.documentation}}
- {{.}}
{{/recommendations.documentation}}

### Insurance Claim Timeline

{{recommendations.insurance_timeline}}

---

## Hayden Claims Group Advantage

### Our Value Proposition

{{hayden_value.value_proposition}}

### Competitive Advantages

{{#hayden_value.competitive_advantages}}
- ✓ {{.}}

{{/hayden_value.competitive_advantages}}

### Financial Impact

**Potential Savings:** **{{hayden_value.potential_savings}}**  
**Success Probability:** **{{hayden_value.success_probability}}**

### Risk Without Professional Help

{{hayden_value.risk_without_help}}

---

## Risk Summary

**Vulnerability Score:** {{risk_summary.vulnerability_score}}/10 ({{risk_summary.vulnerability_level}})  
**Storm Events Analyzed:** {{risk_summary.storm_events_count}}  
**Data Quality Score:** {{risk_summary.data_quality}}/10

### Cumulative Risk Factors

{{#risk_summary.cumulative_factors}}
- {{.}}
{{/risk_summary.cumulative_factors}}

---

## Technical Appendix

**Analysis Methodology:** {{metadata.analysis_methodology}}

**Data Sources Analyzed:** {{metadata.data_sources}} independent sources

**Report Version:** {{metadata.report_version}}

### Known Limitations

{{#metadata.limitations}}
- {{.}}
{{/metadata.limitations}}

### Recommended Updates

{{metadata.update_recommendation}}

---

## Contact Hayden Claims Group

**{{company.name}}**  
*{{company.tagline}}*

📞 **Phone:** {{company.phone}}  
✉️ **Email:** {{company.email}}  
🌐 **Website:** {{company.website}}  
📍 **Location:** {{company.address}}  
📋 **License:** {{company.license}}

---

*This report is confidential and prepared exclusively for the property owner. Generated {{generated_date}}.*

**Report ID:** {{report_id}} | **Confidence:** {{executive_summary.confidence_level}}
