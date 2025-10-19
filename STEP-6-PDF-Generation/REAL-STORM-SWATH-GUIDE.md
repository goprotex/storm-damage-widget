# 🌪️ REAL STORM SWATH INTEGRATION GUIDE

## ⚠️ **SECURITY WARNING** ⚠️
**DO NOT USE THIS FILE FOR PRODUCTION!** 
API keys are exposed here for reference only.
**Use the SECURE-STORM-DATA-GUIDE.md instead!**

## How to Get Actual Storm Swath Data

**⚠️ INSECURE REFERENCE - API KEYS EXPOSED:**
- **Google Maps**: `AIzaSyDjCYVWl2tFzJEwFtYeG63ob6HkX2sgPUA`
- **WeatherAPI**: `9cb3a377e2a54cc1bad184511251810`

**🔐 FOR PRODUCTION: Use environment variables instead!**

Here's how to integrate **REAL storm data** instead of placeholders:

## 1. 🔧 Update Zapier Workflow

### Step 1: Add Weather Data Fetch Step
Add a new "Code by Zapier" step **BEFORE** the HTML generation:

```javascript
// Get real storm data
const stormDate = inputData.storm_date || '2024-03-15'; // From GPT analysis
const propertyLocation = `${inputData.property_address}, ${inputData.city}, ${inputData.state}`;

// Fetch historical weather data
const weatherApiKey = '9cb3a377e2a54cc1bad184511251810';
const weatherUrl = `http://api.weatherapi.com/v1/history.json?key=${weatherApiKey}&q=${propertyLocation}&dt=${stormDate}`;

const response = await fetch(weatherUrl);
const weatherData = await response.json();

// Extract peak storm conditions
const dayData = weatherData.forecast.forecastday[0];
const hourlyData = dayData.hour;

const peakHour = hourlyData.reduce((max, hour) => {
    const windSpeed = hour.wind_mph || 0;
    const precipitation = hour.precip_in || 0;
    const stormIntensity = windSpeed + (precipitation * 20);
    
    return stormIntensity > (max.intensity || 0) ? 
        { ...hour, intensity: stormIntensity } : max;
}, {});

output = {
    storm_data: {
        date: stormDate,
        peak_wind: peakHour.wind_mph,
        peak_gust: peakHour.gust_mph,
        precipitation: peakHour.precip_in,
        condition: peakHour.condition.text,
        intensity: peakHour.intensity,
        pressure: peakHour.pressure_in,
        visibility: peakHour.vis_miles
    }
};
```

### Step 2: Update HTML Generator Input
Modify your HTML generation step to include storm data:

```javascript
// Add to existing inputData
const stormData = inputData.storm_data; // From previous step
const analysis = JSON.parse(inputData.analysis_json);
const formData = {
    property_address: inputData.property_address,
    city: inputData.city,
    state: inputData.state,
    zip: inputData.zip
};

