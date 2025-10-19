# 🎯 CraftMyPDF Template Setup - Quick Start

## Your Credentials

**API Key:** `c536MjQ3MjE6MjQ4NjM6azhBV2h6Qm9QRTFxbzBVTg==`  
**Template ID:** `c3f77b2369deaf60`  
**Edit URL:** <https://craftmypdf.com/editor/c3f77b2369deaf60>

---

## ⚡ Quick Setup (5 Minutes)

### 1. Open Your Template

Visit: <https://craftmypdf.com/editor/c3f77b2369deaf60>

### 2. Switch to Markdown Editor

- Click "Settings" or "Editor Type"
- Select "Markdown Editor" (easiest option)

### 3. Copy Template Content

- Open: `markdown-template.md` in this folder
- Select ALL (Ctrl+A)
- Copy (Ctrl+C)
- Paste into CraftMyPDF Markdown editor

### 4. Add CSS Styling

Copy this CSS into the "Custom CSS" section:

```css
@page { margin: 0.75in; }
body { font-family: Arial; font-size: 11pt; color: #2c3e50; }
h1 { color: #2c3e50; font-size: 24pt; border-bottom: 3px solid #bfa76f; padding-bottom: 10px; }
h2 { color: #2c3e50; font-size: 18pt; border-bottom: 2px solid #bfa76f; padding-bottom: 5px; }
table { width: 100%; border-collapse: collapse; }
th { background-color: #bfa76f; color: white; padding: 10px; }
td { padding: 8px; border-bottom: 1px solid #dee2e6; }
tr:nth-child(even) { background-color: #f8f9fa; }
```

### 5. Test With Sample Data

- Open: `sample-template-data.json`
- Copy ALL JSON
- Paste into "Test Data" field in CraftMyPDF
- Click "Preview PDF"

### 6. Download Test PDF

- Review the PDF
- Check all tables render correctly
- Verify all variables populate

---

## ✅ Verification Checklist

- [ ] Template opens in CraftMyPDF editor
- [ ] Markdown content pasted successfully
- [ ] CSS styling applied
- [ ] Test data loaded
- [ ] PDF preview generates without errors
- [ ] All 6 tables visible in PDF
- [ ] Company name and branding show correctly
- [ ] Colors match (gold #bfa76f for headers)

---

## 🚀 Once Template Works

### Next: Update Zapier Workflow

1. **GPT Analysis Step**
   - Prompt: Copy from `zapier-gpt-prompt.md`
   - Schema URL: `https://raw.githubusercontent.com/goprotex/storm-damage-widget/main/STEP-5-GPT5-Analysis/optimized-gpt5-pdf-schema.json`

2. **PDF Generation Step**
   - Code: Copy from `optimized-pdf-generator.js`
   - API Key: `c536MjQ3MjE6MjQ4NjM6azhBV2h6Qm9QRTFxbzBVTg==`
   - Template ID: `c3f77b2369deaf60`

3. **Test Complete Flow**
   - Submit test form
   - Verify GPT analysis runs
   - Check PDF generates
   - Download and review final PDF

---

## 📁 Reference Files

| File | Purpose |
|------|---------|
| `markdown-template.md` | Complete template content |
| `sample-template-data.json` | Test data for preview |
| `craftmypdf-template-data.json` | Variable reference |
| `optimized-pdf-generator.js` | Zapier PDF code |
| `zapier-gpt-prompt.md` | GPT analysis prompt |
| `MANUAL-TEMPLATE-SETUP.md` | Detailed instructions |

---

## 🆘 Troubleshooting

**Variables not showing?**
- Check variable syntax: `{{property.full_address}}`
- Verify test data has matching field names
- Ensure JSON is valid

**PDF won't generate?**
- Confirm template ID is correct
- Check API key is valid
- Verify template is "Active" in dashboard

**Styling looks wrong?**
- Review CSS syntax
- Check for typos in color codes
- Try removing CSS and re-adding piece by piece

---

## 📞 Need Help?

**CraftMyPDF Docs:** <https://craftmypdf.com/docs>  
**Support:** Check their dashboard for support options

---

**Start with Step 1 above! You're almost done!** 🎉
