// Run this in your browser's console on n1.care
// Or run with Node.js using puppeteer

(function extractAllLinks() {
  const links = [];

  // Get all anchor tags
  document.querySelectorAll('a').forEach(a => {
    links.push({
      type: 'anchor',
      text: a.innerText.trim() || a.getAttribute('aria-label') || '[no text]',
      href: a.href,
      classes: a.className
    });
  });

  // Get all buttons with onclick or data attributes that might have links
  document.querySelectorAll('button, [role="button"]').forEach(btn => {
    const onclick = btn.getAttribute('onclick');
    const dataHref = btn.getAttribute('data-href') || btn.getAttribute('data-link');
    if (onclick || dataHref) {
      links.push({
        type: 'button',
        text: btn.innerText.trim(),
        href: dataHref || onclick,
        classes: btn.className
      });
    }
  });

  // Framer-specific: check for data-framer-link attributes
  document.querySelectorAll('[data-framer-link]').forEach(el => {
    links.push({
      type: 'framer-link',
      text: el.innerText.trim() || '[element]',
      href: el.getAttribute('data-framer-link'),
      classes: el.className
    });
  });

  // Check for elements with href-like data attributes
  document.querySelectorAll('[data-href], [data-url], [data-link]').forEach(el => {
    links.push({
      type: 'data-attribute',
      text: el.innerText.trim() || '[element]',
      href: el.getAttribute('data-href') || el.getAttribute('data-url') || el.getAttribute('data-link'),
      classes: el.className
    });
  });

  // Format and display
  console.log('\n=== ALL LINKS ON PAGE ===\n');

  const uniqueLinks = [...new Map(links.map(l => [l.href + l.text, l])).values()];

  uniqueLinks.forEach((link, i) => {
    console.log(`${i + 1}. [${link.type}] "${link.text}"`);
    console.log(`   → ${link.href}`);
    console.log('');
  });

  console.log(`\nTotal: ${uniqueLinks.length} links found`);

  // Also copy to clipboard as JSON
  const json = JSON.stringify(uniqueLinks, null, 2);
  navigator.clipboard?.writeText(json);
  console.log('\n(JSON copied to clipboard)');

  return uniqueLinks;
})();
