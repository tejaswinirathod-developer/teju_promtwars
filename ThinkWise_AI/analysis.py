"""
ThinkWise AI - Analysis View Module
Renders the 10-dimension intelligence report with strict Red and White styling.
"""

import streamlit as st
import plotly.express as px
import pandas as pd
from config import PRIMARY_RED, BRIGHT_RED, LIGHT_PINK

def render_analysis_results(analysis: dict, decision_input: dict):
    st.markdown(f"## 🎯 Decision Intelligence Report: {decision_input.get('title')}")
    st.markdown(f"*{decision_input.get('description')}*")

    # Executive Summary
    st.markdown(f"""
    <div style="background-color: white; border-left: 4px solid {PRIMARY_RED}; padding: 1.25rem; border-radius: 0 12px 12px 0; margin-bottom: 1.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
        <h4 style="color: {PRIMARY_RED}; margin-top: 0;">Executive Framing & Synthesis</h4>
        <p style="font-size: 1rem; line-height: 1.6; margin-bottom: 0;">{analysis.get('summary', '')}</p>
    </div>
    """, unsafe_allow_html=True)

    # Metrics Strip
    col1, col2, col3, col4 = st.columns(4)
    with col1:
        st.metric("Blind Spots", len(analysis.get('blind_spots', [])))
    with col2:
        st.metric("Assumptions", len(analysis.get('hidden_assumptions', [])))
    with col3:
        st.metric("Contradictions", len(analysis.get('contradictions', [])))
    with col4:
        st.metric("Missing Info Gaps", len(analysis.get('missing_information', [])))

    st.markdown("---")

    # Tabs for detailed breakdown
    tabs = st.tabs([
        "👁️ Blind Spots", 
        "⚠️ Hidden Assumptions", 
        "⚡ Contradictions", 
        "🔍 Missing Info", 
        "⚖️ Risks & Opps", 
        "🧭 Stakeholder Perspectives",
        "📋 Evidence Check",
        "💡 Final Reflection"
    ])

    # Tab 1: Blind Spots
    with tabs[0]:
        st.subheader("1. Blind Spot Detection (Overlooked Factors)")
        for bs in analysis.get('blind_spots', []):
            st.markdown(f"""
            <div style="background-color: white; border-left: 4px solid {PRIMARY_RED}; border-top: 1px solid #ECECEC; border-right: 1px solid #ECECEC; border-bottom: 1px solid #ECECEC; border-radius: 0 12px 12px 0; padding: 1rem; margin-bottom: 1rem;">
                <h4 style="color: #252525; margin-bottom: 0.25rem;">{bs.get('title')}</h4>
                <p style="font-size: 0.9rem; color: #444;">{bs.get('description')}</p>
                <p style="font-size: 0.85rem; color: #777;"><strong>Why overlooked:</strong> {bs.get('why_overlooked')}</p>
                <div style="background-color: #F7F7F7; padding: 0.5rem 0.75rem; border-radius: 8px; font-size: 0.85rem;">
                    <strong style="color: {PRIMARY_RED};">Suggested Action:</strong> {bs.get('suggested_action')}
                </div>
            </div>
            """, unsafe_allow_html=True)

    # Tab 2: Hidden Assumptions (Light Pink Cards)
    with tabs[1]:
        st.subheader("2. Hidden Assumptions Audit")
        st.caption("Assumptions identified without sufficient supporting evidence. Displayed in light pink cards.")
        for ha in analysis.get('hidden_assumptions', []):
            st.markdown(f"""
            <div style="background-color: {LIGHT_PINK}; border: 1px solid #F5C6CB; border-radius: 12px; padding: 1rem; margin-bottom: 1rem;">
                <h4 style="color: #252525; margin-bottom: 0.25rem;">"{ha.get('assumption')}"</h4>
                <p style="font-size: 0.85rem; color: #555;"><strong>Why unsupported:</strong> {ha.get('why_unsupported')}</p>
                <div style="background-color: white; padding: 0.5rem 0.75rem; border-radius: 8px; font-size: 0.85rem; border: 1px solid #E5A4A8;">
                    <strong style="color: {PRIMARY_RED};">Verification Step:</strong> {ha.get('verification_step')}
                </div>
            </div>
            """, unsafe_allow_html=True)

    # Tab 3: Contradictions
    with tabs[2]:
        st.subheader("3. Contradiction Detection")
        contradictions = analysis.get('contradictions', [])
        if not contradictions:
            st.info("No obvious conflicting priorities or contradictions detected.")
        for ct in contradictions:
            st.error(f"**Conflicting Statements:**\n- Stated Point A: {ct.get('statement_a')}\n- Stated Point B: {ct.get('statement_b')}")
            st.markdown(f"**Conflict Explanation:** {ct.get('conflict_explanation')}")
            st.markdown(f"**Resolution Inquiry:** *{ct.get('resolution_prompt')}*")

    # Tab 4: Missing Info
    with tabs[3]:
        st.subheader("4. Missing Information & Data Gaps")
        for mi in analysis.get('missing_information', []):
            st.markdown(f"""
            <div style="background-color: white; border: 1px solid #ECECEC; border-radius: 12px; padding: 1rem; margin-bottom: 0.75rem;">
                <span style="font-size: 0.75rem; background: #EEE; padding: 2px 8px; border-radius: 4px; font-weight: bold;">{mi.get('category')}</span>
                <h4 style="margin: 0.5rem 0 0.25rem 0;">{mi.get('missing_factor')}</h4>
                <p style="font-size: 0.85rem; color: #555;"><strong>Why critical:</strong> {mi.get('why_critical')}</p>
                <p style="font-size: 0.85rem; color: {PRIMARY_RED}; margin-bottom: 0;"><strong>How to obtain:</strong> {mi.get('how_to_obtain')}</p>
            </div>
            """, unsafe_allow_html=True)

    # Tab 5: Risks & Opportunities
    with tabs[4]:
        st.subheader("5. Risk & Opportunity Balance")
        col_r, col_o = st.columns(2)
        with col_r:
            st.markdown("### ⚠️ Downside Risks")
            for r in analysis.get('risks', []):
                st.warning(f"**{r.get('risk')}**\n\n*Impact: {r.get('impact')} | Likelihood: {r.get('likelihood')}*\n\n**Mitigation:** {r.get('mitigation')}")
        with col_o:
            st.markdown("### ✨ Unexplored Opportunities")
            for op in analysis.get('opportunities', []):
                st.success(f"**{op.get('opportunity')}**\n\n*Upside: {op.get('potential_upside')}*\n\n**How to capture:** {op.get('how_to_capture')}")

    # Tab 6: Stakeholder Perspectives
    with tabs[5]:
        st.subheader("6. Alternative Stakeholder Perspectives")
        for ap in analysis.get('alternative_perspectives', []):
            st.markdown(f"""
            <div style="background-color: white; border: 1px solid #ECECEC; border-radius: 12px; padding: 1rem; margin-bottom: 0.75rem;">
                <h4 style="color: {PRIMARY_RED}; margin-bottom: 0.25rem;">{ap.get('stakeholder')}</h4>
                <p style="font-size: 0.9rem; color: #333;">{ap.get('viewpoint')}</p>
                <p style="font-size: 0.85rem; color: #555; font-style: italic;"><strong>Their Core Question:</strong> "{ap.get('key_question')}"</p>
            </div>
            """, unsafe_allow_html=True)

    # Tab 7: Evidence Check
    with tabs[6]:
        st.subheader("7. Evidence Classification Check")
        evidence_items = analysis.get('evidence_check', [])
        if evidence_items:
            df = pd.DataFrame(evidence_items)
            st.table(df[['statement', 'classification', 'analysis']])

    # Tab 8: Final Reflection
    with tabs[7]:
        st.subheader("8. Final Neutral Reflection")
        st.markdown(f"""
        <div style="background-color: white; border: 2px solid {PRIMARY_RED}; border-radius: 12px; padding: 1.5rem;">
            <p style="font-size: 1rem; line-height: 1.7; color: #252525;">{analysis.get('final_reflection', '')}</p>
            <hr style="border: 0; border-top: 1px solid #ECECEC; margin: 1rem 0;">
            <small style="color: #777;">ThinkWise AI acts as a thinking partner. All decisions remain your independent choice.</small>
        </div>
        """, unsafe_allow_html=True)
