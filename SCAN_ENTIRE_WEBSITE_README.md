# 🌐 SCAN ENTIRE N1.CARE WEBSITE FOR REDIRECTS

Two methods to scan ALL pages on n1.care for n1.healthcare links!

---

## 🚀 METHOD 1: Browser Console (EASIEST!)

### Steps:
1. Go to **https://n1.care**
2. Press **F12** (or right-click → Inspect)
3. Click **Console** tab
4. **Copy and paste** the entire script from `browser_scan_all_pages.js`
5. Press **Enter**

### What happens:
- ✅ Automatically scans ALL pages (/, /about, /features, /faq, etc.)
- ✅ Shows progress bar in top-right corner
- ✅ Highlights every n1.healthcare link found
- ✅ Shows which page each link is on
- ✅ Download full JSON report
- ✅ Complete results in console

### Time: ~30 seconds

---

## 🖥️ METHOD 2: Node.js Script (COMPLETE!)

### Steps:
```bash
node crawl_entire_site.js
```

### What it does:
- Crawls entire n1.care website
- Follows all internal links
- Finds every page automatically
- Reports all n1.healthcare references
- Shows which page each link appears on
- Groups results by URL

### Time: ~1-2 minutes

---

## 📊 What You'll Get:

Both methods will show you:

1. **Total pages scanned**
2. **How many n1.healthcare links found**
3. **Which pages have the links**
4. **Exact URLs that need changing**
5. **Summary grouped by redirect destination**

---

## 🎯 Expected Results:

Based on homepage scan, you should find:
- `http://app.n1.healthcare/` → needs to change to `http://app.n1.care/`
- Found on multiple pages (if used across site)
- Appears in desktop and mobile button variants

---

## 📁 Files:

| File | Purpose |
|------|---------|
| `browser_scan_all_pages.js` | Paste in browser console - scans all pages |
| `crawl_entire_site.js` | Node.js crawler - complete site scan |
| `find_redirects_in_browser.js` | Single page scanner with highlights |
| `BROWSER_CONSOLE_INSTRUCTIONS.md` | How to use browser tools |

---

## 💡 Pro Tips:

1. **Browser method** is fastest for quick checks
2. **Node.js method** is best for thorough audits
3. Results are shown both in console and visual overlay
4. Download JSON report for documentation
5. Scroll through results to see all pages

---

## 🔧 Quick Copy-Paste for Browser:

Just open n1.care, press F12, and paste this:

```javascript
// Paste the ENTIRE contents of browser_scan_all_pages.js here!
```

Or use the one-liner for current page only:

```javascript
document.querySelectorAll('a[href*="n1.healthcare"]').forEach((l,i)=>{
  console.log(`${i+1}. ${l.href} on page ${window.location.pathname}`);
  l.style.outline='5px solid red';
});
```

---

## ✅ After Scanning:

You'll know:
- ✅ Every page with n1.healthcare links
- ✅ Exact number of links to change
- ✅ Which Framer components to update
- ✅ Whether changes are needed site-wide or just homepage

---

**Happy scanning! 🎯**
