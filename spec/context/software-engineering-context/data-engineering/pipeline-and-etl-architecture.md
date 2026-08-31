# Pipeline and ETL Architecture Specification

## Role / Authority

- **Role:** Specification of data pipeline design, batch and streaming ETL/ELT workflows, data transformation rules, and orchestration engines.
- **Authority:** Primary context reference for data engineering pipelines.
- **Must not define:** Frontend UI layout trees or browser cookie session policies.

---

## 1. Pipeline Architecture & Frameworks

- **Orchestration Engine:** `[PLACEHOLDER: PIPELINE_ORCHESTRATOR]` (e.g., Apache Airflow, Dagster, Prefect)
- **Processing Framework:** `[PLACEHOLDER: DATA_PROCESSING_FRAMEWORK]` (e.g., Apache Spark, dbt, DuckDB, Apache Flink)
- **Processing Paradigm:** `[PLACEHOLDER: PROCESSING_PARADIGM]` (e.g., ELT - Extract-Load-Transform, Batch ETL, Real-time Streaming)

---

## 2. Data Quality & Validation Gates

- **Data Quality Framework:** `[PLACEHOLDER: DATA_QUALITY_FRAMEWORK]` (e.g., Great Expectations, Soda Core)
- **Schema Evolution:** Backward-compatible schema evolution enforced for pipeline datasets.
- **Dead-Letter Pipeline:** Malformed or corrupt input records quarantined without breaking pipeline runs.

---

## 3. Data Lineage & Observability

- **Lineage Standard:** OpenLineage Specification ([openlineage.io](https://openlineage.io))
- **Pipeline Monitoring:** Job execution status, row counts, data freshness SLA, and error rates integrated into telemetry dashboard. See [`observability/telemetry-and-signals.md`](../observability/telemetry-and-signals.md).
