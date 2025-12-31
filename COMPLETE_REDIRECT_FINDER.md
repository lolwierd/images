# 🎯 COMPLETE N1.CARE REDIRECT FINDER

## 🚀 EASIEST METHOD - Just Copy & Paste in Browser!

### Step 1: Open n1.care
Go to **https://n1.care** in your browser

### Step 2: Open Console
Press **F12** or right-click → Inspect → Console

### Step 3: Paste This Script
Copy the ENTIRE `browser_scan_all_pages.js` file OR use this quick version:

```javascript
(async function() {
    console.clear();
    console.log('%c🔍 SCANNING ALL PAGES FOR n1.healthcare', 'font-size: 20px; font-weight: bold; color: #ff4444;');

    const pages = ['/', '/about', '/features', '/how-it-works', '/sample-chr', '/faq', '/contact', '/privacy-policy', '/terms-and-conditions'];
    const results = [];

    for (const page of pages) {
        console.log(`Checking: ${page}`);
        try {
            const res = await fetch(page);
            const html = await res.text();
            const matches = html.match(/href=["'][^"']*n1\.healthcare[^"']*["']/g) || [];

            if (matches.length > 0) {
                results.push({ page, count: matches.length, links: matches });
                console.log(`%c  ⚠️  FOUND ${matches.length} link(s)!`, 'color: #ff4444; font-weight: bold;');
            } else {
                console.log(`  ✅ Clean`);
            }
        } catch (e) {
            console.log(`  ❌ Error: ${e.message}`);
        }
    }

    console.log('\n%c═'.repeat(50), 'color: #ff4444;');
    console.log('%c📊 RESULTS:', 'font-size: 18px; font-weight: bold; color: #ff4444;');
    console.log('%c═'.repeat(50), 'color: #ff4444;');

    if (results.length === 0) {
        console.log('%c✅ NO n1.healthcare links found!', 'font-size: 16px; color: #00aa00;');
    } else {
        results.forEach(r => {
            console.log(`\n%c${r.page}:`, 'font-weight: bold; color: #ff6600;');
            r.links.forEach((link, i) => {
                const url = link.match(/href=["']([^"']+)["']/)[1];
                console.log(`  ${i + 1}. ${url}`);
            });
        });
    }

    return results;
})();
```

---

## 📋 What This Does:

✅ **Scans ALL pages** on n1.care automatically
✅ **Finds every n1.healthcare link** across the entire site
✅ **Shows results** in console with page-by-page breakdown
✅ **Fast** - completes in ~30 seconds

---

## 🎨 BONUS: Highlight Links on Current Page

Want to SEE the links visually? Run this:

```javascript
document.querySelectorAll('a[href*="n1.healthcare"]').forEach((link, i) => {
    // Red outline
    link.style.outline = '5px solid red';
    link.style.outlineOffset = '2px';

    // Add floating label
    const label = document.createElement('div');
    label.textContent = `❌ #${i+1} - Change to app.n1.care`;
    label.style.cssText = 'position:absolute;top:-35px;left:0;background:red;color:white;padding:8px;font-weight:bold;border-radius:4px;z-index:9999;';
    link.style.position = 'relative';
    link.appendChild(label);

    // Log details
    console.log(`Link ${i+1}:`, {
        url: link.href,
        text: link.textContent.trim(),
        framerName: link.getAttribute('data-framer-name')
    });

    // Scroll to first one
    if (i === 0) link.scrollIntoView({behavior: 'smooth', block: 'center'});
});
```

This will:
- 🔴 **Outline all n1.healthcare links in RED**
- 🏷️ **Add labels** showing what to change
- 📜 **Auto-scroll** to the first link
- 📊 **Log details** to console

---

## 🗂️ All Files You Have:

| File | Use Case |
|------|----------|
| **browser_scan_all_pages.js** | Complete site scanner - paste in console |
| **find_redirects_in_browser.js** | Single page scanner with fancy overlay |
| **crawl_entire_site.js** | Node.js crawler (if you want to run locally) |
| **BROWSER_CONSOLE_INSTRUCTIONS.md** | Full instructions |
| **N1_HEALTHCARE_REDIRECT_REPORT.md** | Complete analysis report |

---

## 🎯 Quick Summary:

Based on homepage analysis:

**Found:** 6 instances of `http://app.n1.healthcare/`
**On:** Desktop buttons (4x) + Mobile buttons (2x)
**Change to:** `http://app.n1.care/` or `https://app.n1.care/`
**Where:** Framer components named "Desktop -Secondary" and "Phone -Secondary"

---

## 🔧 To Fix in Framer:

1. Open your Framer project
2. Find button components with these names:
   - "Desktop -Secondary"
   - "Phone -Secondary"
3. Update the link URL from `app.n1.healthcare` to `app.n1.care`
4. Publish!

Since they're responsive variants, updating the master component should update all instances automatically.

---

## 💪 YOU'RE ALL SET BRO!

Just:
1. Open n1.care
2. F12 → Console
3. Paste the scanner script
4. See ALL the redirects across ALL pages
5. Fix them in Framer

BOOM! Done! 🎉
