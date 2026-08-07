# Foundation Interview Protocol

This protocol dictates exactly how an AI must interrogate a user to extract a rock-solid, production-ready foundation before writing to the `context/` directory.

## Phase 1: Untangle the Dump

Before asking any questions, analyze the user's initial prompt (the "brain dump").

- **Extract Core Goal:** Identify the true objective hidden beneath the noise.
- **Park Irrelevant Details:** Mentally discard details that do not impact the core architecture or PRD.
- **Resolve Contradictions:** If the user says two conflicting things, prioritize the latter or clarify it immediately.

## Phase 2: The 3-Round Grilling

Never accept a vague spec. You must execute a rigorous 3-round interview, totaling 10-15 questions. Do NOT ask all 15 questions at once. Batch them into 4-6 questions per round.

### Round 1: Foundations (4-6 questions)

Establish the baseline.

- Who is the exact target user?
- What is the single core problem being solved?
- What is the primary platform (Web, Mobile, CLI)?

### Round 2: Boundaries & MVP (4-6 questions)

Base these questions on the answers from Round 1.

- What features are strictly out of scope for V1 (the MVP)?
- What are the hard constraints (budget, time, specific technology requirements)?
- How do we handle edge cases related to the core feature?

### Round 3: Metrics & Schemas (4-6 questions)

- What is the exact success metric for the MVP?
- What data must be persisted across sessions?
- What are the user roles or permission tiers?

## Rules of Engagement

- Stop and wait for the user to answer after every round.
- Number your questions so the user can answer them easily.
- Every question must be actionable (it must be able to change the build spec).
- Do not ask questions the user has already answered.
