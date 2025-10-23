# 🚀 Storm Widget - Cloudflare Deployment Guide

## ✅ Your Files Are Ready!

📦 **ZIP File Location:**
`storm-widget-upload.zip` (in the main Website Widget folder)

📁 **Contains:**
- index.html (Updated widget with latest script.js reference)
- style.css (All styling with dark blue colors)
- script.js (Updated with Zapier response handling)

---

## 🎯 Deployment to Cloudflare Pages (Recommended - Easiest!)

### **Method 1: Direct Upload via Dashboard**

1. **Go to:** https://dash.cloudflare.com
2. **Click:** Workers & Pages
3. **Click:** Create application → Pages tab
4. **Choose:** "Upload assets"
5. **Name your project:** `storm-widget`
6. **Drag and drop** the `storm-widget-upload.zip` file
7. **Click:** Deploy site

**Your widget will be live at:**
- `https://storm-widget.pages.dev`

---

### **Method 2: Connect to GitHub (Automatic Updates)**

1. **Go to:** https://dash.cloudflare.com
2. **Click:** Workers & Pages
3. **Click:** Create application → Pages tab
4. **Click:** Connect to Git
5. **Select repository:** goprotex/storm-damage-widget
6. **Configure build:**
   - Build command: (leave empty)
   - Build output directory: `STEP-1-Form-Submission`
7. **Click:** Save and Deploy

**Benefits:** Every time you push to GitHub, Cloudflare auto-deploys!

---

## 🔧 Update Your Existing Worker

If you want to keep using `stormreportbot.hdo20692.workers.dev`:

### **Option A: Use Worker as Proxy to Pages**

1. Deploy to Pages (Method 1 or 2 above)
2. Update your Worker to redirect:

```javascript
export default {
  async fetch(request) {
    return Response.redirect('https://storm-widget.pages.dev' + new URL(request.url).pathname, 301);
  }
};
```

### **Option B: Upload Files Directly**

Since your files are too large for a single worker (script.js is ~100KB+), this isn't recommended. Use Pages instead!

---

## 📋 Custom Domain Setup

After deployment, add your custom domain:

1. In Cloudflare Pages project → Settings → Custom domains
2. Add: `stormreportbot.hdo20692.workers.dev` (or any domain)
3. Cloudflare automatically handles SSL

---

## ✅ Testing Checklist

After deployment:

1. ✅ Visit your widget URL
2. ✅ Fill out the form and submit
3. ✅ Check browser console (F12) for logs
4. ✅ Verify results display correctly
5. ✅ Check your email for PDF report

---

## 🎉 You're Done!

**Your iframe URL will be:**
```html
<iframe src="https://storm-widget.pages.dev/" width="100%" height="800px"></iframe>
```

Or keep using:
```html
<iframe src="https://stormreportbot.hdo20692.workers.dev/" width="100%" height="800px"></iframe>
```

---

## 📞 Need Help?

Files are ready in: `CLOUDFLARE-UPLOAD/` folder
ZIP is ready: `storm-widget-upload.zip`

Just upload to Cloudflare Pages and you're live!
