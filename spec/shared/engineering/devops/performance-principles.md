---
name: Performance & Scalability Principles
description: Framework-agnostic baseline standard for application responsiveness, throughput optimization, latency reduction, memory management, caching topologies, and scalable systems design.
---

# Performance & Scalability Principles

> **Purpose:** Baseline performance and scalability rules. Reference this file when optimizing web/API response times, system throughput, memory footprints, frontend bundle metrics, or data caching strategies.

---

## Role / Authority

- **Role:** Framework-agnostic baseline standard for frontend Core Web Vitals, backend API latency reduction, memory lifecycle management, caching strategies, and system scalability.
- **Authority:** Tier-3 shared engineering specification applicable across full-stack applications, distributed services, and high-throughput systems.
- **Must not define:** UI visual design tokens or infrastructure billing budgets.

---

## 1. Performance Budgets and Latency Targets

- Establish explicit latency budgets: p95 API response times under 200ms; p99 API response times under 500ms for core transactional paths.
- Enforce Core Web Vitals targets on frontend applications: Largest Contentful Paint (LCP) under 2.5s; Interaction to Next Paint (INP) under 200ms; Cumulative Layout Shift (CLS) under 0.1.
- Track performance metrics continuously in CI and production; flag regressions automatically before merging code changes.

---

## 2. Frontend Performance and Asset Optimization

- Minimize initial JavaScript bundle payloads through code-splitting, dynamic imports, and aggressive tree-shaking.
- Optimize media assets: compress images, serve modern formats (WebP, AVIF), set explicit width/height dimensions, and enforce lazy-loading below the fold.
- Eliminate layout shifts by reserving structural container space before loading dynamic dynamic components or remote images.
- Cache static assets aggressively using Content Delivery Networks (CDNs) with immutable `Cache-Control` headers.

---

## 3. Backend Throughput and Concurrency Optimization

- Offload non-blocking or long-running tasks (email processing, report generation, image encoding) to asynchronous queue workers.
- Eliminate network round-trip overhead: batch database operations, use HTTP/2 or HTTP/3 multiplexing, and leverage persistent connection pools.
- Avoid synchronous blocking I/O on critical request threads; utilize asynchronous event loops or non-blocking I/O primitives.
- Restrict payload transmission sizes: implement pagination with enforced maximum page sizes and gzip/brotli request compression.

---

## 4. Strategic Caching and Storage Layer Acceleration

- Implement multi-tier caching: client-side HTTP caching, CDN edge caching, distributed in-memory caching (Redis, Memcached), and database query caching.
- Enforce explicit Time-To-Live (TTL) values for all cached items to prevent indefinite stale data retention.
- Address cache invalidation explicitly: combine TTL expiration with active event-driven cache invalidation on resource mutations.
- Protect against cache stampedes using request coalescing (single-flight locking) and jittered TTL expiration windows.

---

## 5. Memory Management and Resource Leak Prevention

- Release resources explicitly: close database connections, clear active timers, unsubscribe from event listeners, and unregister streams when work finishes.
- Avoid unbounded in-memory collection growth: stream large file reads and database query cursor results rather than buffering entire datasets into RAM.
- Conduct routine profile analyses (heap dumps, CPU flamegraphs) under load to detect memory leaks, GC pauses, and CPU bottlenecks.

---

## 6. Scalability Architecture and Load Handling

- Design compute services for horizontal scalability (stateless app servers behind load balancers).
- Apply rate limiting and request throttling at API gateways to protect downstream services from traffic floods.
- Implement circuit breakers and graceful degradation when dependent downstream services experience failure or extreme latency.
