/**
 * CraftMyPDF Template Tester
 * Tests your template with sample data to verify it works
 */

const API_KEY = 'c536MjQ3MjE6MjQ4NjM6azhBV2h6Qm9QRTFxbzBVTg==';
const TEMPLATE_ID = 'c3f77b2369deaf60';
const API_BASE = 'https://api.craftmypdf.com/v1';

const fs = require('fs');
const path = require('path');

/**
 * Generate PDF with sample data
 */
async function generateTestPDF() {
    try {
        // Read sample data
        const sampleData = JSON.parse(
            fs.readFileSync(path.join(__dirname, 'sample-template-data.json'), 'utf8')
        );

        console.log('🧪 Generating test PDF with sample data...\n');

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
                expiration: 86400, // 24 hours
                output_file: `hayden-storm-report-test-${Date.now()}.pdf`,
                load_data_from: 'json'
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            let errorData;
            try {
                errorData = JSON.parse(errorText);
            } catch {
                errorData = { message: errorText };
            }
            throw new Error(`API Error (${response.status}): ${errorData.message || errorData.error || errorText}`);
        }

        const result = await response.json();
        
        console.log('✅ Test PDF Generated Successfully!\n');
        console.log('📊 PDF Details:');
        console.log('  • Download URL:', result.file);
        console.log('  • File Size:', result.file_size || 'Unknown');
        console.log('  • Expires:', new Date(Date.now() + 86400000).toLocaleString());
        console.log('\n📥 Download your test PDF from the URL above!');
        console.log('\n💡 If the PDF looks good, your template is ready for Zapier!');
        
        return result;

    } catch (error) {
        console.error('\n❌ Error generating PDF:', error.message);
        console.error('\n🔍 Troubleshooting:');
        console.error('  1. Verify your template ID is correct: ' + TEMPLATE_ID);
        console.error('  2. Check that the template exists in your CraftMyPDF dashboard');
        console.error('  3. Ensure the template has the correct variable names');
        console.error('  4. Visit: https://craftmypdf.com/editor/' + TEMPLATE_ID);
        throw error;
    }
}

/**
 * Main execution
 */
async function main() {
    console.log('🚀 CraftMyPDF Template Tester\n');
    console.log('Template ID:', TEMPLATE_ID);
    console.log('API Key:', API_KEY.substring(0, 20) + '...\n');

    try {
        await generateTestPDF();

        console.log('\n✅ SUCCESS! Next Steps:');
        console.log('\n1. 📥 Download and review the test PDF');
        console.log('2. ✏️  If needed, edit template at: https://craftmypdf.com/editor/' + TEMPLATE_ID);
        console.log('3. 📋 Copy markdown-template.md into the template editor');
        console.log('4. 🔄 Update your Zapier workflow with the new GPT prompt');
        console.log('5. 🎉 Test the complete Zapier workflow!');

    } catch (error) {
        console.error('\n❌ Test failed. Please check the errors above.');
        process.exit(1);
    }
}

// Run the tester
main();
