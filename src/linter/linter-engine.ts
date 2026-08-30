import type { AuditIssue, LinterOptions } from "../types/linter.js";
import * as fs from "fs";
import * as path from "path";

export const BANNED_WORDS: readonly string[] = Object.freeze([
  "delve",
  "embark",
  "esteemed",
  "shed light",
  "craft",
  "crafting",
  "imagine",
  "remarkable",
  "glimpse",
  "unlock",
  "discover",
  "skyrocket",
  "innovative",
  "revolutionary",
  "disruptive",
  "utilize",
  "illuminate",
  "unveil",
  "pivotal",
  "intricate",
  "paradigm",
  "harness",
  "exciting",
  "groundbreaking",
  "game-changer",
  "supercharge",
  "elevate",
  "curate",
]);

export class AgentSpecLinter {
  public auditDirectory(
    dirPath: string,
    _options?: LinterOptions,
  ): AuditIssue[] {
    const issues: AuditIssue[] = [];
    const files: string[] = this.getMarkdownFiles(dirPath);

    for (const file of files) {
      const fileIssues: AuditIssue[] = this.auditFile(file);
      issues.push(...fileIssues);
    }

    return issues;
  }

  public auditFile(filePath: string): AuditIssue[] {
    const issues: AuditIssue[] = [];
    if (!fs.existsSync(filePath)) {
      return issues;
    }

    const content: string = fs.readFileSync(filePath, "utf-8");
    const lines: string[] = content.split("\n");
    const normalizedPath: string = filePath.replace(/\\/g, "/");

    // Required section header audit for SKILL.md under skills/ (excluding references sub-documents)
    if (
      filePath.endsWith("SKILL.md") &&
      !normalizedPath.includes("/references/") &&
      normalizedPath.includes("skills/")
    ) {
      const requiredSections: readonly string[] = [
        "## 0. Identity",
        "## 1. Intent",
        "## 2. Trigger Matrix",
        "## 3. Execution Workflow",
        "## 4. Output Specification",
        "## 5. Validation Gate",
        "## 6. Anti-Triggers",
        "## 7. Anti-Pattern Compliance",
        "## 8. Versioning",
        "## 9. Portability Matrix",
      ];

      for (const section of requiredSections) {
        if (!content.includes(section)) {
          issues.push({
            filePath,
            line: 1,
            message: `Missing required standard section header: "${section}"`,
            rule: "skill-structure-required",
            severity: "error",
          });
        }
      }
    }

    // Skip prose rules on normative specification docs containing word lists
    const isReferenceOrDoc: boolean =
      normalizedPath.includes("spec/") ||
      normalizedPath.includes("shared/writing/") ||
      normalizedPath.includes("docs/") ||
      normalizedPath.includes("scripts/") ||
      normalizedPath.includes("core/") ||
      normalizedPath.includes("skills/");

    if (!isReferenceOrDoc) {
      lines.forEach((line: string, index: number): void => {
        const lineNum: number = index + 1;
        const lower: string = line.toLowerCase();

        for (const word of BANNED_WORDS) {
          const regex: RegExp = new RegExp(`\\b${word}\\b`, "i");
          if (
            regex.test(lower) &&
            !line.includes("BANNED_WORDS") &&
            !line.includes("banned")
          ) {
            issues.push({
              filePath,
              line: lineNum,
              message: `Prohibited prose word/buzzword detected: "${word}"`,
              rule: "anti-ai-writing-style",
              severity: "warning",
            });
          }
        }
      });
    }

    return issues;
  }

  private getMarkdownFiles(dirPath: string): string[] {
    if (!fs.existsSync(dirPath)) {
      return [];
    }

    let fileList: string[] = [];
    const entries: string[] = fs.readdirSync(dirPath);

    for (const entry of entries) {
      const fullPath: string = path.join(dirPath, entry);
      const stat: fs.Stats = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        if (entry !== "node_modules" && entry !== ".git" && entry !== "dist") {
          fileList = fileList.concat(this.getMarkdownFiles(fullPath));
        }
      } else if (entry.endsWith(".md")) {
        fileList.push(fullPath);
      }
    }

    return fileList;
  }
}
