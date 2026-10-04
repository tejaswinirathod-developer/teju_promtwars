import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

const apiKey = process.env.GEMINI_API_KEY;
const ai = apiKey
  ? new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    })
  : null;

// Authentication middleware protecting sensitive backend intelligence endpoints
function requireAuth(req: Request, res: Response, next: express.NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      error: 'Unauthorized: Authentication session required to access ThinkWise AI services.',
      code: 'AUTH_REQUIRED',
    });
  }
  const token = authHeader.substring(7).trim();
  if (!token || token.length < 8) {
    return res.status(401).json({
      error: 'Unauthorized: Invalid or expired authentication credentials.',
      code: 'INVALID_TOKEN',
    });
  }
  next();
}

// Health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    hasApiKey: Boolean(apiKey),
    model: 'gemini-3.8-flash',
  });
});

// Analyze decision endpoint (Protected: requires valid authentication session)
app.post('/api/analyze', requireAuth, async (req: Request, res: Response) => {
  try {
    const {
      title,
      description,
      background,
      reasons,
      expectedOutcome,
      factorsConsidered,
      concerns,
      alternatives,
    } = req.body;

    if (!title || !description) {
      return res.status(400).json({ error: 'Title and description are required.' });
    }

    if (!ai) {
      return res.status(503).json({
        error: 'Gemini API key is not configured. Please ensure GEMINI_API_KEY is available.',
      });
    }

    const prompt = `
You are ThinkWise AI, an expert decision intelligence engine specialized in cognitive bias detection, critical reasoning, and blind spot identification.
Your goal is NOT to make the decision for the user, and NOT to tell them "do this" or "don't do this". You act strictly as an objective thinking partner who surfaces what might be overlooked, tests unsupported assumptions, and helps the user reflect deeply.

User's Decision Details:
- Title: ${title}
- Decision Description: ${description}
- Background & Current Situation: ${background || 'Not specified'}
- Reasons Behind Decision: ${reasons || 'Not specified'}
- Expected Outcome: ${expectedOutcome || 'Not specified'}
- Important Factors Already Considered: ${factorsConsidered || 'Not specified'}
- Concerns or Doubts: ${concerns || 'Not specified'}
- Alternative Choices: ${alternatives || 'Not specified'}

Analyze this decision thoroughly across the 10 core dimensions.
Guidelines:
1. Do not invent facts about the user's situation; clearly label uncertain observations as possibilities.
2. Separate claims into facts, assumptions, and items needing verification.
3. Be rigorous, constructive, empathetic, and objective.
4. Provide actionable questions and verification steps for each finding.

Return a valid JSON object strictly matching this structure:
{
  "summary": "Concise 2-3 sentence executive synthesis of the user's decision framing and primary blind spot areas.",
  "blind_spots": [
    {
      "id": "bs-1",
      "title": "Short title of overlooked factor",
      "description": "Clear explanation of what might be overlooked and why it matters.",
      "why_overlooked": "Cognitive or situational reason why this is easily missed.",
      "suggested_action": "Specific verification or discovery question to resolve this blind spot.",
      "severity": "high" | "medium" | "low",
      "category": "Academic" | "Career" | "Financial" | "Operational" | "Wellbeing" | "Strategic"
    }
  ],
  "hidden_assumptions": [
    {
      "id": "ha-1",
      "assumption": "The explicit or implicit premise being taken for granted.",
      "why_unsupported": "Why there is currently insufficient evidence provided for this assumption.",
      "verification_step": "Exact concrete step to validate or invalidate this assumption.",
      "risk_level": "high" | "medium" | "low"
    }
  ],
  "contradictions": [
    {
      "id": "ct-1",
      "statement_a": "First stated belief or priority",
      "statement_b": "Second stated belief or priority that may conflict with the first",
      "conflict_explanation": "Why these two points pull in opposite directions or create cognitive dissonance.",
      "resolution_prompt": "Question to help reconcile or prioritize between the two."
    }
  ],
  "missing_information": [
    {
      "id": "mi-1",
      "category": "Category name (e.g., Policy, Data, Timeline, People)",
      "missing_factor": "Specific piece of missing data or clarity",
      "why_critical": "How the lack of this information increases decision uncertainty.",
      "how_to_obtain": "Where or whom to ask to get this information."
    }
  ],
  "risks": [
    {
      "id": "rk-1",
      "risk": "Potential adverse scenario or pitfall",
      "impact": "high" | "medium" | "low",
      "likelihood": "high" | "medium" | "low",
      "mitigation": "Practical safeguard or pre-commitment to reduce exposure."
    }
  ],
  "opportunities": [
    {
      "id": "op-1",
      "opportunity": "Potential upside or unexploited positive angle",
      "potential_upside": "What could be gained beyond obvious benefits.",
      "how_to_capture": "How to actively cultivate this upside."
    }
  ],
  "alternative_perspectives": [
    {
      "id": "ap-1",
      "stakeholder": "Stakeholder name/role (e.g., Academic Advisor, Future Employer, Family, Future Self in 5 years)",
      "viewpoint": "How this stakeholder would evaluate the trade-offs.",
      "key_question": "The sharpest question this person would ask the user."
    }
  ],
  "critical_questions": [
    {
      "id": "cq-1",
      "question": "Probing question challenging user assumptions",
      "rationale": "Why answering this is crucial before signing or committing.",
      "reflection_target": "Premise, Emotion, Logistics, or Long-term Strategy"
    }
  ],
  "evidence_check": [
    {
      "id": "ec-1",
      "statement": "Statement extracted from the user's submission",
      "classification": "Fact" | "Assumption" | "Interpretation" | "Needs Verification",
      "analysis": "Brief evaluation of grounding and evidentiary weight."
    }
  ],
  "final_reflection": "Neutral, empowering closing reflection summarizing next exploratory steps without prescribing a choice."
}
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.3,
        systemInstruction:
          'You are ThinkWise AI, a decision intelligence engine. Return strictly valid JSON conforming to the requested schema. Never output markdown code fences around JSON.',
      },
    });

    const responseText = response.text ? response.text.trim() : '{}';
    let parsedData;
    try {
      // Clean possible fences if any slipped through
      const cleanJson = responseText
        .replace(/^```json\s*/i, '')
        .replace(/^```\s*/i, '')
        .replace(/\s*```$/i, '')
        .trim();
      parsedData = JSON.parse(cleanJson);
    } catch (parseError) {
      console.error('Failed to parse Gemini response as JSON:', responseText);
      return res.status(500).json({
        error: 'Failed to parse AI analysis response.',
        raw: responseText,
      });
    }

    res.json(parsedData);
  } catch (error: any) {
    console.error('Error during AI analysis:', error);
    res.status(500).json({
      error: error.message || 'An error occurred while analyzing the decision.',
    });
  }
});

