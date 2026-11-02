import re
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit, unquote

ROOT = (Path(__file__).resolve().parents[1] / 'dist').resolve()
class Page(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.ids=set(); self.links=[]; self.labels=[]; self.h1=0; self.titles=0
    def handle_starttag(self, tag, attrs):
        a=dict(attrs)
        if 'id' in a:
            assert a['id'] not in self.ids, ('Duplicate ID',a['id'])
            self.ids.add(a['id'])
        if tag=='h1': self.h1+=1
        if tag=='title': self.titles+=1
        if tag=='label' and 'for' in a: self.labels.append(a['for'])
        if tag=='a':
            assert a.get('href'), 'Empty link'
            self.links.append(a['href'])
            if a.get('target')=='_blank': assert 'noopener' in a.get('rel','')
        if tag in ('script','link'):
            attr='src' if tag=='script' else 'href'
            if attr in a:self.links.append(a[attr])
pages={}
for path in ROOT.rglob('*.html'):
    path=path.resolve();page=Page();page.feed(path.read_text());pages[path]=page
    assert page.h1==1, (path,'h1 count',page.h1)
    assert page.titles==1, (path,'title missing')
    assert all(target in page.ids for target in page.labels), (path,'broken form label')
for path,page in pages.items():
    for link in page.links:
        parts=urlsplit(link)
        if parts.scheme or parts.netloc:continue
        # Root-relative links break when the site is served from a subpath such as /krakem/.
        assert not parts.path.startswith('/'),(path,'root-relative link',link)
        target=(path.parent/unquote(parts.path)).resolve() if parts.path else path
        if target.is_dir():target=target/'index.html'
        assert target.exists() and ROOT in target.parents,(path,'missing local target',link)
        if parts.fragment: assert target in pages and parts.fragment in pages[target].ids,(path,'missing anchor',link)
for css in ROOT.rglob('*.css'):
    for ref in re.findall(r'url\(["\']?([^"\')]+)',css.read_text()):
        if ref.startswith(('data:','http:','https:')):continue
        assert not ref.startswith('/'),(css,'root-relative url()',ref)
        assert (css.parent/ref.split('?')[0]).resolve().exists(),(css,'missing url() target',ref)
print('PASS: all page titles, headings, IDs, form labels, relative navigation, internal anchors, script/style assets, CSS images, and download links.')

# The offline copy must work from disk: every link is in-file, a ?lang= switch to another language, a data URL, or an external https page.
# Each language is a separate <template>; only one is placed in the page, so IDs only need to be unique within a language.
OFFLINE = ROOT.parent / 'release' / 'krakem.html'
if OFFLINE.exists():
    text = OFFLINE.read_text()
    head = Page(); head.feed(re.sub(r'<template[\s\S]*?</template>', '', text))
    assert head.titles == 1, 'offline title missing'
    templates = dict(re.findall(r'<template id="lang-(\w+)">([\s\S]*?)</template>', text))
    assert sorted(templates) == ['en', 'pl', 'sv'], ('offline languages', sorted(templates))
    languages = {}
    for lang, fragment in templates.items():
        page = Page(); page.feed(fragment); languages[lang] = page
        assert fragment.count('class="offline-page"') == 5 and page.h1 == 5, ('offline pages', lang, page.h1)
        assert all(target in page.ids for target in page.labels), ('broken offline form label', lang)
    for lang, page in languages.items():
        for link in page.links:
            if link.startswith(('https://', 'mailto:', 'data:')): continue
            switch = re.fullmatch(r'\?lang=(\w+)(#.+)', link)
            target_lang, anchor = (switch.group(1), switch.group(2)) if switch else (lang, link)
            assert target_lang in languages and anchor.startswith('#') and anchor[1:] in languages[target_lang].ids, ('offline link has no in-file target', lang, link[:80])
    assert '<script src' not in text and 'rel="stylesheet"' not in text, 'offline file loads external files'
    print('PASS: offline krakem.html has five pages in each of English, Polish, and Swedish, unique IDs per language, labelled fields, and only in-file, language-switch, data, or https links.')
