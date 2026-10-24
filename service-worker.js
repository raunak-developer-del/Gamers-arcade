const CACHE_NAME = 'gamers-arcade-single-player-v2';
const CORE_FILES = [
 './','./index.html','./play.html','./batch4-games.html',
 './batch4-games-manifest.json','./batch4-runtime.js','./batch4-games.css',
 './manifest.webmanifest','./arcade-icon.svg','./leaderboard.html',
 './profile.html','./supabase-config.js'
];
self.addEventListener('install',event=>{
 event.waitUntil(caches.open(CACHE_NAME).then(async cache=>{
   await Promise.all(CORE_FILES.map(async url=>{try{await cache.add(url)}catch(e){}}));
   await self.skipWaiting();
 }));
});
self.addEventListener('activate',event=>{
 event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch',event=>{
 if(event.request.method!=='GET')return;
 const url=new URL(event.request.url);
 if(url.origin!==self.location.origin)return;
 event.respondWith(caches.match(event.request).then(cached=>{
  const network=fetch(event.request).then(response=>{
   if(response&&response.ok){const copy=response.clone();caches.open(CACHE_NAME).then(cache=>cache.put(event.request,copy))}
   return response;
  }).catch(()=>cached||caches.match('./index.html'));
  return cached||network;
 }));
});
