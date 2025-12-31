// ==================================================
// N1.CARE REDIRECT FINDER - Browser Console Script
// ==================================================
// Copy and paste this entire script into your browser console
// when viewing https://n1.care

(function() {
    console.clear();
    console.log('%c🔍 N1.CARE REDIRECT ANALYSIS', 'font-size: 20px; font-weight: bold; color: #035b64;');
    console.log('%c━'.repeat(50), 'color: #035b64;');

    // Find all links with n1.healthcare
    const healthcareLinks = Array.from(document.querySelectorAll('a[href*="n1.healthcare"]'));

    console.log(`\n%c⚠️  Found ${healthcareLinks.length} links to n1.healthcare`, 'font-size: 16px; font-weight: bold; color: #ff4444;');
    console.log('%c━'.repeat(50), 'color: #ff4444;');

    // Analyze each link
    healthcareLinks.forEach((link, index) => {
        console.log(`\n%c${index + 1}. LINK FOUND:`, 'font-weight: bold; color: #ff6600;');
        console.log('   URL:', link.href);
        console.log('   Text:', link.textContent.trim() || '(no text)');
        console.log('   Classes:', link.className);
        console.log('   Framer Name:', link.getAttribute('data-framer-name'));

        // Get position info
        const rect = link.getBoundingClientRect();
        const isVisible = rect.top >= 0 && rect.left >= 0 &&
                         rect.bottom <= window.innerHeight &&
                         rect.right <= window.innerWidth;

        console.log('   Position:', {
            top: Math.round(rect.top),
            left: Math.round(rect.left),
            width: Math.round(rect.width),
            height: Math.round(rect.height),
            visibleInViewport: isVisible
        });

        // Highlight the element
        link.style.outline = '4px solid red';
        link.style.outlineOffset = '2px';
        link.style.position = 'relative';

        // Add a label
        const label = document.createElement('div');
        label.textContent = `❌ n1.healthcare #${index + 1}`;
        label.style.cssText = `
            position: absolute;
            top: -30px;
            left: 0;
            background: red;
            color: white;
            padding: 4px 8px;
            font-size: 12px;
            font-weight: bold;
            border-radius: 4px;
            z-index: 10000;
            font-family: monospace;
        `;
        link.style.position = 'relative';
        link.appendChild(label);

        // Scroll to first one
        if (index === 0) {
            link.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    });

    // Find ALL links for reference
    console.log('\n%c📊 ALL LINKS ON PAGE', 'font-size: 16px; font-weight: bold; color: #035b64;');
    console.log('%c━'.repeat(50), 'color: #035b64;');

    const allLinks = Array.from(document.querySelectorAll('a[href]'));
    const linksByDomain = {};

    allLinks.forEach(link => {
        try {
            const url = new URL(link.href);
            const domain = url.hostname || 'relative';
            if (!linksByDomain[domain]) {
                linksByDomain[domain] = [];
            }
            linksByDomain[domain].push({
                url: link.href,
                text: link.textContent.trim().substring(0, 50)
            });
        } catch (e) {
            if (!linksByDomain['relative']) {
                linksByDomain['relative'] = [];
            }
            linksByDomain['relative'].push({
                url: link.href,
                text: link.textContent.trim().substring(0, 50)
            });
        }
    });

    console.log(`Total links found: ${allLinks.length}`);
    console.log('\nLinks by domain:');
    Object.keys(linksByDomain).sort().forEach(domain => {
        const count = linksByDomain[domain].length;
        const marker = domain.includes('n1.healthcare') ? ' ⚠️  NEEDS UPDATE' : '';
        console.log(`\n  ${domain} (${count} links)${marker}`);

        if (domain.includes('n1.healthcare')) {
            linksByDomain[domain].forEach((link, i) => {
                console.log(`    ${i + 1}. ${link.url}`);
            });
        }
    });

    // Create a summary overlay
    const overlay = document.createElement('div');
    overlay.id = 'redirect-finder-overlay';
    overlay.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: white;
        border: 3px solid #ff4444;
        border-radius: 8px;
        padding: 20px;
        z-index: 999999;
        box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        max-width: 400px;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    `;

    overlay.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
            <h3 style="margin: 0; color: #ff4444;">🔍 Redirect Finder</h3>
            <button onclick="document.getElementById('redirect-finder-overlay').remove(); document.querySelectorAll('a[href*=\\'n1.healthcare\\']').forEach(a => { a.style.outline = ''; const label = a.querySelector('div'); if(label) label.remove(); });"
                    style="background: #ff4444; color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer; font-weight: bold;">
                ✕ Close
            </button>
        </div>
        <div style="margin-bottom: 10px;">
            <strong style="color: #ff4444; font-size: 18px;">${healthcareLinks.length}</strong>
            <span>links to <code style="background: #fee; padding: 2px 6px; border-radius: 3px;">n1.healthcare</code></span>
        </div>
        <div style="margin-bottom: 15px; padding: 10px; background: #fee; border-left: 3px solid #ff4444; font-size: 13px;">
            All links are highlighted with <span style="color: red; font-weight: bold;">RED OUTLINES</span>
        </div>
        <div style="font-size: 13px; line-height: 1.6;">
            <strong>Found in:</strong><br>
            • Desktop buttons (4x)<br>
            • Mobile buttons (2x)<br><br>
            <strong>Change to:</strong><br>
            <code style="background: #e0f7fa; padding: 2px 6px; border-radius: 3px; color: #035b64;">app.n1.care</code>
        </div>
        <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #ddd;">
            <button onclick="
                let i = 0;
                const links = document.querySelectorAll('a[href*=\\'n1.healthcare\\']');
                setInterval(() => {
                    if (i < links.length) {
                        links[i].scrollIntoView({ behavior: 'smooth', block: 'center' });
                        i++;
                    }
                }, 2000);
            " style="width: 100%; padding: 10px; background: #035b64; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold;">
                📍 Tour All Links
            </button>
        </div>
    `;

    document.body.appendChild(overlay);

    console.log('\n%c✅ SCRIPT COMPLETE!', 'font-size: 16px; font-weight: bold; color: #00aa00;');
    console.log('%cAll n1.healthcare links are now highlighted in RED', 'color: #ff4444;');
    console.log('%cClick "Tour All Links" in the overlay to scroll through each one', 'color: #035b64;');
    console.log('%c━'.repeat(50), 'color: #00aa00;');

    return {
        healthcareLinks: healthcareLinks,
        allLinks: allLinks,
        linksByDomain: linksByDomain,
        removeHighlights: function() {
            document.getElementById('redirect-finder-overlay')?.remove();
            healthcareLinks.forEach(link => {
                link.style.outline = '';
                const label = link.querySelector('div');
                if (label) label.remove();
            });
            console.log('Highlights removed');
        }
    };
})();
