# N1.HEALTHCARE → N1.CARE Redirect Analysis Report

## 🎯 Summary

**Found: 6 instances of `http://app.n1.healthcare/` that need to be changed to n1.care**

All 6 instances point to the same URL: `http://app.n1.healthcare/`

These appear to be button/link elements in the Framer-built website that redirect users to the app subdomain.

---

## 🔴 Action Required: Update These Links

### All 6 instances redirect to:
```
http://app.n1.healthcare/
```

### Should be changed to:
```
http://app.n1.care/
```
(or `https://app.n1.care/` if using HTTPS)

---

## 📍 Where These Links Appear

Based on the Framer component names, these links appear in:

1. **Desktop version** - "Desktop -Secondary" buttons (4 instances)
   - These are secondary action buttons visible on desktop viewport
   - Class: `framer-FZ4OF framer-z8aO1 framer-1mn0ezk framer-v-1ut6g2 framer-hwrvle`

2. **Mobile/Phone version** - "Phone -Secondary" buttons (2 instances)
   - These are secondary action buttons visible on mobile viewport
   - Class: `framer-FZ4OF framer-z8aO1 framer-1mn0ezk framer-v-u7f6w8 framer-hwrvle`

All links have:
- `target="_blank"` (opens in new tab)
- `rel="noopener"` (security attribute)
- Teal/cyan background color styling (`rgb(3, 91, 100)`)
- Rounded button style (999px border radius)

---

## 📊 Complete Link Inventory on n1.care

### External Links Found (18 unique domains):
1. ✅ Google Tag Manager (analytics)
2. ✅ Framer CDN (images and scripts)
3. ⚠️  **app.n1.healthcare** (6 instances - NEEDS UPDATE)

### Internal Navigation Links:
- `./` - Homepage
- `./#trainer` - Trainer section
- `./about` - About page
- `./sample-chr` - Sample CHR page
- `./faq` - FAQ page
- `./features` - Features page
- `./how-it-works` - How it works page
- `./contact` - Contact page
- `./privacy-policy` - Privacy policy
- `./terms-and-conditions` - Terms and conditions

---

## 🔧 How to Fix in Framer

Since this is a Framer site, you'll need to:

1. **Log into Framer** and open your n1.care project
2. **Find the button components** labeled:
   - "Desktop -Secondary" (appears 4 times throughout the site)
   - "Phone -Secondary" (appears 2 times, mobile variant)
3. **Update the link URL** from `http://app.n1.healthcare/` to `http://app.n1.care/`
4. **Publish** the changes

The buttons appear to be responsive variants (Desktop vs Phone), so you may only need to update one or two component masters and the instances will update automatically.

---

## ✅ Checklist

- [ ] Update "Desktop -Secondary" button link (4 instances)
- [ ] Update "Phone -Secondary" button link (2 instances)
- [ ] Verify the link opens `app.n1.care` correctly
- [ ] Test on desktop viewport
- [ ] Test on mobile viewport
- [ ] Publish changes in Framer
- [ ] Clear browser cache and verify live site

---

## 📝 Notes

- No other references to `n1.healthcare` were found in the HTML
- The site is properly using n1.care as the main domain
- Only the app subdomain links need updating
- Consider using HTTPS (`https://app.n1.care/`) instead of HTTP for security

---

**Analysis Date:** 2025-12-31
**Analysis Tool:** Custom Python HTML parser
**Source:** https://n1.care (live site)
