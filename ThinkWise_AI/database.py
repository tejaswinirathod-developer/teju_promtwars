"""
ThinkWise AI - SQLite Database Handler
Stores decisions and unbiasing analyses locally without storing unnecessary PII.
"""

import sqlite3
import json
from datetime import datetime
from typing import List, Dict, Any, Optional

DB_FILE = "thinkwise_history.db"

def init_db():
    conn = sqlite3.connect(DB_FILE)
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS decisions (
            id TEXT PRIMARY KEY,
            title TEXT NOT NULL,
            description TEXT NOT NULL,
            input_json TEXT NOT NULL,
            analysis_json TEXT NOT NULL,
            created_at TEXT NOT NULL
        )
    """)
    conn.commit()
    conn.close()

def save_decision_record(decision_id: str, title: str, description: str, input_data: dict, analysis_data: dict):
    init_db()
    conn = sqlite3.connect(DB_FILE)
    cursor = conn.cursor()
    now_str = datetime.utcnow().isoformat()
    cursor.execute("""
        INSERT OR REPLACE INTO decisions (id, title, description, input_json, analysis_json, created_at)
        VALUES (?, ?, ?, ?, ?, ?)
    """, (
        decision_id,
        title,
        description,
        json.dumps(input_data),
        json.dumps(analysis_data),
        now_str
    ))
    conn.commit()
    conn.close()

def get_all_decisions() -> List[Dict[str, Any]]:
    init_db()
    conn = sqlite3.connect(DB_FILE)
    cursor = conn.cursor()
    cursor.execute("SELECT id, title, description, input_json, analysis_json, created_at FROM decisions ORDER BY created_at DESC")
    rows = cursor.fetchall()
    conn.close()

    results = []
    for r in rows:
        results.append({
            "id": r[0],
            "title": r[1],
            "description": r[2],
            "input": json.loads(r[3]),
            "analysis": json.loads(r[4]),
            "created_at": r[5]
        })
    return results

def delete_decision_record(decision_id: str):
    init_db()
    conn = sqlite3.connect(DB_FILE)
    cursor = conn.cursor()
    cursor.execute("DELETE FROM decisions WHERE id = ?", (decision_id,))
    conn.commit()
    conn.close()
