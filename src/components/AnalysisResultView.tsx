import React, { useState } from 'react';
import { 
  Eye, 
  AlertTriangle, 
  ShieldAlert, 
  Search, 
  Scale, 
  Compass, 
  HelpCircle, 
  FileText, 
  Sparkles, 
  Bookmark, 
  Download, 
  Printer, 
  MessageSquare, 
  CheckCircle2, 
  Network,
  Share2,
  ChevronDown,
  ChevronUp,
  Tag,
  ArrowRight,
  TrendingUp,
  Sliders,
  Check
} from 'lucide-react';
import { DecisionInput, AnalysisResult } from '../types';
import { ChatAssistant } from './ChatAssistant';
import { DecisionNetworkGraph } from './DecisionNetworkGraph';

interface AnalysisResultViewProps {
  decision: DecisionInput;
  analysis: AnalysisResult;
  onSaveToHistory: () => void;
  onBackToEdit: () => void;
  onCompareWithAnother: () => void;
}

export const AnalysisResultView: React.FC<AnalysisResultViewProps> = ({
  decision,
  analysis,
  onSaveToHistory,
  onBackToEdit,
  onCompareWithAnother,
}) => {
  const [activeTab, setActiveTab] = useState<
    'cards' | 'network' | 'blind_spots' | 'assumptions' | 'contradictions' | 'missing' | 'risks' | 'perspectives' | 'evidence' | 'chat'
  >('cards');

  const [savedToast, setSavedToast] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    summary: true,
    blind_spots: true,
    assumptions: true,
    contradictions: true,
    missing: true,
    risks: true,
    perspectives: true,
    evidence: true,
  });

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleSave = () => {
    onSaveToHistory();
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 2500);
  };

  const handleExportJSON = () => {
    const payload = {
      decision,
      analysis,
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ThinkWise-Analysis-${decision.title.replace(/[^a-zA-Z0-9]/g, '_')}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-[#F6F7FC] min-h-[calc(100vh-4rem)] py-8 text-[#20243A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Top Header Card */}
        <div className="bg-gradient-to-r from-[#101426] via-[#1A1F3B] to-[#101426] rounded-2xl p-6 sm:p-8 text-white border border-[#6C4CF1]/20 shadow-xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-white/10">
            <div className="space-y-2">
              <div className="flex items-center space-x-2 flex-wrap gap-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-[#39D5F6] bg-[#39D5F6]/10 border border-[#39D5F6]/30 px-2.5 py-0.5 rounded-full">
                  AI Decision Intelligence Report
                </span>
                {analysis.isDemo && (
                  <span className="text-xs font-semibold text-[#9275FF] bg-[#9275FF]/20 border border-[#9275FF]/30 px-2.5 py-0.5 rounded-full">
                    Benchmark Scenario Mode
                  </span>
                )}
                <span className="text-xs text-gray-400 font-mono">
                  {new Date(analysis.timestamp).toLocaleDateString(undefined, {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {decision.title}
              </h1>

              <p className="text-xs sm:text-sm text-gray-300 max-w-3xl leading-relaxed">
                {decision.description}
              </p>
            </div>

            {/* Action Bar */}
            <div className="flex flex-wrap items-center gap-2.5 shrink-0">
              <button
                onClick={handleSave}
                className="flex items-center space-x-1.5 bg-gradient-to-r from-[#6C4CF1] to-[#9275FF] hover:brightness-110 text-white px-4 py-2 rounded-xl text-xs font-semibold shadow-md transition-all hover:scale-102"
              >
                <Bookmark className="w-4 h-4" />
                <span>Save to History</span>
              </button>

              <button
                onClick={onCompareWithAnother}
                className="flex items-center space-x-1.5 bg-white/10 hover:bg-white/15 text-white border border-white/20 px-3.5 py-2 rounded-xl text-xs font-medium transition-all"
                title="Compare with another decision"
              >
                <Scale className="w-4 h-4" />
                <span>Compare</span>
              </button>

              <button
                onClick={handleExportJSON}
                className="flex items-center space-x-1.5 bg-white/10 hover:bg-white/15 text-white border border-white/20 px-3.5 py-2 rounded-xl text-xs font-medium transition-all"
                title="Export as JSON"
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Export</span>
              </button>

              <button
                onClick={handlePrint}
                className="flex items-center space-x-1.5 bg-white/10 hover:bg-white/15 text-white border border-white/20 px-3.5 py-2 rounded-xl text-xs font-medium transition-all"
                title="Print Report"
              >
                <Printer className="w-4 h-4" />
                <span className="hidden sm:inline">Print</span>
              </button>
            </div>
          </div>

          {/* Quick Metrics Strip */}
          <div className="pt-6 grid grid-cols-2 sm:grid-cols-5 gap-3">
            <div className="bg-white/5 p-3 rounded-xl border border-white/10">
              <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block">Blind Spots</span>
              <span className="text-xl font-extrabold text-[#39D5F6] font-mono tabular-nums">
                {analysis.blind_spots?.length || 0}
              </span>
            </div>
            <div className="bg-white/5 p-3 rounded-xl border border-white/10">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#9275FF] block">Assumptions</span>
              <span className="text-xl font-extrabold text-white font-mono tabular-nums">
                {analysis.hidden_assumptions?.length || 0}
              </span>
            </div>
            <div className="bg-white/5 p-3 rounded-xl border border-white/10">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 block">Contradictions</span>
              <span className="text-xl font-extrabold text-amber-400 font-mono tabular-nums">
                {analysis.contradictions?.length || 0}
              </span>
            </div>
            <div className="bg-white/5 p-3 rounded-xl border border-white/10">
              <span className="text-[11px] font-bold uppercase tracking-wider text-sky-400 block">Data Gaps</span>
              <span className="text-xl font-extrabold text-sky-400 font-mono tabular-nums">
                {analysis.missing_information?.length || 0}
              </span>
            </div>
            <div className="bg-white/5 p-3 rounded-xl border border-white/10 col-span-2 sm:col-span-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-rose-400 block">Risks / Opps</span>
              <span className="text-xl font-extrabold text-white font-mono tabular-nums">
                {analysis.risks?.length || 0} <span className="text-xs text-gray-400">/</span> {analysis.opportunities?.length || 0}
              </span>
            </div>
          </div>

          {/* Toast */}
          {savedToast && (
            <div className="mt-4 p-3 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-xl text-xs flex items-center space-x-2 animate-in fade-in duration-200">
              <Check className="w-4 h-4 text-emerald-400" />
              <span>Analysis successfully saved to your decision history!</span>
            </div>
          )}
        </div>

        {/* Executive Synthesis & Framing Card */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border-l-4 border-l-[#6C4CF1] border-y border-r border-gray-200 shadow-xs">
          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#6C4CF1] mb-2">
            <Sparkles className="w-4 h-4" />
            <span>Executive Synthesis & Framing</span>
          </div>
          <p className="text-sm sm:text-base text-[#20243A] leading-relaxed font-medium">
            {analysis.summary}
          </p>
        </div>

        {/* View Mode & Filter Tabs */}
        <div className="flex items-center justify-between flex-wrap gap-3 pb-1">
          <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none">
            <button
              onClick={() => setActiveTab('cards')}
              className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                activeTab === 'cards'
                  ? 'bg-gradient-to-r from-[#6C4CF1] to-[#9275FF] text-white shadow-xs'
                  : 'bg-white text-[#20243A] hover:bg-gray-100 border border-gray-200'
              }`}
            >
              <span>Structured Cards</span>
            </button>

            <button
              onClick={() => setActiveTab('network')}
              className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                activeTab === 'network'
                  ? 'bg-gradient-to-r from-[#101426] to-[#1A1F3B] text-[#39D5F6] border border-[#39D5F6]/40 shadow-xs'
                  : 'bg-white text-[#20243A] hover:bg-[#6C4CF1]/10 border border-gray-200'
              }`}
            >
              <Network className="w-3.5 h-3.5 text-[#39D5F6]" />
              <span>AI Neural Topology Graph</span>
            </button>

            <button
              onClick={() => setActiveTab('blind_spots')}
              className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === 'blind_spots'
                  ? 'bg-[#6C4CF1] text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              Blind Spots ({analysis.blind_spots?.length || 0})
            </button>

            <button
              onClick={() => setActiveTab('assumptions')}
              className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === 'assumptions'
                  ? 'bg-[#6C4CF1] text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              Assumptions ({analysis.hidden_assumptions?.length || 0})
            </button>

            <button
              onClick={() => setActiveTab('risks')}
              className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === 'risks'
                  ? 'bg-[#6C4CF1] text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              Risks & Opps
            </button>

            <button
              onClick={() => setActiveTab('chat')}
              className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                activeTab === 'chat'
                  ? 'bg-gradient-to-r from-[#6C4CF1] to-[#39D5F6] text-white'
                  : 'bg-white text-[#6C4CF1] border border-[#6C4CF1]/30 hover:bg-[#F0EDFF]'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Follow-up AI Assistant</span>
            </button>
          </div>
        </div>

        {/* Tab Content Display */}
        {activeTab === 'network' && (
          <DecisionNetworkGraph decision={decision} analysis={analysis} />
        )}

        {activeTab === 'chat' && (
          <ChatAssistant decision={decision} analysis={analysis} />
        )}

        {(activeTab === 'cards' || activeTab === 'blind_spots') && (
          /* 1. BLIND SPOTS SECTION */
          <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
            <div 
              onClick={() => toggleSection('blind_spots')}
              className="p-5 bg-gradient-to-r from-gray-50 to-white flex items-center justify-between cursor-pointer border-b border-gray-100 hover:bg-gray-50"
            >
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#6C4CF1]/10 text-[#6C4CF1] flex items-center justify-center">
                  <Eye className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-[#20243A]">1. Blind Spot Detection (Overlooked Factors)</h2>
                  <p className="text-xs text-gray-500">Variables and conditions omitted from your initial decision framing.</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-mono font-semibold text-[#6C4CF1] bg-[#F0EDFF] px-2.5 py-1 rounded-full">
                  {analysis.blind_spots?.length || 0} items
                </span>
                {expandedSections.blind_spots ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
              </div>
            </div>

            {expandedSections.blind_spots && (
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                {(analysis.blind_spots || []).map((spot) => (
                  <div
                    key={spot.id}
                    className="p-5 rounded-xl border border-gray-200 bg-[#F6F7FC] hover:border-[#6C4CF1]/40 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-white text-[#6C4CF1] border border-gray-200 px-2 py-0.5 rounded">
                          {spot.category || 'Core Factor'}
                        </span>
                        <span
                          className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                            spot.severity === 'high'
                              ? 'bg-rose-100 text-rose-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {spot.severity} vulnerability
                        </span>
                      </div>

                      <h3 className="text-sm font-bold text-[#20243A] mb-1.5">
                        {spot.title}
                      </h3>

                      <p className="text-xs text-gray-700 leading-relaxed mb-3">
                        {spot.description}
                      </p>

                      <div className="bg-white p-2.5 rounded-lg border border-gray-200 mb-3 text-xs">
                        <span className="font-bold text-gray-500 block mb-0.5">Why easily overlooked:</span>
                        <span className="text-[#20243A]">{spot.why_overlooked}</span>
                      </div>
                    </div>

                    <div className="pt-2.5 border-t border-gray-200 text-xs">
                      <strong className="text-[#6C4CF1]">Actionable Inquiry: </strong>
                      <span className="text-[#20243A]">{spot.suggested_action}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {(activeTab === 'cards' || activeTab === 'assumptions') && (
          /* 2. HIDDEN ASSUMPTIONS (Purple Cards as explicitly specified in prompt!) */
          <div className="bg-white rounded-2xl border border-purple-200 shadow-xs overflow-hidden">
            <div 
              onClick={() => toggleSection('assumptions')}
              className="p-5 bg-gradient-to-r from-[#F0EDFF] to-white flex items-center justify-between cursor-pointer border-b border-purple-100 hover:bg-purple-50/50"
            >
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#6C4CF1] text-white flex items-center justify-center">
                  <AlertTriangle className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-[#20243A]">2. Hidden Assumptions Audit</h2>
                  <p className="text-xs text-gray-500">Premises taken for granted without empirical supporting evidence (Purple Cards).</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-mono font-semibold text-[#6C4CF1] bg-white px-2.5 py-1 rounded-full border border-purple-200">
                  {analysis.hidden_assumptions?.length || 0} claims
                </span>
                {expandedSections.assumptions ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
              </div>
            </div>

            {expandedSections.assumptions && (
              <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                {(analysis.hidden_assumptions || []).map((ha) => (
                  <div
                    key={ha.id}
                    className="p-5 rounded-xl border border-[#9275FF]/30 bg-[#F0EDFF]/60 hover:border-[#6C4CF1] transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#6C4CF1] bg-white px-2 py-0.5 rounded">
                          Unverified Premise
                        </span>
                        <span className="text-[10px] font-bold uppercase text-purple-800 bg-white/80 px-2 py-0.5 rounded">
                          {ha.risk_level} Risk
                        </span>
                      </div>

                      <h4 className="text-sm font-bold text-[#20243A] mb-2 leading-snug">
                        &ldquo;{ha.assumption}&rdquo;
                      </h4>

                      <p className="text-xs text-gray-700 leading-relaxed mb-3">
                        <span className="font-semibold text-[#6C4CF1]">Why Unsupported: </span>
                        {ha.why_unsupported}
                      </p>
                    </div>

                    <div className="bg-white p-3 rounded-lg border border-purple-200 text-xs">
                      <span className="font-bold text-[#6C4CF1] block mb-1">Empirical Verification Step:</span>
                      <span className="text-[#20243A]">{ha.verification_step}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {(activeTab === 'cards' || activeTab === 'contradictions') && (
          /* 3. CONTRADICTIONS & WARNINGS (Orange Cards) */
          <div className="bg-white rounded-2xl border border-amber-200 shadow-xs overflow-hidden">
            <div 
              onClick={() => toggleSection('contradictions')}
              className="p-5 bg-gradient-to-r from-amber-50/70 to-white flex items-center justify-between cursor-pointer border-b border-amber-100 hover:bg-amber-50"
            >
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-lg bg-amber-500 text-white flex items-center justify-center">
                  <ShieldAlert className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-[#20243A]">3. Contradiction Detection & Warnings</h2>
                  <p className="text-xs text-gray-500">Conflicting goals or beliefs pulling in opposite directions (Orange Cards).</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-mono font-semibold text-amber-800 bg-amber-100 px-2.5 py-1 rounded-full">
                  {analysis.contradictions?.length || 0} tensions
                </span>
                {expandedSections.contradictions ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
              </div>
            </div>

            {expandedSections.contradictions && (
              <div className="p-6">
                {(analysis.contradictions || []).length === 0 ? (
                  <div className="text-center py-6 text-xs text-gray-500">
                    No conflicting goals or cognitive tensions detected.
                  </div>
                ) : (
                  <div className="space-y-4">
                    {(analysis.contradictions || []).map((c) => (
                      <div
                        key={c.id}
                        className="p-5 rounded-xl border border-amber-200 bg-amber-50/30 space-y-4"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-white p-3.5 rounded-lg border border-amber-200">
                            <span className="text-[10px] font-bold uppercase text-amber-800 block mb-1">
                              Stated Goal A
                            </span>
                            <p className="text-xs sm:text-sm font-semibold text-[#20243A]">
                              {c.statement_a}
                            </p>
                          </div>
                          <div className="bg-white p-3.5 rounded-lg border border-amber-200">
                            <span className="text-[10px] font-bold uppercase text-amber-800 block mb-1">
                              Conflicting Priority B
                            </span>
                            <p className="text-xs sm:text-sm font-semibold text-[#20243A]">
                              {c.statement_b}
                            </p>
                          </div>
                        </div>

                        <div className="space-y-1 text-xs">
                          <strong className="text-amber-900">Why in Conflict: </strong>
                          <span className="text-gray-800">{c.conflict_explanation}</span>
                        </div>

                        <div className="bg-white p-3 rounded-lg border border-amber-200 text-xs">
                          <strong className="text-[#20243A]">Resolution Inquiry: </strong>
                          <span className="text-gray-600">{c.resolution_prompt}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {(activeTab === 'cards' || activeTab === 'missing') && (
          /* 4. MISSING INFORMATION & DATA GAPS (Blue / Cyan Cards) */
          <div className="bg-white rounded-2xl border border-sky-200 shadow-xs overflow-hidden">
            <div 
              onClick={() => toggleSection('missing')}
              className="p-5 bg-gradient-to-r from-sky-50/70 to-white flex items-center justify-between cursor-pointer border-b border-sky-100 hover:bg-sky-50"
            >
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-lg bg-sky-500 text-white flex items-center justify-center">
                  <Search className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-[#20243A]">4. Missing Data Gaps</h2>
                  <p className="text-xs text-gray-500">Uncollected metrics, policies, and facts required to de-risk the choice (Cyan Cards).</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-mono font-semibold text-sky-800 bg-sky-100 px-2.5 py-1 rounded-full">
                  {analysis.missing_information?.length || 0} gaps
                </span>
                {expandedSections.missing ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
              </div>
            </div>

            {expandedSections.missing && (
              <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                {(analysis.missing_information || []).map((m) => (
                  <div
                    key={m.id}
                    className="p-5 rounded-xl border border-sky-200 bg-sky-50/40 flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-white text-sky-800 border border-sky-200 px-2 py-0.5 rounded">
                        {m.category}
                      </span>
                      <h4 className="text-sm font-bold text-[#20243A] mt-2 mb-1.5">
                        {m.missing_factor}
                      </h4>
                      <p className="text-xs text-gray-700 leading-relaxed mb-3">
                        <strong className="text-[#20243A]">Why Critical: </strong>
                        {m.why_critical}
                      </p>
                    </div>

                    <div className="pt-2.5 border-t border-sky-200 text-xs">
                      <span className="font-bold text-sky-800 block mb-0.5">How to Obtain:</span>
                      <span className="text-[#20243A]">{m.how_to_obtain}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {(activeTab === 'cards' || activeTab === 'risks') && (
          /* 5. RISK ASSESSMENT (Red Cards) & OPPORTUNITIES (Green Cards) */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Risks Section (Red) */}
            <div className="bg-white rounded-2xl border border-rose-200 shadow-xs overflow-hidden">
              <div className="p-5 bg-gradient-to-r from-rose-50 to-white flex items-center justify-between border-b border-rose-100">
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500" />
                  <h3 className="text-sm font-bold uppercase tracking-wider text-rose-900">
                    5. Risk Assessment (Red Cards)
                  </h3>
                </div>
                <span className="text-xs font-mono font-semibold text-rose-800 bg-rose-100 px-2 py-0.5 rounded-full">
                  {analysis.risks?.length || 0} risks
                </span>
              </div>

              <div className="p-5 space-y-3">
                {(analysis.risks || []).map((r) => (
                  <div
                    key={r.id}
                    className="p-4 rounded-xl border border-rose-200 bg-rose-50/40"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <h4 className="text-xs sm:text-sm font-bold text-rose-900">{r.risk}</h4>
                      <span className="text-[10px] font-bold uppercase bg-white text-rose-700 px-2 py-0.5 rounded border border-rose-200">
                        {r.impact} impact
                      </span>
                    </div>
                    <div className="bg-white p-2.5 rounded-lg border border-rose-200 text-xs mt-2">
                      <strong className="text-rose-800">Mitigation: </strong>
                      <span className="text-gray-800">{r.mitigation}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Opportunities Section (Green) */}
            <div className="bg-white rounded-2xl border border-emerald-200 shadow-xs overflow-hidden">
              <div className="p-5 bg-gradient-to-r from-emerald-50 to-white flex items-center justify-between border-b border-emerald-100">
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 rounded-full bg-emerald-500" />
                  <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-900">
                    6. Opportunities (Green Cards)
                  </h3>
                </div>
                <span className="text-xs font-mono font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                  {analysis.opportunities?.length || 0} upsides
                </span>
              </div>

              <div className="p-5 space-y-3">
                {(analysis.opportunities || []).map((op) => (
                  <div
                    key={op.id}
                    className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/40"
                  >
                    <h4 className="text-xs sm:text-sm font-bold text-emerald-900 mb-1">{op.opportunity}</h4>
                    <p className="text-xs text-gray-700 leading-relaxed mb-2">
                      <strong className="text-[#20243A]">Potential Upside: </strong>
                      {op.potential_upside}
                    </p>
                    <div className="bg-white p-2.5 rounded-lg border border-emerald-200 text-xs">
                      <strong className="text-emerald-800">How to Capture: </strong>
                      <span className="text-gray-800">{op.how_to_capture}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 7. RECOMMENDATIONS & CRITICAL QUESTIONS */}
        {activeTab === 'cards' && (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-xs p-6 space-y-4">
            <div className="flex items-center space-x-2 pb-3 border-b border-gray-100">
              <HelpCircle className="w-5 h-5 text-[#6C4CF1]" />
              <h2 className="text-base font-bold text-[#20243A]">
                7. Critical Probing Questions (To Ask Before Committing)
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {(analysis.critical_questions || []).map((q, idx) => (
                <div key={q.id || idx} className="p-4 rounded-xl bg-[#F6F7FC] border border-gray-200 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-[#6C4CF1] bg-[#F0EDFF] px-2 py-0.5 rounded">
                      Focus: {q.reflection_target}
                    </span>
                    <h4 className="text-xs sm:text-sm font-bold text-[#20243A] mt-2 mb-1.5">
                      {q.question}
                    </h4>
                  </div>
                  <p className="text-xs text-gray-600 pt-2 border-t border-gray-200/60 mt-2">
                    <strong className="text-[#20243A]">Rationale: </strong>
                    {q.rationale}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 8. FINAL DECISION INSIGHTS */}
        {activeTab === 'cards' && (
          <div className="bg-gradient-to-br from-[#101426] via-[#1A1F3B] to-[#101426] rounded-2xl p-6 sm:p-8 text-white border border-[#6C4CF1]/30 shadow-xl space-y-4">
            <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#39D5F6]">
              <Sparkles className="w-4 h-4" />
              <span>Final Decision Insights & Pre-Commitment Guidance</span>
            </div>
            <h3 className="text-lg font-bold text-white">
              Neutral Synthesis for the Decision Maker
            </h3>
            <p className="text-xs sm:text-sm text-gray-200 leading-relaxed whitespace-pre-wrap">
              {analysis.final_reflection}
            </p>
            <div className="pt-3 border-t border-white/10 text-[11px] text-gray-400 flex items-center justify-between">
              <span>ThinkWise AI acts as a thinking partner. All final decisions remain your independent choice.</span>
              <button
                onClick={() => setActiveTab('chat')}
                className="text-[#39D5F6] hover:text-white font-semibold flex items-center space-x-1"
              >
                <span>Ask follow-up questions &rarr;</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
