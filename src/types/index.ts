export interface DecisionInput {
  title: string;
  description: string;
  background: string;
  reasons: string;
  expectedOutcome: string;
  factorsConsidered: string;
  concerns: string;
  alternatives: string;
  tags?: string[];
}

export interface BlindSpot {
  id: string;
  title: string;
  description: string;
  why_overlooked: string;
  suggested_action: string;
  severity: 'high' | 'medium' | 'low';
  category?: string;
}

export interface HiddenAssumption {
  id: string;
  assumption: string;
  why_unsupported: string;
  verification_step: string;
  risk_level: 'high' | 'medium' | 'low';
}

export interface Contradiction {
  id: string;
  statement_a: string;
  statement_b: string;
  conflict_explanation: string;
  resolution_prompt: string;
}

export interface MissingInfo {
  id: string;
  category: string;
  missing_factor: string;
  why_critical: string;
  how_to_obtain: string;
}

export interface RiskItem {
  id: string;
  risk: string;
  impact: 'high' | 'medium' | 'low';
  likelihood: 'high' | 'medium' | 'low';
  mitigation: string;
}

export interface OpportunityItem {
  id: string;
  opportunity: string;
  potential_upside: string;
  how_to_capture: string;
}

export interface AlternativePerspective {
  id: string;
  stakeholder: string;
  viewpoint: string;
  key_question: string;
}

export interface CriticalQuestion {
  id: string;
  question: string;
  rationale: string;
  reflection_target: string;
}

export interface EvidenceCheckItem {
  id: string;
  statement: string;
  classification: 'Fact' | 'Assumption' | 'Interpretation' | 'Needs Verification';
  analysis: string;
}

export interface AnalysisResult {
  id: string;
  decisionId: string;
  timestamp: string;
  summary: string;
  blind_spots: BlindSpot[];
  hidden_assumptions: HiddenAssumption[];
  contradictions: Contradiction[];
  missing_information: MissingInfo[];
  risks: RiskItem[];
  opportunities: OpportunityItem[];
  alternative_perspectives: AlternativePerspective[];
  critical_questions: CriticalQuestion[];
  evidence_check: EvidenceCheckItem[];
  final_reflection: string;
  isDemo?: boolean;
}

export interface DecisionRecord {
  id: string;
  input: DecisionInput;
  analysis: AnalysisResult;
  createdAt: string;
  updatedAt: string;
  status: 'draft' | 'analyzed' | 'action_plan' | 'decided';
  decisionOutcome?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}
