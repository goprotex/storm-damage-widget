# CraftMyPDF API Template Creation Guide

## Overview

CraftMyPDF supports template creation via their API, which is more flexible than the web UI editor for complex templates.

## API Endpoints

### Base URL
```
https://api.craftmypdf.com/v1
```

### Authentication
All API calls require your API key in the header:
```
X-API-KEY: your_api_key_here
```

---

## Method 1: Create Template via API (JSON-based)

CraftMyPDF supports creating templates using their JSON template format, which is easier than HTML for complex layouts.

### Create Template Endpoint

```http
POST https://api.craftmypdf.com/v1/create-template
```

### Request Body Structure

```json
{
  "name": "Hayden Storm Damage Report",
  "format": "pdf",
  "width": 8.5,
  "height": 11,
  "unit": "in",
  "orientation": "portrait",
  "components": [
    {
      "type": "text",
      "text": "{{property.full_address}}",
      "top": 1,
      "left": 1,
      "width": 6.5,
      "height": 0.5,
      "font_size": 24,
      "font_family": "Helvetica",
      "font_weight": "bold",
      "color": "#2c3e50"
    },
    {
      "type": "rectangle",
      "top": 1.6,
      "left": 1,
      "width": 6.5,
      "height": 0.01,
      "background_color": "#bfa76f"
    }
  ]
}
```

---

## Method 2: Use HTML/CSS Template (Recommended)

CraftMyPDF also supports HTML/CSS templates via their editor API. The trick is to use their **Template Editor API** to programmatically create templates.

### Template Editor API

```http
POST https://api.craftmypdf.com/v1/editor/save
```

### Request Body

```json
{
  "template_name": "Hayden Storm Damage Report v2",
  "html": "<!DOCTYPE html><html>...</html>",
  "css": "body { margin: 0; padding: 20px; }",
  "header": "<div>Header HTML</div>",
  "footer": "<div>Footer HTML</div>",
  "format": "A4",
  "orientation": "portrait"
}
```

---

## Method 3: Use CraftMyPDF's Visual Editor + Export

The **best approach** is to:

1. Create a basic template in CraftMyPDF's visual editor (drag-drop)
2. Get the template ID
3. Use the API to **update** that template with your data

### Why This Works Better:

- CraftMyPDF's visual editor creates the template structure
- You can then use the API to populate it with data
- No need to build complex HTML that might not render correctly

---

## Method 4: Programmatic Template Creation (Recommended Solution)

Create a Node.js script to build the template programmatically:

### Installation

```bash
npm install axios
```

### Script: `create-craftmypdf-template.js`

```javascript
const axios = require('axios');

const CRAFTMYPDF_API_KEY = 'your_api_key_here';
const API_BASE = 'https://api.craftmypdf.com/v1';

// Template configuration
const templateConfig = {
  name: "Hayden Storm Damage Report - Professional",
  format: "letter",
  orientation: "portrait",
  width: 8.5,
  height: 11,
  unit: "in",
  margin_top: 0.5,
  margin_bottom: 0.5,
  margin_left: 0.75,
  margin_right: 0.75,
  
  // Define template sections
  sections: [
    // Header
    {
      name: "header",
      height: 1.5,
      components: [
        {
          type: "image",
          url: "{{company.logoUrl}}",
          top: 0.25,
          left: 0.75,
          width: 2,
          height: 0.5
        },
        {
          type: "text",
          text: "{{company.report_header}}",
          top: 0.25,
          left: 3,
          width: 5,
          height: 0.5,
          font_size: 16,
          font_family: "Helvetica",
          font_weight: "bold",
          color: "#2c3e50"
        }
      ]
    },
    
    // Cover page
    {
      name: "cover",
      components: [
        {
          type: "text",
          text: "Storm Damage Intelligence Report",
          top: 3,
          left: 0.75,
          width: 7,
          height: 1,
          font_size: 32,
          font_family: "Helvetica",
          font_weight: "bold",
          color: "#2c3e50",
          alignment: "center"
        },
        {
          type: "text",
          text: "{{property.full_address}}",
          top: 4.2,
          left: 0.75,
          width: 7,
          height: 0.6,
          font_size: 20,
          color: "#343a40",
          alignment: "center"
        },
        {
          type: "text",
          text: "Report ID: {{report_id}}",
          top: 5,
          left: 0.75,
          width: 7,
          height: 0.4,
          font_size: 12,
          color: "#6c757d",
          alignment: "center"
        },
        {
          type: "text",
          text: "Generated: {{generated_date}}",
          top: 5.5,
          left: 0.75,
          width: 7,
          height: 0.4,
          font_size: 12,
          color: "#6c757d",
          alignment: "center"
        }
      ]
    }
  ]
};

async function createTemplate() {
  try {
    const response = await axios.post(
      `${API_BASE}/create-template`,
      templateConfig,
      {
        headers: {
          'X-API-KEY': CRAFTMYPDF_API_KEY,
          'Content-Type': 'application/json'
        }
      }
    );
    
    console.log('✅ Template Created Successfully!');
    console.log('Template ID:', response.data.template_id);
    console.log('Template URL:', response.data.template_url);
    
    return response.data;
    
  } catch (error) {
    console.error('❌ Error creating template:', error.response?.data || error.message);
    throw error;
  }
}

// Run the function
createTemplate();
```

