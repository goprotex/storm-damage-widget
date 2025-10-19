/**
 * CraftMyPDF Direct Template Test
 * Using documented API to test template creation
 */

// Try different API key formats
const API_KEYS = [
    'c536MjQ3MjE6MjQ4NjM6azhBV2h6Qm9QRTFxbzBVTg==',  // Original
    'Bearer c536MjQ3MjE6MjQ4NjM6azhBV2h6Qm9QRTFxbzBVTg=='  // With Bearer
];

const TEMPLATE_ID = 'c3f77b2369deaf60';

async function testAPIAccess() {
    console.log('🔍 Testing CraftMyPDF API Access...\n');
    
    for (const apiKey of API_KEYS) {
        console.log(`Testing with format: ${apiKey.substring(0, 30)}...`);
        
        try {
            // Try to get template info
            const response = await fetch(`https://api.craftmypdf.com/v1/template/${TEMPLATE_ID}`, {
                method: 'GET',
                headers: {
                    'X-API-KEY': apiKey,
                    'Content-Type': 'application/json'
                }
            });
            
            console.log(`  Status: ${response.status}`);
            
            if (response.ok) {
                const data = await response.json();
                console.log('  ✅ SUCCESS! Template found:');
                console.log('  ', JSON.stringify(data, null, 2));
                return { apiKey, success: true, data };
            } else {
                const error = await response.text();
                console.log(`  ❌ Failed: ${error.substring(0, 100)}`);
            }
        } catch (error) {
            console.log(`  ❌ Error: ${error.message}`);
        }
        
        console.log('');
    }
    
    return { success: false };
}

async function createSimplePDF() {
    console.log('\n🧪 Testing PDF Generation...\n');
    
    const testData = {
        report_id: "TEST-" + Date.now(),
        property: {
            full_address: "123 Test St, Austin, TX 78701"
        },
        company: {
            name: "Hayden Claims Group",
            phone: "(469) 434-2121"
        },
        executive_summary: {
            overall_risk: "high",
            estimated_value: "$10,000 - $35,000"
        }
    };
    
    for (const apiKey of API_KEYS) {
        try {
            const response = await fetch('https://api.craftmypdf.com/v1/create', {
                method: 'POST',
                headers: {
                    'X-API-KEY': apiKey,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    template_id: TEMPLATE_ID,
                    data: testData,
                    export_type: 'pdf'
                })
            });
            
            if (response.ok) {
                const result = await response.json();
                console.log('✅ PDF Generated Successfully!');
                console.log('Download URL:', result.file);
                return { success: true, result };
            } else {
                const error = await response.text();
                console.log(`❌ Failed: ${error}`);
            }
        } catch (error) {
            console.log(`❌ Error: ${error.message}`);
        }
    }
    
    return { success: false };
}

async function main() {
    console.log('🚀 CraftMyPDF API Diagnostics\n');
    console.log('Template ID:', TEMPLATE_ID);
    console.log('');
    
    // Test API access
    const accessTest = await testAPIAccess();
    
    if (accessTest.success) {
        console.log('\n✅ API Access Confirmed!');
        console.log('Attempting PDF generation...');
        await createSimplePDF();
    } else {
        console.log('\n❌ API Authentication Failed');
        console.log('\n📋 Next Steps:');
        console.log('1. Verify your API key in CraftMyPDF dashboard');
        console.log('2. Check if the template ID exists');
        console.log('3. Ensure your account has API access enabled');
        console.log('\n💡 Alternative: Build template manually in dashboard');
        console.log('   Guide: MANUAL-TEMPLATE-SETUP.md');
    }
}

main();