// Follow-up chat assistant endpoint (Protected: requires valid authentication session)
app.post('/api/chat', requireAuth, async (req: Request, res: Response) => {
  try {
    const { decision, analysis, history, message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required.' });
    }

    if (!ai) {
      return res.status(503).json({
        error: 'Gemini API key is not configured.',
      });
    }

    const systemPrompt = `
You are the ThinkWise AI Interactive Decision Assistant.
You are helping a user explore an in-depth blind spot analysis of their decision: "${decision?.title || 'Decision'}".

Context of Decision:
- Description: ${decision?.description || 'N/A'}
- Key Background: ${decision?.background || 'N/A'}
- Stated Reasons: ${decision?.reasons || 'N/A'}
- Expected Outcome: ${decision?.expectedOutcome || 'N/A'}
- Key Doubts: ${decision?.concerns || 'N/A'}

AI Analysis Summary:
${analysis?.summary || 'N/A'}

Blind Spots identified:
${(analysis?.blind_spots || []).map((b: any) => `- ${b.title}: ${b.description}`).join('\n')}

Assumptions identified:
${(analysis?.hidden_assumptions || []).map((a: any) => `- ${a.assumption} (Why unsupported: ${a.why_unsupported})`).join('\n')}

Rules:
1. Act as a thoughtful, objective Socrates-like decision coach.
2. DO NOT make the final choice for the user or tell them "You must accept" or "You should reject".
3. Help them investigate risks, design low-cost experiments, draft discovery questions for advisors or recruiters, and stress-test assumptions.
4. Be concise, highly structured, and empathetic.
`;

    const chatContents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [
      {
        role: 'user',
        parts: [{ text: `${systemPrompt}\n\nUser Question: ${message}` }],
      },
    ];

    if (Array.isArray(history) && history.length > 0) {
      // Map previous turns if provided
      const turns: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = history.slice(-6).map((item: any) => ({
        role: item.role === 'user' ? 'user' : 'model',
        parts: [{ text: String(item.content || item.text || '') }],
      }));
      chatContents.splice(0, 1, ...turns, {
        role: 'user',
        parts: [{ text: message }],
      });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: chatContents,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.5,
      },
    });

    res.json({ reply: response.text || '' });
  } catch (error: any) {
    console.error('Error during AI chat:', error);
    res.status(500).json({
      error: error.message || 'An error occurred during conversational consultation.',
    });
  }
});

// Vite & Static assets configuration
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`ThinkWise AI Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
