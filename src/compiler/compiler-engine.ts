import type { CompileOptions, CompileResult } from "../types/compiler.js";
import * as fs from "fs";
import * as path from "path";

export class AgentSpecCompiler {
  public compile(options: CompileOptions): CompileResult {
    const { sourceDir, targetRuntime, outputDir } = options;
    const targetPaths: string[] = [];
    let compiledCount = 0;

    const sources: string[] = Array.isArray(sourceDir)
      ? sourceDir
      : [sourceDir];
    const skills: string[] = [];

    for (const src of sources) {
      if (fs.existsSync(src)) {
        skills.push(...this.findSkills(src));
      }
    }

    if (skills.length === 0) {
      throw new Error(
        `No SKILL.md files found in source paths: ${sources.join(", ")}`,
      );
    }

    for (const skillPath of skills) {
      const content: string = fs.readFileSync(skillPath, "utf-8");
      const skillName: string = path.basename(path.dirname(skillPath));

      if (skillName === "_template") {
        continue;
      }

      if (targetRuntime === "claude" || targetRuntime === "all") {
        const outDir: string = outputDir || "./.claude/skills";
        const dest: string = path.join(outDir, skillName, "SKILL.md");
        this.writeFile(dest, content);
        targetPaths.push(dest);
        compiledCount++;
      }

      if (targetRuntime === "cursor" || targetRuntime === "all") {
        const outDir: string = outputDir || "./.cursor/rules";
        const dest: string = path.join(outDir, `${skillName}.mdc`);
        const mdcContent: string = `---\ndescription: "Agent Skill: ${skillName}"\nglobs: "*"\n---\n\n${content}`;
        this.writeFile(dest, mdcContent);
        targetPaths.push(dest);
        compiledCount++;
      }

      if (targetRuntime === "cline" || targetRuntime === "all") {
        const outDir: string = outputDir || "./.cline/rules";
        const dest: string = path.join(outDir, `${skillName}.md`);
        this.writeFile(dest, content);
        targetPaths.push(dest);
        compiledCount++;
      }
    }

    return { compiledCount, targetPaths };
  }

  private findSkills(dirPath: string): string[] {
    let results: string[] = [];
    const entries: string[] = fs.readdirSync(dirPath);

    for (const entry of entries) {
      const fullPath: string = path.join(dirPath, entry);
      const stat: fs.Stats = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        results = results.concat(this.findSkills(fullPath));
      } else if (entry === "SKILL.md") {
        results.push(fullPath);
      }
    }

    return results;
  }

  private writeFile(destPath: string, content: string): void {
    const parentDir: string = path.dirname(destPath);
    if (!fs.existsSync(parentDir)) {
      fs.mkdirSync(parentDir, { recursive: true });
    }
    fs.writeFileSync(destPath, content, "utf-8");
  }
}
