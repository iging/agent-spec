---
name: Caching Principles
description: Caching engineering rules covering CDN, HTTP cache, application caching (Redis/Memcached), cache invalidation strategies, and performance optimization for modern web applications.
---

# Caching Principles

> **Purpose:** Caching engineering rules for HTTP, application, and CDN caching strategies. Reference this file from your prompt to enforce strict caching patterns and improve application performance.

---

## 1. HTTP Caching (Built-in)

- **Cache-Control Headers:** Always set `Cache-Control` on responses. Use `public, max-age=3600` for read-only resources that change infrequently. Use `private, no-cache` for user-specific content.
- **ETags:** Use ETags for conditional requests (`If-None-Match`, `If-Modified-Since`). Ensure ETags are consistent across deployments (hash of content, not timestamp) to avoid `304` mismatches in distributed systems.
- **Vary Header:** Use `Vary: Accept-Encoding` when serving compressed and uncompressed variants. Add `Vary: Authorization` for responses that differ by user role.
- **Max-Stale and Min-Fresh:** Use sparingly. `max-stale` is for client-driven tolerance of stale content. `min-fresh` is rarely needed.
- **No-Cache Scenarios:** Mark responses `no-cache` when content is partially dynamic (e.g., personalized header + static body). Do not use `no-cache` as a blanket rule — it forces revalidation on every request.

---

## 2. CDN Caching (Edge Caching)

- **Cache-Invalidate-at-the-Edge:** CDNs cache responses at edge locations. Use `Cache-Control: max-age` combined with `surrogate-key` or `tag` identifiers for granular invalidation.
- **Purge APIs:** If using a commercial CDN (CloudFront, Fastly, Akamai), implement purge APIs (HTTP PURGE or Invalidate APIs) for emergency updates. Do not rely on TTL alone for critical fixes.
- **Edge Logic:** Use edge computing (Cloudflare Workers, AWS Lambda@Edge) for A/B testing, feature flags, or slight content variations without hitting the origin.
- **Cache Invalidation by Tag:** Group related resources under surrogate keys. When a resource changes, purge only the affected tag, not the entire cache.
- **Cookie Exclusion:** Ensure no `Cookie` header is sent to the CDN. Strip cookies at the load balancer for static assets. CDNs cannot cache responses with `Cookie` headers effectively.

---

## 3. Application Caching (Redis / Memcached)

- **Cache-Aside (Lazy Load):** Pattern: check cache → miss → load from DB → populate cache → return. This is the most common and safest pattern. Do not attempt write-through caching unless you have a specialized need.
- **Cache TTL (Time-to-Live):** Set reasonable TTLs based on data volatility. User profiles: 15-30 minutes. Product catalogs: 1-24 hours. Session data: < 30 minutes.
- **Cache Keys:** Use deterministic, versioned cache keys. Include resource type and ID (`cache:user:123`), and consider appending a version number (`cache:user:v2:123`) when schema changes invalidate old caches.
- **Cache Eviction Policies:** Use `allkeys-lru` or `allkeys-lfu` in Redis depending on workload. Do not rely on `no-eviction` without a monitoring plan — OOM kills will occur.
- **Cache Penetration:** Guard against requests for non-existent keys hitting the DB repeatedly. Use Bloom filters or return `404` from cache with `null` value and short TTL.
- **Cache Stampede (Thundering Herd):** Use lock keys or `SETNX` (set-if-not-exists) to ensure only one request refills the cache when a TTL expires. All other requests wait or serve stale data.

---

## 4. Cache Invalidation Strategies

- **Write-Through (Rare):** Update DB and cache simultaneously. Only use when consistency is critical and latency impact is acceptable. Most systems should avoid this.
- **Write-Behind (Asynchronous):** Write to cache first, asyncaneously write to DB. Risk: data loss if cache crashes before persistence. Use only when acceptable data loss window is defined.
- **Time-Based Invalidation:** Set TTL and let the key expire naturally. Simplest strategy. Works when data changes on a known schedule.
- **Event-Driven Invalidation:** Publish a cache-invalidation event (Kafka, SNS, RabbitMQ) when data changes. Subscribers evict the specific key. Most scalable for microservices.
- **Tag-Based Invalidation:** Associate cache keys with tags/labels. When a resource changes, evict all keys tagged with the resource ID. Supported natively in Redis 6+ and Memcached with third-party extensions.
- **Stale-While-Revalidate:** Serve cached content while asynchronously re-fetching from origin. Improves perceived performance while ensuring eventual consistency. Header: `Cache-Control: max-age=3600, stale-while-revalidate=86400`.

---

## 5. Cache Metrics and Observability

- **Hit/Miss Ratio:** Monitor cache hit rate. Target: > 80% for production workloads. < 50% indicates misconfigured TTLs, cache key issues, or insufficient cache size.
- **Latency Impact:** Track cache read vs. DB write latency. Cache should be < 1ms. If cache latency > 5ms, investigate network or Redis configuration.
- **Eviction Rate:** Monitor how often keys are evicted. High eviction + low hit ratio = TTL too short or cache size too small.
- **Memory Usage:** Track Redis/Memcached memory usage vs. configured max. Set alerts at 70-80% to proactively scale or adjust TTLs.
- **Top Keys:** Identify the hottest keys (most accessed). Useful for capacity planning and deciding what to keep in cache vs. always fetch from DB.

---

## 6. Cache Security and Privacy

- **Sensitive Data in Cache:** Never cache PII, passwords, tokens, or health data in shared Redis or CDN cache. Use `private` cache or in-memory only.
- **Cache-Isolation per Tenant:** When using shared Redis instances, prefix cache keys with tenant ID (`tenant:123:user:456`) to prevent cross-tenant data leakage.
- **HTTPS for Cache Keys:** If cache keys contain sensitive identifiers, transmit them over HTTPS. Even though Redis may be internal, network sniffing risks exist.
- **Authorization on Cache Reads:** Check permissions before serving cached data. Cache does not replace application-level authz. A cached response for user A must not be served to user B.

---

## 6. Deployment and Operational Guidelines

- **Local Cache vs. Shared Cache:** Use in-memory caches (Node `node-cache`, Go `cache2go`) for thread-local data. Use shared Redis for multi-instance apps. Do not mix patterns without a clear boundary.
- **Cache Warm-up on Deployment:** On new deployment, warm the cache with frequently accessed keys before routing traffic. Prevents cold-start miss spikes.
- **Blue-Green Cache Deployment:** When changing cache TTL or structure, deploy the new version alongside the old one with gradual traffic shift. Avoid sudden cache purges.
- **Disaster Recovery:** Document cache failover procedure. If Redis goes down, what falls back to? DB reads should gracefully handle cache misses without app crash.
- **Testing Cache Behavior:** Write unit tests that simulate cache miss, cache hit, expiry, and eviction. Integration tests should verify cache-invalidation events fire correctly.
