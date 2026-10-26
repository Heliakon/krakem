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
