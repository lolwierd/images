#!/usr/bin/env node

/**
 * Script to analyze n1.care website and extract all links/redirects
 * Specifically looking for n1.healthcare references
 */

const https = require('https');
const http = require('http');

function fetchURL(url) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;

    protocol.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    }, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        resolve({
          status: res.statusCode,
          headers: res.headers,
          body: data
        });
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

async function analyzeWebsite() {
  try {
    console.log('Fetching n1.care...\n');
    const response = await fetchURL('https://n1.care');

    const html = response.body;

    // Extract all href attributes
    const hrefPattern = /href=["']([^"']+)["']/gi;
    const hrefs = new Set();
    let match;

    while ((match = hrefPattern.exec(html)) !== null) {
      hrefs.add(match[1]);
    }

    // Extract all data-framer-page-link attributes (Framer-specific)
    const framerLinkPattern = /data-framer-page-link=["']([^"']+)["']/gi;
    while ((match = framerLinkPattern.exec(html)) !== null) {
      hrefs.add(match[1]);
    }

    // Extract onclick redirects
    const onclickPattern = /onclick=["']([^"']*(?:window\.location|location\.href)[^"']*)["']/gi;
    const onclickRedirects = [];
    while ((match = onclickPattern.exec(html)) !== null) {
      onclickRedirects.push(match[1]);
    }

    // Extract meta redirects
    const metaRefreshPattern = /<meta[^>]*http-equiv=["']refresh["'][^>]*content=["'][^"']*url=([^"';]+)/gi;
    const metaRedirects = [];
    while ((match = metaRefreshPattern.exec(html)) !== null) {
      metaRedirects.add(match[1]);
    }

    // Look for n1.healthcare references
    const healthcarePattern = /n1\.healthcare/gi;
    const healthcareMatches = [];
    let healthcareMatch;
    let index = 0;
    while ((healthcareMatch = healthcarePattern.exec(html)) !== null) {
      const start = Math.max(0, healthcareMatch.index - 100);
      const end = Math.min(html.length, healthcareMatch.index + 100);
      const context = html.substring(start, end);
      healthcareMatches.push({
        index: index++,
        position: healthcareMatch.index,
        context: context.replace(/\s+/g, ' ')
      });
    }

    console.log('='.repeat(80));
    console.log('ALL LINKS FOUND ON n1.care');
    console.log('='.repeat(80));
    console.log();

    const sortedHrefs = Array.from(hrefs).sort();

    // Categorize links
    const external = sortedHrefs.filter(h => h.startsWith('http'));
    const internal = sortedHrefs.filter(h => h.startsWith('/') || h.startsWith('#'));
    const relative = sortedHrefs.filter(h => !h.startsWith('http') && !h.startsWith('/') && !h.startsWith('#'));
    const healthcareLinks = sortedHrefs.filter(h => h.includes('n1.healthcare'));

    console.log('📊 SUMMARY:');
    console.log(`   Total unique links: ${sortedHrefs.length}`);
    console.log(`   External links: ${external.length}`);
    console.log(`   Internal links: ${internal.length}`);
    console.log(`   Relative links: ${relative.length}`);
    console.log(`   Links containing 'n1.healthcare': ${healthcareLinks.length}`);
    console.log();

    if (healthcareLinks.length > 0) {
      console.log('🔴 LINKS CONTAINING n1.healthcare (NEED TO UPDATE):');
      console.log('='.repeat(80));
      healthcareLinks.forEach((link, i) => {
        console.log(`${i + 1}. ${link}`);
      });
      console.log();
    }

    console.log('🌐 EXTERNAL LINKS:');
    console.log('='.repeat(80));
    external.forEach((link, i) => {
      const marker = link.includes('n1.healthcare') ? ' ⚠️  [HEALTHCARE LINK]' : '';
      console.log(`${i + 1}. ${link}${marker}`);
    });
    console.log();

    console.log('🏠 INTERNAL LINKS:');
    console.log('='.repeat(80));
    internal.forEach((link, i) => {
      console.log(`${i + 1}. ${link}`);
    });
    console.log();

    if (relative.length > 0) {
      console.log('📁 RELATIVE LINKS:');
      console.log('='.repeat(80));
      relative.forEach((link, i) => {
        console.log(`${i + 1}. ${link}`);
      });
      console.log();
    }

    if (onclickRedirects.length > 0) {
      console.log('⚡ ONCLICK REDIRECTS:');
      console.log('='.repeat(80));
      onclickRedirects.forEach((redirect, i) => {
        console.log(`${i + 1}. ${redirect}`);
      });
      console.log();
    }

    if (healthcareMatches.length > 0) {
      console.log('🔍 ALL n1.healthcare REFERENCES IN HTML:');
      console.log('='.repeat(80));
      healthcareMatches.forEach((match) => {
        console.log(`\nOccurrence #${match.index + 1} (position ${match.position}):`);
        console.log(`Context: ...${match.context}...`);
      });
      console.log();
    }

    console.log('='.repeat(80));
    console.log('✅ Analysis complete!');
    console.log('='.repeat(80));

  } catch (error) {
    console.error('Error fetching website:', error.message);
    process.exit(1);
  }
}

analyzeWebsite();
