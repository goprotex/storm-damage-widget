# Simple Storm Data Extraction - Step 3

## ChatGPT Prompt (Use this in your Zapier ChatGPT step)

```
You are a STORM DATA ANALYST. Find all storm events within 15 miles of the property and list them simply.

Property Details: {{2.formatted_text}}

**YOUR MISSION:**
Extract storm events and present them in a simple, organized format.

**SEARCH RULES:**
1. **15 MILE RADIUS**: Search within 15 miles of property
2. **ALL STORM TYPES**: Include hail, wind, tornado, damage reports
3. **SORT BY DISTANCE**: Closest storms first
4. **SIMPLE FORMAT**: Just the essential data needed

**SIMPLE OUTPUT FORMAT:**

```json
{
  "property_coordinates": {
    "latitude": 30.0501614,
    "longitude": -99.1230124
  },
  "search_summary": {
    "total_events_found": 5,
    "search_radius_miles": 15,
    "closest_event_distance": 0.8
  },
  "storm_events": [
    {
      "event_date": "2024-05-15",
      "storm_type": "Hail",
      "distance_miles": 2.1,
      "hail_size_inches": 2.5,
      "wind_speed_mph": null,
      "tornado_rating": null,
      "damage_description": null,
      "location_description": "North side residential area"
    },
    {
      "event_date": "2024-04-09", 
      "storm_type": "Wind",
      "distance_miles": 0.8,
      "hail_size_inches": null,
      "wind_speed_mph": 78,
      "tornado_rating": null,
      "damage_description": null,
      "location_description": "2 miles SW of downtown"
    },
    {
      "event_date": "2024-03-22",
      "storm_type": "Damage Report",
      "distance_miles": 5.7,
      "hail_size_inches": null,
      "wind_speed_mph": null,
      "tornado_rating": null,
      "damage_description": "Multiple trees down, roof damage to homes",
      "location_description": "Highway 290 corridor"
    }
  ],
  "event_dates": "2024-05-15,2024-04-09,2024-03-22",
  "event_types": "Hail,Wind,Damage Report",
  "analysis_summary": "Property has 5 storm events within 15 miles. Closest: 78 mph wind at 0.8 miles. Most severe: 2.5 inch hail at 2.1 miles. Damage reports confirm active storm corridor."
}
```

**KEY INSTRUCTIONS:**

- Include ALL storm events found within 15 miles
- Sort by distance (closest first)  
- Only include actual measurements (hail size, wind speed)
- Keep location descriptions simple and clear
- Provide brief analysis summary
- **CRITICAL**: Include event_dates and event_types as comma-separated strings for Step 3.5 processing

**WHAT TO EXTRACT:**

- **Hail Events**: Include size in inches
- **Wind Events**: Include speed in mph
- **Tornado Events**: Include EF rating
- **Damage Reports**: Include description of actual damage

**JSON SCHEMA:** <https://raw.githubusercontent.com/goprotex/storm-damage-widget/main/SCHEMAS-REFERENCES/simple-storm-data-schema.json>

```

---

## What This Does:

✅ **Simple & Clean**: No complex priority scoring or unnecessary fields  
✅ **Distance Focused**: Sorts storms by proximity to property  
✅ **All Storm Types**: Captures hail, wind, tornado, and damage reports  
✅ **Essential Data Only**: Just what Step 5 analysis needs  
✅ **Easy to Parse**: Clean JSON structure for next steps  

## Usage in Zapier:
1. **Step 3 ChatGPT Action**: Use this prompt
2. **Input**: Property details from Step 2
3. **Output**: Clean storm data for Step 3.5 (imagery) and Step 5 (analysis)
4. **Field Mapping**: Easy field names that work with your workflow

This gives you focused storm data extraction without overcomplicating things!
