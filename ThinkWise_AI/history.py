"""
ThinkWise AI - History & Comparison Module
Allows users to view previous decisions, compare decisions, or delete records.
"""

import streamlit as st
import json
from database import get_all_decisions, delete_decision_record
from config import PRIMARY_RED

def render_history_page():
    st.title("🗂️ Decision History & Comparison")
    st.caption("Revisit past analyses or compare two decisions side-by-side.")

    decisions = get_all_decisions()

    if not decisions:
        st.info("No decision records stored yet in SQLite database.")
        return

    # Comparison Selector
    st.subheader("Compare Decisions Side-by-Side")
    decision_titles = [f"{d['title']} ({d['created_at'][:10]})" for d in decisions]

    if len(decisions) >= 2:
        col_sel1, col_sel2 = st.columns(2)
        with col_sel1:
            idx1 = st.selectbox("Select Decision A", range(len(decisions)), format_func=lambda i: decision_titles[i], key="sel_a")
        with col_sel2:
            idx2 = st.selectbox("Select Decision B", range(len(decisions)), index=1, format_func=lambda i: decision_titles[i], key="sel_b")

        if st.button("Compare Selected Decisions"):
            d1 = decisions[idx1]
            d2 = decisions[idx2]

            col_a, col_b = st.columns(2)
            with col_a:
                st.markdown(f"### {d1['title']}")
                st.markdown(f"**Framing:** {d1['analysis'].get('summary')}")
                st.markdown("**Blind Spots:**")
                for bs in d1['analysis'].get('blind_spots', []):
                    st.write(f"- **{bs.get('title')}:** {bs.get('description')}")
            with col_b:
                st.markdown(f"### {d2['title']}")
                st.markdown(f"**Framing:** {d2['analysis'].get('summary')}")
                st.markdown("**Blind Spots:**")
                for bs in d2['analysis'].get('blind_spots', []):
                    st.write(f"- **{bs.get('title')}:** {bs.get('description')}")

            st.markdown("---")

    # Decisions list
    st.subheader("Saved Decision Records")
    for d in decisions:
        with st.expander(f"{d['title']} — {d['created_at'][:10]}"):
            st.markdown(f"**Description:** {d['description']}")
            st.markdown(f"**Summary:** {d['analysis'].get('summary')}")
            st.write(f"Blind spots found: {len(d['analysis'].get('blind_spots', []))}")
            st.write(f"Assumptions checked: {len(d['analysis'].get('hidden_assumptions', []))}")

            if st.button(f"🗑️ Delete Decision", key=f"del_{d['id']}"):
                delete_decision_record(d['id'])
                st.success("Decision deleted. Refreshing...")
                st.rerun()
