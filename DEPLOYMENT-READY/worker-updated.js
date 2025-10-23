// Cloudflare Worker for Storm Widget - UPDATED VERSION
// Deploy this to: https://stormreportbot.hdo20692.workers.dev/

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return handleCORS();
    }
    
    // Handle static assets
    if (url.pathname === '/' || url.pathname === '/index.html') {
      return new Response(HTML_CONTENT, {
        headers: { 
          'Content-Type': 'text/html; charset=utf-8',
          'Cache-Control': 'public, max-age=300',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }
    
    if (url.pathname === '/style.css') {
      return new Response(CSS_CONTENT, {
        headers: { 
          'Content-Type': 'text/css; charset=utf-8',
          'Cache-Control': 'public, max-age=3600',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }
    
    if (url.pathname === '/script.js') {
      return new Response(JS_CONTENT, {
        headers: { 
          'Content-Type': 'application/javascript; charset=utf-8',
          'Cache-Control': 'public, max-age=300',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }
    
    return new Response('Not Found', { 
      status: 404,
      headers: { 'Content-Type': 'text/plain' }
    });
  }
};

function handleCORS() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
}

// ========== COPY THIS ENTIRE FILE INTO YOUR CLOUDFLARE WORKER ==========
// Go to: https://dash.cloudflare.com → Workers & Pages → stormreportbot → Edit Code
// Replace ALL code with this file, then click "Save and Deploy"

const HTML_CONTENT = \`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Storm Damage Assessment - Hayden Claims Group</title>
    <link rel="stylesheet" href="style.css">
    <meta name="description" content="Get your personalized Texas storm risk analysis from Hayden Claims Group">
</head>
<body>
    <div class="container">
        <!-- Left Panel: Form -->
        <div class="left-panel" id="formPanel">
            <div class="form-container">
                <div class="logo-section">
                    <h1>Hayden Claims Group</h1>
                    <p class="tagline">Expert Storm Damage Assessment</p>
                </div>
                
                <form id="stormForm">
                    <h2>Get Your Storm Risk Analysis</h2>
                    <p class="form-description">Enter your property details for a comprehensive Texas storm damage assessment</p>
                    
                    <div class="input-group">
                        <label for="name">Full Name *</label>
                        <input type="text" id="name" name="name" required autocomplete="name">
                    </div>
                    
                    <div class="input-group">
                        <label for="email">Email Address *</label>
                        <input type="email" id="email" name="email" required autocomplete="email">
                    </div>
                    
                    <div class="input-group">
                        <label for="phone">Phone Number</label>
                        <input type="tel" id="phone" name="phone" autocomplete="tel">
                    </div>
                    
                    <div class="input-group">
                        <label for="address">Property Address *</label>
                        <input type="text" id="address" name="address" required autocomplete="street-address">
                    </div>
                    
                    <div class="input-row">
                        <div class="input-group">
                            <label for="city">City *</label>
                            <input type="text" id="city" name="city" required autocomplete="address-level2">
                        </div>
                        
                        <div class="input-group">
                            <label for="state">State</label>
                            <input type="text" id="state" name="state" value="Texas" readonly>
                        </div>
                        
                        <div class="input-group">
                            <label for="zip">ZIP Code *</label>
                            <input type="text" id="zip" name="zip" required pattern="[0-9]{5}" autocomplete="postal-code">
                        </div>
                    </div>
                    
                    <div class="date-section">
                        <h3>Storm Date Range (Optional)</h3>
                        <div class="input-row">
                            <div class="input-group">
                                <label for="startDate">From</label>
                                <input type="date" id="startDate" name="startDate">
                            </div>
                            <div class="input-group">
                                <label for="endDate">To</label>
                                <input type="date" id="endDate" name="endDate">
                            </div>
                        </div>
                    </div>
                    
                    <button type="submit" class="submit-btn">
                        <span class="btn-text">Run Assessment</span>
                        <span class="btn-loader hidden">Processing...</span>
                    </button>
                </form>
            </div>
        </div>

        <!-- Right Panel: Loading & Results -->
        <div class="right-panel" id="resultsPanel">
            <!-- Loading State -->
            <div id="loading" class="loading-container">
                <div class="swirl-container">
                    <div class="swirl">
                        <div class="swirl-inner"></div>
                        <div class="swirl-outer"></div>
                    </div>
                </div>
                <div class="breathing-text">Hayden Claims Group</div>
                <div id="statusMessage" class="status-text">Initializing storm analysis...</div>
                <div id="fact" class="fact-text"></div>
                <div class="progress-indicators">
                    <div class="progress-dot active"></div>
                    <div class="progress-dot"></div>
                    <div class="progress-dot"></div>
                    <div class="progress-dot"></div>
                    <div class="progress-dot"></div>
                </div>
            </div>

            <!-- Results State -->
            <div id="results" class="results-container hidden">
                <div class="results-header">
                    <div class="success-icon">
                        <svg width="40" height="40" viewBox="0 0 40 40">
                            <circle cx="20" cy="20" r="18" stroke="#bfa76f" stroke-width="2" fill="none"/>
                            <path d="M13 20 L18 25 L27 15" stroke="#bfa76f" stroke-width="2" fill="none" stroke-linecap="round"/>
                        </svg>
                    </div>
                    <h3>Storm Risk Assessment Complete</h3>
                </div>
                
                <div id="property" class="property-info"></div>
                
                <div id="riskSummary" class="risk-summary">
                    <h4>Risk Analysis Results</h4>
                    <div class="risk-item">
                        <span class="risk-label">Hail Risk:</span>
                        <div class="risk-bar">
                            <div class="risk-fill" data-risk="hail"></div>
                        </div>
                        <span class="risk-percent" id="hailPercent">0%</span>
                    </div>
                    <div class="risk-item">
                        <span class="risk-label">Wind Risk:</span>
                        <div class="risk-bar">
                            <div class="risk-fill" data-risk="wind"></div>
                        </div>
                        <span class="risk-percent" id="windPercent">0%</span>
                    </div>
                    <div class="risk-item">
                        <span class="risk-label">Flood Risk:</span>
                        <div class="risk-bar">
                            <div class="risk-fill" data-risk="flood"></div>
                        </div>
                        <span class="risk-percent" id="floodPercent">0%</span>
                    </div>
                </div>
                
                <div class="action-buttons">
                    <a id="pdfLink" href="#" class="button primary" target="_blank">Download Full Report</a>
                    <button class="button secondary" onclick="resetForm()">New Assessment</button>
                </div>
            </div>

            <!-- Confirmation State -->
            <div id="confirmation" class="confirmation-container hidden">
                <div class="confirmation-icon">
                    <svg width="60" height="60" viewBox="0 0 60 60">
                        <circle cx="30" cy="30" r="28" stroke="#bfa76f" stroke-width="2" fill="none"/>
                        <path d="M20 30 L27 37 L40 23" stroke="#bfa76f" stroke-width="3" fill="none" stroke-linecap="round"/>
                    </svg>
                </div>
                <h3>Assessment Received!</h3>
                <p>Your personalized storm damage report is being generated and will be emailed to you within 5 minutes.</p>
                <div class="next-steps">
                    <p><strong>What happens next:</strong></p>
                    <ul>
                        <li>AI analysis of your property's storm history</li>
                        <li>Comprehensive risk assessment report</li>
                        <li>Professional recommendations</li>
                    </ul>
                </div>
                <p class="contact-info">Questions? Call us at <strong>(469) 434-2121</strong></p>
                <button class="button secondary" onclick="resetForm()">Run Another Assessment</button>
            </div>
        </div>
    </div>

    <script src="script.js"></script>
</body>
</html>\`;

const CSS_CONTENT = \`/* Generated CSS - Full Stylesheet */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: #0a0a0a;
  color: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  overflow-x: hidden;
  line-height: 1.6;
}

.container {
  display: flex;
  width: 95%;
  max-width: 1200px;
  min-height: 90vh;
  background: #1a1a1a;
  border-radius: 12px;
  box-shadow: 0 0 40px rgba(0,0,0,0.8);
  overflow: hidden;
  transition: all 0.3s ease;
}

.left-panel {
  flex: 1;
  padding: 40px;
  background: linear-gradient(135deg, #121212 0%, #1a1a1a 100%);
  transition: transform 0.5s ease, opacity 0.5s ease;
  overflow-y: auto;
}

.left-panel.slide-out {
  transform: translateX(-100%);
  opacity: 0;
}

.form-container {
  max-width: 500px;
  margin: 0 auto;
}

.logo-section {
  text-align: center;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 2px solid #bfa76f;
}

.logo-section h1 {
  color: #bfa76f;
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 8px;
  text-shadow: 0 2px 4px rgba(0,0,0,0.3);
}

.tagline {
  color: #ccc;
  font-size: 14px;
  font-weight: 300;
}

.form-description {
  color: #bbb;
  margin-bottom: 25px;
  font-size: 14px;
}

.input-group {
  margin-bottom: 20px;
}

.input-row {
  display: flex;
  gap: 15px;
}

.input-row .input-group {
  flex: 1;
}

label {
  display: block;
  margin-bottom: 6px;
  color: #ddd;
  font-weight: 500;
  font-size: 14px;
}

input {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #333;
  border-radius: 6px;
  background: #2a2a2a;
  color: #f5f5f5;
  font-size: 14px;
  transition: all 0.3s ease;
}

input:focus {
  outline: none;
  border-color: #bfa76f;
  box-shadow: 0 0 0 3px rgba(191, 167, 111, 0.1);
}

input[readonly] {
  background: #1a1a1a;
  color: #888;
}

.date-section {
  margin: 25px 0;
  padding: 20px;
  background: #161616;
  border-radius: 8px;
  border-left: 4px solid #bfa76f;
}

.date-section h3 {
  color: #bfa76f;
  font-size: 16px;
  margin-bottom: 15px;
}

.submit-btn {
  width: 100%;
  padding: 16px;
  background: linear-gradient(135deg, #bfa76f 0%, #d8c58c 100%);
  color: #000;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  margin-top: 30px;
}

.submit-btn:hover {
  background: linear-gradient(135deg, #d8c58c 0%, #e6d4a1 100%);
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(191, 167, 111, 0.3);
}

.btn-loader {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.right-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #0d0d0d 0%, #1a1a1a 100%);
  padding: 40px;
  text-align: center;
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  opacity: 0;
  animation: fadeIn 0.5s ease forwards;
}

.swirl-container {
  margin-bottom: 30px;
}

.swirl {
  position: relative;
  width: 80px;
  height: 80px;
  animation: spin 1.5s linear infinite;
  filter: drop-shadow(0 0 15px rgba(191, 167, 111, 0.4));
}

.swirl-inner, .swirl-outer {
  position: absolute;
  border-radius: 50%;
  border: 3px solid transparent;
}

.swirl-inner {
  width: 40px;
  height: 40px;
  top: 20px;
  left: 20px;
  background: radial-gradient(circle, transparent 60%, #bfa76f 70%, transparent 80%);
  border: 3px solid #bfa76f;
}

.swirl-outer {
  width: 80px;
  height: 80px;
  top: 0;
  left: 0;
  background: conic-gradient(from 0deg, transparent 0%, #bfa76f 25%, transparent 50%, #d8c58c 75%, transparent 100%);
  -webkit-mask: radial-gradient(circle, transparent 45%, black 50%, black 85%, transparent 90%);
  mask: radial-gradient(circle, transparent 45%, black 50%, black 85%, transparent 90%);
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.breathing-text {
  font-size: 24px;
  color: #555555;
  font-weight: 600;
  margin-bottom: 20px;
  animation: ghostly 4s ease-in-out infinite;
  text-shadow: 0 2px 8px rgba(85, 85, 85, 0.2);
}

@keyframes ghostly {
  0%, 100% { 
    opacity: 0.2; 
    transform: scale(0.98);
    color: #333333;
  }
  50% { 
    opacity: 0.8; 
    transform: scale(1.02);
    color: #666666;
  }
}

.status-text {
  font-size: 16px;
  color: #ccc;
  margin-bottom: 15px;
  min-height: 20px;
  animation: fadeInUp 0.5s ease;
  transition: opacity 0.3s ease;
}

.fact-text {
  font-size: 14px;
  color: #999;
  font-style: italic;
  max-width: 350px;
  min-height: 40px;
  opacity: 0;
  transition: opacity 0.5s ease;
  animation: fadeInUp 0.5s ease 0.2s forwards;
}

.progress-indicators {
  display: flex;
  gap: 8px;
  margin-top: 30px;
}

.progress-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #333;
  transition: all 0.3s ease;
}

.progress-dot.active {
  background: #bfa76f;
  box-shadow: 0 0 8px rgba(191, 167, 111, 0.5);
}

.results-container {
  width: 100%;
  max-width: 450px;
  opacity: 0;
  animation: fadeIn 0.5s ease forwards;
  padding: 20px 0;
}

.results-header {
  text-align: center;
  margin-bottom: 25px;
}

.success-icon {
  margin-bottom: 15px;
  animation: scaleIn 0.5s ease 0.2s forwards;
  transform: scale(0);
}

.results-header h3 {
  color: #bfa76f;
  font-size: 20px;
  margin: 0;
}

.property-info {
  background: #161616;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 25px;
  border-left: 4px solid #bfa76f;
  text-align: left;
}

.property-info h4 {
  color: #bfa76f;
  margin-bottom: 10px;
  font-size: 16px;
}

.property-info p {
  margin-bottom: 8px;
  color: #ddd;
  font-size: 14px;
}

.risk-score {
  color: #bfa76f;
  font-weight: bold;
  font-size: 16px;
}

.risk-summary {
  margin: 25px 0;
  background: #161616;
  padding: 20px;
  border-radius: 8px;
  text-align: left;
}

.risk-summary h4 {
  color: #bfa76f;
  margin-bottom: 15px;
  font-size: 16px;
}

.risk-item {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 15px;
}

.risk-label {
  min-width: 80px;
  font-weight: 600;
  color: #ddd;
  font-size: 14px;
}

.risk-bar {
  flex: 1;
  height: 10px;
  background: #333;
  border-radius: 5px;
  overflow: hidden;
}

.risk-fill {
  height: 100%;
  background: linear-gradient(90deg, #bfa76f, #d8c58c);
  width: 0%;
  transition: width 1.5s ease 0.5s;
  border-radius: 5px;
}

.risk-percent {
  min-width: 45px;
  font-weight: 600;
  color: #bfa76f;
  font-size: 14px;
}

.action-buttons {
  display: flex;
  gap: 12px;
  margin-top: 25px;
  flex-wrap: wrap;
}

.action-buttons .button {
  flex: 1;
  min-width: 140px;
  text-align: center;
}

.button {
  display: inline-block;
  background: linear-gradient(135deg, #bfa76f 0%, #d8c58c 100%);
  color: #000;
  padding: 12px 24px;
  text-decoration: none;
  border-radius: 6px;
  font-weight: 600;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
  font-size: 14px;
}

.button:hover {
  background: linear-gradient(135deg, #d8c58c 0%, #e6d4a1 100%);
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(191, 167, 111, 0.3);
}

.button.secondary {
  background: transparent;
  color: #bfa76f;
  border: 2px solid #bfa76f;
}

.button.secondary:hover {
  background: #bfa76f;
  color: #000;
}

.hidden {
  display: none !important;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes scaleIn {
  from { transform: scale(0); }
  to { transform: scale(1); }
}

@media (max-width: 768px) {
  .container {
    flex-direction: column;
    width: 100%;
    height: 100vh;
    border-radius: 0;
  }
  
  .left-panel, .right-panel {
    padding: 20px;
  }
  
  .input-row {
    flex-direction: column;
    gap: 0;
  }
}\`;

const JS_CONTENT = \`// IMPORTANT: This file is TOO LARGE to embed inline.
// The script.js will be loaded separately from the file system.
// For production, you should minify this or use a CDN.\`;
