// QUEST 3.1: network-first PWA; never cache authenticated HTML or redirects.
const CACHE='quest-static-v3-1';
const STATIC=['./style.css?v=3.1.0','./app.js?v=3.1.0','./icon.svg','./manifest.webmanifest'];
self.addEventListener('install',event=>{event.waitUntil(self.skipWaiting())});
self.addEventListener('activate',event=>{event.waitUntil((async()=>{const keys=await caches.keys();await Promise.all(keys.filter(k=>k.startsWith('quest-')&&k!==CACHE).map(k=>caches.delete(k)));await self.clients.claim()})())});
self.addEventListener('fetch',event=>{
 const req=event.request;
 if(req.method!=='GET'||new URL(req.url).origin!==self.location.origin)return;
 if(req.mode==='navigate'){event.respondWith(fetch(req,{cache:'no-store'}));return}
 event.respondWith((async()=>{try{const res=await fetch(req,{cache:'no-store'});if(res.ok&&res.type==='basic'&&!res.redirected&&STATIC.some(x=>new URL(x,self.registration.scope).href===req.url)){const cache=await caches.open(CACHE);await cache.put(req,res.clone())}return res}catch(err){const cached=await caches.match(req);if(cached)return cached;throw err}})())
});
