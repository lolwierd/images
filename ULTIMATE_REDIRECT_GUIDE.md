# 🚀 ULTIMATE N1.CARE REDIRECT GUIDE

## Your Complete Toolkit to Find & Fix ALL Redirects!

---

## 🎯 **SUPER QUICK - AUTO-FIX SCRIPT** (Test & Preview)

### Want to see changes INSTANTLY? Use this!

**Steps:**
1. Go to **https://n1.care**
2. Press **F12** → Console
3. Paste this script:

```javascript
// Copy from auto_fix_redirects.js or paste this:
```

**See file: `auto_fix_redirects.js`**

### What it does:
- ✅ **Automatically changes** all n1.healthcare → n1.care on current page
- ✅ **Highlights** all changed links in GREEN
- ✅ **Shows summary** panel with all changes
- ✅ **Test links** work immediately
- ⚠️ **Preview only** - refresh to undo (changes aren't permanent)

---

## 🔧 **FULL SITE SCANNER + HELPER**

### For complete site analysis and change instructions!

**Steps:**
1. Go to **https://n1.care**
2. Press **F12** → Console
3. Paste entire **`redirect_helper_live.js`** script

### What it does:
- 🔍 **Scans ALL pages** (homepage, about, features, etc.)
- 📊 **Shows all changes needed** across entire site
- 👁️ **Preview mode** - test changes on current page
- 📥 **Download report** - get full JSON change list
- 📋 **Framer instructions** - copy/paste what to do in Framer

---

## 📖 **ALL YOUR TOOLS**

| Tool | Purpose | Use When |
|------|---------|----------|
| **`auto_fix_redirects.js`** | One-click auto-fix for current page | Want to test changes NOW |
| **`redirect_helper_live.js`** | Full site scanner + change guide | Need complete analysis |
| **`browser_scan_all_pages.js`** | Scan all pages, find all links | Want to see every link |
| **`find_redirects_in_browser.js`** | Highlight links on current page | Visual inspection |
| **`crawl_entire_site.js`** | Node.js full site crawler | Run from command line |

---

## 🎬 **STEP-BY-STEP: How to Fix Everything**

### Phase 1: FIND (What needs changing)

**Option A: Quick Find (Current Page)**
```javascript
// Press F12, paste this:
document.querySelectorAll('a[href*="n1.healthcare"]').forEach((l,i)=>console.log(`${i+1}. ${l.href}`));
```

**Option B: Full Site Scan**
- Use **`redirect_helper_live.js`** (scans all pages automatically)

### Phase 2: TEST (Preview changes)

**Quick Test:**
```javascript
// Press F12, paste auto_fix_redirects.js
// See changes instantly!
```

**Or:**
- Use the "Preview" button in `redirect_helper_live.js` panel

### Phase 3: FIX IN FRAMER (Make permanent)

1. **Open Framer** project for n1.care
2. **Find components** (the script will tell you which ones):
   - "Desktop -Secondary"
   - "Phone -Secondary"
3. **Change link URL:**
   - FROM: `http://app.n1.healthcare/`
   - TO: `https://app.n1.care/`
4. **Publish** your site
5. **Verify** by running the scan again!

---

## 🔥 **EASIEST WORKFLOW**

### 1️⃣ Auto-Fix Script (2 minutes)
- Open n1.care
- F12 → Console
- Paste **`auto_fix_redirects.js`**
- See all changes highlighted in GREEN
- Test that new links work

### 2️⃣ Copy the List
- Click "Copy Change List" button
- You now have exact list of what to change

### 3️⃣ Update Framer
- Open Framer
- Find the components (Desktop -Secondary, Phone -Secondary)
- Change the URLs
- Publish

### 4️⃣ Verify
- Run the script again
- Should show "0 links found" ✅

---

## 💡 **WHAT EACH SCRIPT SHOWS YOU**

### `auto_fix_redirects.js`
```
✅ Redirects Fixed!
3 Links updated on this page

Changed:
app.n1.healthcare → app.n1.care

[Green panel with all details]
```

### `redirect_helper_live.js`
```
🔧 Redirect Helper

🔍 Scanning website...
Scanning 9/9 pages

6 Changes Needed
📄 Found on 1 page(s)
🔗 1 unique URL(s) to update

[Buttons for Preview, Download, Framer Instructions]
```

### `browser_scan_all_pages.js`
```
🔍 SCANNING ALL PAGES FOR n1.healthcare

Checking: /
  ⚠️  FOUND 6 link(s)!
Checking: /about
  ✅ Clean
...

📊 RESULTS:
/:
  1. http://app.n1.healthcare/
```

---

## 🎯 **EXPECTED RESULTS**

Based on analysis, you should find:

### Homepage (/)
- **6 links** to `http://app.n1.healthcare/`
- Located in button elements
- Framer components: "Desktop -Secondary" (4x), "Phone -Secondary" (2x)

### Other Pages (/about, /features, etc.)
- Run the full scanner to check!
- May have additional links

### All Should Change To:
- **`https://app.n1.care/`** (HTTPS recommended)
- Or **`http://app.n1.care/`** (if you prefer HTTP)

---

## ⚠️ **IMPORTANT NOTES**

### Browser Scripts:
- ✅ Safe to use (read-only, don't break anything)
- ✅ Changes are PREVIEW only
- ✅ Refresh page to undo
- ⚠️ Changes NOT saved until you update Framer

### In Framer:
- ✅ Changes are permanent when you publish
- ✅ Update master components (variants update automatically)
- ✅ Test before publishing
- ✅ Can always revert if needed

### URLs:
- Recommended: Use **HTTPS** (`https://app.n1.care/`)
- Works with HTTP too (`http://app.n1.care/`)
- Make sure new domain is set up and working first!

---

## 🆘 **TROUBLESHOOTING**

### "Script won't run"
- Make sure you're on https://n1.care (not localhost)
- Paste entire script, not just parts
- Check browser console for errors

### "No links found"
- Good! Either they're already fixed, or...
- Make sure you're scanning the right pages
- Try the full site scanner

### "Changes disappear after refresh"
- Normal! Browser previews aren't permanent
- Update in Framer to make permanent

### "New URL doesn't work"
- Make sure app.n1.care is set up
- Check DNS settings
- Verify subdomain is configured

---

## 🎉 **YOU'RE ALL SET!**

You now have:
- ✅ Scripts to FIND all redirects
- ✅ Scripts to TEST changes
- ✅ Instructions to FIX in Framer
- ✅ Tools to VERIFY when done

Just pick a script and go! 🚀

---

## 📞 **QUICK REFERENCE**

| Want to... | Use this... |
|-----------|-------------|
| See changes NOW | `auto_fix_redirects.js` |
| Scan entire site | `redirect_helper_live.js` |
| Just find links | `browser_scan_all_pages.js` |
| Highlight on page | `find_redirects_in_browser.js` |
| Get Framer steps | `redirect_helper_live.js` → Framer button |
| Download report | `redirect_helper_live.js` → Download button |

---

**Made with 🔥 for n1.care redirect updates!**
