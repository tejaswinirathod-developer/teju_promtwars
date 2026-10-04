"""
ThinkWise AI - Executive Dashboard Module
Renders metrics, charts, and recent decision history in Streamlit.
"""

import streamlit as st
import pandas as pd
import plotly.express as px
from config import PRIMARY_RED, BRIGHT_RED, LIGHT_PINK, LIGHT_GREY
from database import get_all_decisions

def render_dashboard():
    st.title("📊 Executive Dashboard")
    st.caption("Track identified blind spots, challenged assumptions, and unbiasing metrics.")

    decisions = get_all_decisions()

    # Aggregate statistics
    total_decisions = len(decisions)
    total_blind_spots = sum(len(d['analysis'].get('blind_spots', [])) for d in decisions)
    total_assumptions = sum(len(d['analysis'].get('hidden_assumptions', [])) for d in decisions)
    total_missing_info = sum(len(d['analysis'].get('missing_information', [])) for d in decisions)

    # 4 Core Metrics
    col1, col2, col3, col4 = st.columns(4)
    with col1:
        st.metric("Total Decisions Analyzed", total_decisions)
    with col2:
        st.metric("Potential Blind Spots", total_blind_spots)
    with col3:
        st.metric("Assumptions Detected", total_assumptions)
    with col4:
        st.metric("Missing Info Factors", total_missing_info)

    st.markdown("---")

    if total_decisions == 0:
        st.info("No decisions analyzed yet. Go to 'Decision Input' to analyze your first dilemma, or click the Hackathon Demo button in the sidebar.")
        return

    # Visual Charts
    col_c1, col_c2 = st.columns(2)

    with col_c1:
        st.subheader("Blind Spots Distribution by Severity")
        severity_counts = {"high": 0, "medium": 0, "low": 0}
        for d in decisions:
            for bs in d['analysis'].get('blind_spots', []):
                sev = bs.get('severity', 'medium').lower()
                severity_counts[sev] = severity_counts.get(sev, 0) + 1

        df_sev = pd.DataFrame(list(severity_counts.items()), columns=["Severity", "Count"])
        fig_sev = px.bar(
            df_sev, 
            x="Severity", 
            y="Count", 
            color="Severity",
            color_discrete_map={"high": PRIMARY_RED, "medium": BRIGHT_RED, "low": LIGHT_PINK}
        )
        fig_sev.update_layout(plot_bgcolor="white", paper_bgcolor="white")
        st.plotly_chart(fig_sev, use_container_width=True)

    with col_c2:
        st.subheader("Factor Distribution")
        factors_data = {
            "Factor Type": ["Blind Spots", "Hidden Assumptions", "Missing Info"],
            "Count": [total_blind_spots, total_assumptions, total_missing_info]
        }
        df_factors = pd.DataFrame(factors_data)
        fig_pie = px.pie(
            df_factors, 
            values="Count", 
            names="Factor Type",
            color="Factor Type",
            color_discrete_map={
                "Blind Spots": PRIMARY_RED,
                "Hidden Assumptions": BRIGHT_RED,
                "Missing Info": "#252525"
            }
        )
        st.plotly_chart(fig_pie, use_container_width=True)

    # Recent Decision History Table
    st.subheader("Recent Decision History")
    history_rows = []
    for d in decisions:
        history_rows.append({
            "Title": d["title"],
            "Date": d["created_at"][:10],
            "Blind Spots": len(d["analysis"].get("blind_spots", [])),
            "Assumptions": len(d["analysis"].get("hidden_assumptions", [])),
        })

    st.dataframe(pd.DataFrame(history_rows), use_container_width=True)
