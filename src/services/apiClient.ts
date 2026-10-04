import { DecisionInput, AnalysisResult } from '../types';
import { INTERNSHIP_SCENARIO } from '../data/sampleScenarios';
import { getStoredAuthToken } from '../context/AuthContext';

export async function analyzeDecisionAPI(input: DecisionInput): Promise<AnalysisResult> {
  const token = getStoredAuthToken();
  if (!token) {
    throw new Error('Authentication required: Please sign in to analyze decisions.');
  }

  try {
    const res = await fetch('/api/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(input),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      if (res.status === 401) {
        throw new Error('Authentication session expired. Please log in again to continue.');
      }
      throw new Error(errorData.error || `Server responded with status ${res.status}`);
    }

    const data = await res.json();
    return {
      ...data,
      id: `analysis-${Date.now()}`,
      decisionId: `dec-${Date.now()}`,
      timestamp: new Date().toISOString(),
      isDemo: false,
    };
  } catch (error: any) {
    console.warn('API call failed or unavailable. Falling back to contextual fallback analysis:', error);
    // If it was the internship scenario or matches it, provide the rich precomputed scenario with demo flag
    const isInternship = input.title.toLowerCase().includes('internship') || input.description.toLowerCase().includes('internship');
    if (isInternship) {
      return {
        ...INTERNSHIP_SCENARIO.precomputedAnalysis,
        id: `analysis-${Date.now()}`,
        decisionId: `dec-${Date.now()}`,
        timestamp: new Date().toISOString(),
        isDemo: true,
      };
    }

    // Contextual fallback response so the user still gets a structured result
    return generateSmartFallback(input, error.message);
  }
}

export async function askAssistantAPI(params: {
  decision: DecisionInput;
  analysis: AnalysisResult;
  history: Array<{ role: 'user' | 'assistant'; content: string }>;
  message: string;
}): Promise<string> {
  const token = getStoredAuthToken();
  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers,
      body: JSON.stringify(params),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `Server responded with ${res.status}`);
    }

    const data = await res.json();
    return data.reply;
  } catch (err: any) {
    console.warn('Chat API error:', err);
    return `[Assistant Note: Running in offline/fallback response mode]\n\nRegarding your question: "${params.message}"\n\nWhen exploring this decision, prioritize testing your most vulnerable assumptions first. Specifically for "${params.decision.title}":\n1. What verifiable evidence do you possess right now?\n2. What is the worst-case scenario, and can you survive it?\n3. What single conversation or inquiry would reduce 50% of your current uncertainty?`;
  }
}

