# ==============================================================================
# agent-spec Containerized CLI & Multi-IDE Skill Auditor
# Linux Foundation Agentic AI Standard Execution Sandbox
# ==============================================================================

# Stage 1: Build TypeScript Engine
FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json tsconfig.json ./
RUN npm ci

COPY src/ ./src/
COPY schemas/ ./schemas/
RUN npm run build

# Stage 2: Minimal Production CLI Runtime Container
FROM node:20-alpine AS runner
WORKDIR /workspace

ENV NODE_ENV=production

COPY package*.json ./
RUN npm ci --only=production

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/schemas ./schemas

ENTRYPOINT ["node", "/workspace/dist/cli/cli-entry.js"]
CMD ["audit"]
