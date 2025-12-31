# 🔍 How to Find n1.healthcare Redirects in Your Browser

## Quick Steps:

### 1. Open n1.care in your browser
Go to https://n1.care

### 2. Open Developer Console
- **Chrome/Edge**: Press `F12` or `Ctrl+Shift+J` (Windows) / `Cmd+Option+J` (Mac)
- **Firefox**: Press `F12` or `Ctrl+Shift+K` (Windows) / `Cmd+Option+K` (Mac)
- **Safari**: Enable Developer menu first, then `Cmd+Option+C`

### 3. Copy and paste the script below:

```javascript
// Find all n1.healthcare links and highlight them
document.querySelectorAll('a[href*="n1.healthcare"]').forEach((link, i) => {
    console.log(`Link ${i+1}:`, {
        url: link.href,
        text: link.textContent.trim(),
        framerName: link.getAttribute('data-framer-name'),
        classes: link.className
    });

    // Highlight with red border
    link.style.outline = '5px solid red';
    link.style.outlineOffset = '2px';

    // Add label
    const label = document.createElement('div');
    label.textContent = `❌ #${i+1} - CHANGE TO app.n1.care`;
    label.style.cssText = 'position:absolute;top:-35px;left:0;background:red;color:white;padding:8px;font-weight:bold;font-size:14px;border-radius:4px;z-index:9999;';
    link.style.position = 'relative';
    link.appendChild(label);

    // Scroll to first one
    if (i === 0) link.scrollIntoView({behavior: 'smooth', block: 'center'});
});
```

### 4. What happens:
✅ All buttons linking to n1.healthcare will be **outlined in RED**
✅ Each will have a label showing its number
✅ Console will show details about each link
✅ Page will scroll to the first one

---

## 📊 Alternative: See ALL Links

Want to see every link on the page? Use this:

```javascript
// List ALL links grouped by domain
const links = {};
document.querySelectorAll('a[href]').forEach(a => {
    const domain = (new URL(a.href, window.location)).hostname;
    if (!links[domain]) links[domain] = [];
    links[domain].push(a.href);
});
console.table(links);
```

---

## 🎯 Super Simple One-Liner

Just count them:

```javascript
console.log(`Found ${document.querySelectorAll('a[href*="n1.healthcare"]').length} links to n1.healthcare`);
```

---

## 🔧 Advanced: Full Analysis Script

For the complete analysis with overlay and tour feature, use:

**`find_redirects_in_browser.js`** (in this folder)

Just copy the entire file contents and paste into console!

---

## 📸 What You'll See:

After running the script, you'll see:
1. **Red outlines** around all n1.healthcare buttons
2. **Labels** showing which link is which
3. **Console output** with all the details
4. **Floating overlay** (if using the advanced script) with summary

---

## 🎬 To Remove Highlights:

```javascript
document.querySelectorAll('a').forEach(a => {
    a.style.outline = '';
    const label = a.querySelector('div[style*="position:absolute"]');
    if (label) label.remove();
});
```

---

## Expected Results:

You should see **6 red highlighted buttons**:
- 4 on desktop view (labeled "Desktop -Secondary")
- 2 on mobile view (labeled "Phone -Secondary")

All pointing to: `http://app.n1.healthcare/`
Need to change to: `http://app.n1.care/`

---

Happy hunting! 🎯