function generateSmartFallback(input: DecisionInput, errorMsg: string): AnalysisResult {
  return {
    id: `analysis-fallback-${Date.now()}`,
    decisionId: `dec-${Date.now()}`,
    timestamp: new Date().toISOString(),
    isDemo: true,
    summary: `Structured evaluation for "${input.title}". Analysis indicates strong strategic intention, but identifies primary blind spots in execution bandwidth, unverified external dependencies, and potential cognitive framing biases. (Note: Fallback analysis generated due to: ${errorMsg})`,
    blind_spots: [
      {
        id: 'bs-f1',
        title: 'Unstated Resource & Time Trade-offs',
        description: `Your stated plan to achieve "${input.expectedOutcome || 'the target outcome'}" does not account for secondary time overhead or recovery periods.`,
        why_overlooked: 'Focusing exclusively on primary milestones while ignoring operational drag and friction.',
        suggested_action: 'Perform a 7-day time audit to confirm where the required hours will realistically come from.',
        severity: 'high',
        category: 'Operational',
      },
      {
        id: 'bs-f2',
        title: 'Asymmetry of Downside vs Upside',
        description: 'You have articulated significant upside, but have not clearly defined a stop-loss or exit threshold if initial conditions fail.',
        why_overlooked: 'Optimism bias and emotional attachment to the preferred outcome.',
        suggested_action: 'Define a specific "Pre-Mortem" date: If milestone X is not met by month 2, what is your fallback procedure?',
        severity: 'medium',
        category: 'Strategic',
      },
      {
        id: 'bs-f3',
        title: 'Stakeholder Information Gaps',
        description: 'Key parties impacted by this decision have not yet provided explicit binding commitments.',
        why_overlooked: 'Assuming passive agreement equates to proactive alignment.',
        suggested_action: 'Conduct structured 1-on-1 interviews with each direct stakeholder to verify their expectations.',
        severity: 'high',
        category: 'Wellbeing',
      }
    ],
    hidden_assumptions: [
      {
        id: 'ha-f1',
        assumption: `The primary reasons provided (${input.reasons ? input.reasons.slice(0, 80) + '...' : 'current drivers'}) will hold true throughout the entire duration.`,
        why_unsupported: 'Circumstances and team priorities often fluctuate after commitments are formalized.',
        verification_step: 'Write down what leading indicator would prove this premise false early on.',
        risk_level: 'high',
      },
      {
        id: 'ha-f2',
        assumption: 'Alternative paths will remain accessible if you decide to change course later.',
        why_unsupported: 'Opportunity costs and closed windows may make reversing the decision expensive.',
        verification_step: 'Identify which choices are one-way doors vs two-way doors.',
        risk_level: 'medium',
      }
    ],
    contradictions: [
      {
        id: 'ct-f1',
        statement_a: 'Desired goal of maximizing outcomes while minimizing risk.',
        statement_b: `Concerns noted: "${input.concerns || 'Uncertainty and stress'}"`,
        conflict_explanation: 'The chosen path inherently introduces the exact vulnerabilities flagged in your concerns.',
        resolution_prompt: 'What acceptable level of trade-off are you willing to tolerate without feeling regret?',
      }
    ],
    missing_information: [
      {
        id: 'mi-f1',
        category: 'Benchmark Data',
        missing_factor: 'Historical baseline metrics or feedback from people who took a similar path.',
        why_critical: 'Provides objective reference points beyond personal intuition.',
        how_to_obtain: 'Interview 2 individuals who faced this exact decision 1-2 years ago.',
      },
      {
        id: 'mi-f2',
        category: 'Contractual Clarity',
        missing_factor: 'Explicit formal written confirmation of conditions and expectations.',
        why_critical: 'Prevents miscommunication when pressure escalates.',
        how_to_obtain: 'Draft a written memorandum of understanding or ask for documented terms.',
      }
    ],
    risks: [
      {
        id: 'rk-f1',
        risk: 'Commitment trap where walking away becomes emotionally or financially punitive.',
        impact: 'high',
        likelihood: 'medium',
        mitigation: 'Establish a check-in cadence at 30, 60, and 90 days with clear stop-loss criteria.',
      },
      {
        id: 'rk-f2',
        risk: 'Underestimated ramp-up friction reducing initial momentum.',
        impact: 'medium',
        likelihood: 'high',
        mitigation: 'Budget a 20% buffer on time and financial estimates.',
      }
    ],
    opportunities: [
      {
        id: 'op-f1',
        opportunity: 'Synthesizing an innovative hybrid path rather than a binary all-or-nothing choice.',
        potential_upside: 'Capturing 80% of the upside with only 20% of the downside exposure.',
        how_to_capture: 'Propose a 30-day pilot or modular phase before committing to the full term.',
      }
    ],
    alternative_perspectives: [
      {
        id: 'ap-f1',
        stakeholder: 'Skeptical External Mentor',
        viewpoint: 'Sees the risk of confirmation bias and urges testing the null hypothesis before committing.',
        key_question: 'What would have to happen in the next 14 days for you to comfortably decline this path?',
      },
      {
        id: 'ap-f2',
        stakeholder: 'Future Self (3 Years Later)',
        viewpoint: 'Prioritizes resilience, optionality, and personal integrity over short-term social status.',
        key_question: 'Does this decision expand your freedom or constrain it?',
      }
    ],
    critical_questions: [
      {
        id: 'cq-f1',
        question: 'What is the truest underlying motive for this decision: growth, fear of missing out, or fatigue with your current routine?',
        rationale: 'Uncovers whether emotional avoidance is masquerading as strategic logic.',
        reflection_target: 'Emotion',
      },
      {
        id: 'cq-f2',
        question: 'If you could only choose one alternative choice, what would you gain that this decision forfeits?',
        rationale: 'Clarifies opportunity cost recognition.',
        reflection_target: 'Premise',
      }
    ],
    evidence_check: [
      {
        id: 'ec-f1',
        statement: input.title,
        classification: 'Fact',
        analysis: 'Concrete decision subject specified by user.',
      },
      {
        id: 'ec-f2',
        statement: input.reasons || 'Stated rationale',
        classification: 'Assumption',
        analysis: 'Forward-looking projections that require empirical testing.',
      }
    ],
    final_reflection: 'Every consequential decision involves uncertainty. ThinkWise AI recommends pausing to verify the 2 most critical pieces of missing information before executing binding agreements. You remain the sole author of your decision.'
  };
}
