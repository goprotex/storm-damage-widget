# Quick Start API Setup Guide

## Phase 1: FREE Implementation (Start Today)

### ✅ Immediate Setup (0 Cost)
You can start using storm imagery RIGHT NOW with these free APIs:

#### 1. NOAA Weather Service API
- **Status**: ✅ Already available
- **Cost**: FREE forever
- **Setup**: None required
- **Usage**: Storm events, weather alerts

#### 2. NOAA GOES Satellite Imagery  
- **Status**: ✅ Already available
- **Cost**: FREE forever
- **Setup**: None required
- **Usage**: Real satellite images

### Basic Configuration (Free APIs Only):
```javascript
// Use this configuration to start immediately
const stormImagery = StormImageryIntelligence.createWithFreeAPIs();

// Or manually configure
const stormImagery = new StormImageryIntelligence({
    useFreeAPIsOnly: true,
    enablePremiumFeatures: false
});
```

---

## Phase 2: Enhanced Features (Add These When Ready)

### 🚀 Priority API Keys to Get

#### 1. WeatherAPI.com (Highest Priority)
**Why**: Best free tier, enhanced weather data
**Cost**: FREE for 1M calls/month
**Setup Time**: 5 minutes

**Steps**:
1. Go to: https://www.weatherapi.com/
2. Click "Get API Key Free"
3. Register with:
   - Email: your-email@haydenclaim.com
   - Company: Hayden Claims Group
   - Use case: Weather data for insurance claims
4. Verify email → Get API key
5. Add to `.env`: `WEATHER_API_KEY=your-key-here`

#### 2. Google Maps API (Medium Priority)
**Why**: Professional storm track maps
**Cost**: $2 per 1,000 requests (First $200/month FREE)
**Setup Time**: 10 minutes

**Steps**:
1. Go to: https://console.cloud.google.com/
2. Create project: "Hayden Claims Storm Maps"
3. Enable "Maps Static API"
4. Create API key
5. Set up billing (required for free tier)
6. Add to `.env`: `GOOGLE_MAPS_API_KEY=your-key-here`

### Enhanced Configuration:
```javascript
// Enhanced configuration with paid APIs
const stormImagery = StormImageryIntelligence.createWithPaidAPIs({
    weatherApiKey: process.env.WEATHER_API_KEY,
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY
});
```

---

## Phase 3: Premium Features (Future Enhancement)

#### 3. Mapbox API (Alternative to Google Maps)
**Why**: Better pricing, custom styling
**Cost**: $0.50 per 1,000 requests (50K free/month)
**Setup Time**: 5 minutes

**Steps**:
1. Go to: https://www.mapbox.com/
2. Sign up → Verify email
3. Get default public token
4. Add to `.env`: `MAPBOX_API_KEY=your-key-here`

#### 4. IBM Weather Company (Enterprise Grade)
**Why**: Premium radar data, enterprise reliability
**Cost**: Usage-based, starts ~$0.10/call
**Setup Time**: 2-3 weeks (sales process)

**Steps**:
1. Contact IBM Weather sales
2. Negotiate enterprise agreement
3. Receive API credentials
4. Add to `.env`: `IBM_WEATHER_API_KEY=your-key-here`

---

## Environment Variables Setup

### Create `.env` file in your project root:

```bash
# === PHASE 1: FREE APIs (No setup required) ===
# NOAA APIs work without authentication

# === PHASE 2: BASIC PAID APIs ===
# Get these first for enhanced features
WEATHER_API_KEY=your-weatherapi-com-key-here
GOOGLE_MAPS_API_KEY=your-google-maps-key-here

# === PHASE 3: PREMIUM APIs ===  
# Add these for advanced features
MAPBOX_API_KEY=your-mapbox-key-here
IBM_WEATHER_API_KEY=your-ibm-weather-key-here

# === EXISTING API (You likely have this) ===
OPENAI_API_KEY=sk-your-openai-key-here
```

---

## Implementation Strategy

### Week 1: FREE Launch
```javascript
// Start with free APIs immediately
const freeImageryCollector = StormImageryIntelligence.createWithFreeAPIs();
await freeImageryCollector.collectStormImagery(stormEvents, propertyInfo);
```

**Capabilities**:
- ✅ NOAA satellite imagery
- ✅ Basic storm tracking  
- ✅ Weather alerts and data
- ✅ Timeline visualization

### Week 2-3: Enhanced Features
```javascript
// Add WeatherAPI.com for better data
const enhancedCollector = new StormImageryIntelligence({
    weatherApiKey: process.env.WEATHER_API_KEY,
    useFreeAPIsOnly: false
});
```

**Added Capabilities**:
- ✅ Enhanced weather history
- ✅ Better radar data
- ✅ Historical storm analysis

### Week 4+: Professional Maps
```javascript
// Add Google Maps for professional presentation
const professionalCollector = new StormImageryIntelligence({
    weatherApiKey: process.env.WEATHER_API_KEY,
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
    enablePremiumFeatures: true
});
```

**Added Capabilities**:
- ✅ Professional storm track maps
- ✅ High-resolution imagery
- ✅ Custom map overlays
- ✅ Interactive visualizations

---

## Cost Breakdown

### Month 1-3 (Getting Started):
- **NOAA APIs**: $0 (Free)
- **WeatherAPI.com**: $0 (Free tier)
- **Google Maps**: $0 (Free $200 credit)
- **Total**: $0/month

### Month 4+ (Growing Business):
- **NOAA APIs**: $0 (Free)
- **WeatherAPI.com**: $0-4/month (Free tier or basic plan)
- **Google Maps**: $10-30/month (After free credit)
- **Total**: $10-34/month

### Enterprise Scale:
- **All APIs**: $50-200/month
- **ROI**: Increased claim success rates, premium pricing
- **Break-even**: 1-2 additional successful claims per month

---

## Immediate Next Steps

### TODAY:
1. ✅ Use the free APIs immediately (no setup required)
2. ✅ Test storm imagery collection with NOAA data
3. ✅ Implement widget carousel with free imagery

### THIS WEEK:
1. 🔄 Get WeatherAPI.com free account (5 minutes)
2. 🔄 Get Google Maps API with free credits (10 minutes)  
3. 🔄 Test enhanced imagery collection

### NEXT MONTH:
1. 📈 Monitor API usage and costs
2. 📈 Upgrade to paid tiers as business grows
3. 📈 Add premium features based on client feedback

You can literally start using storm imagery TODAY with the free APIs, then gradually enhance as your business grows!