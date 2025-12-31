// ═══════════════════════════════════════════════════════════════════════════
// 🚀 AUTO-FIX ALL REDIRECTS - ONE CLICK!
// ═══════════════════════════════════════════════════════════════════════════
// This script will automatically change all n1.healthcare links to n1.care
// Right on the current page for testing!
// ═══════════════════════════════════════════════════════════════════════════

(function() {
    console.clear();
    console.log('%c🚀 AUTO-FIX REDIRECTS', 'font-size: 24px; font-weight: bold; background: #00aa00; color: white; padding: 10px;');

    const links = document.querySelectorAll('a[href*="n1.healthcare"]');

    if (links.length === 0) {
        console.log('%c✅ No n1.healthcare links found on this page!', 'font-size: 16px; color: #00aa00;');
        alert('✅ This page is clean!\n\nNo n1.healthcare links found.');
        return;
    }

    console.log(`%c🔍 Found ${links.length} link(s) to fix`, 'font-size: 16px; font-weight: bold; color: #ff4444;');

    const changes = [];

    links.forEach((link, index) => {
        const oldUrl = link.href;
        const newUrl = oldUrl.replace(/http:\/\/app\.n1\.healthcare\//g, 'https://app.n1.care/')
                              .replace(/https:\/\/app\.n1\.healthcare\//g, 'https://app.n1.care/')
                              .replace(/app\.n1\.healthcare/g, 'app.n1.care');

        // Store change info
        changes.push({
            index: index + 1,
            old: oldUrl,
            new: newUrl,
            text: link.textContent.trim(),
            framerName: link.getAttribute('data-framer-name')
        });

        // Update the link!
        link.href = newUrl;

        // Visual feedback - GREEN highlight
        link.style.outline = '5px solid #00aa00';
        link.style.outlineOffset = '3px';
        link.style.transition = 'all 0.3s ease';

        // Add success badge
        const badge = document.createElement('div');
        badge.className = 'redirect-fixed-badge';
        badge.innerHTML = `
            <div style="display: flex; align-items: center; gap: 8px;">
                <span style="font-size: 18px;">✅</span>
                <div style="flex: 1;">
                    <div style="font-weight: bold; margin-bottom: 2px;">FIXED!</div>
                    <div style="font-size: 10px; opacity: 0.9;">Now: ${newUrl}</div>
                </div>
            </div>
        `;
        badge.style.cssText = `
            position: absolute;
            top: -60px;
            left: 50%;
            transform: translateX(-50%);
            background: linear-gradient(135deg, #00aa00, #00dd00);
            color: white;
            padding: 12px 16px;
            border-radius: 8px;
            font-size: 12px;
            font-weight: bold;
            z-index: 999999;
            box-shadow: 0 4px 20px rgba(0, 170, 0, 0.4);
            min-width: 250px;
            animation: slideDown 0.5s ease;
        `;

        link.style.position = 'relative';
        link.appendChild(badge);

        // Log the change
        console.log(`\n%c[${index + 1}] CHANGED:`, 'font-weight: bold; color: #035b64;');
        console.log(`%c  OLD: ${oldUrl}`, 'color: #ff4444; text-decoration: line-through;');
        console.log(`%c  NEW: ${newUrl}`, 'color: #00aa00; font-weight: bold;');
        console.log(`  Framer: ${link.getAttribute('data-framer-name') || 'N/A'}`);

        // Scroll to first link
        if (index === 0) {
            setTimeout(() => {
                link.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 500);
        }
    });

    // Add CSS animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideDown {
            from {
                opacity: 0;
                transform: translateX(-50%) translateY(-10px);
            }
            to {
                opacity: 1;
                transform: translateX(-50%) translateY(0);
            }
        }
    `;
    document.head.appendChild(style);

    // Create summary panel
    const panel = document.createElement('div');
    panel.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #00aa00, #00dd00);
        color: white;
        padding: 25px;
        border-radius: 12px;
        z-index: 999998;
        box-shadow: 0 8px 32px rgba(0, 170, 0, 0.3);
        min-width: 350px;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    `;

    panel.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 15px;">
            <h3 style="margin: 0; font-size: 20px;">✅ Redirects Fixed!</h3>
            <button onclick="location.reload();"
                    style="background: rgba(255,255,255,0.3); color: white; border: 2px solid white; padding: 6px 12px; border-radius: 6px; cursor: pointer; font-weight: bold; font-size: 12px;">
                ↻ UNDO
            </button>
        </div>

        <div style="background: rgba(255,255,255,0.2); padding: 15px; border-radius: 8px; margin-bottom: 15px;">
            <div style="font-size: 32px; font-weight: bold; margin-bottom: 5px;">${changes.length}</div>
            <div style="font-size: 14px; opacity: 0.9;">Links updated on this page</div>
        </div>

        <div style="background: rgba(255,255,255,0.2); padding: 12px; border-radius: 6px; font-size: 13px; line-height: 1.6; margin-bottom: 15px;">
            <strong>Changed:</strong><br>
            <code style="background: rgba(0,0,0,0.2); padding: 2px 6px; border-radius: 3px;">app.n1.healthcare</code>
            <br>to<br>
            <code style="background: rgba(0,0,0,0.2); padding: 2px 6px; border-radius: 3px;">app.n1.care</code>
        </div>

        <div style="font-size: 12px; opacity: 0.8; padding: 10px; background: rgba(255,255,255,0.1); border-radius: 6px;">
            ⚠️ This is a PREVIEW only!<br>
            Refresh page to undo changes.<br>
            Update in Framer to make permanent.
        </div>

        <button onclick="
            const data = ${JSON.stringify(changes, null, 2)};
            const text = 'REDIRECT CHANGES\\n================\\n\\n' +
                data.map(c =>
                    '• Old: ' + c.old + '\\n' +
                    '  New: ' + c.new + '\\n' +
                    '  Framer: ' + c.framerName + '\\n'
                ).join('\\n');
            navigator.clipboard.writeText(text);
            alert('📋 Copied to clipboard!');
        " style="width: 100%; padding: 12px; background: white; color: #00aa00; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; margin-top: 10px;">
            📋 Copy Change List
        </button>
    `;

    document.body.appendChild(panel);

    // Show success message
    console.log('\n%c═'.repeat(60), 'color: #00aa00;');
    console.log('%c✅ ALL LINKS UPDATED!', 'font-size: 20px; font-weight: bold; color: #00aa00;');
    console.log('%c═'.repeat(60), 'color: #00aa00;');
    console.log('\n%c🎯 CHANGE SUMMARY:', 'font-size: 16px; font-weight: bold; color: #035b64;');
    console.table(changes);

    console.log('\n%c⚠️ REMEMBER:', 'font-size: 14px; font-weight: bold; color: #ff6600;');
    console.log('This is a PREVIEW in your browser only!');
    console.log('To make changes permanent, update in Framer.');
    console.log('Refresh the page to undo these test changes.\n');

    alert(`✅ SUCCESS!\n\n${changes.length} link(s) updated!\n\n• All n1.healthcare → n1.care\n• Links highlighted in GREEN\n• Check the green panel (top right)\n\n⚠️ This is a preview - refresh to undo!`);

    return changes;
})();
