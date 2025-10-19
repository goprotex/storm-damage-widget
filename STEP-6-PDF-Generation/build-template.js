/**
 * CraftMyPDF Template Builder
 * Creates a professional storm damage report template via API
 */

const API_KEY = 'c536MjQ3MjE6MjQ4NjM6azhBV2h6Qm9QRTFxbzBVTg==';
const TEMPLATE_ID = 'c3f77b2369deaf60';
const API_BASE = 'https://api.craftmypdf.com/v1';

// Read the markdown template
const fs = require('fs');
const path = require('path');

const markdownTemplate = fs.readFileSync(
    path.join(__dirname, 'markdown-template.md'),
    'utf8'
);

/**
 * Update existing template with markdown content
 */
async function updateTemplate() {
    try {
        const response = await fetch(`${API_BASE}/template/${TEMPLATE_ID}`, {
            method: 'PUT',
            headers: {
                'X-API-KEY': API_KEY,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: 'Hayden Storm Damage Report - Professional',
                format: 'A4',
                orientation: 'portrait',
                editor: 'markdown',
                content: markdownTemplate,
                css: `
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
                    
                    h4 {
                        color: #343a40;
                        font-size: 12pt;
                        margin-top: 10px;
                        margin-bottom: 5px;
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
                    }
                    
                    em {
                        color: #6c757d;
                        font-style: italic;
                    }
                    
                    hr {
                        border: none;
                        border-top: 2px solid #bfa76f;
                        margin: 20px 0;
                    }
                    
                    .page-break {
                        page-break-after: always;
                    }
                    
                    /* Risk level colors */
                    .risk-critical { color: #dc3545; font-weight: bold; }
                    .risk-high { color: #ff6b35; font-weight: bold; }
                    .risk-moderate { color: #fd7e14; font-weight: bold; }
                    .risk-low { color: #28a745; font-weight: bold; }
                    
                    /* Priority colors */
                    .priority-critical { color: #dc3545; }
                    .priority-high { color: #ff6b35; }
                    .priority-medium { color: #fd7e14; }
                    .priority-low { color: #28a745; }
                    
                    /* Habitability status colors */
                    .habitability-safe { color: #28a745; }
                    .habitability-caution { color: #fd7e14; }
                    .habitability-unsafe { color: #ff6b35; }
                    .habitability-dangerous { color: #dc3545; }
                `
            })
        });

        if (!response.ok) {
            const error = await response.json().catch(() => ({}));
            throw new Error(`API Error: ${response.status} - ${error.message || response.statusText}`);
        }

        const result = await response.json();
        console.log('✅ Template Updated Successfully!');
        console.log('Template ID:', TEMPLATE_ID);
        console.log('Template Name:', result.name || 'Hayden Storm Damage Report');
        console.log('Edit URL:', `https://craftmypdf.com/editor/${TEMPLATE_ID}`);
        
        return result;

    } catch (error) {
        console.error('❌ Error updating template:', error.message);
        throw error;
    }
}

/**
 * Test the template with sample data
 */
async function testTemplate() {
    try {
        // Read sample data
        const sampleData = JSON.parse(
            fs.readFileSync(path.join(__dirname, 'sample-template-data.json'), 'utf8')
        );

        console.log('\n🧪 Testing template with sample data...');

        const response = await fetch(`${API_BASE}/create`, {
            method: 'POST',
            headers: {
                'X-API-KEY': API_KEY,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                template_id: TEMPLATE_ID,
                data: sampleData,
                export_type: 'pdf',
                expiration: 3600, // 1 hour for testing
                output_file: `hayden-test-report-${Date.now()}.pdf`
            })
        });

        if (!response.ok) {
            const error = await response.json().catch(() => ({}));
            throw new Error(`PDF Generation Error: ${response.status} - ${error.message || response.statusText}`);
        }

        const result = await response.json();
        console.log('✅ Test PDF Generated Successfully!');
        console.log('Download URL:', result.file);
        console.log('File Size:', result.file_size || 'Unknown');
        console.log('\n📥 Download your test PDF from the URL above!');
        
        return result;

    } catch (error) {
        console.error('❌ Error testing template:', error.message);
        throw error;
    }
}

/**
 * Main execution
 */
async function main() {
    console.log('🚀 Building CraftMyPDF Template for Hayden Claims Group\n');
    console.log('Template ID:', TEMPLATE_ID);
    console.log('API Key:', API_KEY.substring(0, 20) + '...\n');

    try {
        // Step 1: Update template
        console.log('📝 Step 1: Updating template with markdown content...');
        await updateTemplate();

        // Step 2: Test template
        console.log('\n📄 Step 2: Testing template with sample data...');
        await testTemplate();

        console.log('\n✅ ALL DONE! Your template is ready to use in Zapier!');
        console.log('\n📋 Next Steps:');
        console.log('1. Review the test PDF from the download URL above');
        console.log('2. Update your Zapier workflow with the GPT prompt');
        console.log('3. Update your Zapier PDF generation code');
        console.log('4. Test the complete workflow!');

    } catch (error) {
        console.error('\n❌ Template build failed:', error.message);
        process.exit(1);
    }
}

// Run the builder
main();
