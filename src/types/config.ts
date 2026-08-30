import type { RuntimeTarget } from "./compiler.js";

export interface OutputDirectories {
  claude?: string;
  cursor?: string;
  cline?: string;
  copilot?: string;
}

export interface AgentSpecConfig {
  version: string;
  projectName?: string;
  targetRuntimes: RuntimeTarget[];
  skillsDirectory?: string;
  outputDirectories?: OutputDirectories;
}
