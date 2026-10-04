# ThinkWise AI – AI-Powered Blind Spot Detection & Decision Intelligence Platform

> **Tagline:** Think Deeper. See What You're Missing.

---

## 1. Project Overview

**ThinkWise AI** is an AI-powered cognitive unbiasing and decision intelligence platform designed to help people make wiser, more informed, and resilient choices. 

When humans make high-stakes choices—such as accepting a 6-month off-campus internship, quitting a corporate job to launch a startup, or making major life transitions—they are often blinded by **optimism bias**, **confirmation bias**, and **unexamined assumptions**.

ThinkWise AI acts as an objective, Socratic thinking partner. It deconstructs decisions across **10 rigorous analytical dimensions** to surface blind spots, test unsupported claims, detect conflicting priorities, and generate concrete verification steps.

> **Core Axiom:** ThinkWise AI never makes the decision for the user. It does not say "accept" or "reject". It acts strictly as an analytical mirror and thinking partner, empowering the user to make independent, high-conviction decisions.

---

## 2. Futuristic Design System & Visual Identity

The platform features a modern AI SaaS design architecture:

| Design Token | Hex Code | Purpose |
|---|---|---|
| **Midnight Navy** | `#101426` | Deep hero backdrops, dark cards, telemetry headers |
| **Deep Purple** | `#6C4CF1` | Primary brand accent, primary CTA gradient, active state |
| **Electric Violet** | `#9275FF` | **Hidden Assumption cards**, glowing connections, links |
| **Cyan** | `#39D5F6` | Intelligent eye logo, pulses, missing data indicators |
| **Pure White** | `#FFFFFF` | Elevated card surfaces, clean contrast typography |
| **Light Background** | `#F6F7FC` | Clean neutral canvas field |
| **Dark Text** | `#20243A` | High-contrast readable editorial typography |

---

## 3. Interactive AI Visualization: Neural Topology Graph

ThinkWise AI includes an interactive **Decision Neural Topology Graph** mapping connections between:
- **Decision Core Node:** Central dilemma
- **Assumptions (Purple):** Underlying premises
- **Risks (Red):** Critical downside exposures
- **Opportunities (Green):** Strategic upsides
- **Data Gaps (Cyan):** Critical missing facts
- **Stakeholders (Violet):** Simulated external perspectives

Clicking any node in the topology network reveals an inspector drawer explaining the rationale, risk level, or verification plan.

---

## 3. The 10 Core Analytical Dimensions

When a decision is submitted, the AI engine evaluates the reasoning across:

1. **Blind Spot Detection:** Overlooked operational, institutional, or relational factors.
2. **Hidden Assumptions Audit:** Identifies unproven premises and provides concrete verification experiments (rendered on `#FCE8E8` light pink cards).
3. **Contradiction Detection:** Surfaces conflicting priorities or mutually exclusive goals.
4. **Missing Information & Data Gaps:** Explicit list of what information to collect and who to ask.
5. **Downside Risk Analysis:** Analyzes severity, likelihood, and proactive mitigations.
6. **Unexplored Opportunities:** Surfaces non-obvious positive angles or hybrid options.
7. **Alternative Stakeholder Perspectives:** Simulates viewpoints of mentors, employers, family, and the user's future self.
8. **Critical Thinking Questions:** Sharp probing inquiries to ask before signing or committing.
9. **Grounded Evidence Check:** Classifies every claim into *Fact*, *Assumption*, *Interpretation*, or *Needs Verification*.
10. **Final Neutral Reflection:** Objective synthesis providing next steps without prescribing a choice.

---

## 4. Hackathon Benchmark Scenario: The 6-Month Internship

To test or demonstrate the application to hackathon judges:

- **Scenario:** A 3rd-year CS student is considering accepting a 6-month full-time internship at an early-stage AI startup ($2,000/mo stipend, 40 hrs/wk, 2-hr daily commute).
- **Student's Assumptions:** It will boost their resume, teach practical engineering, and they can "easily catch up on college coursework later."
- **ThinkWise AI Findings:**
  1. *Institutional Blind Spot:* Mandatory college attendance rules and exam deferral statutes (will absence cause an automatic semester failure?).
  2. *Mentorship Blind Spot:* In seed-stage startups, senior engineers face shipping pressure and rarely have bandwidth for dedicated 1-on-1 intern coaching.
  3. *Burnout & Health Blind Spot:* 50+ hours of commute plus startup sprints makes sustaining a 3.7 GPA mathematically unviable.
  4. *Evidence Check:* Flags "I can easily catch up on college coursework" as an unsupported high-risk interpretation.
  5. *Actionable Question:* *"If the university denies attendance flexibility, are you willing to formally take a gap semester rather than letting your GPA fall?"*

---

## 5. Technology Stack & Multi-Platform Support

This repository includes **two production-ready implementations**:

