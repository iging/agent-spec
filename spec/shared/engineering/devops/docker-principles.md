---
name: Docker & Containerization Principles
description: Framework-agnostic baseline standard for Dockerfile optimization, multi-stage builds, container security, non-root user execution, network isolation, and storage management.
---

# Docker & Containerization Principles

> **Purpose:** Baseline Docker and containerization engineering rules. Reference this file when authoring Dockerfiles, docker-compose.yml files, container build scripts, or container security configurations.

---

## Role / Authority

- **Role:** Framework-agnostic baseline standard for Docker containerization, Dockerfile optimization, multi-stage builds, security isolation, networking, and volume management.
- **Authority:** Tier-3 shared engineering specification applicable across containerized applications, microservices, and container orchestration build pipelines.
- **Must not define:** Cloud-specific Kubernetes Manifest schemas or application-level HTTP routing logic.

---

## 1. Multi-Stage Builds and Image Minimization

- Separate build-time dependencies (compilers, SDKs, development headers) from runtime environments using multi-stage builds.
- Use minimal base images (Alpine, Distroless, or slim variants from official Docker Hub sources) for production runtime stages.
- Keep final production image size minimal to reduce download latency, memory footprint, and attack surface.
- Create reusable base build stages for shared dependencies across multi-service Dockerfiles.
- Export final build artifacts cleanly using `COPY --from=<stage>` instructions.

---

## 2. Dockerfile Instruction Discipline and Layer Caching

- Order Dockerfile instructions from least frequently changing to most frequently changing to maximize layer cache hits.
- Combine related `RUN` commands (such as package manager updates and package installations) into single steps to reduce image layers.
- Clean up package manager caches (`apt-get clean`, `rm -rf /var/lib/apt/lists/*`) within the same `RUN` layer where packages are installed.
- Use `.dockerignore` files to exclude local build artifacts, `.git` histories, `node_modules`, and secret files from the build context.
- Use absolute paths for `WORKDIR` instructions; avoid repeated `RUN cd` commands.

---

## 3. Non-Root Security and Identity Isolation

- Never run containerized processes as `root` in production environments.
- Create a dedicated non-root system user and group using explicit UID/GID in the Dockerfile.
- Set the `USER` instruction prior to the `ENTRYPOINT` or `CMD` instruction in the final production stage.
- Pass the `--no-log-init` flag to `useradd` when creating users to prevent sparse file log initialization bugs.
- Avoid installing or using `sudo` inside containers; use `gosu` if privilege step-down is required during container startup.

---

## 4. Secret Management and Image Supply Chain Protection

- Never hardcode credentials, API keys, passwords, or tokens in Dockerfiles or image layers.
- Use Docker BuildKit secret mounts (`RUN --mount=type=secret,id=...`) to pass build-time credentials safely without persisting them in image layers.
- Pin base images to explicit version tags or SHA256 image digests to ensure deterministic builds and prevent drift.
- Rebuild container images regularly with the `--pull` flag to incorporate upstream security patches and dependency updates.
- Generate Software Bill of Materials (SBOM) and provenance attestations using `docker buildx` for supply chain compliance.
- Scan images for vulnerabilities (using Docker Scout, Trivy, or Grype) prior to deployment to production registries.

---

## 5. Container Networking and Port Controls

- Expose only required application ports using explicit `EXPOSE` instructions.
- In Docker Compose or runtime configurations, bind container ports to `127.0.0.1` rather than `0.0.0.0` unless external network ingress is required.
- Use custom user-defined bridge or overlay networks for inter-container communication instead of default bridge networks.
- Restrict inter-container communication to required service pairs; isolate unrelated services into separate container networks.
- Prefer DNS service names for container-to-container communication over static IP addresses.

---

## 6. Storage, Volumes, and State Management

- Design application containers to be stateless; offload persistent data to external database engines or object storage.
- Declare `VOLUME` instructions for mutable runtime directories, database data paths, and configuration persistence paths.
- Use named volumes for persistent data managed by Docker engine; use bind mounts only for local development workflows.
- Set read-only flags (`:ro`) on bind mounts and volumes whenever write access is not required by the container process.
- Ensure volume permissions match the non-root runtime container user UID/GID to prevent permission errors.
