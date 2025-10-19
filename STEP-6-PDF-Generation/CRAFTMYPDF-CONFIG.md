# CraftMyPDF Configuration

## API Credentials

**API Key:** `c536MjQ3MjE6MjQ4NjM6azhBV2h6Qm9QRTFxbzBVTg==`  
**Template ID:** `c3f77b2369deaf60`

---

## Zapier Configuration

### For Code by Zapier (PDF Generation Step)

```javascript
// Input Data Mapping
const config = {
    apiKey: 'c536MjQ3MjE6MjQ4NjM6azhBV2h6Qm9QRTFxbzBVTg==',
    templateId: 'c3f77b2369deaf60'
};

const generator = new OptimizedStormReportGenerator(config);
const result = await generator.generateProfessionalReport(
    inputData.optimized_analysis,  // From GPT step output
    inputData.form_data            // From form submission
);

output = [{
    success: result.success,
    pdf_url: result.pdfDetails?.downloadUrl || null,
    report_id: result.reportMetadata?.reportId || null,
    error_message: result.error?.message || null,
    next_steps: result.nextSteps || {},
    report_summary: result.reportSummary || {}
}];
```

---

## Direct API Testing

You can test the API directly with curl:

```bash
curl -X POST https://api.craftmypdf.com/v1/create \
  -H "X-API-KEY: c536MjQ3MjE6MjQ4NjM6azhBV2h6Qm9QRTFxbzBVTg==" \
  -H "Content-Type: application/json" \
  -d '{
    "template_id": "c3f77b2369deaf60",
    "data": {
      "report_id": "TEST-001",
      "property": {
        "full_address": "123 Test St, Austin, TX 78701"
      }
    }
  }'
```

---

## Template Management

**Edit Template:** https://craftmypdf.com/editor/c3f77b2369deaf60  
**Dashboard:** https://craftmypdf.com/dashboard

---

## Test Data

Use the sample data from:
- `sample-template-data.json` - Complete test data
- Copy into CraftMyPDF "Test Data" field to preview PDF

---

## Markdown Template

Your template should use variables from:
- `markdown-template.md` - Ready-to-use template
- Copy into CraftMyPDF Markdown editor

---

## Next Steps

1. ✅ API Key and Template ID configured
2. ⏳ Update CraftMyPDF template with Markdown template
3. ⏳ Update Zapier GPT step with new prompt
4. ⏳ Update Zapier PDF generation code
5. ⏳ Test complete workflow

---

**Security Note:** Keep this API key secure. It provides full access to your CraftMyPDF account.
