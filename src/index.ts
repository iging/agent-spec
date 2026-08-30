export { AgentSpecLinter, BANNED_WORDS } from "./linter/linter-engine.js";
export { AgentSpecCompiler } from "./compiler/compiler-engine.js";
export { runCli } from "./cli/cli-entry.js";

export type {
  AuditIssue,
  LinterOptions,
  IssueSeverity,
} from "./types/linter.js";
export type {
  CompileOptions,
  CompileResult,
  RuntimeTarget,
} from "./types/compiler.js";
export type { AgentSpecConfig, OutputDirectories } from "./types/config.js";
export type {
  SkillManifest,
  SkillIdentity,
  IntentDimension,
  TriggerRule,
  WorkflowStep,
  AntiPatternRule,
} from "./types/skill.js";

export const VERSION: string = "1.0.0";
export const SCHEMA_VERSION: string = "v1";
