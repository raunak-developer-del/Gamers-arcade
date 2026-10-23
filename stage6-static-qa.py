#!/usr/bin/env python3
"""Static QA for Stage 6. Not a browser test or semantic uniqueness proof."""
import os,re,json,collections,html,urllib.parse,posixpath
ROOT=os.path.dirname(os.path.abspath(__file__))
def read(path):
    try:
        with open(path,encoding='utf-8',errors='ignore') as f: return f.read()
    except OSError: return ''
files=[]
for base,dirs,names in os.walk(ROOT):
    dirs[:]=[d for d in dirs if d not in ('.git','__pycache__')]
    for n in names: files.append(os.path.relpath(os.path.join(base,n),ROOT).replace(os.sep,'/'))
file_set=set(files)
rows=[]; games_dir=os.path.join(ROOT,'games')
for fn in sorted(os.listdir(games_dir)) if os.path.isdir(games_dir) else []:
    if not re.fullmatch(r'game-\d{3}\.html',fn): continue
    rel='games/'+fn; s=read(os.path.join(ROOT,rel))
    tm=re.search(r'<h1[^>]*>(.*?)</h1>',s,re.I|re.S) or re.search(r'<title[^>]*>(.*?)</title>',s,re.I|re.S)
    title=html.unescape(re.sub(r'<[^>]+>',' ',tm.group(1) if tm else fn)).strip()
    cfg={}; cm=re.search(r'window\.GAME_CONFIG\s*=\s*(\{.*?\})\s*;',s,re.S)
    if cm:
        try: cfg=json.loads(cm.group(1))
        except Exception: pass
    rows.append((rel,title,cfg.get('kind','unknown'),bool(re.search(r'<canvas|<button|addEventListener',s,re.I))))
titles=collections.defaultdict(list); kinds=collections.Counter()
for fn,title,kind,_ in rows:
    titles[re.sub(r'\s+',' ',title.lower()).strip()].append(fn); kinds[kind]+=1
dups={k:v for k,v in titles.items() if len(v)>1}
missing=[]
for rel in files:
    if not rel.lower().endswith(('.html','.js','.css','.webmanifest')): continue
    s=read(os.path.join(ROOT,rel))
    for m in re.finditer(r"(?:href|src)=\"([^\"#]+)\"",s,re.I):
        ref=html.unescape(m.group(1).strip())
        if not ref or re.match(r'^(?:https?:|mailto:|tel:|data:|javascript:|//)',ref,re.I): continue
        ref=urllib.parse.urlsplit(ref).path
        if not ref: continue
        target=posixpath.normpath(posixpath.join(posixpath.dirname(rel),ref))
        if target in ('.',''): continue
        if target not in file_set and not any(f.startswith(target.rstrip('/')+'/') for f in files):
            missing.append((rel,ref,target))
print('Numbered game pages:',len(rows))
print('Exact duplicate visible titles:',len(dups))
print('Game mechanic-family count:',len(kinds))
print('Pages by mechanic family:',dict(sorted(kinds.items())))
print('Pages with likely interactive elements:',sum(1 for x in rows if x[3]),'/',len(rows))
print('Missing local references:',len(missing))
for src,ref,target in missing[:50]: print('MISSING:',src,'->',ref,'(resolved:',target+')')
for title,paths in dups.items(): print('DUPLICATE TITLE:',title,paths)
print('IMPORTANT: repeated mechanic families mean zero-duplicate gameplay is NOT verified.')
print('Static checks cannot prove playability; browser playtesting remains required.')