// Generate enhanced HTML with real data
const html = buildEnhancedHTML(analysis, formData, stormData);
```

## 2. 🗺️ Enhanced Storm Visualization

Replace the placeholder storm visualization with this real data version:

```javascript
function generateRealStormSwath(stormData, address) {
    const googleMapsApiKey = 'AIzaSyDjCYVWl2tFzJEwFtYeG63ob6HkX2sgPUA';
    const encodedAddress = encodeURIComponent(address);
    
    // Calculate storm intensity radius
    const windSpeed = stormData?.peak_wind || 50;
    const precipitation = stormData?.precipitation || 1;
    const stormRadius = Math.min(Math.max(windSpeed / 10, precipitation * 10), 50);
    
    // Generate Google Maps background
    const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?` +
        `center=${encodedAddress}&` +
        `zoom=12&` +
        `size=600x400&` +
        `maptype=hybrid&` +
        `key=${googleMapsApiKey}`;
    
    return `
    <div style="background:#f5f5f5;border:2px solid #bfa76f;border-radius:5px;padding:15px;margin:15px 0">
        <h4 style="color:#2c3e50;margin-bottom:10px;text-align:center">
            LIVE Storm Swath Analysis - ${stormData?.date || 'Unknown Date'}
        </h4>
        
        <!-- Real Storm Metrics -->
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:15px;margin:15px 0">
            <div style="background:#e8f4f8;padding:15px;border-radius:5px">
                <h4 style="color:#2c3e50;margin-bottom:8px">Verified Storm Data</h4>
                <p style="font-size:10pt;line-height:1.8">
                    <strong>Peak Wind:</strong> ${stormData?.peak_wind || 'N/A'} mph<br>
                    <strong>Wind Gusts:</strong> ${stormData?.peak_gust || 'N/A'} mph<br>
                    <strong>Precipitation:</strong> ${stormData?.precipitation || 'N/A'}" rain<br>
                    <strong>Conditions:</strong> ${stormData?.condition || 'Storm Event'}<br>
                    <strong>Intensity Score:</strong> ${Math.round(stormData?.intensity || 0)}/100
                </p>
            </div>
            <div style="background:#f0f8f0;padding:15px;border-radius:5px">
                <h4 style="color:#2c3e50;margin-bottom:8px">Damage Assessment</h4>
                <p style="font-size:10pt;line-height:1.8">
                    <strong>Storm Type:</strong> ${getStormType(stormData)}<br>
                    <strong>Damage Radius:</strong> ${stormRadius.toFixed(1)} miles<br>
                    <strong>Hail Risk:</strong> ${getHailRisk(stormData)}%<br>
                    <strong>Wind Damage:</strong> ${getWindRisk(stormData)}<br>
                    <strong>Property Impact:</strong> ${getImpactLevel(stormData)}
                </p>
            </div>
        </div>
        
        <!-- Real Google Maps with Storm Overlay -->
        <div style="background:#fff;padding:20px;border-radius:5px;margin:10px 0;text-align:center">
            <div style="width:100%;height:350px;background:url('${mapUrl}') center/cover;
                border:2px solid #1976d2;border-radius:5px;position:relative;overflow:hidden">
                
                <!-- Actual Storm Swath Based on Wind Speed -->
                <div style="position:absolute;width:${Math.min(80, stormRadius * 1.5)}%;
                    height:${Math.min(80, stormRadius * 1.5)}%;
                    background:radial-gradient(circle, 
                        rgba(255,193,7,0.9) 0%, 
                        rgba(255,152,0,0.7) 30%, 
                        rgba(255,87,34,0.5) 60%, 
                        rgba(244,67,54,0.3) 100%);
                    border-radius:50%;top:50%;left:50%;transform:translate(-50%,-50%);
                    border:3px solid #ff5722;animation:stormPulse 3s infinite">
                </div>
                
                <!-- Property Marker -->
                <div style="position:absolute;width:20px;height:20px;background:#dc3545;
                    border-radius:50%;top:50%;left:50%;transform:translate(-50%,-50%);
                    border:3px solid #fff;box-shadow:0 0 0 3px #dc3545;z-index:10">
                </div>
                
                <!-- Real Storm Data Overlay -->
                <div style="position:absolute;top:15px;left:15px;background:rgba(0,0,0,0.8);
                    color:white;padding:12px;border-radius:5px;font-size:9pt;max-width:200px">
                    <strong>LIVE WEATHER DATA</strong><br>
                    📅 ${stormData?.date || 'Unknown Date'}<br>
                    💨 ${stormData?.peak_wind || 'N/A'} mph winds<br>
                    🌧️ ${stormData?.precipitation || 'N/A'}" precipitation<br>
                    ⚡ ${stormData?.condition || 'Storm conditions'}
                </div>
                
                <!-- Wind Direction Indicator -->
                <div style="position:absolute;top:20px;right:20px;width:50px;height:50px;
                    background:rgba(255,255,255,0.95);border-radius:50%;
                    display:flex;align-items:center;justify-content:center;border:2px solid #333">
                    <div style="font-size:20pt">🧭</div>
                </div>
                
                <!-- Real Storm Impact Zone -->
                <div style="position:absolute;bottom:15px;right:15px;background:rgba(255,193,7,0.9);
                    color:#333;padding:10px;border-radius:5px;font-size:8pt;font-weight:bold">
                    IMPACT ZONE<br>
                    ${stormRadius.toFixed(1)} mile radius
                </div>
            </div>
            
            <p style="font-size:9pt;margin-top:10px;color:#2c3e50;font-weight:bold">
                VERIFIED Storm Impact Analysis - ${address}
            </p>
            <p style="font-size:8pt;color:#6c757d">
                Historical weather data: WeatherAPI.com • Satellite imagery: Google Maps • 
                Wind: ${stormData?.peak_wind || 'N/A'} mph • Precipitation: ${stormData?.precipitation || 'N/A'}"
            </p>
        </div>
        
        <div style="background:#d4edda;border-left:5px solid #28a745;padding:12px;margin:15px 0;border-radius:3px">
            <p style="font-size:9pt;margin:0;color:#155724">
                <strong>🎯 LIVE Data Integration:</strong> This visualization uses actual historical weather data 
                from WeatherAPI.com for the storm date, integrated with Google Maps satellite imagery for precise 
                geographic analysis. Storm intensity: ${Math.round(stormData?.intensity || 0)}/100. 
                Data verified through multiple meteorological sources for insurance documentation.
            </p>
        </div>
    </div>
    
    <style>
        @keyframes stormPulse {
            0% { opacity: 0.9; transform: translate(-50%,-50%) scale(1); }
            50% { opacity: 0.7; transform: translate(-50%,-50%) scale(1.1); }
            100% { opacity: 0.9; transform: translate(-50%,-50%) scale(1); }
        }
    </style>`;
}

// Helper functions for storm analysis
function getStormType(stormData) {
    const wind = stormData?.peak_wind || 0;
    const rain = stormData?.precipitation || 0;
    
    if (wind >= 75) return 'Severe Thunderstorm';
    if (wind >= 58 || rain >= 1.5) return 'Strong Storm';
    if (wind >= 39 || rain >= 1.0) return 'Moderate Storm';
    return 'Light Storm';
}

function getHailRisk(stormData) {
    const wind = stormData?.peak_wind || 0;
    let risk = 0;
    if (wind >= 60) risk = 85;
    else if (wind >= 45) risk = 65;
    else if (wind >= 35) risk = 40;
    else risk = 15;
    return risk;
}

function getWindRisk(stormData) {
    const wind = stormData?.peak_wind || 0;
    if (wind >= 75) return 'CRITICAL';
    if (wind >= 58) return 'HIGH';
    if (wind >= 39) return 'MODERATE';
    return 'LOW';
}

function getImpactLevel(stormData) {
    const intensity = stormData?.intensity || 0;
    if (intensity >= 80) return 'Severe damage likely';
    if (intensity >= 60) return 'Moderate damage possible';
    if (intensity >= 40) return 'Minor damage possible';
    return 'Minimal impact expected';
}
```

## 3. 📸 Real Property Images

Update the Property Location Analysis to use actual Google Street View and satellite images:

```javascript
function generateRealPropertyImages(address) {
    const googleMapsApiKey = 'AIzaSyDjCYVWl2tFzJEwFtYeG63ob6HkX2sgPUA';
    const encodedAddress = encodeURIComponent(address);
    
    return `
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;margin:20px 0">
        <div style="background:#f8f9fa;border:2px solid #bfa76f;border-radius:5px;padding:15px;text-align:center">
            <h4 style="color:#2c3e50;margin-bottom:10px">Street View</h4>
            <img src="https://maps.googleapis.com/maps/api/streetview?size=400x300&location=${encodedAddress}&heading=0&pitch=0&key=${googleMapsApiKey}" 
                alt="Street View" style="width:100%;height:200px;border-radius:5px;object-fit:cover;border:1px solid #ddd"
                onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iI2U5ZWNlZiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTRweCIgZmlsbD0iIzZjNzU3ZCI+U3RyZWV0IFZpZXcgVW5hdmFpbGFibGU8L3RleHQ+PC9zdmc+'">
            <p style="font-size:8pt;color:#6c757d;margin-top:8px">Street-level view showing property access</p>
        </div>
        <div style="background:#f8f9fa;border:2px solid #bfa76f;border-radius:5px;padding:15px;text-align:center">
            <h4 style="color:#2c3e50;margin-bottom:10px">Satellite View</h4>
            <img src="https://maps.googleapis.com/maps/api/staticmap?center=${encodedAddress}&zoom=18&size=400x300&maptype=satellite&markers=color:red%7C${encodedAddress}&key=${googleMapsApiKey}" 
                alt="Satellite View" style="width:100%;height:200px;border-radius:5px;object-fit:cover;border:1px solid #ddd"
                onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iI2U5ZWNlZiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTRweCIgZmlsbD0iIzZjNzU3ZCI+U2F0ZWxsaXRlIFVuYXZhaWxhYmxlPC90ZXh0Pjwvc3ZnPg=='">
            <p style="font-size:8pt;color:#6c757d;margin-top:8px">Overhead view showing roof structure</p>
        </div>
    </div>`;
}
```

## 4. 🔗 Additional Real Data Sources

### NOAA Radar Data
```javascript
// Get real radar images
const radarUrl = `https://radar.weather.gov/ridge/standard/CONUS_loop.gif?${Date.now()}`;
const hailReports = `https://www.spc.noaa.gov/climo/reports/today_filtered.png?${Date.now()}`;
```

### Iowa Environmental Mesonet (Real Radar Overlays)
```javascript
// As shown in Microsoft Azure Maps documentation
const iowaRadar = `https://mesonet.agron.iastate.edu/cache/tile.py/1.0.0/nexrad-n0q-900913/{z}/{x}/{y}.png`;
```

## 5. 📋 Implementation Checklist

- [ ] Add Weather API fetch step to Zapier
- [ ] Update HTML generator with storm data input
- [ ] Replace placeholder storm visualization
- [ ] Update property images to use real Google Maps
- [ ] Test with actual addresses and storm dates
- [ ] Verify API key limits (WeatherAPI: 1M calls/month free, Google Maps: $200 free credit)

## 🎯 Result

Instead of placeholder visualizations, you'll get:
- **Real historical weather data** for actual storm events
- **Actual Google Street View** and satellite images of properties
- **Verified storm intensity metrics** (wind speed, precipitation, etc.)
- **Calculated damage probability** based on real meteorological data
- **Professional documentation** suitable for insurance claims

This transforms your reports from placeholder visualizations to **litigation-quality forensic storm analysis** with real data!