# 🚀 Manual CraftMyPDF Template Setup Guide

## ⚠️ Important Note

CraftMyPDF's API has restrictions on template creation/editing. The best approach is to **manually create the template** in their dashboard, then use the API for PDF generation in Zapier.

---

## 📋 Step-by-Step Setup

### **Step 1: Access Your Template**

1. Go to: **https://craftmypdf.com/dashboard**
2. Log in with your CraftMyPDF account
3. Find template ID: **c3f77b2369deaf60**
4. Click "Edit" to open the template editor

---

### **Step 2: Choose Template Type**

CraftMyPDF supports multiple editors:

**Option A: Markdown Editor** (Recommended - Easiest)
- Click "Switch to Markdown Editor"
- This is the simplest way to build your template

**Option B: Visual Editor** (Drag & Drop)
- Use the visual drag-and-drop interface
- Good for precise positioning

**Option C: HTML Editor**
- If you're comfortable with HTML/CSS
- Most flexible but more complex

---

### **Step 3: Copy Template Content**

#### **For Markdown Editor:**

1. Open file: `markdown-template.md`
2. Copy **ALL content** from line 1 to the end
3. Paste into the CraftMyPDF Markdown editor
4. Click "Save"

#### **For Visual/HTML Editor:**

Use the variable mapping from `craftmypdf-template-data.json` as reference

---

### **Step 4: Add Custom CSS Styling**

In the CSS section of CraftMyPDF editor, paste this:

```css
@page {
    margin: 0.75in;
}

body {
    font-family: 'Helvetica', 'Arial', sans-serif;
    font-size: 11pt;
    line-height: 1.6;
    color: #2c3e50;
}

h1 {
    color: #2c3e50;
    font-size: 24pt;
    margin-bottom: 10px;
    border-bottom: 3px solid #bfa76f;
    padding-bottom: 10px;
}

h2 {
    color: #2c3e50;
    font-size: 18pt;
    margin-top: 20px;
    margin-bottom: 10px;
    border-bottom: 2px solid #bfa76f;
    padding-bottom: 5px;
}

h3 {
    color: #343a40;
    font-size: 14pt;
    margin-top: 15px;
    margin-bottom: 8px;
}

table {
    width: 100%;
    border-collapse: collapse;
    margin: 15px 0;
    font-size: 10pt;
}

th {
    background-color: #bfa76f;
    color: white;
    padding: 10px;
    text-align: left;
    font-weight: bold;
}

td {
    padding: 8px;
    border-bottom: 1px solid #dee2e6;
}

tr:nth-child(even) {
    background-color: #f8f9fa;
}

ul, ol {
    margin: 10px 0;
    padding-left: 25px;
}

li {
    margin: 5px 0;
}

strong {
    color: #2c3e50;
    font-weight: bold;
}

hr {
    border: none;
    border-top: 2px solid #bfa76f;
    margin: 20px 0;
}
```

---

### **Step 5: Test Your Template**

1. In CraftMyPDF editor, find the "Test Data" section
2. Open file: `sample-template-data.json`
3. Copy **ALL JSON content**
4. Paste into the "Test Data" field in CraftMyPDF
5. Click "Preview" or "Generate PDF"
6. Download and review the test PDF

---

### **Step 6: Verify Template Variables**

Make sure these key variables work in your preview:

✅ `{{property.full_address}}`  
✅ `{{executive_summary.overall_risk}}`  
✅ `{{tables.storm_risk_summary.title}}`  
✅ `{{company.name}}`  
✅ `{{report_id}}`

If any don't show data, check your variable syntax matches the sample data.

---

## 🔧 Alternative: Simple HTML Template

If Markdown isn't working, here's a minimal HTML template:

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body { font-family: Arial; margin: 40px; }
        h1 { color: #2c3e50; border-bottom: 3px solid #bfa76f; }
        table { width: 100%; border-collapse: collapse; }
        th { background: #bfa76f; color: white; padding: 10px; }
        td { padding: 8px; border-bottom: 1px solid #ddd; }
    </style>
</head>
<body>
    <h1>{{company.name}}</h1>
    <p>{{company.tagline}}</p>
    
    <h2>Property: {{property.full_address}}</h2>
    <p><strong>Risk Level:</strong> {{executive_summary.overall_risk}}</p>
    <p><strong>Claim Value:</strong> {{executive_summary.estimated_value}}</p>
    
    <h2>Storm Risk Summary</h2>
    <table>
        <thead>
            <tr>
                {{#tables.storm_risk_summary.headers}}
                <th>{{.}}</th>
                {{/tables.storm_risk_summary.headers}}
            </tr>
        </thead>
        <tbody>
            {{#tables.storm_risk_summary.rows}}
            <tr>
                {{#.}}
                <td>{{.}}</td>
                {{/.}}
            </tr>
            {{/tables.storm_risk_summary.rows}}
        </tbody>
    </table>
    
    <h2>Key Findings</h2>
    <ul>
        {{#executive_summary.key_findings}}
        <li>{{.}}</li>
        {{/executive_summary.key_findings}}
    </ul>
    
    <h2>Contact Information</h2>
    <p><strong>{{company.name}}</strong><br>
    Phone: {{company.phone}}<br>
    Email: {{company.email}}<br>
    {{company.license}}</p>
</body>
</html>
```

---

## ✅ Verification Checklist

Before moving to Zapier, verify:

- [ ] Template loads in CraftMyPDF editor
- [ ] Test data populates all variables correctly
- [ ] PDF preview generates without errors
- [ ] All 6 tables render properly
- [ ] Company branding (colors, logo) looks professional
- [ ] Text is readable and properly formatted

---

## 🔄 Once Template is Ready

After your template is working in CraftMyPDF:

1. ✅ Template ID confirmed: **c3f77b2369deaf60**
2. ✅ API Key confirmed: **c536MjQ3MjE2MjQ4NjM6azhBV2h6Qm9QRTFxbzBVTg==**
3. ⏩ Move to Zapier implementation
4. ⏩ Update GPT prompt
5. ⏩ Update PDF generation code
6. ⏩ Test complete workflow

---

## 🆘 Need Help?

**If variables aren't populating:**
- Check that variable names match exactly (case-sensitive)
- Verify Handlebars syntax: `{{variable}}` or `{{#array}}{{.}}{{/array}}`
- Test with the sample-template-data.json file

**If PDF doesn't generate:**
- Verify template ID is correct
- Check API key is valid
- Ensure template is set to "Active" in dashboard

**If styling looks wrong:**
- Review CSS in the template editor
- Test with different page sizes (A4 vs Letter)
- Check margin settings

---

## 📚 Reference Files

All in `STEP-6-PDF-Generation/` folder:

- **markdown-template.md** - Complete Markdown template
- **sample-template-data.json** - Test data for preview
- **craftmypdf-template-data.json** - Variable mapping reference
- **CRAFTMYPDF-CONFIG.md** - Your API credentials
- **optimized-pdf-generator.js** - Code for Zapier

---

**Ready to proceed? Start with Step 1 above!** 🚀
