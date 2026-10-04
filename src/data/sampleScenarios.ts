import { DecisionInput, AnalysisResult } from '../types';

export interface ScenarioPreset {
  id: string;
  name: string;
  tagline: string;
  badge: string;
  input: DecisionInput;
  precomputedAnalysis: AnalysisResult;
}

export const INTERNSHIP_SCENARIO: ScenarioPreset = {
  id: 'student-internship-hackathon',
  name: 'Student 6-Month Startup Internship (Official Demo)',
  tagline: 'Balancing a career-defining internship against university academic workload',
  badge: 'Hackathon Benchmark Scenario',
  input: {
    title: 'Accepting a 6-Month Full-Time Internship at an AI Startup',
    description: 'I am a 3rd-year Computer Science student deciding whether to accept a 6-month off-campus internship offer as a Junior Software Engineer at an early-stage AI startup.',
    background: 'I have completed 5 semesters with a 3.7 GPA. The startup is offering a stipend of $2,000/month. The job requires 40 hours/week in-office (1 hour commute each way). The semester starts in 3 weeks, and my university allows leaves of absence only under strict criteria.',
    reasons: '1. It will dramatically improve my practical coding and real-world software engineering knowledge.\n2. It will help build an impressive resume with tangible production AI experience.\n3. It will create better career opportunities and potentially convert into a full-time return offer upon graduation.',
    expectedOutcome: 'Gain deep practical skills, ship real features to production users, secure a return offer or top-tier job prospects, and easily catch up on college coursework later.',
    factorsConsidered: 'Stipend covers living expenses; the startup founder has a strong background; team is working on cutting-edge LLMs; company culture seems fast-paced.',
    concerns: 'Falling behind on my degree requirements; graduating a semester or year late; high stress from long working hours plus college exam periods.',
    alternatives: '1. Stay full-time at university, maintain high GPA, and apply for standard 10-week summer internships.\n2. Negotiate part-time hours (20 hrs/week) with the startup while attending morning classes.\n3. Do independent open-source contributions while taking college courses.',
    tags: ['Career', 'Academics', 'Internship', 'High Stakes']
  },
  precomputedAnalysis: {
    id: 'analysis-demo-internship',
    decisionId: 'student-internship-hackathon',
    timestamp: new Date().toISOString(),
    isDemo: true,
    summary: 'The decision to take a 6-month startup internship offers strong practical upside, but exhibits major blind spots regarding academic compliance, mentor availability in early-stage startups, and the realistic timeline for degree completion.',
    blind_spots: [
      {
        id: 'bs-1',
        title: 'Academic Attendance & Examination Regulations',
        description: 'You assume you can "catch up on college coursework later" without having confirmed the university\'s mandatory attendance policies, minimum credit requirements, or penalties for off-campus employment.',
        why_overlooked: 'Optimism bias causes focus on exciting startup upside while treating administrative and institutional requirements as secondary details.',
        suggested_action: 'Meet with your academic advisor before signing; verify if the university recognizes industrial training credits or mandates formal semester deferral.',
        severity: 'high',
        category: 'Academic'
      },
      {
        id: 'bs-2',
        title: 'Mentorship Availability in an Early-Stage Startup',
        description: 'Early-stage startups operate under extreme shipping pressure. Without dedicated senior mentors, junior engineers are often left without guidance or structured feedback.',
        why_overlooked: 'Equating "working at an AI startup" with "guaranteed high-quality learning" without auditing the actual engineering leadership bandwidth.',
        suggested_action: 'Ask specifically during follow-up: Who will be my direct 1-on-1 engineering mentor? How many hours per week do they dedicate to code reviews and pair programming?',
        severity: 'high',
        category: 'Career'
      },
      {
        id: 'bs-3',
        title: 'Physical & Cognitive Burnout (Commute + 40hr/wk)',
        description: 'A 2-hour daily roundtrip commute plus 40-50 hours of intensive startup work leaves virtually zero cognitive energy for exam prep, assignments, or health.',
        why_overlooked: 'Underestimating the physical fatigue of daily transit and high-intensity debugging sprints.',
        suggested_action: 'Simulate the commute during peak hours and negotiate hybrid/remote days (e.g., 2 days remote per week).',
        severity: 'medium',
        category: 'Wellbeing'
      },
      {
        id: 'bs-4',
        title: 'Startup Runway & Return Offer Solvency',
        description: 'An early-stage startup may run out of funding or pivot before your graduation date, making the anticipated "full-time return offer" unreliable.',
        why_overlooked: 'Assuming startup stability matches that of established tech corporations.',
        suggested_action: 'Ask about the startup\'s current runway, funding stage (Seed / Series A), and whether return offers have been honored for previous interns.',
        severity: 'medium',
        category: 'Financial'
      }
    ],
    hidden_assumptions: [
      {
        id: 'ha-1',
        assumption: 'The startup will provide structured learning and mentorship rather than repetitive maintenance tasks.',
        why_unsupported: 'You have evaluated the founder\'s credentials, but have not seen the intern curriculum or spoken to current junior developers.',
        verification_step: 'Message a former or current intern on LinkedIn to ask about mentorship culture and daily task allocation.',
        risk_level: 'high'
      },
      {
        id: 'ha-2',
        assumption: 'College coursework and mandatory labs can be "easily caught up on" alongside full-time work.',
        why_unsupported: 'Most engineering programs have mandatory lab attendance, mid-term test windows, and group project milestones with strict deadlines.',
        verification_step: 'Map your upcoming semester syllabus against the startup\'s mandatory core hours.',
        risk_level: 'high'
      },
      {
        id: 'ha-3',
        assumption: 'A 6-month delay in graduation has negligible long-term consequences on your career trajectory.',
        why_unsupported: 'Depending on tuition financial aid, scholarship renewals, and campus placement cycles, a semester delay can carry financial penalties.',
        verification_step: 'Check financial aid clauses and on-campus recruitment eligibility for delayed-graduation students.',
        risk_level: 'medium'
      }
    ],
    contradictions: [
      {
        id: 'ct-1',
        statement_a: 'You want to prioritize high academic performance and keep your 3.7 GPA.',
        statement_b: 'You are committing to a 40 hr/week in-office role with 2 hours daily commute during an active academic term.',
        conflict_explanation: 'A 50+ hour weekly time commitment directly undermines the study hours required to sustain a top GPA.',
        resolution_prompt: 'Are you prepared to accept a drop in GPA or take an official formal semester deferral rather than attempting both simultaneously?'
      }
    ],
    missing_information: [
      {
        id: 'mi-1',
        category: 'University Policy',
        missing_factor: 'Formal policy on industrial internships and leave-of-absence approval criteria.',
        why_critical: 'Unapproved absence could lead to academic probation or mandatory semester repetition.',
        how_to_obtain: 'Dean of Student Affairs or Academic Registrar Office.'
      },
      {
        id: 'mi-2',
        category: 'Startup Role Scope',
        missing_factor: 'Specific tech stack ownership and deliverables expected during the 6 months.',
        why_critical: 'Differentiates between building production ML pipelines versus cleaning CSV data or writing basic scraping scripts.',
        how_to_obtain: 'Hiring Manager or Engineering Lead in a 15-minute alignment call.'
      },
      {
        id: 'mi-3',
        category: 'Flexibility & Remote Policy',
        missing_factor: 'Company policy regarding exam week time off and remote work allowance.',
        why_critical: 'Determines whether you will be forced to take unpaid leave or miss critical final examinations.',
        how_to_obtain: 'Startup HR or Founder during offer letter clarification.'
      }
    ],
    risks: [
      {
        id: 'rk-1',
        risk: 'Academic disqualification or failing attendance thresholds leading to lost semester credits.',
        impact: 'high',
        likelihood: 'high',
        mitigation: 'Secure written university approval for an authorized industrial gap semester prior to signing.'
      },
      {
        id: 'rk-2',
        risk: 'Startup burnout due to combined commute, rapid sprint deadlines, and lack of onboarding documentation.',
        impact: 'medium',
        likelihood: 'high',
        mitigation: 'Establish explicit working hours (9 AM - 6 PM) and negotiate 1-2 remote days.'
      },
      {
        id: 'rk-3',
        risk: 'Startup shifts focus or pivots, eliminating engineering tasks relevant to your career aspirations.',
        impact: 'medium',
        likelihood: 'medium',
        mitigation: 'Specify core project domains in your offer letter or internship agreement.'
      }
    ],
    opportunities: [
      {
        id: 'op-1',
        opportunity: 'Fast-tracked senior engineering exposure rarely accessible at massive tech companies.',
        potential_upside: 'Direct collaboration with founding engineers and shipping user-facing LLM systems into production.',
        how_to_capture: 'Proactively volunteer for core feature architecture and maintain a public technical changelog.'
      },
      {
        id: 'op-2',
        opportunity: 'Negotiating a formal university-industry partnership for credit recognition.',
        potential_upside: 'Earning academic credits for the internship work, transforming a trade-off into a win-win.',
        how_to_capture: 'Present the startup offer to your faculty head as an approved capstone or industrial practicum.'
      }
    ],
    alternative_perspectives: [
      {
        id: 'ap-1',
        stakeholder: 'Academic Advisor / Professor',
        viewpoint: 'Sees the immediate threat to degree completion and warns against jeopardizing foundational coursework for an unaccredited startup role.',
        key_question: 'Why take this risk now instead of waiting 6 months for the accredited summer internship cycle?'
      },
      {
        id: 'ap-2',
        stakeholder: 'Senior Hiring Manager at Big Tech',
        viewpoint: 'Values 6 months of genuine production shipping experience over purely academic GPA, provided the student still finishes their degree.',
        key_question: 'Did you actually ship features to real users, or were you just assisting other engineers?'
      },
      {
        id: 'ap-3',
        stakeholder: 'Your Future Self (5 Years Out)',
        viewpoint: 'Doesn\'t care if graduation was delayed by one semester, but cares deeply whether you burned out or developed lasting technical confidence.',
        key_question: 'Will this decision accelerate your mastery or just increase your stress levels without proportional leverage?'
      }
    ],
    critical_questions: [
      {
        id: 'cq-1',
        question: 'If the university denies attendance flexibility, are you willing to formally take a 1-semester leave of absence and graduate 6 months later?',
        rationale: 'Forces you to confront the real trade-off rather than hoping "it will magically all work out".',
        reflection_target: 'Premise'
      },
      {
        id: 'cq-2',
        question: 'What specific evidence do you have that this particular startup provides superior learning compared to 20 hours/week open-source building?',
        rationale: 'Tests whether the startup prestige is an unexamined assumption.',
        reflection_target: 'Logistics'
      },
      {
        id: 'cq-3',
        question: 'What happens if you receive an offer from a top-tier company in the upcoming fall campus placements?',
        rationale: 'Highlights whether taking this internship locks you out of competitive on-campus drives.',
        reflection_target: 'Long-term Strategy'
      }
    ],
    evidence_check: [
      {
        id: 'ec-1',
        statement: 'The startup offers $2,000/month stipend and requires 40 hours/week in-office.',
        classification: 'Fact',
        analysis: 'Hard verifiable data confirmed in the formal offer document.'
      },
      {
        id: 'ec-2',
        statement: 'It will dramatically improve my practical coding and real-world software engineering knowledge.',
        classification: 'Assumption',
        analysis: 'Dependent on team mentorship quality, code review standards, and assignment complexity.'
      },
      {
        id: 'ec-3',
        statement: 'I can easily catch up on college coursework later.',
        classification: 'Interpretation',
        analysis: 'High risk; subjective belief contradicted by demanding engineering curricula and exam schedules.'
      },
      {
        id: 'ec-4',
        statement: 'University allows leaves of absence only under strict criteria.',
        classification: 'Needs Verification',
        analysis: 'Must verify exact published academic statutes and department-specific policies immediately.'
      }
    ],
    final_reflection: 'This internship is a high-reward opportunity, but your current plan relies on an unviable compromise (excelling in 40+ hours/week startup work while pretending college coursework will take care of itself). Instead of trying to do both halfway, your next immediate actions should be: (1) meet your academic advisor to explore authorized semester leave or industrial credit, and (2) talk to a current engineer at the startup to audit mentorship bandwidth. Make this decision with verified institutional facts, not optimistic assumptions.'
  }
};

