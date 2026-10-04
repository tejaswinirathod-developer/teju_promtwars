"""
ThinkWise AI - Main Application Entrypoint (Streamlit)
AI-Powered Blind Spot Detection & Decision Intelligence Platform
Strict Red and White Theme
"""

import streamlit as st
import os
import json
import uuid
from config import PRIMARY_RED, BRIGHT_RED, WHITE, LIGHT_PINK, APP_NAME, TAGLINE
from database import init_db, save_decision_record
from ai_engine import analyze_decision, chat_follow_up
from analysis import render_analysis_results
from dashboard import render_dashboard
from history import render_history_page

# Set Page Config
st.set_page_config(
    page_title=f"{APP_NAME} - Decision Intelligence",
    page_icon="👁️",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Load Custom CSS
def load_css():
    try:
        with open("styles.css") as f:
            st.markdown(f"<style>{f.read()}</style>", unsafe_allow_html=True)
    except Exception:
        pass

load_css()
init_db()

# State Management
if "current_analysis" not in st.session_state:
    st.session_state["current_analysis"] = None
if "current_decision" not in st.session_state:
    st.session_state["current_decision"] = None
if "chat_messages" not in st.session_state:
    st.session_state["chat_messages"] = []

# Sidebar Navigation
with st.sidebar:
    st.markdown(f"""
    <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 0.5rem;">
        <div style="background-color: {PRIMARY_RED}; color: white; border-radius: 8px; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; font-weight: bold;">👁️</div>
        <div>
            <h3 style="margin: 0; color: #252525; line-height: 1;">ThinkWise AI</h3>
            <small style="color: {PRIMARY_RED}; font-size: 0.75rem;">Gemini Powered</small>
        </div>
    </div>
    """, unsafe_allow_html=True)
    st.caption(TAGLINE)

    menu = st.radio(
        "Navigation",
        ["Home", "Dashboard", "Decision Input", "Analysis Results", "Decision History", "About & Methodology"],
        index=0
    )

    st.markdown("---")

    # Hackathon Demo Pre-loader in sidebar
    st.subheader("🎓 Hackathon Benchmark")
    if st.button("Load Student Internship Scenario"):
        demo_input = {
            "title": "Accepting 6-Month Full-Time Internship at AI Startup",
            "description": "3rd-year CS student choosing between taking a 6-month in-office startup internship vs staying on campus.",
            "background": "5 semesters completed, 3.7 GPA, offer is $2,000/month, requires 40 hr/week in-office with 2 hr commute.",
            "reasons": "Improve practical software skills, build resume, obtain a full-time return offer.",
            "expected_outcome": "High-level real-world coding mastery, return offer, easily catch up on college coursework later.",
            "factors_considered": "Stipend, startup reputation, fast pace.",
            "concerns": "Falling behind on graduation, intense stress during exam periods.",
            "alternatives": "Summer 10-week internship or part-time open source."
        }
        st.session_state["demo_prefill"] = demo_input
        st.success("Loaded demo data! Head to 'Decision Input' to analyze.")

# ----------------- PAGE ROUTING -----------------

# Page 1: Home
if menu == "Home":
    st.markdown(f"""
    <div style="text-align: center; padding: 2rem 0;">
        <span style="background-color: {LIGHT_PINK}; color: {PRIMARY_RED}; padding: 4px 12px; border-radius: 12px; font-size: 0.85rem; font-weight: bold;">
            {TAGLINE}
        </span>
        <h1 style="font-size: 2.75rem; color: #252525; margin-top: 1rem;">
            Are You Missing Something in Your <span style="color: {PRIMARY_RED};">Decisions</span>?
        </h1>
        <p style="font-size: 1.15rem; color: #777; max-width: 700px; margin: 0 auto 1.5rem auto; line-height: 1.6;">
            People often make critical choices under optimism bias, unverified assumptions, and hidden trade-offs. 
            ThinkWise AI acts as an objective thinking partner—uncovering your blind spots before you commit.
        </p>
    </div>
    """, unsafe_allow_html=True)

    col_btn1, col_btn2, col_btn3 = st.columns([1, 2, 1])
    with col_btn2:
        st.info("⚠️ **ThinkWise Axiom:** The AI never decides for you. It empowers your critical thinking.")

    st.markdown("---")

    col1, col2, col3 = st.columns(3)
    with col1:
        st.markdown(f"""
        <div class="thinkwise-card">
            <h4 style="color: {PRIMARY_RED};">1. Blind Spot Detection</h4>
            <p style="font-size: 0.9rem; color: #555;">Uncovers operational, institutional, or relational factors that were omitted from initial thinking.</p>
        </div>
        """, unsafe_allow_html=True)
    with col2:
        st.markdown(f"""
        <div class="thinkwise-card-pink">
            <h4 style="color: #252525;">2. Hidden Assumptions Audit</h4>
            <p style="font-size: 0.9rem; color: #555;">Pins down claims taken for granted without empirical proof and provides concrete validation steps.</p>
        </div>
        """, unsafe_allow_html=True)
    with col3:
        st.markdown(f"""
        <div class="thinkwise-card">
            <h4 style="color: {PRIMARY_RED};">3. Perspective Simulation</h4>
            <p style="font-size: 0.9rem; color: #555;">Simulates how mentors, employers, and your future self would evaluate your trade-offs.</p>
        </div>
        """, unsafe_allow_html=True)

# Page 2: Dashboard
elif menu == "Dashboard":
    render_dashboard()

# Page 3: Decision Input Page
elif menu == "Decision Input":
    st.title("📝 Decision Intelligence Input")
    st.caption("Provide thorough context to allow the AI to detect hidden premises and blind spots.")

    prefill = st.session_state.get("demo_prefill", {})

    with st.form("decision_form"):
        title = st.text_input("1. Decision Title *", value=prefill.get("title", ""), placeholder="e.g. Taking a 6-month startup internship")
        description = st.text_area("2. Decision Description *", value=prefill.get("description", ""), placeholder="Briefly describe what choice you need to make.")
        background = st.text_area("3. Background and Current Situation", value=prefill.get("background", ""), placeholder="Where do things stand right now?")
        reasons = st.text_area("4. Reasons Behind the Decision", value=prefill.get("reasons", ""), placeholder="Why do you favor this path?")
        expected_outcome = st.text_area("5. Expected Outcome", value=prefill.get("expected_outcome", ""), placeholder="What do you expect will happen?")
        factors_considered = st.text_area("6. Important Factors Already Considered", value=prefill.get("factors_considered", ""), placeholder="What have you already analyzed?")
        concerns = st.text_area("7. Concerns or Doubts", value=prefill.get("concerns", ""), placeholder="What worries you or causes hesitation?")
        alternatives = st.text_area("8. Optional Alternative Choices", value=prefill.get("alternatives", ""), placeholder="What else could you do?")

        submitted = st.form_submit_button("🧠 Analyze My Thinking")

    if submitted:
        if not title.strip() or not description.strip():
            st.error("Please provide both a Decision Title and Description.")
        else:
            with st.spinner("Calling Gemini API to detect cognitive blind spots and test assumptions..."):
                input_payload = {
                    "title": title,
                    "description": description,
                    "background": background,
                    "reasons": reasons,
                    "expected_outcome": expected_outcome,
                    "factors_considered": factors_considered,
                    "concerns": concerns,
                    "alternatives": alternatives
                }
                try:
                    api_key = os.getenv("GEMINI_API_KEY")
                    if hasattr(st, "secrets") and "GEMINI_API_KEY" in st.secrets:
                        api_key = st.secrets["GEMINI_API_KEY"]

                    analysis = analyze_decision(input_payload, api_key=api_key)
                    dec_id = f"dec_{uuid.uuid4().hex[:8]}"

                    # Save to database
                    save_decision_record(dec_id, title, description, input_payload, analysis)

                    st.session_state["current_analysis"] = analysis
                    st.session_state["current_decision"] = input_payload
                    st.session_state["chat_messages"] = []

                    st.success("Analysis complete! Open 'Analysis Results' tab.")
                except Exception as e:
                    st.error(f"Analysis failed: {str(e)}")

# Page 4: Analysis Results & Chat
elif menu == "Analysis Results":
    analysis = st.session_state.get("current_analysis")
    decision = st.session_state.get("current_decision")

    if not analysis or not decision:
        st.warning("No active analysis. Please submit a decision or load the Hackathon demo first.")
    else:
        render_analysis_results(analysis, decision)

        # Follow-up Chat section
        st.markdown("---")
        st.subheader("💬 Interactive Decision Assistant")
        st.caption("Ask Socratic follow-up questions to explore specific blind spots.")

        for msg in st.session_state.get("chat_messages", []):
            with st.chat_message(msg["role"]):
                st.write(msg["content"])

        user_q = st.chat_input("Ask a follow-up question (e.g. 'What specific questions should I ask my college advisor?')")
        if user_q:
            st.session_state["chat_messages"].append({"role": "user", "content": user_q})
            with st.chat_message("user"):
                st.write(user_q)

            api_key = os.getenv("GEMINI_API_KEY")
            if hasattr(st, "secrets") and "GEMINI_API_KEY" in st.secrets:
                api_key = st.secrets["GEMINI_API_KEY"]

            with st.spinner("Assistant is analyzing context..."):
                reply = chat_follow_up(decision, analysis, user_q, api_key=api_key)
                st.session_state["chat_messages"].append({"role": "assistant", "content": reply})
                with st.chat_message("assistant"):
                    st.write(reply)

# Page 5: History
elif menu == "Decision History":
    render_history_page()

# Page 6: About
elif menu == "About & Methodology":
    st.title("ℹ️ About ThinkWise AI")
    st.markdown(f"""
    **ThinkWise AI** is an AI-powered blind spot detection and decision intelligence platform.
    
    ### Philosophy
    - **Human-in-the-Loop:** AI must not make life decisions for humans. It acts as a cognitive mirror.
    - **Cognitive Bias Resistance:** Unpacks optimism bias, confirmation bias, and the sunk cost fallacy.
    - **Evidence Separation:** Classifies assertions into empirical facts, assumptions, and unverified claims.
    
    ### Technology Stack
    - Frontend: Streamlit & React / TypeScript
    - AI Engine: Google Gemini API (`gemini-2.5-flash` / `gemini-3.8-flash`)
    - Storage: SQLite for local decision history
    - Visualizations: Plotly & Tailwind CSS
    """)
