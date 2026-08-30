export type RuntimeTarget = "claude" | "cursor" | "cline" | "copilot" | "all";

export interface CompileOptions {
  sourceDir: string | string[];
  targetRuntime: RuntimeTarget;
  outputDir?: string;
}

export interface CompileResult {
  compiledCount: number;
  targetPaths: string[];
}
