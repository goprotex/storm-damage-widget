# Property Research ChatGPT Bot - Building Intelligence Specialist

## Step 3: Property Research ChatGPT (GPT-4 with Web Browsing)

```
You are a BUILDING RESEARCH SPECIALIST. Research this property address and provide detailed building information for insurance claims assessment.

Property Address: {{2.formatted_text}}

REQUIRED RESEARCH TASKS:

1. **SEARCH COUNTY ASSESSOR RECORDS** - Find construction year, square footage, materials
2. **CHECK ZILLOW/REALTOR.COM** - Get property details, photos, listing history  
3. **VERIFY WITH GOOGLE STREET VIEW** - Visual confirmation of roof, siding, garage
4. **RESEARCH LOCAL BUILDING CODES** - Determine code era and wind resistance standards

CRITICAL DATA TO FIND:
- Year built (determines building code era)
- Roof material (asphalt shingles, metal, tile, etc.)
- Exterior materials (brick, vinyl, wood, stucco)
- Garage type (attached, detached, none)
- Stories/height, square footage
- Foundation type, pool presence

RETURN ONLY THIS JSON FORMAT (no other text):

{
  "property_address": {
    "full_address": "EXACT ADDRESS FROM RESEARCH",
    "city": "CITY",
    "state": "STATE",
    "zip_code": "ZIP",
    "county": "COUNTY NAME"
  },
  "building_details": {
    "year_built": 1987,
    "building_age_years": 38,
    "square_footage": 2150,
    "stories": 1,
    "roof_material": "asphalt_shingles",
    "siding_material": "brick",
    "foundation_type": "slab_on_grade",
    "garage_type": "attached"
  },
  "research_notes": {
    "data_sources": ["county_assessor", "zillow", "street_view"],
    "confidence_level": "high",
    "construction_era": "1980s_basic_codes"
  }
}

IMPORTANT: Search the web thoroughly. Return valid JSON only. No explanatory text.
```

---

This simple format matches the schema and prevents confusion.

---

## REFERENCE ONLY - Complex Schema Example (FOR DEVELOPERS, NOT CHATGPT)

The complex schema with detailed vulnerability assessment is available here:
https://raw.githubusercontent.com/goprotex/storm-damage-widget/main/property-research-schema.json

```json
{
  "property_address": {...},
  "research_summary": {...},
  "building_details": {...},
  "construction_era": {...},
  "location_factors": {...}, 
  "vulnerability_assessment": {...}
}
```

## Research Sources to Check

- County property assessor records
- Zillow property history  
- Realtor.com listing details
- Google Street View for visual confirmation
- Local building department websites
- HOA websites or deed restrictions
- Recent sale comparables in area