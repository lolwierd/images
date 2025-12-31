// ═══════════════════════════════════════════════════════════════════════════
// 🌐 N1.CARE COMPLETE WEBSITE SCANNER (Browser Version)
// ═══════════════════════════════════════════════════════════════════════════
// Paste this into browser console on https://n1.care to scan ALL pages!
// ═══════════════════════════════════════════════════════════════════════════

(async function() {
    console.clear();
    console.log('%c🌐 SCANNING ENTIRE N1.CARE WEBSITE', 'font-size: 24px; font-weight: bold; color: #035b64; background: #e0f7fa; padding: 10px;');

    const results = {
        pagesScanned: 0,
        totalLinks: 0,
        healthcareRefs: [],
        allPages: []
    };

    // Get all pages to scan
    const pagesToScan = [
        '/',
        '/about',
        '/features',
        '/how-it-works',
        '/sample-chr',
        '/faq',
        '/contact',
        '/privacy-policy',
        '/terms-and-conditions'
    ];

    // Also extract all internal links from current page
    const currentPageLinks = Array.from(document.querySelectorAll('a[href]'))
        .map(a => a.getAttribute('href'))
        .filter(href => href && (href.startsWith('/') || href.startsWith('./')))
        .map(href => href.replace('./', '/').split('#')[0]);

    pagesToScan.push(...currentPageLinks);

    // Remove duplicates
    const uniquePages = [...new Set(pagesToScan)];

    console.log(`%c📄 Found ${uniquePages.length} pages to scan...`, 'font-size: 14px; color: #666;');
    console.log(' ');

    // Create progress overlay
    const overlay = document.createElement('div');
    overlay.id = 'scanner-overlay';
    overlay.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: white;
        border: 3px solid #035b64;
        border-radius: 8px;
        padding: 20px;
        z-index: 999999;
        box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        min-width: 350px;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    `;
    overlay.innerHTML = `
        <h3 style="margin: 0 0 15px 0; color: #035b64;">🔍 Scanning Website...</h3>
        <div id="scan-progress" style="margin-bottom: 10px;">
            <div style="background: #e0e0e0; height: 20px; border-radius: 10px; overflow: hidden;">
                <div id="progress-bar" style="background: #035b64; height: 100%; width: 0%; transition: width 0.3s;"></div>
            </div>
            <div id="progress-text" style="margin-top: 5px; font-size: 12px; color: #666;">Starting...</div>
        </div>
        <div id="scan-results" style="font-size: 13px; line-height: 1.6;"></div>
    `;
    document.body.appendChild(overlay);

    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');
    const scanResults = document.getElementById('scan-results');

    // Scan each page
    for (let i = 0; i < uniquePages.length; i++) {
        const page = uniquePages[i];
        const progress = ((i + 1) / uniquePages.length) * 100;

        progressBar.style.width = progress + '%';
        progressText.textContent = `Scanning ${i + 1}/${uniquePages.length}: ${page}`;

        console.log(`%c[${i + 1}/${uniquePages.length}] Scanning: ${page}`, 'color: #035b64;');

        try {
            const response = await fetch(page);
            const html = await response.text();

            results.pagesScanned++;
            results.allPages.push(page);

            // Find all links on this page
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const links = doc.querySelectorAll('a[href]');

            links.forEach(link => {
                const href = link.getAttribute('href');
                if (href && href.includes('n1.healthcare')) {
                    results.healthcareRefs.push({
                        page: page,
                        url: href,
                        text: link.textContent.trim(),
                        framerName: link.getAttribute('data-framer-name') || 'N/A'
                    });
                    console.log(`%c   ⚠️  FOUND: ${href}`, 'color: #ff4444; font-weight: bold;');
                }
            });

            results.totalLinks += links.length;

        } catch (error) {
            console.log(`%c   ❌ Error: ${error.message}`, 'color: #ff4444;');
        }

        // Small delay
        await new Promise(resolve => setTimeout(resolve, 300));
    }

    // Show results
    progressText.textContent = 'Scan complete!';

    console.log(' ');
    console.log('%c═'.repeat(80), 'color: #035b64;');
    console.log('%c📊 SCAN RESULTS', 'font-size: 20px; font-weight: bold; color: #035b64;');
    console.log('%c═'.repeat(80), 'color: #035b64;');
    console.log(' ');
    console.log(`%cPages scanned: ${results.pagesScanned}`, 'font-size: 14px;');
    console.log(`%cTotal links found: ${results.totalLinks}`, 'font-size: 14px;');
    console.log(`%c⚠️  n1.healthcare references: ${results.healthcareRefs.length}`, 'font-size: 16px; font-weight: bold; color: #ff4444;');
    console.log(' ');

    if (results.healthcareRefs.length > 0) {
        console.log('%c🔴 ALL n1.healthcare REDIRECTS:', 'font-size: 16px; font-weight: bold; color: #ff4444;');
        console.log('%c═'.repeat(80), 'color: #ff4444;');

        const byPage = {};
        results.healthcareRefs.forEach(ref => {
            if (!byPage[ref.page]) byPage[ref.page] = [];
            byPage[ref.page].push(ref);
        });

        Object.keys(byPage).forEach((page, i) => {
            console.log(' ');
            console.log(`%c${i + 1}. PAGE: ${page}`, 'font-weight: bold; color: #ff6600;');
            byPage[page].forEach((ref, j) => {
                console.log(`   ${j + 1}. URL: ${ref.url}`);
                console.log(`      Text: "${ref.text}"`);
                console.log(`      Framer: ${ref.framerName}`);
            });
        });

        // Unique URLs summary
        console.log(' ');
        console.log('%c📋 UNIQUE REDIRECT URLs:', 'font-size: 14px; font-weight: bold; color: #035b64;');
        const uniqueUrls = [...new Set(results.healthcareRefs.map(r => r.url))];
        uniqueUrls.forEach((url, i) => {
            const pages = results.healthcareRefs.filter(r => r.url === url).map(r => r.page);
            console.log(`${i + 1}. ${url}`);
            console.log(`   Found on: ${pages.join(', ')}`);
        });
    }

    // Update overlay with results
    scanResults.innerHTML = `
        <div style="padding: 15px; background: ${results.healthcareRefs.length > 0 ? '#fee' : '#e8f5e9'}; border-radius: 6px; margin-bottom: 15px;">
            <div style="font-size: 16px; font-weight: bold; margin-bottom: 10px;">
                ${results.healthcareRefs.length > 0 ? '⚠️' : '✅'}
                ${results.healthcareRefs.length} n1.healthcare link(s) found
            </div>
            <div style="font-size: 12px; color: #666;">
                Scanned ${results.pagesScanned} pages<br>
                Total links: ${results.totalLinks}
            </div>
        </div>
    `;

    if (results.healthcareRefs.length > 0) {
        const byPage = {};
        results.healthcareRefs.forEach(ref => {
            if (!byPage[ref.page]) byPage[ref.page] = [];
            byPage[ref.page].push(ref);
        });

        let pagesList = '<div style="max-height: 400px; overflow-y: auto; border: 1px solid #ddd; padding: 10px; border-radius: 4px; background: white;">';
        Object.keys(byPage).forEach((page, i) => {
            pagesList += `<div style="margin-bottom: 15px; padding-bottom: 15px; border-bottom: 1px solid #eee;">`;
            pagesList += `<div style="font-weight: bold; color: #ff4444; margin-bottom: 5px;">📄 ${page}</div>`;
            byPage[page].forEach((ref, j) => {
                pagesList += `<div style="margin-left: 10px; font-size: 11px; margin-bottom: 3px;">`;
                pagesList += `<code style="background: #fee; padding: 2px 4px; border-radius: 2px;">${ref.url}</code>`;
                pagesList += `</div>`;
            });
            pagesList += `</div>`;
        });
        pagesList += '</div>';

        scanResults.innerHTML += pagesList;
    }

    scanResults.innerHTML += `
        <button onclick="
            const data = ${JSON.stringify(results, null, 2)};
            const blob = new Blob([JSON.stringify(data, null, 2)], {type: 'application/json'});
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'n1-care-scan-results.json';
            a.click();
        " style="width: 100%; padding: 10px; background: #035b64; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; margin-top: 10px;">
            💾 Download Full Report
        </button>
        <button onclick="document.getElementById('scanner-overlay').remove();"
                style="width: 100%; padding: 10px; background: #666; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; margin-top: 5px;">
            ✕ Close
        </button>
    `;

    console.log(' ');
    console.log('%c✅ SCAN COMPLETE!', 'font-size: 18px; font-weight: bold; color: #00aa00; background: #e8f5e9; padding: 10px;');
    console.log(' ');

    return results;
})();
