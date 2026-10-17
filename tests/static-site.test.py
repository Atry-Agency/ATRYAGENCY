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
  for ident in ['project-grid','project-picker','live-iframe','service-deck','contact-form','idea-builder']:self.assertIn('id="'+ident+'"',s)
  self.assertIn('05 / ATRY PRODUCTS',s);self.assertIn('06 / IDEA LAB',s)
 def test_agency_navigation(self):
  for n in PAGES[:-1]:
   d=Document((R/n).read_text());self.assertEqual(sum(a.get('aria-label')=='Navegación principal' for _,a in d.tags),1)
   self.assertIn('>Productos</a>',(R/n).read_text());self.assertIn('href="playground.html"',(R/n).read_text())
 def test_verified_commercial_copy(self):
  s=(R/'turnos.html').read_text();self.assertEqual(s.count('data-plan="'),3);self.assertEqual(s.count('class="tp-commercial-note"'),1)
  for price in ['$790','$1.490','$2.490']:self.assertIn(price,s)
  for limit in ['1 profesional','Hasta 4 profesionales activos','Hasta 10 profesionales activos','300 correos','900 correos']:self.assertIn(limit,s)
  self.assertIn('impuestos está pendiente',s);self.assertIn('No se incluyen pagos online ni WhatsApp automático',s)
  for claim in ['Más elegido','prueba gratis','tarjeta de crédito','aggregateRating']:self.assertNotIn(claim,s)
 def test_start_opens_the_initial_screen(self):
  config=json.loads((R/'assets/site-config.js').read_text().split('=',1)[1].strip().removesuffix(';'))['atryTurnos']
  self.assertEqual(config['startUrl'],config['loginUrl']);self.assertTrue(config['registerUrl'].endswith('#/registro'))
  starts=[a for _,a in Document((R/'turnos.html').read_text()).tags if a.get('data-turnos-link')=='startUrl']
  self.assertGreaterEqual(len(starts),6)
  for a in starts:self.assertTrue(a['href'].endswith('#/login'))
 def test_external_destinations(self):
  for _,a in Document((R/'turnos.html').read_text()).tags:
   if 'data-turnos-link' in a:
    u=urlsplit(a['href']);self.assertEqual(u.netloc,'atry-agency.github.io');self.assertEqual(u.path,'/ATRY-Turnos/');self.assertIn(u.fragment,['/login','/registro'])
 def test_seo(self):
  base='https://atry-agency.github.io/ATRYAGENCY/'
  for n in PAGES:
   s=(R/n).read_text();self.assertNotIn('https://atry.agency/',s)
   self.assertIn(base,s);self.assertIn('rel="canonical"',s);self.assertIn('name="description"',s)
  s=(R/'turnos.html').read_text();data=json.loads(re.search(r'<script type="application/ld\+json">(.*?)</script>',s).group(1));self.assertEqual(data['@type'],'WebApplication');self.assertIn('turnos.html',(R/'sitemap.xml').read_text())
 def test_accessible_demo_and_faq(self):
  d=Document((R/'turnos.html').read_text());self.assertEqual(sum('data-demo'in a for _,a in d.tags),3)
  self.assertEqual(sum(tag=='details' for tag,_ in d.tags),9)
  for tag,a in d.tags:
   if tag=='img':self.assertIn('alt',a);self.assertIn('width',a);self.assertIn('height',a)
 def test_image_budget(self):
  for p in (R/'assets/turnos').glob('*.webp'):self.assertLess(p.stat().st_size,100_000)
 def test_no_external_analytics(self):
  s=(R/'assets/site-config.js').read_text();self.assertIn('"analyticsEnabled": false',s)
  js=(R/'assets/turnos/turnos.js').read_text();self.assertNotIn('fetch(',js);self.assertNotIn('localStorage',js);self.assertNotIn('document.cookie',js)
if __name__=='__main__':unittest.main(verbosity=2)
