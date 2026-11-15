"""No external dependencies: static publication and commercial-content safeguards."""
import json,re,unittest
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit,unquote
R=Path(__file__).resolve().parents[1]
PAGES=['index.html','servicios.html','proyectos.html','estudio.html','cafe.html','playground.html','turnos.html']
class Document(HTMLParser):
 def __init__(self,text):
  super().__init__();self.tags=[];self.feed(text)
 def handle_starttag(self,tag,attrs): self.tags.append((tag,dict(attrs)))
class SiteTest(unittest.TestCase):
 def test_pages_and_ids(self):
  for name in PAGES:
   with self.subTest(page=name):
    s=(R/name).read_text();d=Document(s);ids=[a['id'] for _,a in d.tags if 'id'in a]
    self.assertEqual(len(ids),len(set(ids)));self.assertEqual(len(re.findall(r'<h1\b',s)),1)
    self.assertEqual(len(re.findall(r'<main\b',s)),1);self.assertEqual(s.count('id="mobile-menu"'),1)
 def test_landing_nesting(self):
  class Nesting(HTMLParser):
   def __init__(self):super().__init__();self.stack=[];self.errors=[]
   def handle_starttag(self,tag,attrs):
    if tag not in {'area','base','br','col','embed','hr','img','input','link','meta','param','source','track','wbr'}:self.stack.append(tag)
   def handle_endtag(self,tag):
    if tag in {'area','base','br','col','embed','hr','img','input','link','meta','param','source','track','wbr'}:return
    if not self.stack or self.stack[-1]!=tag:self.errors.append((tag,list(self.stack[-3:])))
    else:self.stack.pop()
  p=Nesting();p.feed((R/'turnos.html').read_text());self.assertEqual(p.errors,[]);self.assertEqual(p.stack,[])
 def test_local_links_assets_and_fragments(self):
  for name in PAGES:
   for tag,a in Document((R/name).read_text()).tags:
    for attr in ['src','href']:
     value=a.get(attr,'');u=urlsplit(value)
     if not value or u.scheme or value.startswith('//'):continue
     target=R/unquote(u.path) if u.path else R/name
     with self.subTest(page=name,url=value):
      self.assertTrue(target.is_file(),value)
      if u.fragment and target.suffix=='.html':self.assertIn(u.fragment,[x.get('id') for _,x in Document(target.read_text()).tags])
 def test_home_preserved_and_product_order(self):
  s=(R/'index.html').read_text();self.assertIn('WHERE',s);self.assertIn('CREATIVITY',s)
  self.assertLess(s.index('id="servicios"'),s.index('id="productos"'));self.assertLess(s.index('id="productos"'),s.index('id="idea-builder"'))
  for ident in ['project-grid','project-picker','live-capture','service-deck','contact-form','idea-builder']:self.assertIn('id="'+ident+'"',s)
  self.assertIn('05 / ATRY PRODUCTS',s)
 def test_agency_navigation(self):
  for n in PAGES:
   s=(R/n).read_text();d=Document(s);self.assertEqual(sum(a.get('aria-label')=='Navegación principal' for _,a in d.tags),1)
   self.assertIn('>Productos</a>',s);self.assertIn('href="playground.html"',s)
 def test_no_duplicated_commercial_catalog_or_old_product_links(self):
  for n in ['index.html','turnos.html']:
   s=(R/n).read_text();self.assertIn('https://atryturnos.com/descubrir.html',s)
   for obsolete in ['data-plan-price','data-plan=','17/10/2026','atry-agency.github.io/ATRY-Turnos']:self.assertNotIn(obsolete,s)
  s=(R/'turnos.html').read_text();self.assertIn('Uruguay y Panamá',s);self.assertIn('IAtry',s)
 def test_removed_project_and_no_remote_embeds(self):
  js=(R/'script.js').read_text()
  for text in ['Salud y Bienestar','github.io/SYB',"id:'syb'",'Celeste en Agenda','Partidos-de-Uruguay','<iframe','setTimeout(']:self.assertNotIn(text,js)
  self.assertIn('img.onload=',js);self.assertIn('img.onerror=',js);self.assertIn('captureRequests.get(surface)!==token',js)
  self.assertNotIn('live-iframe',(R/'index.html').read_text())
 def test_capture_sources_budget_and_dimensions(self):
  records=json.loads((R/'assets/projects/captures.json').read_text());self.assertEqual(len(records),9)
  for row in records:
   self.assertEqual(row['status'],200);self.assertTrue(row['url'].startswith('https://'));self.assertIn(row['device'],['desktop','tablet','mobile'])
   self.assertTrue((R/row['file']).is_file());self.assertLess((R/row['file']).stat().st_size,120_000)
  self.assertLess(sum((R/x['file']).stat().st_size for x in records),800_000)
 def test_seo_and_image_accessibility(self):
  for n in PAGES:
   s=(R/n).read_text();self.assertIn('https://atryagency.com/',s);self.assertIn('rel="canonical"',s);self.assertIn('name="description"',s)
  for n in ['index.html','turnos.html']:
   for tag,a in Document((R/n).read_text()).tags:
    if tag=='img' and a.get('src','').startswith('assets/projects/'):
     for attr in ['alt','width','height']:self.assertIn(attr,a)
 def test_no_external_analytics_or_backend_client(self):
  s=(R/'assets/site-config.js').read_text();self.assertIn('"analyticsEnabled": false',s)
  js=(R/'assets/turnos/turnos.js').read_text()
  for text in ['fetch(','localStorage','document.cookie','supabase']:self.assertNotIn(text,js)
if __name__=='__main__':unittest.main(verbosity=2)
