# 📋 REQUIRED INPUT FIELDS FOR REAL STORM SWATH INTEGRATION

## 🔧 **Main Functions & Required Inputs**

### 1. **`getHistoricalStormData(location, stormDate, apiKey)`**

**REQUIRED INPUTS:**
```javascript
{
  location: "123 Main St, Austin, TX 78701",     // Full property address
  stormDate: "2024-03-15",                      // YYYY-MM-DD format
  apiKey: process.env.WEATHER_API_KEY           // WeatherAPI key (secure)
}
```

**RETURNS:**
```javascript
{
  stormDate: "2024-03-15",
  location: "123 Main St, Austin, TX 78701",
  peakConditions: {
    time: "2024-03-15 15:30",
    windSpeed: 68,              // mph
    windDirection: 245,         // degrees
    windGust: 85,              // mph
    precipitation: 1.2,         // inches
    visibility: 8.5,           // miles
    pressure: 29.85,           // inches Hg
    temperature: 72,           // fahrenheit
    humidity: 85,              // percentage
    condition: "Thunderstorm",
    stormIntensity: 92         // calculated score
  },
  dayOverview: {
    maxWind: 85,
    totalPrecip: 2.1,
    maxTemp: 78,
    minTemp: 65,
    avgHumidity: 82,
    condition: "Heavy Rain"
  }
}
```

---

### 2. **`generateRealStormSwathMap(stormData, propertyAddress, googleMapsApiKey)`**

**REQUIRED INPUTS:**
```javascript
{
  stormData: {                                  // From getHistoricalStormData()
    stormDate: "2024-03-15",
    peakConditions: {
      windSpeed: 68,
      windGust: 85,
      precipitation: 1.2,
      pressure: 29.85,
      condition: "Thunderstorm",
      stormIntensity: 92,
      windDirection: 245,
      time: "2024-03-15 15:30"
    }
  },
  propertyAddress: "123 Main St, Austin, TX 78701",  // Full address
  googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY   // Google Maps key (secure)
}
```

**RETURNS:** HTML string with interactive storm visualization

---

### 3. **`generatePropertyImageUrls(propertyAddress, googleMapsApiKey)`**

**REQUIRED INPUTS:**
```javascript
{
  propertyAddress: "123 Main St, Austin, TX 78701",   // Full address
  googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY   // Google Maps key (secure)
}
```

**RETURNS:**
```javascript
{
  streetView: "https://maps.googleapis.com/maps/api/streetview?...",
  satellite: "https://maps.googleapis.com/maps/api/staticmap?...",
  hybrid: "https://maps.googleapis.com/maps/api/staticmap?..."
}
```

---

## 🎯 **ZAPIER INPUT REQUIREMENTS**

### **For Your Zapier Workflow, You Need:**

#### **🔑 Environment Variables (SECURE):**
```
WEATHER_API_KEY = your_weatherapi_key
GOOGLE_MAPS_API_KEY = your_google_maps_key
```

#### **📝 Form/Analysis Data:**
```javascript
{
  // Property Information
  property_address: "123 Main St",
  city: "Austin", 
  state: "TX",
  zip: "78701",
  
  // Storm Date (CRITICAL - Must be dynamic!)
  storm_date: "2024-03-15",                    // From GPT analysis or form
  
  // OR extract from GPT analysis:
  analysis_json: {
    executive_summary: {
      primary_storm_date: "2024-03-15"         // GPT should provide this
    }
  }
}
```

---

## 🔄 **COMPLETE ZAPIER WORKFLOW**

### **Step 1: Extract Storm Date**
```javascript
// Get storm date dynamically (NOT hardcoded!)
const analysisData = JSON.parse(inputData.analysis_json);
const stormDate = analysisData.executive_summary?.primary_storm_date 
  || inputData.storm_date 
  || inputData.incident_date;

if (!stormDate) {
  throw new Error('Storm date is required! Update GPT prompt to include primary_storm_date');
}
```

### **Step 2: Build Property Location**
```javascript
const propertyLocation = `${inputData.property_address}, ${inputData.city}, ${inputData.state} ${inputData.zip}`;
```

### **Step 3: Get API Keys (Secure)**
```javascript
const weatherApiKey = process.env.WEATHER_API_KEY;
const googleMapsApiKey = process.env.GOOGLE_MAPS_API_KEY;
```

### **Step 4: Fetch Real Storm Data**
```javascript
const stormData = await getHistoricalStormData(
  propertyLocation,     // "123 Main St, Austin, TX 78701"
  stormDate,           // "2024-03-15"
  weatherApiKey        // Secure environment variable
);
```

### **Step 5: Generate Visualizations**
```javascript
// Storm swath map
const stormSwathHTML = generateRealStormSwathMap(
  stormData,           // Real weather data
  propertyLocation,    // Property address
  googleMapsApiKey     // Secure environment variable
);

// Property images
const propertyImages = generatePropertyImageUrls(
  propertyLocation,    // Property address
  googleMapsApiKey     // Secure environment variable
);
```

---

## ⚠️ **CRITICAL REQUIREMENTS**

### **✅ MUST HAVE:**
- [x] **Dynamic storm date** (from GPT analysis, NOT hardcoded)
- [x] **Complete property address** (street, city, state, zip)
- [x] **API keys in environment variables** (secure)
- [x] **Error handling** for missing data

### **❌ MUST NOT:**
- [ ] **Hardcode storm dates** like `'2024-03-15'`
- [ ] **Hardcode API keys** in code
- [ ] **Skip error handling** for missing fields

---

## 🧪 **TEST DATA EXAMPLES**

### **Valid Storm Dates:**
```javascript
"2024-03-15"    // Texas severe storms
"2024-04-26"    // Tornado outbreaks
"2024-05-08"    // Oklahoma hail storms
"2024-07-14"    // Summer storm season
```

### **Valid Property Addresses:**
```javascript
"123 Main St, Austin, TX 78701"
"456 Oak Ave, Dallas, TX 75201" 
"789 Pine Rd, Houston, TX 77001"
"321 Elm St, San Antonio, TX 78201"
```

---

## 📊 **INPUT VALIDATION**

### **Storm Date Validation:**
```javascript
function validateStormDate(stormDate) {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!stormDate || !dateRegex.test(stormDate)) {
    throw new Error('Storm date must be in YYYY-MM-DD format');
  }
  
  const date = new Date(stormDate);
  const now = new Date();
  if (date > now) {
    throw new Error('Storm date cannot be in the future');
  }
  
  return true;
}
```

### **Address Validation:**
```javascript
function validatePropertyAddress(address, city, state, zip) {
  if (!address || !city || !state) {
    throw new Error('Property address, city, and state are required');
  }
  
  const fullAddress = `${address}, ${city}, ${state} ${zip || ''}`.trim();
  return fullAddress;
}
```

---

## 🎯 **SUMMARY**

**Minimum Required Fields:**
1. **property_address** - Street address
2. **city** - City name
3. **state** - State abbreviation
4. **storm_date** - YYYY-MM-DD format (DYNAMIC!)
5. **WEATHER_API_KEY** - Environment variable
6. **GOOGLE_MAPS_API_KEY** - Environment variable

**Result:** Real storm data with actual weather conditions, Google Maps imagery, and professional storm swath visualization! 🌪️📊