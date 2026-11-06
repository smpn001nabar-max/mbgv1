/* Hanya aset statis lokal. Data pribadi, sesi dan respons API tidak pernah di-cache. */
const CACHE='sis-mbg-static-v1';
const ASSETS=['./','./index.html','./css/style.css','./js/config.js','./js/app.js','./js/demo.js','./js/xlsx.full.min.js','./manifest.webmanifest','./assets/icon-192.png','./assets/icon-512.png','./assets/Template_Import_Siswa.xls','./assets/Template_Import_Guru.xls'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS))));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('sis-mbg-static-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(e.request.method!=='GET'||u.origin!==self.location.origin||u.search)return;const base=new URL('./',self.location.href);if(!ASSETS.some(p=>new URL(p,base).pathname===u.pathname))return;e.respondWith(fetch(e.request).then(r=>{if(r.ok){const copy=r.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));}return r;}).catch(()=>caches.match(e.request)));});
