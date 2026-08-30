#!/usr/bin/env node

import type { AuditIssue } from "../types/linter.js";
import type { CompileResult, RuntimeTarget } from "../types/compiler.js";
import * as fs from "fs";
import { AgentSpecLinter } from "../linter/linter-engine.js";
import { AgentSpecCompiler } from "../compiler/compiler-engine.js";

export function runCli(args: string[]): void {
  const command: string = args[0] || "help";

  switch (command) {
    case "audit":
    case "lint": {
      console.log(
        "🔍 Executing agent-spec compliance & skill linter audit...\n",
      );
      const linter: AgentSpecLinter = new AgentSpecLinter();
      const targetDir: string = args[1] || ".";
      const issues: AuditIssue[] = linter.auditDirectory(targetDir);

      if (issues.length === 0) {
        console.log(
          "✅ Audit passed! All skills & spec files conform to Tier-5 compliance standard.",
        );
        process.exit(0);
      } else {
        console.log(`⚠️  Found ${issues.length} audit issue(s):\n`);
        for (const issue of issues) {
          console.log(
            `  [${issue.severity.toUpperCase()}] ${issue.filePath}:${issue.line}`,
          );
          console.log(`    Rule: ${issue.rule}`);
          console.log(`    Message: ${issue.message}\n`);
        }
        const hasErrors: boolean = issues.some(
          (i: AuditIssue): boolean => i.severity === "error",
        );
        process.exit(hasErrors ? 1 : 0);
      }
      break;
    }

    case "sync":
    case "compile": {
      console.log(
        "⚡ Compiling canonical agent-spec skills for cross-IDE runtimes...\n",
      );
      const compiler: AgentSpecCompiler = new AgentSpecCompiler();
      const sourceDir: string | string[] = args[1] || (fs.existsSync("./spec/skills") ? ["./spec/skills"] : ["./skills"]);
      const runtime: RuntimeTarget = (args[2] as RuntimeTarget) || "all";

      try {
        const result: CompileResult = compiler.compile({
          sourceDir,
          targetRuntime: runtime,
        });
        console.log(
          `🎉 Successfully compiled ${result.compiledCount} target skill artifact(s):`,
        );
        for (const targetPath of result.targetPaths) {
          console.log(`  - ${targetPath}`);
        }
      } catch (err: unknown) {
        const message: string =
          err instanceof Error ? err.message : String(err);
        console.error(`❌ Compilation error: ${message}`);
        process.exit(1);
      }
      break;
    }

    case "init": {
      console.log("🚀 Initializing agent-spec project standard structure...\n");
      const directories: readonly string[] = [
        "spec/skills",
        "schemas",
        "spec/core",
        "spec/context",
        "spec/docs",
        "spec/shared",
        ".claude/skills",
        ".cursor/rules",
        ".cline/rules",
      ];

      for (const dir of directories) {
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
          console.log(`  + Created directory: ${dir}`);
        }
      }
      console.log("\n✨ agent-spec environment initialized successfully.");
      break;
    }

    case "version":
    case "-v":
    case "--version": {
      console.log("agent-spec v1.0.0 (Linux Foundation Agentic AI Standard)");
      break;
    }

    case "help":
    default: {
      console.log(`
agent-spec CLI - Industry Standard Specification & Skill Compiler for AI Coding Agents

Usage:
  npx agent-spec <command> [options]

Commands:
  audit [path]       Lint & validate Markdown skills against Tier-5 schema & anti-pattern rules
  sync [src] [target] Compile skills to Claude Code, Cursor, Cline, and Copilot adapters
  init               Scaffold agent-spec folder structure in current project workspace
  version            Print CLI release version

Examples:
  npx agent-spec audit
  npx agent-spec sync ./spec/skills all
  docker run --rm -v "$(pwd):/workspace" ghcr.io/agent-spec/cli:latest audit
      `);
      break;
    }
  }
}

runCli(process.argv.slice(2));
