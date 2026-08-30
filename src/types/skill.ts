export interface SkillIdentity {
  role: string;
  authority: string;
  mustNotDefine: string;
  normativeBase: string;
}

export interface IntentDimension {
  dimension: string;
  value: string;
}

export interface TriggerRule {
  trigger: string;
  fire: boolean;
  notes: string;
}

export interface WorkflowStep {
  step: string;
  action: string;
  input: string;
  stopCondition: string;
  validation: string;
}

export interface AntiPatternRule {
  step: string;
  preventsAp: string;
  mechanism: string;
}

export interface SkillManifest {
  name: string;
  description: string;
  version: string;
  verifiedOn: string[];
  identity: SkillIdentity;
  intent: IntentDimension[];
  triggerMatrix: TriggerRule[];
  workflow: WorkflowStep[];
  outputSpecification: string;
  validationGate: string[];
  antiPatternCompliance: AntiPatternRule[];
}
