// ═══════════════════════════════════════════════════════════════════════════
// 🔧 N1.CARE REDIRECT HELPER - LIVE PREVIEW & CHANGE GUIDE
// ═══════════════════════════════════════════════════════════════════════════
// This script will:
// 1. Find ALL n1.healthcare links across entire site
// 2. Show you EXACTLY what to change
// 3. Let you TEST the changes live in browser
// 4. Generate instructions for Framer
// ═══════════════════════════════════════════════════════════════════════════

(async function() {
    console.clear();
    console.log('%c🔧 N1.CARE REDIRECT HELPER', 'font-size: 24px; font-weight: bold; color: #035b64; background: #e0f7fa; padding: 10px;');

    const OLD_URL = 'http://app.n1.healthcare/';
    const NEW_URL = 'https://app.n1.care/';

    const allChanges = [];
    const pages = [
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

    // Create control panel
    const panel = document.createElement('div');
    panel.id = 'redirect-control-panel';
    panel.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: white;
        border: 3px solid #035b64;
        border-radius: 12px;
        padding: 25px;
        z-index: 999999;
        box-shadow: 0 8px 32px rgba(0,0,0,0.3);
        max-width: 450px;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    `;

    panel.innerHTML = `
        <h2 style="margin: 0 0 20px 0; color: #035b64; display: flex; align-items: center; justify-content: space-between;">
            🔧 Redirect Helper
            <button onclick="this.parentElement.parentElement.remove();"
                    style="background: #ff4444; color: white; border: none; padding: 8px 12px; border-radius: 6px; cursor: pointer; font-weight: bold;">
                ✕
            </button>
        </h2>

        <div id="status" style="margin-bottom: 20px; padding: 15px; background: #e0f7fa; border-left: 4px solid #035b64; border-radius: 6px;">
            <div style="font-weight: bold; margin-bottom: 5px;">🔍 Scanning website...</div>
            <div id="status-text" style="font-size: 13px; color: #666;">Starting scan...</div>
        </div>

        <div id="changes-summary" style="margin-bottom: 20px;"></div>

        <div id="action-buttons" style="display: none;">
            <button id="preview-btn" style="width: 100%; padding: 15px; background: #035b64; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: bold; font-size: 14px; margin-bottom: 10px;">
                👁️ PREVIEW CHANGES (Test Links)
            </button>

            <button id="download-btn" style="width: 100%; padding: 15px; background: #ff6600; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: bold; font-size: 14px; margin-bottom: 10px;">
                📥 DOWNLOAD CHANGE LIST
            </button>

            <button id="framer-btn" style="width: 100%; padding: 15px; background: #8b5cf6; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: bold; font-size: 14px;">
                📋 COPY FRAMER INSTRUCTIONS
            </button>
        </div>

        <div id="detailed-changes" style="max-height: 400px; overflow-y: auto; margin-top: 20px; display: none;"></div>
    `;

    document.body.appendChild(panel);

    const statusText = document.getElementById('status-text');
    const changesSummary = document.getElementById('changes-summary');
    const actionButtons = document.getElementById('action-buttons');
    const detailedChanges = document.getElementById('detailed-changes');

    // Scan all pages
    console.log('%c📊 SCANNING ALL PAGES...', 'font-size: 16px; font-weight: bold; color: #035b64;');

    for (let i = 0; i < pages.length; i++) {
        const page = pages[i];
        statusText.textContent = `Scanning ${i + 1}/${pages.length}: ${page}`;

        console.log(`%c[${i + 1}/${pages.length}] ${page}`, 'color: #666;');

        try {
            const response = await fetch(page);
            const html = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');

            const links = doc.querySelectorAll('a[href*="n1.healthcare"]');

            links.forEach(link => {
                const oldUrl = link.getAttribute('href');
                const newUrl = oldUrl.replace(/n1\.healthcare/g, 'n1.care');
                const framerName = link.getAttribute('data-framer-name') || 'Unknown';
                const text = link.textContent.trim();

                allChanges.push({
                    page: page,
                    element: 'link',
                    oldUrl: oldUrl,
                    newUrl: newUrl,
                    framerName: framerName,
                    text: text,
                    classes: link.className
                });

                console.log(`%c  ✓ Found: ${oldUrl}`, 'color: #ff4444;');
                console.log(`%c    → Change to: ${newUrl}`, 'color: #00aa00;');
            });

        } catch (error) {
            console.log(`%c  ✗ Error: ${error.message}`, 'color: #ff4444;');
        }

        await new Promise(resolve => setTimeout(resolve, 300));
    }

    // Show results
    console.log('\n%c═'.repeat(60), 'color: #035b64;');
    console.log('%c✅ SCAN COMPLETE!', 'font-size: 18px; font-weight: bold; color: #00aa00;');
    console.log('%c═'.repeat(60), 'color: #035b64;');

    statusText.textContent = 'Scan complete!';

    if (allChanges.length === 0) {
        changesSummary.innerHTML = `
            <div style="padding: 20px; background: #e8f5e9; border-radius: 8px; text-align: center;">
                <div style="font-size: 40px; margin-bottom: 10px;">✅</div>
                <div style="font-size: 18px; font-weight: bold; color: #00aa00;">All Clear!</div>
                <div style="margin-top: 10px; color: #666;">No n1.healthcare links found</div>
            </div>
        `;
        return;
    }

    const uniqueUrls = [...new Set(allChanges.map(c => c.oldUrl))];
    const pageCount = [...new Set(allChanges.map(c => c.page))].length;

    changesSummary.innerHTML = `
        <div style="padding: 20px; background: #fee; border-left: 4px solid #ff4444; border-radius: 8px;">
            <div style="font-size: 32px; font-weight: bold; color: #ff4444; margin-bottom: 10px;">
                ${allChanges.length} Changes Needed
            </div>
            <div style="font-size: 14px; line-height: 1.8; color: #333;">
                📄 Found on <strong>${pageCount}</strong> page(s)<br>
                🔗 <strong>${uniqueUrls.length}</strong> unique URL(s) to update
            </div>
        </div>
    `;

    actionButtons.style.display = 'block';

    // Show detailed changes
    let changesHtml = '<div style="border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">';

    const byPage = {};
    allChanges.forEach(change => {
        if (!byPage[change.page]) byPage[change.page] = [];
        byPage[change.page].push(change);
    });

    Object.keys(byPage).forEach((page, pageIndex) => {
        changesHtml += `
            <div style="padding: 15px; background: ${pageIndex % 2 === 0 ? '#f9f9f9' : 'white'}; border-bottom: 1px solid #ddd;">
                <div style="font-weight: bold; color: #035b64; margin-bottom: 10px;">📄 ${page}</div>
        `;

        byPage[page].forEach((change, i) => {
            changesHtml += `
                <div style="margin: 10px 0; padding: 10px; background: white; border: 1px solid #e0e0e0; border-radius: 6px;">
                    <div style="font-size: 11px; color: #999; margin-bottom: 5px;">
                        Change ${i + 1} • Framer: ${change.framerName}
                    </div>
                    <div style="margin-bottom: 5px;">
                        <code style="background: #fee; color: #ff4444; padding: 4px 8px; border-radius: 4px; font-size: 12px; display: inline-block; max-width: 100%; overflow: hidden; text-overflow: ellipsis;">
                            ❌ ${change.oldUrl}
                        </code>
                    </div>
                    <div style="margin-bottom: 5px;">
                        <code style="background: #e8f5e9; color: #00aa00; padding: 4px 8px; border-radius: 4px; font-size: 12px; display: inline-block; max-width: 100%; overflow: hidden; text-overflow: ellipsis;">
                            ✅ ${change.newUrl}
                        </code>
                    </div>
                </div>
            `;
        });

        changesHtml += '</div>';
    });

    changesHtml += '</div>';
    detailedChanges.innerHTML = changesHtml;
    detailedChanges.style.display = 'block';

    // Preview button - test the changes live on current page
    document.getElementById('preview-btn').onclick = function() {
        console.log('%c👁️ PREVIEWING CHANGES ON CURRENT PAGE...', 'font-size: 16px; font-weight: bold; color: #035b64;');

        const currentPageLinks = document.querySelectorAll('a[href*="n1.healthcare"]');
        let previewCount = 0;

        currentPageLinks.forEach((link, i) => {
            const oldHref = link.href;
            const newHref = oldHref.replace(/n1\.healthcare/g, 'n1.care');

            // Update the link
            link.href = newHref;

            // Visual feedback
            link.style.outline = '4px solid #00aa00';
            link.style.outlineOffset = '2px';

            // Add label
            const label = document.createElement('div');
            label.textContent = `✅ UPDATED: ${newHref}`;
            label.style.cssText = `
                position: absolute;
                top: -40px;
                left: 0;
                background: #00aa00;
                color: white;
                padding: 8px 12px;
                font-size: 12px;
                font-weight: bold;
                border-radius: 6px;
                z-index: 9999;
                box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            `;
            link.style.position = 'relative';
            link.appendChild(label);

            console.log(`%c✓ ${oldHref}`, 'color: #ff4444; text-decoration: line-through;');
            console.log(`%c→ ${newHref}`, 'color: #00aa00; font-weight: bold;');

            previewCount++;
        });

        alert(`✅ PREVIEW MODE!\n\n${previewCount} link(s) updated on this page.\n\nAll n1.healthcare links now point to n1.care\nLinks are highlighted in GREEN\n\n⚠️ This is just a preview - refresh to undo!`);
    };

    // Download button - get full change list
    document.getElementById('download-btn').onclick = function() {
        const report = {
            generated: new Date().toISOString(),
            summary: {
                totalChanges: allChanges.length,
                pagesAffected: pageCount,
                uniqueUrls: uniqueUrls.length
            },
            changes: allChanges,
            instructions: `
N1.CARE REDIRECT CHANGES
========================

Total Changes: ${allChanges.length}
Pages Affected: ${pageCount}

CHANGES NEEDED:
${allChanges.map((c, i) => `
${i + 1}. Page: ${c.page}
   Framer Component: ${c.framerName}
   Current URL: ${c.oldUrl}
   New URL: ${c.newUrl}
`).join('\n')}

FRAMER INSTRUCTIONS:
1. Open your Framer project for n1.care
2. Search for components: ${[...new Set(allChanges.map(c => c.framerName))].join(', ')}
3. Update link URLs from app.n1.healthcare to app.n1.care
4. Publish changes
            `
        };

        const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `n1-care-redirect-changes-${Date.now()}.json`;
        a.click();

        console.log('%c📥 Downloaded change list!', 'font-size: 16px; font-weight: bold; color: #00aa00;');
    };

    // Framer instructions button
    document.getElementById('framer-btn').onclick = function() {
        const framerComponents = [...new Set(allChanges.map(c => c.framerName))];

        const instructions = `
🔧 FRAMER CHANGE INSTRUCTIONS
==============================

Total changes needed: ${allChanges.length}
Components to update: ${framerComponents.join(', ')}

STEP-BY-STEP:
1. Open Framer project for n1.care
2. Find these components: ${framerComponents.join(', ')}
3. Change link URL from: http://app.n1.healthcare/
4. Change link URL to:   https://app.n1.care/
5. Publish your site

COMPONENTS TO UPDATE:
${framerComponents.map((comp, i) => `${i + 1}. ${comp}`).join('\n')}

OLD URL: http://app.n1.healthcare/
NEW URL: https://app.n1.care/
        `;

        navigator.clipboard.writeText(instructions);
        alert('📋 Copied to clipboard!\n\nFramer instructions are ready to paste.');
        console.log(instructions);
    };

    console.log('\n%c🎯 ALL CHANGES:', 'font-size: 16px; font-weight: bold; color: #035b64;');
    console.table(allChanges);

    return allChanges;

})();