### A. Live Interactive Full-Stack Web App (Active on Port 3000)
- **Frontend:** React 19, TypeScript, Tailwind CSS, Lucide Icons, Motion
- **Backend:** Node.js Express server (`server.ts`) with Vite middleware
- **AI Integration:** Official `@google/genai` TypeScript SDK with server-side proxy
- **Storage:** Local browser sandbox persistence + JSON import/export + side-by-side comparison

### B. Python / Streamlit Modular Architecture (`ThinkWise_AI/`)
- **Frontend & App:** Python, Streamlit, Custom CSS
- **AI Integration:** Official `google-genai` Python SDK
- **Data & Charts:** Pandas, Plotly Express
- **Storage:** SQLite local database (`thinkwise_history.db`)

---

## 6. Project Directory Structure

```
ThinkWise_AI/
├── ThinkWise_AI/               # Complete Python & Streamlit implementation
│   ├── app.py                  # Main Streamlit application entrypoint
│   ├── config.py               # Color constants and theme settings
│   ├── ai_engine.py            # Google GenAI Python SDK integration
│   ├── analysis.py             # 10-dimension report rendering & visualizations
│   ├── dashboard.py            # Executive metrics & Plotly charts
│   ├── history.py              # Decision history & side-by-side comparison
│   ├── database.py             # SQLite storage handler
│   ├── styles.css              # Custom CSS with strict Red & White theme
│   ├── requirements.txt        # Python package dependencies
│   └── .streamlit/
│       └── secrets.toml        # Streamlit API key configuration template
├── src/                        # Full-stack React 19 + TypeScript application
│   ├── components/             # Navbar, HomeView, DashboardView, DecisionInputView, AnalysisResultView, ChatAssistant, HistoryView, AboutView
│   ├── data/                   # Benchmark scenario presets
│   ├── services/               # API client, fallback generator, local storage
│   ├── types/                  # TypeScript interfaces
│   ├── App.tsx                 # View orchestrator
│   └── index.css               # Tailwind CSS theme tokens
├── server.ts                   # Express server with Gemini 3.8 Flash proxy & Vite
├── index.html                  # HTML5 entrypoint with SEO metadata
├── metadata.json               # AI Studio applet capabilities
└── package.json                # Node.js dependencies
```

---

## 7. How to Run the Application

### Option 1: Running the Full-Stack React Web Application (Port 3000)

```bash
# 1. Install dependencies
npm install

# 2. Set your Gemini API key in .env
echo 'GEMINI_API_KEY="your-actual-gemini-api-key"' > .env

# 3. Start development server
npm run dev
```

Visit `http://localhost:3000` in your browser.

---

### Option 2: Running the Python Streamlit Application

```bash
# 1. Navigate to the Python directory
cd ThinkWise_AI

# 2. Create and activate a virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# 3. Install Python dependencies
pip install -r requirements.txt

# 4. Configure Gemini API key
# Option A: Environment variable
export GEMINI_API_KEY="your-actual-gemini-api-key"

# Option B: Streamlit secrets
# Edit ThinkWise_AI/.streamlit/secrets.toml and add:
# GEMINI_API_KEY = "your-actual-gemini-api-key"

# 5. Launch the Streamlit application
streamlit run app.py
```

Streamlit will launch locally at `http://localhost:8501`.

---

## 8. Free Deployment Instructions

### Free Deployment on Streamlit Community Cloud
1. Push this repository to GitHub.
2. Go to [share.streamlit.io](https://share.streamlit.io) and link your GitHub account.
3. Select your repository, set the branch to `main`, and main file path to `ThinkWise_AI/app.py`.
4. In **Advanced Settings > Secrets**, add:
   ```toml
   GEMINI_API_KEY = "your-gemini-api-key"
   ```
5. Click **Deploy**. Your app will be live with a free public URL.

### Free Deployment on Google Cloud Run
1. Build the production container or run `npm run build`.
2. Deploy directly using the Cloud Run CLI or Google Cloud Console with port `3000`.
3. Set the environment variable `GEMINI_API_KEY` in the Cloud Run service settings.

---

## 9. Security & Reliability

- **No Hardcoded Keys:** Secrets are strictly loaded from `process.env.GEMINI_API_KEY` (Node.js) or `st.secrets` / environment variables (Python).
- **Server-Side API Proxy:** The Gemini API is called only on the server side—never exposing keys to client-side bundles.
- **Graceful Fallback Mode:** If the Gemini API is temporarily unreachable or offline, ThinkWise AI displays a clearly marked demonstration analysis with informative messaging rather than breaking.
- **Privacy First:** Decisions are stored locally in the browser sandbox or local SQLite without unnecessary telemetry or data collection.

---

## 10. License

Built for Google AI Studio & Hackathons. Open for educational and decision intelligence innovation.
