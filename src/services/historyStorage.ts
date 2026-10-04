import { DecisionRecord, DecisionInput, AnalysisResult } from '../types';
import { INTERNSHIP_SCENARIO } from '../data/sampleScenarios';

const STORAGE_KEY = 'thinkwise_decision_history_v1';

export const getDecisionHistory = (): DecisionRecord[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      // Seed with initial benchmark decision
      const defaultRecord: DecisionRecord = {
        id: INTERNSHIP_SCENARIO.id,
        input: INTERNSHIP_SCENARIO.input,
        analysis: INTERNSHIP_SCENARIO.precomputedAnalysis,
        createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
        updatedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
        status: 'analyzed',
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify([defaultRecord]));
      return [defaultRecord];
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load decision history from localStorage', e);
    return [];
  }
};

export const saveDecision = (
  input: DecisionInput,
  analysis: AnalysisResult,
  id?: string
): DecisionRecord => {
  const existingHistory = getDecisionHistory();
  const decisionId = id || `dec-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
  
  const existingIndex = existingHistory.findIndex((item) => item.id === decisionId);
  const now = new Date().toISOString();

  let record: DecisionRecord;
  if (existingIndex >= 0) {
    record = {
      ...existingHistory[existingIndex],
      input,
      analysis,
      updatedAt: now,
    };
    existingHistory[existingIndex] = record;
  } else {
    record = {
      id: decisionId,
      input,
      analysis,
      createdAt: now,
      updatedAt: now,
      status: 'analyzed',
    };
    existingHistory.unshift(record);
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(existingHistory));
  return record;
};

export const deleteDecision = (id: string): void => {
  const current = getDecisionHistory();
  const updated = current.filter((item) => item.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
};

export const getDecisionById = (id: string): DecisionRecord | undefined => {
  const current = getDecisionHistory();
  return current.find((item) => item.id === id);
};

export const exportHistoryAsJSON = (): string => {
  const current = getDecisionHistory();
  return JSON.stringify(current, null, 2);
};

export const clearAllHistory = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};
