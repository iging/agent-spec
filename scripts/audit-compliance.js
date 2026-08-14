const fs = require("fs");
const path = require("path");

/**
 * @file Audit Compliance Validator for agent-spec
 * @description Validates Markdown files across the codebase against shared/writing-rules.md and docs/anti-patterns.md
 */

/** @type {ReadonlyArray<string>} */
const BANNED_WORDS = Object.freeze([
  "delve",
  "embark",
  "esteemed",
  "shed light",
  "craft",
  "crafting",
  "imagine",
  "remarkable",
  "it remains to be seen",
  "glimpse",
  "unlock",
  "discover",
  "skyrocket",
  "abyss",
  "not alone",
  "innovative",
  "revolutionary",
  "customize",
  "disruptive",
  "utilize",
  "utilizing",
  "illuminate",
  "unveil",
  "pivotal",
  "intricate",
  "elucidate",
  "paradigm",
  "harness",
  "exciting",
  "groundbreaking",
  "skyrocketing",
  "opened up",
  "powerful",
  "inquiring",
  "exploration",
  "testament",
  "in summary",
  "in conclusion",
  "most importantly",
  "tapestry",
  "beacon",
  "multifaceted",
  "synergy",
  "pivot",
  "leverage",
  "holistic",
  "robust",
  "seamless",
  "game-changer",
  "supercharge",
  "elevate",
  "curate",
  "synergistic",
  "paradigm shift",
  "herculean",
  "panacea",
  "linchpin",
  "quintessential",
  "cornerstone",
  "bedrock",
  "beacon of",
  "testament to",
]);

/** @type {ReadonlyArray<string>} */
const PROHIBITED_SETUP_PHRASES = Object.freeze([
  "in conclusion",
  "in summary",
  "in closing",
  "as a conclusion",
]);

/**
 * Recursively collects all Markdown file paths within a target directory.
 * @param {string} dirPath - Absolute path to the directory.
 * @returns {Array<string>} List of absolute Markdown file paths.
 */
function getMarkdownFiles(dirPath) {
  if (!fs.existsSync(dirPath)) {
    return [];
  }

  const directoryEntries = fs.readdirSync(dirPath);
  let fileList = [];

  directoryEntries.forEach((entryName) => {
    const absolutePath = path.join(dirPath, entryName);
    const fileStats = fs.statSync(absolutePath);

    if (fileStats && fileStats.isDirectory()) {
      if (
        entryName !== "node_modules" &&
        entryName !== ".git" &&
        entryName !== "files"
      ) {
        fileList = fileList.concat(getMarkdownFiles(absolutePath));
      }
    } else if (entryName.endsWith(".md")) {
      fileList.push(absolutePath);
    }
  });

  return fileList;
}

/**
 * Audits a single line of Markdown content against writing and anti-pattern rules.
 * @param {string} lineContent - Raw line string.
 * @param {number} lineNumber - One-based line index.
 * @param {string} relativeFilePath - Relative path for file-specific rule bypasses.
 * @param {string} fullDocumentContent - Complete file string for document-level checks.
 * @returns {Array<object>} List of detected issues on this line.
 */
