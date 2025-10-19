# ❌ FIX: "Cannot find module 'puppeteer-core'" Error

## 🎯 YOU HAVE 2 OPTIONS

---

## ✅ OPTION 1: ADD NPM MODULES (Continue with Puppeteer)

### Where to Find NPM Modules Field in Zapier:

1. **Open your Code by Zapier step**
2. **Scroll down** past the Code field
3. Look for one of these sections:
   - "npm modules"
   - "NPM Modules"  
   - "Install NPM Packages"
   - "Add npm packages"

4. **Add these two modules** (as separate entries):
   ```
   puppeteer-core
   chrome-aws-lambda
   ```

### Visual Guide:

```
┌─────────────────────────────────────┐
│ Code by Zapier                      │
├─────────────────────────────────────┤
│ Input Data                          │
│   analysis_json: {...}              │
│   property_address: {...}           │
│                                     │
│ Code                                │
│ ┌─────────────────────────────────┐ │
│ │ /**                             │ │
│ │  * Your code here...            │ │
│ │  */                             │ │
│ └─────────────────────────────────┘ │
│                                     │
│ ⬇️ SCROLL DOWN HERE ⬇️              │
│                                     │
│ npm modules                         │  ← LOOK FOR THIS!
│ ┌─────────────────────────────────┐ │
│ │ puppeteer-core                  │ │  ← ADD THIS
│ │ + Add another                   │ │
│ └─────────────────────────────────┘ │
│ ┌─────────────────────────────────┐ │
│ │ chrome-aws-lambda               │ │  ← ADD THIS
│ └─────────────────────────────────┘ │
│                                     │
│ [Continue] [Test action]            │
└─────────────────────────────────────┘
```

### If You CANNOT Find NPM Modules Field:

Zapier might have removed this feature or it's not available in your plan.

**→ Use OPTION 2 below instead!**

---

## ✅ OPTION 2: USE CLOUDCONVERT (Recommended - Easier!)

**This completely avoids the npm module issue!**

### Step 1: Replace Your Code

1. Open file: `zapier-simple-html-code.js`
2. **Copy ALL code** (Ctrl+A, Ctrl+C)
3. In Zapier Code by Zapier step, **delete all current code**
4. **Paste** the new code
5. **No npm modules needed!** ✅

### Step 2: Sign Up for CloudConvert (Free)

1. Go to: https://cloudconvert.com/register
2. Create free account (no credit card needed)
3. Go to Dashboard → API Keys
4. Create new API key
5. Copy the key (starts with `eyJ...`)

### Step 3: Add CloudConvert to Zapier

1. After your Code by Zapier step, click **+** to add action
2. Search: **"CloudConvert"**
3. Action: **"Convert a File"**
4. Connect account (paste your API key)

### Step 4: Configure CloudConvert

| Field | Value |
|-------|-------|
| Input | "Raw Content" |
| Input Format | `html` |
| Output Format | `pdf` |
| File Content | Map to `html_content` from Code step |
| Filename | `Storm-Report-{{report_id}}.pdf` |

Advanced Options:
- Page Size: `letter`
- Print Background: `true`

### Step 5: Test!

1. Test Code by Zapier step → Should output HTML ✅
2. Test CloudConvert step → Should convert to PDF ✅
3. Add Google Drive/Email step → Done! ✅

**Free tier: 25 PDFs per day** (perfect for testing!)

---

## 🆚 COMPARISON

| Option | Difficulty | Cost | PDFs/Day | Setup Time |
|--------|-----------|------|----------|------------|
| **Option 1: Puppeteer** | Medium | $0 | Unlimited | 10 min |
| **Option 2: CloudConvert** | Easy | $0 | 25 free | 5 min |

**Both work great! CloudConvert is easier if npm modules don't work.**

---

## 📁 FILES TO USE

### For Option 1 (Puppeteer):
- Use: `zapier-puppeteer-code.js`
- Guide: `ZAPIER-PUPPETEER-SETUP.md`
- Must add npm modules!

### For Option 2 (CloudConvert):
- Use: `zapier-simple-html-code.js` ⭐
- Guide: `CLOUDCONVERT-SOLUTION.md` ⭐
- No npm modules needed!

---

## 🔧 DEBUGGING TIPS

### To check if npm modules are being loaded:

Add this to the TOP of your Puppeteer code:

```javascript
// Debug: Check if modules exist
try {
    console.log("Testing puppeteer-core...");
    const puppeteer = require('puppeteer-core');
    console.log("✅ puppeteer-core loaded!");
    
    console.log("Testing chrome-aws-lambda...");
    const chromium = require('chrome-aws-lambda');
    console.log("✅ chrome-aws-lambda loaded!");
} catch (e) {
    console.log("❌ ERROR:", e.message);
}
```

If you see "Cannot find module", npm modules aren't configured correctly.

---

## 💡 MY RECOMMENDATION

**Use Option 2 (CloudConvert)** because:

✅ No npm module configuration hassle  
✅ Faster setup (5 minutes)  
✅ Free tier works great for testing  
✅ Easy to upgrade if you need more PDFs  
✅ Very reliable in Zapier  

You can always switch back to Puppeteer later if needed!

---

## 🚀 NEXT STEPS

Choose your path:

### Path A: Fix NPM Modules
1. Find "npm modules" field in Zapier
2. Add `puppeteer-core` and `chrome-aws-lambda`
3. Test again

### Path B: Use CloudConvert (Recommended)
1. Replace code with `zapier-simple-html-code.js`
2. Sign up for CloudConvert free account
3. Add CloudConvert action to Zapier
4. Configure HTML → PDF conversion
5. Test and deploy!

---

**Need help deciding? Ask me! I'll help you pick the best option for your needs.**
