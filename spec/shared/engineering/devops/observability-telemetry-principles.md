---
name: Observability & Telemetry Principles
description: Framework-agnostic baseline standard for structured logging, distributed tracing, metric instrumentations, alert design, OpenTelemetry collection, and incident visibility.
---

# Observability & Telemetry Principles

> **Purpose:** Baseline observability and telemetry rules. Reference this file when instrumenting application logs, defining metrics, configuring OpenTelemetry tracing, or setting up alert rules.

---

## Role / Authority

- **Role:** Framework-agnostic baseline standard for structured logging formats, distributed tracing span propagation, application metrics, alert hygiene, and OpenTelemetry collector integration.
- **Authority:** Tier-3 shared engineering specification applicable across application runtimes, microservice networks, and monitoring infrastructure.
- **Must not define:** Third-party vendor APM dashboard visual layouts or incident pager rotation schedules.

---

## 1. Structured JSON Logging and Context Enrichment

- Emit all application logs as structured JSON strings to stdout/stderr; avoid plain unstructured text formatting in production environments.
- Include standard envelope fields on every log entry: `timestamp` (ISO 8601 UTC), `level` (DEBUG, INFO, WARN, ERROR, FATAL), `service`, `environment`, and `trace_id`.
- Enrich log context with relevant request identity attributes: `user_id`, `tenant_id`, `request_id`, and `http_method`.
- Use appropriate log levels accurately: INFO for key business state events; WARN for recoverable operational issues; ERROR for actionable request failures.
- Avoid logging inside high-frequency hot loops to prevent log buffer congestion and storage cost inflation.

---

## 2. Distributed Tracing and Context Propagation

- Instrument distributed tracing across all service entrypoints, outgoing HTTP requests, message queues, and database calls.
- Propagate trace headers (W3C Trace Context `traceparent` and `tracestate`) across HTTP request headers and asynchronous message envelopes.
- Maintain trace continuity: pass `trace_id` and `span_id` downstream through worker queues and external RPC calls.
- Annotate spans with high-value domain attributes (`db.statement`, `http.status_code`, `rpc.method`) while avoiding unbounded cardinality attributes.

---

## 3. Metric Instrumentation and Framework Alignment

- Instrument applications using standard metric types: Counters (monotonically increasing), Gauges (point-in-time state), and Histograms (distribution buckets).
- Apply the RED method for request-driven services: Rate (requests/sec), Errors (failed requests/sec), and Duration (latency distribution).
- Apply the USE method for infrastructure resources: Utilization (% busy), Saturation (queue depth), and Errors (fault counts).
- Control metric cardinality strictly: never attach unbounded values (user IDs, emails, unique UUIDs, raw URLs with IDs) as metric label keys.

---

## 4. OpenTelemetry Standard Standardization

- Adopt OpenTelemetry (OTel) standards for vendor-neutral collection of traces, metrics, and logs.
- Export telemetry data using OpenTelemetry Protocol (OTLP) to local OTel Collectors or telemetry agents.
- Standardize semantic conventions across microservices following OpenTelemetry service and attribute naming specifications.

---

## 5. Alert Design and Noise Elimination

- Base alerts on actionable, customer-impacting Symptom-Based Service Level Indicators (SLIs) and Service Level Objectives (SLOs) rather than transient CPU blips.
- Establish distinct alert severity levels: Page (requires immediate human response outside business hours) vs Ticket (requires next-business-day investigation).
- Enforce runbook link requirements: every alert message must include a link to its corresponding troubleshooting runbook.
- Continuously review and eliminate false-positive alerts to prevent on-call engineer fatigue.

---

## 6. Data Privacy and Sensitive Telemetry Scrubbing

- Sanitize all telemetry streams automatically to strip Personally Identifiable Information (PII), credentials, API keys, and credit card tokens.
- Apply log redaction filters at the application framework level before writing to output streams.
- Hash or mask sensitive user identifiers before emitting telemetry attributes.