function auditLineRules(
  lineContent,
  lineNumber,
  relativeFilePath,
  fullDocumentContent,
) {
  const lineIssues = [];
  const trimmedLine = lineContent.trim();
  const normalizedPath = relativeFilePath.replace(/\\/g, "/");

  // Skip writing style rules for reference files, specifications, modules, and templates
  const isRuleReferenceFile =
    normalizedPath.startsWith("modules/") ||
    normalizedPath.startsWith("shared/") ||
    normalizedPath.startsWith("core/") ||
    normalizedPath.startsWith("context/") ||
    normalizedPath.startsWith("docs/");

  // Strip inline code (`...`) and URLs from line before auditing prose rules
  let proseOnlyLine = lineContent.replace(/`[^`]*`/g, "");
  proseOnlyLine = proseOnlyLine.replace(/https?:\/\/\S+/g, "");

  // If line is a markdown table row, skip semicolon/emdash checks on table data columns
  const isTableRow = proseOnlyLine.trim().startsWith("|");

  // Rule 1: Em Dash Prohibition (skip headings and rule reference files)
  const isHeading = proseOnlyLine.trim().startsWith("#");
  if (!isRuleReferenceFile && !isHeading && proseOnlyLine.includes("—")) {
    lineIssues.push({
      line: lineNumber,
      rule: "Writing Rule: Em Dash Prohibited",
      message:
        "Em dash (—) found in prose. Use a period, comma, or colon instead.",
      snippet: trimmedLine,
    });
  }

  // Rule 2: Prose Semicolon Prohibition
  if (
    !isRuleReferenceFile &&
    !isTableRow &&
    proseOnlyLine.includes(";") &&
    !/&\w+;/.test(proseOnlyLine)
  ) {
    lineIssues.push({
      line: lineNumber,
      rule: "Writing Rule: Prose Semicolon Prohibited",
      message:
        "Semicolon found in prose text. Use separate sentences or commas.",
      snippet: trimmedLine,
    });
  }

  // Rule 3: Banned Words Check
  if (!isRuleReferenceFile) {
    BANNED_WORDS.forEach((bannedWord) => {
      const wordRegex = new RegExp(
        "\\b" + bannedWord.replace("-", "\\-") + "\\b",
        "i",
      );
      if (wordRegex.test(proseOnlyLine)) {
        lineIssues.push({
          line: lineNumber,
          rule: "Writing Rule: Banned Word Used",
          message: `Banned word '${bannedWord}' detected in prose.`,
          snippet: trimmedLine,
        });
      }
    });

    // Rule 4: Prohibited Setup Phrases
    PROHIBITED_SETUP_PHRASES.forEach((setupPhrase) => {
      const phraseRegex = new RegExp("\\b" + setupPhrase + "\\b", "i");
      if (phraseRegex.test(proseOnlyLine)) {
        lineIssues.push({
          line: lineNumber,
          rule: "Writing Rule: Prohibited Setup Phrase",
          message: `Setup phrase '${setupPhrase}' detected. State findings directly.`,
          snippet: trimmedLine,
        });
      }
    });
  }

  // Rule 5: Anti-Pattern Check (CoT on Native Reasoning Models)
  if (
    !isRuleReferenceFile &&
    /think step by step/i.test(lineContent) &&
    /o3|o4|r1|qwen3/i.test(fullDocumentContent)
  ) {
    lineIssues.push({
      line: lineNumber,
      rule: "Anti-Pattern #35: CoT Scaffolding on Reasoning Model",
      message:
        'Do not add CoT instructions ("think step by step") to native reasoning models.',
      snippet: trimmedLine,
    });
  }

  return lineIssues;
}

/**
 * Audits a complete Markdown file for writing rule and anti-pattern compliance.
 * @param {string} filePath - Absolute path to the Markdown file.
 * @param {string} repositoryRootPath - Root path of the repository.
 * @returns {Array<object>} Detected compliance issues.
 */
function auditFile(filePath, repositoryRootPath) {
  const relativeFilePath = path.relative(repositoryRootPath, filePath);
  const documentContent = fs.readFileSync(filePath, "utf8");
  const documentLines = documentContent.split("\n");
  const detectedIssues = [];

  let isInCodeBlock = false;
  let isInOutputSchemaSection = false;

  documentLines.forEach((lineContent, lineIndex) => {
    const lineNumber = lineIndex + 1;
    const trimmedLine = lineContent.trim();

    if (trimmedLine.startsWith("## 4. Output Specification")) {
      isInOutputSchemaSection = true;
    } else if (trimmedLine.startsWith("## 5.")) {
      isInOutputSchemaSection = false;
    }

    if (trimmedLine.startsWith("```")) {
      isInCodeBlock = !isInCodeBlock;
      return;
    }

    if (isInCodeBlock || isInOutputSchemaSection) {
      return;
    }

    const lineIssues = auditLineRules(
      lineContent,
      lineNumber,
      relativeFilePath,
      documentContent,
    );
    lineIssues.forEach((issue) => detectedIssues.push(issue));

    // Audit relative links in markdown: [text](target) - skip inline code (`...`)
    const lineWithoutCode = lineContent.replace(/`[^`]*`/g, "");
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    let linkMatch;
    while ((linkMatch = linkRegex.exec(lineWithoutCode)) !== null) {
      const target = linkMatch[2].trim();
      if (
        target.startsWith("http://") ||
        target.startsWith("https://") ||
        target.startsWith("mailto:") ||
        target.startsWith("tel:") ||
        target.startsWith("#") ||
        target.includes("[PLACEHOLDER:")
      ) {
        continue;
      }
      const pathOnly = target.split("#")[0].trim();
      if (!pathOnly) continue;

      const resolvedTarget = path.resolve(path.dirname(filePath), pathOnly);
      if (!fs.existsSync(resolvedTarget)) {
        detectedIssues.push({
          line: lineNumber,
          rule: "Link Integrity: Broken Relative Link",
          message: `Target '${pathOnly}' does not exist.`,
          snippet: trimmedLine,
        });
      }
    }
  });

  return detectedIssues;
}

/**
 * Main execution runner for the audit compliance validator.
 */
function runAudit() {
  const repositoryRootPath = path.join(__dirname, "..");
  const customArguments = process.argv.slice(2);

  const targetDirectories =
    customArguments.length > 0
      ? customArguments.map((argumentPath) =>
          path.resolve(repositoryRootPath, argumentPath),
        )
      : [
          path.join(repositoryRootPath, "modules"),
          path.join(repositoryRootPath, "core"),
          path.join(repositoryRootPath, "context"),
          path.join(repositoryRootPath, "docs"),
          path.join(repositoryRootPath, "shared"),
        ];

  let totalFilesChecked = 0;
  let totalIssuesFound = 0;
  const auditResultCollection = [];

  targetDirectories.forEach((targetDirectory) => {
    const markdownFiles = getMarkdownFiles(targetDirectory);
    markdownFiles.forEach((filePath) => {
      totalFilesChecked++;
      const fileIssues = auditFile(filePath, repositoryRootPath);
      if (fileIssues.length > 0) {
        totalIssuesFound += fileIssues.length;
        auditResultCollection.push({
          relativeFilePath: path.relative(repositoryRootPath, filePath),
          fileIssues,
        });
      }
    });
  });

  console.log("====================================================");
  console.log("       agent-spec Compliance & Audit Suite          ");
  console.log("====================================================");
  console.log(`Total Markdown Files Audited: ${totalFilesChecked}\n`);

  if (totalIssuesFound === 0) {
    console.log(
      "✅ SUCCESS: 0 compliance or anti-pattern issues found across all audited files!",
    );
    process.exit(0);
  } else {
    console.error(
      `❌ FAILED: ${totalIssuesFound} issue(s) detected across ${auditResultCollection.length} file(s):\n`,
    );
    auditResultCollection.forEach((result) => {
      console.error(`📄 ${result.relativeFilePath}`);
      result.fileIssues.forEach((issue) => {
        console.error(
          `   Line ${issue.line}: [${issue.rule}] ${issue.message}`,
        );
        console.error(`   Snippet: "${issue.snippet}"\n`);
      });
    });
    process.exit(1);
  }
}

runAudit();
