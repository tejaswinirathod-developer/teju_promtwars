"""
ThinkWise AI - AI Analysis Engine (Google Gemini Python SDK)
Performs blind spot detection, assumption auditing, contradiction checks,
risk/opportunity assessment, and perspective simulation.
"""

import json
import os
from typing import Dict, Any, Optional
from google import genai
from google.genai import types

def get_gemini_client(api_key: Optional[str] = None):
    key = api_key or os.getenv("GEMINI_API_KEY")
    if not key:
        return None
    return genai.Client(api_key=key)

def analyze_decision(decision_input: Dict[str, Any], api_key: Optional[str] = None) -> Dict[str, Any]:
    """
    Submits structured decision prompt to Gemini and parses 10-dimension JSON response.
    """
    client = get_gemini_client(api_key)
    if not client:
        raise ValueError("GEMINI_API_KEY is not configured in environment or Streamlit secrets.")

    system_instruction = (
        "You are ThinkWise AI, an expert decision intelligence engine specialized in cognitive bias detection "
        "and critical reasoning. You act as an objective thinking partner who surfaces overlooked factors, "
        "tests unsupported assumptions, and helps the user reflect deeply. DO NOT make the final choice for the user. "
        "Return valid JSON matching the requested schema."
    )

    prompt = f"""
Analyze this decision across the 10 core dimensions:

Decision Title: {decision_input.get('title', '')}
Description: {decision_input.get('description', '')}
Background & Current Situation: {decision_input.get('background', 'N/A')}
Reasons Behind Decision: {decision_input.get('reasons', 'N/A')}
Expected Outcome: {decision_input.get('expected_outcome', 'N/A')}
Important Factors Already Considered: {decision_input.get('factors_considered', 'N/A')}
Concerns or Doubts: {decision_input.get('concerns', 'N/A')}
Alternative Choices: {decision_input.get('alternatives', 'N/A')}

Return a valid JSON object strictly matching this schema:
{{
  "summary": "Concise 2-3 sentence executive synthesis of framing and primary blind spots.",
  "blind_spots": [
    {{
      "title": "Title of overlooked factor",
      "description": "Explanation of what might be overlooked.",
      "why_overlooked": "Cognitive or situational bias reason.",
      "suggested_action": "Actionable inquiry or discovery step.",
      "severity": "high"
    }}
  ],
  "hidden_assumptions": [
    {{
      "assumption": "Premise taken for granted.",
      "why_unsupported": "Why evidence is insufficient.",
      "verification_step": "Concrete validation step.",
      "risk_level": "high"
    }}
  ],
  "contradictions": [
    {{
      "statement_a": "First stated belief",
      "statement_b": "Second stated belief in tension",
      "conflict_explanation": "Why these pull in opposite directions.",
      "resolution_prompt": "Reconciliation question."
    }}
  ],
  "missing_information": [
    {{
      "category": "Policy/Data/People",
      "missing_factor": "Specific missing data",
      "why_critical": "How lack of this increases uncertainty.",
      "how_to_obtain": "Where or whom to ask."
    }}
  ],
  "risks": [
    {{
      "risk": "Adverse scenario",
      "impact": "high",
      "likelihood": "medium",
      "mitigation": "Practical safeguard."
    }}
  ],
  "opportunities": [
    {{
      "opportunity": "Positive angle",
      "potential_upside": "What could be gained.",
      "how_to_capture": "How to actively capture."
    }}
  ],
  "alternative_perspectives": [
    {{
      "stakeholder": "Advisor / Recruiter / Family",
      "viewpoint": "How they evaluate trade-offs.",
      "key_question": "Their sharpest question."
    }}
  ],
  "critical_questions": [
    {{
      "question": "Probing question",
      "rationale": "Why crucial before deciding.",
      "reflection_target": "Premise/Logistics/Strategy"
    }}
  ],
  "evidence_check": [
    {{
      "statement": "Statement from user",
      "classification": "Fact" | "Assumption" | "Interpretation" | "Needs Verification",
      "analysis": "Grounding evaluation."
    }}
  ],
  "final_reflection": "Neutral, empowering closing reflection."
}}
"""

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt,
        config=types.GenerateContentConfig(
            response_mime_type="application/json",
            system_instruction=system_instruction,
            temperature=0.3
        )
    )

    raw_text = response.text.strip()
    # Clean possible markdown formatting
    if raw_text.startswith("```json"):
        raw_text = raw_text[7:]
    if raw_text.startswith("```"):
        raw_text = raw_text[3:]
    if raw_text.endswith("```"):
        raw_text = raw_text[:-3]

    return json.loads(raw_text.strip())

def chat_follow_up(decision: dict, analysis: dict, user_question: str, api_key: Optional[str] = None) -> str:
    """
    Answers follow-up inquiry with decision and analysis context.
    """
    client = get_gemini_client(api_key)
    if not client:
        return "Gemini API key is not configured. Unable to answer follow-up question."

    context_prompt = f"""
You are the ThinkWise AI Interactive Decision Assistant.
You are helping the user explore their decision: "{decision.get('title')}".
Analysis Summary: {analysis.get('summary')}

The user asks: "{user_question}"

Rules:
1. Act as a thoughtful, objective Socrates-like decision coach.
2. DO NOT make the final choice for the user or tell them "You must accept" or "You must reject".
3. Provide crisp, structured, empathetic, and actionable guidance.
"""
    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=context_prompt
    )
    return response.text
