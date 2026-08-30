export type IssueSeverity = "error" | "warning";

export interface AuditIssue {
  filePath: string;
  line: number;
  message: string;
  rule: string;
  severity: IssueSeverity;
}

export interface LinterOptions {
  targetDir?: string;
  ignoreDocs?: boolean;
}
