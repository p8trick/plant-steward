// ============================================================
// PlantSteward Service Worker
// ============================================================
// ⚠️ 每次发布新版本时，必须修改下面这一行的版本号
// 版本号需与 plant-care.html 中的版本号保持一致
// 例如 v1.8.0 → 改为 'plantsteward-v1.8.0'
// ============================================================
const CACHE_NAME = 'plantsteward-v2.6.0'; // ← 每次更新必改这里

// 需要缓存的核心文件列表
// 如果新增了文件（如新图标），也在这里添加
const ASSETS = [
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './apple-touch-icon.png',
  'https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;600;700&family=DM+Mono:wght@400;500&display=swap',
];

// ── 安装阶段：预缓存所有核心资源
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) { return cache.addAll(ASSETS); })
      .then(function() { return self.skipWaiting(); }) // 立即接管，不等旧SW退出
  );
});

// ── 激活阶段：清理旧版本缓存
// 当 CACHE_NAME 版本号变化时，旧缓存会在这里被自动删除
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(
        keys
          .filter(function(k) { return k !== CACHE_NAME; }) // 保留当前版本
          .map(function(k) { return caches.delete(k); })    // 删除所有旧版本
      );
    }).then(function() { return self.clients.claim(); }) // 立即控制所有页面
  );
});

// ── 请求拦截：缓存优先，网络降级
// 离线时从缓存返回，在线时同时更新缓存
self.addEventListener('fetch', function(event) {
  // 只处理 GET 请求
  if (event.request.method !== 'GET') return;
  // 跳过非 http 协议（如 chrome-extension）
  if (!event.request.url.startsWith('http')) return;
  // 🛡️ 隔离防火墙：URL 不包含 plant 关键字（说明是叫号器等其他项目），立刻放行
  if (!event.request.url.includes('plant')) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then(function(cached) {
      // 有缓存：直接返回，同时后台更新
      if (cached) {
        fetch(event.request).then(function(response) {
          if (response && response.status === 200) {
            caches.open(CACHE_NAME).then(function(cache) {
              cache.put(event.request, response);
            });
          }
        }).catch(function() {}); // 离线时静默失败
        return cached;
      }
      // 无缓存：从网络获取并存入缓存
      return fetch(event.request).then(function(response) {
        if (!response || response.status !== 200 || response.type === 'opaque') {
          return response;
        }
        var toCache = response.clone();
        caches.open(CACHE_NAME).then(function(cache) {
          cache.put(event.request, toCache);
        });
        return response;
      }).catch(function() {
        // 网络失败且无缓存：返回主页面（离线兜底）
        if (event.request.destination === 'document') {
          return caches.match('./plant-care.html');
        }
      });
    })
  );
});