export const STARTUP_VS_CORP_SCENARIO: ScenarioPreset = {
  id: 'startup-vs-corporate',
  name: 'Leaving Senior Corporate Job to Co-Found a B2B SaaS Startup',
  tagline: 'High-risk entrepreneurial leap vs stable corporate promotion track',
  badge: 'Executive Scenario',
  input: {
    title: 'Leaving Staff Engineer Role at FinTech to Co-Found an Enterprise AI Startup',
    description: 'Deciding whether to resign from my comfortable $210k/year Staff Engineer position to join a former colleague as technical co-founder building an AI workflow platform for logistics.',
    background: 'I have 8 years of engineering experience and 9 months of personal emergency savings. My co-founder has secured $250k in angel commitments contingent on having a working prototype within 4 months.',
    reasons: 'I feel stagnant in corporate bureaucracy; equity upside could be life-changing; logistics AI is a booming market.',
    expectedOutcome: 'Build MVP in 4 months, close $1.5M Seed round, pay myself a modest $100k salary, and grow to product-market fit.',
    factorsConsidered: 'Angel investor network, technical feasibility, personal runway, partner\'s support.',
    concerns: 'Running out of cash; failing to close the Seed round in a tight VC climate; damaging relationship with co-founder under pressure.',
    alternatives: 'Build prototype on weekends while keeping day job; negotiate part-time consulting.',
    tags: ['Entrepreneurship', 'Career', 'Financial', 'High Stakes']
  },
  precomputedAnalysis: {
    ...INTERNSHIP_SCENARIO.precomputedAnalysis,
    id: 'analysis-demo-startup',
    decisionId: 'startup-vs-corporate',
    summary: 'The entrepreneurial transition is well-motivated by career ambition, but shows significant blind spots regarding contingent angel commitments, market validation beyond founder enthusiasm, and the true cost of enterprise sales cycles.',
    blind_spots: [
      {
        id: 'bs-s1',
        title: 'Contingent Angel Commitments vs Banked Capital',
        description: 'Verbal or contingent commitments frequently dissolve when market conditions shift or when prototype validation milestones move.',
        why_overlooked: 'Treating prospective promises as locked capital before money is in the escrow account.',
        suggested_action: 'Require formal SAFE notes or signed binding terms before tendering your resignation.',
        severity: 'high',
        category: 'Financial'
      },
      {
        id: 'bs-s2',
        title: 'Enterprise Logistics Sales Cycles (6 to 14 Months)',
        description: 'Building an MVP in 4 months does not mean enterprise logistics buyers will deploy or pay within 4 months.',
        why_overlooked: 'Confusing product completion with procurement sign-off.',
        suggested_action: 'Secure 3 signed Letters of Intent (LOIs) with target freight/logistics directors before quitting.',
        severity: 'high',
        category: 'Strategic'
      }
    ],
    final_reflection: 'Do not resign until the $250k angel check is wired and at least two prospective logistics pilot customers have agreed to test the alpha version. De-risk the commitment bridge first.'
  }
};

export const SAMPLE_PRESETS: ScenarioPreset[] = [
  INTERNSHIP_SCENARIO,
  STARTUP_VS_CORP_SCENARIO
];