---

## Method 5: Simple Workaround - Use Markdown

CraftMyPDF supports **Markdown** which is much simpler than HTML:

### Markdown Template Example

```markdown
# Storm Damage Intelligence Report

**Property:** {{property.full_address}}  
**Report ID:** {{report_id}}  
**Generated:** {{generated_date}}

---

## Executive Summary

**Overall Risk Level:** {{executive_summary.overall_risk}}  
**Damage Probability:** {{executive_summary.damage_probability}}  
**Estimated Claim Value:** {{executive_summary.estimated_value}}

### Key Findings

{{#executive_summary.key_findings}}
- {{.}}
{{/executive_summary.key_findings}}

---

## Storm Risk Summary

{{tables.storm_risk_summary.title}}

| Date | Type | Measurement | Distance | Risk |
|------|------|-------------|----------|------|
{{#tables.storm_risk_summary.rows}}
| {{.[0]}} | {{.[1]}} | {{.[2]}} | {{.[3]}} | {{.[4]}} |
{{/tables.storm_risk_summary.rows}}

---

## Emergency Response

**Status:** {{emergency.habitability}}  
**Safety Level:** {{emergency.safety_level}}

### Immediate Actions Required:

{{#emergency.immediate_actions}}
- {{.}}
{{/emergency.immediate_actions}}

---

## Contact Information

**{{company.name}}**  
{{company.tagline}}  
Phone: {{company.phone}}  
Email: {{company.email}}  
Website: {{company.website}}  
{{company.license}}
```

---

## Recommended Approach for Your Use Case

Since CraftMyPDF's HTML editor isn't working for you, here's what I recommend:

### **Option A: Use Their Visual Editor** (Easiest)
1. Log into CraftMyPDF dashboard
2. Use the **drag-and-drop visual editor**
3. Place text boxes, tables, images where you want them
4. Use the variable syntax: `{{property.full_address}}`
5. Get the template ID and use it in your Zapier workflow

### **Option B: Use Markdown Template** (Simplest)
1. Create a new template in CraftMyPDF
2. Select "Markdown" as template type
3. Paste the Markdown template above
4. Customize styling with their CSS options

### **Option C: Use Alternative PDF Service**
Consider these alternatives that might have better HTML support:
- **DocRaptor** - Full HTML/CSS support
- **PDFShift** - HTML to PDF API
- **Puppeteer/Playwright** - Self-hosted HTML to PDF (runs in Zapier Code step)

---

## Quick Fix: Test with Simple HTML First

Try this minimal HTML in CraftMyPDF to test:

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 40px;
    }
    .header {
      background: #bfa76f;
      padding: 20px;
      color: white;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>{{company.name}}</h1>
    <p>{{company.tagline}}</p>
  </div>
  
  <h2>Property Information</h2>
  <p><strong>Address:</strong> {{property.full_address}}</p>
  <p><strong>Risk Level:</strong> {{executive_summary.overall_risk}}</p>
  
  <h2>Storm Events</h2>
  <table border="1">
    <tr>
      {{#tables.storm_risk_summary.headers}}
      <th>{{.}}</th>
      {{/tables.storm_risk_summary.headers}}
    </tr>
    {{#tables.storm_risk_summary.rows}}
    <tr>
      {{#.}}
      <td>{{.}}</td>
      {{/.}}
    </tr>
    {{/tables.storm_risk_summary.rows}}
  </table>
</body>
</html>
```

---

## Need Help?

Let me know:
1. What error message you're getting in CraftMyPDF?
2. Do you want me to create a Markdown template for you?
3. Should we explore alternative PDF services?
4. Want me to create a Node.js script to build the template via API?
