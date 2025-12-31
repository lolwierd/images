#!/usr/bin/env python3
"""
Analyze n1.care HTML to find all links and redirects
Focus on finding n1.healthcare references
"""

import re
import json
from collections import defaultdict
from html.parser import HTMLParser

class LinkExtractor(HTMLParser):
    def __init__(self):
        super().__init__()
        self.links = []
        self.current_tag = None
        self.current_attrs = {}

    def handle_starttag(self, tag, attrs):
        self.current_tag = tag
        attrs_dict = dict(attrs)
        self.current_attrs = attrs_dict

        # Extract href from <a> tags
        if tag == 'a' and 'href' in attrs_dict:
            self.links.append({
                'type': 'link',
                'tag': 'a',
                'url': attrs_dict['href'],
                'attrs': attrs_dict
            })

        # Extract src from <img>, <script>, <iframe>
        if tag in ['img', 'script', 'iframe'] and 'src' in attrs_dict:
            self.links.append({
                'type': 'resource',
                'tag': tag,
                'url': attrs_dict['src'],
                'attrs': attrs_dict
            })

        # Extract meta redirects
        if tag == 'meta' and attrs_dict.get('http-equiv', '').lower() == 'refresh':
            content = attrs_dict.get('content', '')
            url_match = re.search(r'url=(.+)', content, re.IGNORECASE)
            if url_match:
                self.links.append({
                    'type': 'meta_redirect',
                    'tag': 'meta',
                    'url': url_match.group(1),
                    'attrs': attrs_dict
                })

        # Framer-specific attributes
        if 'data-framer-page-link' in attrs_dict:
            self.links.append({
                'type': 'framer_link',
                'tag': tag,
                'url': attrs_dict['data-framer-page-link'],
                'attrs': attrs_dict
            })

def main():
    with open('/home/user/images/n1_care.html', 'r', encoding='utf-8') as f:
        html_content = f.read()

    print('=' * 80)
    print('N1.CARE LINK ANALYSIS')
    print('=' * 80)
    print()

    # Parse HTML for structured links
    parser = LinkExtractor()
    try:
        parser.feed(html_content)
    except Exception as e:
        print(f"Parser warning: {e}")

    # Also use regex to catch anything the parser might miss
    href_pattern = re.compile(r'href=["\'](.*?)["\']', re.IGNORECASE)
    all_hrefs = href_pattern.findall(html_content)

    # Find all n1.healthcare references with context
    healthcare_pattern = re.compile(r'.{0,150}n1\.healthcare.{0,150}', re.IGNORECASE)
    healthcare_matches = healthcare_pattern.findall(html_content)

    # Count all occurrences
    healthcare_count = len(re.findall(r'n1\.healthcare', html_content, re.IGNORECASE))

    # Categorize links
    unique_urls = set()
    healthcare_links = []
    external_links = []
    internal_links = []

    for link_info in parser.links:
        url = link_info['url']
        unique_urls.add(url)

        if 'n1.healthcare' in url.lower():
            healthcare_links.append(link_info)
        elif url.startswith('http'):
            external_links.append(link_info)
        else:
            internal_links.append(link_info)

    # Add regex-found hrefs
    for href in all_hrefs:
        unique_urls.add(href)
        if 'n1.healthcare' in href.lower() and not any(h['url'] == href for h in healthcare_links):
            healthcare_links.append({
                'type': 'link',
                'tag': 'a',
                'url': href,
                'attrs': {}
            })

    print(f'📊 SUMMARY:')
    print(f'   Total unique URLs found: {len(unique_urls)}')
    print(f'   Parsed links: {len(parser.links)}')
    print(f'   External links: {len([l for l in parser.links if l["url"].startswith("http")])}')
    print(f'   n1.healthcare references in HTML: {healthcare_count}')
    print(f'   n1.healthcare in links: {len(healthcare_links)}')
    print()

    if healthcare_links:
        print('🔴 CRITICAL: LINKS CONTAINING n1.healthcare (NEED TO UPDATE):')
        print('=' * 80)
        for i, link in enumerate(healthcare_links, 1):
            print(f'{i}. {link["url"]}')
            print(f'   Type: {link["type"]} | Tag: <{link["tag"]}>')
            if link['attrs']:
                print(f'   Attributes: {json.dumps(link["attrs"], indent=6)}')
            print()

    if healthcare_matches:
        print('🔍 n1.healthcare CONTEXT IN HTML (showing surrounding text):')
        print('=' * 80)
        for i, match in enumerate(healthcare_matches, 1):
            clean_match = re.sub(r'\s+', ' ', match).strip()
            print(f'{i}. ...{clean_match}...')
            print()

    print('🌐 ALL EXTERNAL LINKS:')
    print('=' * 80)
    seen_external = set()
    for link in parser.links:
        if link['url'].startswith('http') and link['url'] not in seen_external:
            seen_external.add(link['url'])
            marker = ' ⚠️  [CONTAINS n1.healthcare]' if 'n1.healthcare' in link['url'].lower() else ''
            print(f'• {link["url"]}{marker}')
    print()

    print('🏠 INTERNAL/RELATIVE LINKS:')
    print('=' * 80)
    seen_internal = set()
    for link in parser.links:
        if not link['url'].startswith('http') and link['url'] not in seen_internal:
            seen_internal.add(link['url'])
            print(f'• {link["url"]}')
    print()

    # Create a summary JSON file
    summary = {
        'total_urls': len(unique_urls),
        'healthcare_count': healthcare_count,
        'healthcare_links': healthcare_links,
        'all_links': parser.links[:100],  # Limit to first 100 for file size
        'healthcare_contexts': healthcare_matches
    }

    with open('/home/user/images/n1_links_summary.json', 'w') as f:
        json.dump(summary, f, indent=2)

    print('=' * 80)
    print('✅ Analysis complete! Summary saved to n1_links_summary.json')
    print('=' * 80)

if __name__ == '__main__':
    main()
