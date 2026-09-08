"""Archive public Webflow pages/assets. Run intentionally; snapshots never overwrite production content."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.request import urlopen, Request
from urllib.parse import urljoin, urlparse, unquote
import json,re,hashlib,datetime,concurrent.futures
BASE='https://www.totaltissueandfitness.com'
ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'docs/source-snapshot'
class Parser(HTMLParser):
 def __init__(self):super().__init__();self.elements=[];self.text=[];self.skip=0
 def handle_starttag(self,t,a):
  if t in ('script','style'): self.skip+=1
  self.elements.append({'tag':t,**dict(a)})
 def handle_endtag(self,t):
  if t in ('script','style'):self.skip=max(0,self.skip-1)
 def handle_data(self,d):
  if not self.skip and d.strip():self.text.append(d.strip())
def fetch(url):
 with urlopen(Request(url,headers={'User-Agent':'TotalTissueMigration/1.0'}),timeout=45) as r:return r.read()
def main():
 OUT.mkdir(parents=True,exist_ok=True);todo=['/'];seen=set();assets={};pages=[]
 while todo:
  path=todo.pop(0)
  if path in seen:continue
  seen.add(path);slug=path.strip('/').replace('/','-') or 'home'
  try:raw=fetch(BASE+path)
  except Exception as e:pages.append({'path':path,'error':str(e)});continue
  (OUT/f'{slug}.html').write_bytes(raw);html=raw.decode();p=Parser();p.feed(html)
  (OUT/f'{slug}.txt').write_text('\n'.join(p.text))
  (OUT/f'{slug}.elements.json').write_text(json.dumps(p.elements,indent=2))
  pages.append({'path':path,'title':p.text[0] if p.text else '', 'snapshot':f'{slug}.html'})
  for el in p.elements:
   link=el.get('href','');u=urlparse(urljoin(BASE,link))
   if el['tag']=='a' and u.netloc==urlparse(BASE).netloc and (u.path or '/') not in seen and not re.search(r'\.[a-z]+$',u.path):todo.append(u.path or '/')
  for url in re.findall(r'https://cdn\.prod\.website-files\.com/[^\s"<>\\,]+',html):
   url=url.rstrip(')');ext=Path(urlparse(url).path).suffix.lower()
   if ext not in ('.png','.jpg','.jpeg','.webp','.svg','.mp4','.webm','.css','.ico'):continue
   if re.search(r'-p-\d+\.',url):continue
   assets[url]=None
 def download(url):
  ext=Path(urlparse(url).path).suffix.lower();folder='public/media' if ext in ('.mp4','.webm') else ('docs/source-snapshot/styles' if ext=='.css' else 'public/images')
  name=unquote(Path(urlparse(url).path).name);name=re.sub(r'[^A-Za-z0-9._-]','-',name)
  dest=ROOT/folder/name;dest.parent.mkdir(parents=True,exist_ok=True)
  try:
   data=fetch(url);dest.write_bytes(data)
   return {'source':url,'local':str(dest.relative_to(ROOT)),'bytes':len(data),'sha256':hashlib.sha256(data).hexdigest()}
  except Exception as e:return {'source':url,'error':str(e)}
 with concurrent.futures.ThreadPoolExecutor(max_workers=6) as pool:results=list(pool.map(download,assets))
 manifest={'capturedAt':datetime.datetime.now(datetime.timezone.utc).isoformat(),'source':BASE,'pages':pages,'assets':results}
 (OUT/'manifest.json').write_text(json.dumps(manifest,indent=2));print(json.dumps(manifest,indent=2))
if __name__=='__main__':main()
