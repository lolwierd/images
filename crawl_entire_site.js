#!/usr/bin/env node

/**
 * COMPLETE N1.CARE WEBSITE CRAWLER
 * Scans ALL pages on n1.care for n1.healthcare redirects
 */

const https = require('https');
const http = require('http');

const visited = new Set();
const toVisit = [];
const allHealthcareLinks = [];
const baseDomain = 'n1.care';
const baseUrl = 'https://n1.care';

function fetchURL(url) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;

    const options = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      },
      timeout: 10000
    };

    protocol.get(url, options, (res) => {
      // Follow redirects
      if (res.statusCode === 301 || res.statusCode === 302) {
        return fetchURL(res.headers.location).then(resolve).catch(reject);
      }

      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        resolve({
          status: res.statusCode,
          headers: res.headers,
          body: data,
          url: url
        });
      });
    }).on('error', (err) => {
      reject(err);
    }).on('timeout', () => {
      reject(new Error('Request timeout'));
    });
  });
}

function extractLinks(html, currentUrl) {
  const links = new Set();

  // Extract href links
  const hrefPattern = /href=["']([^"']+)["']/gi;
  let match;

  while ((match = hrefPattern.exec(html)) !== null) {
    let url = match[1];

    // Skip anchors, javascript, mailto, tel
    if (url.startsWith('#') || url.startsWith('javascript:') ||
        url.startsWith('mailto:') || url.startsWith('tel:')) {
      continue;
    }

    // Convert relative URLs to absolute
    if (url.startsWith('/')) {
      url = baseUrl + url;
    } else if (url.startsWith('./')) {
      url = baseUrl + url.substring(1);
    } else if (!url.startsWith('http')) {
      url = baseUrl + '/' + url;
    }

    // Only add n1.care internal links
    if (url.includes(baseDomain) && !url.includes('#')) {
      links.add(url);
    }
  }

  return Array.from(links);
}

function findHealthcareRefs(html, pageUrl) {
  const refs = [];
  const hrefPattern = /href=["']([^"']*n1\.healthcare[^"']*)["']/gi;
  let match;

  while ((match = hrefPattern.exec(html)) !== null) {
    refs.push({
      page: pageUrl,
      url: match[1],
      context: html.substring(Math.max(0, match.index - 100), Math.min(html.length, match.index + 200))
    });
  }

  return refs;
}

async function crawlPage(url) {
  if (visited.has(url)) {
    return;
  }

  visited.add(url);
  console.log(`\n🔍 Crawling: ${url}`);

  try {
    const response = await fetchURL(url);
    const html = response.body;

    // Find n1.healthcare references on this page
    const healthcareRefs = findHealthcareRefs(html, url);
    if (healthcareRefs.length > 0) {
      console.log(`   ⚠️  Found ${healthcareRefs.length} n1.healthcare link(s)`);
      allHealthcareLinks.push(...healthcareRefs);
    } else {
      console.log(`   ✅ No n1.healthcare links`);
    }

    // Extract all internal links
    const links = extractLinks(html, url);
    console.log(`   📄 Found ${links.length} internal links`);

    // Add new links to queue
    for (const link of links) {
      if (!visited.has(link) && !toVisit.includes(link)) {
        toVisit.push(link);
      }
    }

  } catch (error) {
    console.log(`   ❌ Error: ${error.message}`);
  }
}

async function crawlWebsite() {
  console.log('═'.repeat(80));
  console.log('🌐 COMPLETE N1.CARE WEBSITE CRAWLER');
  console.log('═'.repeat(80));
  console.log(`Starting from: ${baseUrl}`);
  console.log('');

  // Start with homepage
  toVisit.push(baseUrl);

  // Common pages to check
  const commonPages = [
    '/',
    '/about',
    '/features',
    '/how-it-works',
    '/sample-chr',
    '/faq',
    '/contact',
    '/privacy-policy',
    '/terms-and-conditions',
    '/#trainer'
  ];

  commonPages.forEach(page => {
    const fullUrl = page.startsWith('http') ? page : baseUrl + page;
    if (!toVisit.includes(fullUrl)) {
      toVisit.push(fullUrl);
    }
  });

  // Crawl all pages
  while (toVisit.length > 0) {
    const url = toVisit.shift();
    await crawlPage(url);

    // Small delay to be nice to the server
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  console.log('\n');
  console.log('═'.repeat(80));
  console.log('📊 COMPLETE WEBSITE SCAN RESULTS');
  console.log('═'.repeat(80));
  console.log(`\nPages scanned: ${visited.size}`);
  console.log(`Total n1.healthcare references found: ${allHealthcareLinks.length}`);
  console.log('');

  if (allHealthcareLinks.length > 0) {
    console.log('🔴 ALL n1.healthcare REDIRECTS ACROSS ENTIRE SITE:');
    console.log('═'.repeat(80));

    // Group by page
    const byPage = {};
    allHealthcareLinks.forEach(ref => {
      if (!byPage[ref.page]) {
        byPage[ref.page] = [];
      }
      byPage[ref.page].push(ref);
    });

    Object.keys(byPage).forEach((page, pageIndex) => {
      console.log(`\n${pageIndex + 1}. PAGE: ${page}`);
      console.log('   ' + '─'.repeat(76));
      byPage[page].forEach((ref, refIndex) => {
        console.log(`   ${refIndex + 1}. ${ref.url}`);
      });
    });

    console.log('\n');
    console.log('📋 SUMMARY BY URL:');
    console.log('═'.repeat(80));

    const uniqueUrls = {};
    allHealthcareLinks.forEach(ref => {
      if (!uniqueUrls[ref.url]) {
        uniqueUrls[ref.url] = [];
      }
      uniqueUrls[ref.url].push(ref.page);
    });

    Object.keys(uniqueUrls).forEach((url, index) => {
      console.log(`\n${index + 1}. ${url}`);
      console.log(`   Found on ${uniqueUrls[url].length} page(s):`);
      uniqueUrls[url].forEach(page => {
        console.log(`   • ${page}`);
      });
    });

  } else {
    console.log('✅ No n1.healthcare redirects found on any page!');
  }

  console.log('\n');
  console.log('═'.repeat(80));
  console.log('✅ SCAN COMPLETE!');
  console.log('═'.repeat(80));
  console.log(`\nScanned pages:`);
  Array.from(visited).sort().forEach((url, i) => {
    console.log(`${i + 1}. ${url}`);
  });
}

// Run the crawler
crawlWebsite().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
