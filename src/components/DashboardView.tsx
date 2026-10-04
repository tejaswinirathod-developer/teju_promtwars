import React, { useState } from 'react';
import { 
  PlusCircle, 
  Eye, 
  AlertTriangle, 
  Search, 
  ShieldAlert, 
  Scale, 
  FileText, 
  ArrowRight, 
  Trash2, 
  Sparkles, 
  TrendingUp, 
  CheckCircle2, 
  Calendar,
  Layers,
  GraduationCap
} from 'lucide-react';
import { DecisionRecord } from '../types';

interface DashboardViewProps {
  records: DecisionRecord[];
  onSelectRecord: (record: DecisionRecord) => void;
  onNewAnalysis: () => void;
  onDeleteRecord: (id: string) => void;
  onCompareRecords: (id1: string, id2: string) => void;
  onLoadBenchmarkDemo: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  records,
  onSelectRecord,
  onNewAnalysis,
  onDeleteRecord,
  onCompareRecords,
  onLoadBenchmarkDemo,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Aggregated Real Application Metrics
  const totalAnalyses = records.length;

  const totalBlindSpots = records.reduce(
    (acc, cur) => acc + (cur.analysis?.blind_spots?.length || 0),
    0
  );

  const totalAssumptions = records.reduce(
    (acc, cur) => acc + (cur.analysis?.hidden_assumptions?.length || 0),
    0
  );

  const totalContradictions = records.reduce(
    (acc, cur) => acc + (cur.analysis?.contradictions?.length || 0),
    0
  );

  const totalMissingGaps = records.reduce(
    (acc, cur) => acc + (cur.analysis?.missing_information?.length || 0),
    0
  );

  const totalRisks = records.reduce(
    (acc, cur) => acc + (cur.analysis?.risks?.length || 0),
    0
  );

  const totalOpportunities = records.reduce(
    (acc, cur) => acc + (cur.analysis?.opportunities?.length || 0),
    0
  );

  // Calculated Real Risk vs Opportunity Resilience Ratio
  const totalFactors = totalRisks + totalOpportunities;
  const opportunityScore = totalFactors > 0 
    ? Math.round((totalOpportunities / totalFactors) * 100) 
    : 65;

  // Category counts
  const categoryCounts: Record<string, number> = {};
  records.forEach((r) => {
    (r.analysis?.blind_spots || []).forEach((b) => {
      const cat = b.category || 'General';
      categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
    });
  });

  // Severity counts
  let highSeverity = 0;
  let mediumSeverity = 0;
  let lowSeverity = 0;
  records.forEach((r) => {
    (r.analysis?.blind_spots || []).forEach((b) => {
      if (b.severity === 'high') highSeverity++;
      else if (b.severity === 'low') lowSeverity++;
      else mediumSeverity++;
    });
  });

  // Evidence check aggregation
  let factCount = 0;
  let assumptionCount = 0;
  let unverifiedCount = 0;
  records.forEach((r) => {
    (r.analysis?.evidence_check || []).forEach((ec) => {
      if (ec.classification === 'Fact') factCount++;
      else if (ec.classification === 'Assumption') assumptionCount++;
      else unverifiedCount++;
    });
  });

  return (
    <div className="bg-[#F6F8FC] dark:bg-[#101426] min-h-[calc(100vh-4rem)] py-8 text-[#20243A] dark:text-white transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Dashboard Header Banner */}
        <div className="bg-gradient-to-r from-[#101426] via-[#1A1F3B] to-[#101426] rounded-2xl p-6 sm:p-8 text-white border border-[#6C4CF1]/20 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <div className="inline-flex items-center space-x-2 text-xs font-semibold text-[#39D5F6] bg-[#39D5F6]/10 px-3 py-1 rounded-full border border-[#39D5F6]/20">
              <Sparkles className="w-3.5 h-3.5 text-[#39D5F6]" />
              <span>Real-Time Cognitive Telemetry</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Executive AI Analytics Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-gray-300 max-w-2xl">
              Systematic tracking of unaddressed cognitive blind spots, assumption vulnerabilities, and decision resilience scores.
            </p>
          </div>

          <div className="flex items-center space-x-3 shrink-0">
            <button
              onClick={onNewAnalysis}
              className="flex items-center space-x-2 bg-gradient-to-r from-[#6C4CF1] to-[#39D5F6] text-white px-5 py-3 rounded-xl font-bold text-xs sm:text-sm shadow-md shadow-[#6C4CF1]/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              <span>New Analysis</span>
            </button>
          </div>
        </div>

        {/* 6 Core Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
          {/* 1. Total Analyses */}
          <div className="bg-white dark:bg-[#1A2238] p-5 rounded-2xl border border-gray-200/90 dark:border-white/10 shadow-xs hover:border-[#6C4CF1]/40 transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold uppercase text-gray-500 dark:text-[#AAB4C8]">Total Analyses</span>
              <div className="w-8 h-8 rounded-lg bg-[#6C4CF1]/10 text-[#6C4CF1] dark:text-[#39D5F6] flex items-center justify-center">
                <FileText className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#20243A] dark:text-white font-mono tabular-nums">
              {totalAnalyses}
            </div>
            <span className="text-[11px] text-gray-500 dark:text-[#AAB4C8] mt-1 block">Evaluated decisions</span>
          </div>

          {/* 2. Blind Spots */}
          <div className="bg-white dark:bg-[#1A2238] p-5 rounded-2xl border border-gray-200/90 dark:border-white/10 shadow-xs hover:border-[#6C4CF1]/40 transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold uppercase text-[#6C4CF1] dark:text-[#39D5F6]">Blind Spots</span>
              <div className="w-8 h-8 rounded-lg bg-[#6C4CF1]/15 text-[#6C4CF1] dark:text-[#39D5F6] flex items-center justify-center">
                <Eye className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#6C4CF1] dark:text-[#39D5F6] font-mono tabular-nums">
              {totalBlindSpots}
            </div>
            <span className="text-[11px] text-[#6C4CF1] dark:text-[#39D5F6] font-medium mt-1 block">Overlooked factors</span>
          </div>

          {/* 3. Hidden Assumptions */}
          <div className="bg-white dark:bg-[#1A2238] p-5 rounded-2xl border border-purple-200/80 dark:border-purple-500/20 shadow-xs hover:border-[#9275FF] transition-all bg-gradient-to-br from-white dark:from-[#1A2238] to-[#F0EDFF]/30 dark:to-[#6C4CF1]/10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold uppercase text-[#9275FF]">Assumptions</span>
              <div className="w-8 h-8 rounded-lg bg-[#9275FF]/20 text-[#6C4CF1] dark:text-[#9275FF] flex items-center justify-center">
                <AlertTriangle className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#20243A] dark:text-white font-mono tabular-nums">
              {totalAssumptions}
            </div>
            <span className="text-[11px] text-gray-500 dark:text-[#AAB4C8] mt-1 block">Premises flagged</span>
          </div>

          {/* 4. Contradictions Found */}
          <div className="bg-white dark:bg-[#1A2238] p-5 rounded-2xl border border-amber-200/80 dark:border-amber-500/20 shadow-xs hover:border-amber-400 transition-all bg-gradient-to-br from-white dark:from-[#1A2238] to-amber-50/30 dark:to-amber-950/20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold uppercase text-amber-700 dark:text-amber-400">Contradictions</span>
              <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 flex items-center justify-center">
                <ShieldAlert className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-800 dark:text-amber-400 font-mono tabular-nums">
              {totalContradictions}
            </div>
            <span className="text-[11px] text-amber-700 dark:text-amber-400 mt-1 block">Tensions detected</span>
          </div>

          {/* 5. Missing Data Gaps */}
          <div className="bg-white dark:bg-[#1A2238] p-5 rounded-2xl border border-sky-200/80 dark:border-sky-500/20 shadow-xs hover:border-sky-400 transition-all bg-gradient-to-br from-white dark:from-[#1A2238] to-sky-50/30 dark:to-sky-950/20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold uppercase text-sky-700 dark:text-sky-400">Missing Gaps</span>
              <div className="w-8 h-8 rounded-lg bg-sky-100 dark:bg-sky-900/30 text-sky-800 dark:text-sky-300 flex items-center justify-center">
                <Search className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-sky-800 dark:text-sky-400 font-mono tabular-nums">
              {totalMissingGaps}
            </div>
            <span className="text-[11px] text-sky-700 dark:text-sky-400 mt-1 block">Data points to gather</span>
          </div>

          {/* 6. Risk vs Opportunity Score */}
          <div className="bg-white dark:bg-[#1A2238] p-5 rounded-2xl border border-emerald-200/80 dark:border-emerald-500/20 shadow-xs hover:border-emerald-400 transition-all bg-gradient-to-br from-white dark:from-[#1A2238] to-emerald-50/30 dark:to-emerald-950/20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold uppercase text-emerald-700 dark:text-emerald-400">Resilience Index</span>
              <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 flex items-center justify-center">
                <Scale className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-700 dark:text-emerald-400 font-mono tabular-nums">
              {opportunityScore}%
            </div>
            <span className="text-[11px] text-emerald-700 dark:text-emerald-400 mt-1 block">Opp vs Risk balance</span>
          </div>
        </div>

        {/* Visual Charts & Analytics Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chart 1: Blind Spot Distribution */}
          <div className="bg-white dark:bg-[#1A2238] p-6 rounded-2xl border border-gray-200 dark:border-white/10 shadow-xs">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-white/10">
              <div className="flex items-center space-x-2">
                <Eye className="w-4 h-4 text-[#6C4CF1] dark:text-[#39D5F6]" />
                <h3 className="text-sm font-bold text-[#20243A] dark:text-white">Blind Spot Distribution</h3>
              </div>
              <span className="text-[11px] font-mono text-gray-500 dark:text-[#AAB4C8] tabular-nums">{totalBlindSpots} total</span>
            </div>

            <div className="py-4 space-y-4">
              {Object.keys(categoryCounts).length === 0 ? (
                <div className="py-8 text-center text-xs text-gray-400">
                  No category data recorded yet.
                </div>
              ) : (
                Object.entries(categoryCounts).map(([cat, count]) => {
                  const pct = totalBlindSpots > 0 ? Math.round((count / totalBlindSpots) * 100) : 0;
                  return (
                    <div key={cat} className="space-y-1.5">
                      <div className="flex justify-between text-xs">
                        <span className="font-semibold text-[#20243A] dark:text-white">{cat}</span>
                        <span className="font-mono text-gray-500 dark:text-[#AAB4C8] tabular-nums">{count} ({pct}%)</span>
                      </div>
                      <div className="w-full h-2.5 bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#6C4CF1] to-[#39D5F6] rounded-full transition-all duration-500"
                          style={{ width: `${Math.max(pct, 10)}%` }}
                        />
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Severity footer */}
            <div className="pt-3 border-t border-gray-100 dark:border-white/10 grid grid-cols-3 gap-2 text-center text-[10px]">
              <div className="bg-rose-50 dark:bg-rose-950/30 text-rose-700 dark:text-rose-400 py-1 rounded-lg font-semibold">
                High: {highSeverity}
              </div>
              <div className="bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400 py-1 rounded-lg font-semibold">
                Medium: {mediumSeverity}
              </div>
              <div className="bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 py-1 rounded-lg font-semibold">
                Low: {lowSeverity}
              </div>
            </div>
          </div>

          {/* Chart 2: Risk and Opportunity Comparison */}
          <div className="bg-white dark:bg-[#1A2238] p-6 rounded-2xl border border-gray-200 dark:border-white/10 shadow-xs">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-white/10">
              <div className="flex items-center space-x-2">
                <Scale className="w-4 h-4 text-[#39D5F6]" />
                <h3 className="text-sm font-bold text-[#20243A] dark:text-white">Risk vs Opportunity Comparison</h3>
              </div>
              <span className="text-[11px] font-mono text-gray-500 dark:text-[#AAB4C8] tabular-nums">{totalFactors} factors</span>
            </div>

            <div className="py-6 space-y-5">
              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="font-semibold text-rose-600 dark:text-rose-400 flex items-center space-x-1.5">
                    <span className="w-2 h-2 rounded-full bg-rose-500" />
                    <span>Downside Risks Flagged</span>
                  </span>
                  <span className="font-bold text-rose-600 dark:text-rose-400 font-mono tabular-nums">{totalRisks}</span>
                </div>
                <div className="w-full h-3 bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-rose-500 rounded-full transition-all duration-500"
                    style={{
                      width: `${totalFactors > 0 ? (totalRisks / totalFactors) * 100 : 50}%`,
                    }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400 flex items-center space-x-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span>Unexplored Opportunities</span>
                  </span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400 font-mono tabular-nums">{totalOpportunities}</span>
                </div>
                <div className="w-full h-3 bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                    style={{
                      width: `${totalFactors > 0 ? (totalOpportunities / totalFactors) * 100 : 50}%`,
                    }}
                  />
                </div>
              </div>

              <div className="bg-[#F6F8FC] dark:bg-[#101426] p-3 rounded-xl border border-gray-200 dark:border-white/10 text-xs text-gray-600 dark:text-[#AAB4C8] leading-relaxed">
                A resilient decision maintains an explicit pre-mortem contingency for every high-impact downside risk before upside capital is committed.
              </div>
            </div>
          </div>

          {/* Chart 3: Decision Confidence & Evidence Grounding */}
          <div className="bg-white dark:bg-[#1A2238] p-6 rounded-2xl border border-gray-200 dark:border-white/10 shadow-xs">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-white/10">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <h3 className="text-sm font-bold text-[#20243A] dark:text-white">Decision Confidence Trends</h3>
              </div>
              <span className="text-[11px] font-mono text-gray-500 dark:text-[#AAB4C8] tabular-nums">Grounding</span>
            </div>

            <div className="py-4 space-y-3 text-xs">
              <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-500/20 text-emerald-900 dark:text-emerald-300">
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="font-medium">Empirical Facts</span>
                </div>
                <span className="font-bold font-mono tabular-nums">{factCount}</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-[#F0EDFF] dark:bg-[#6C4CF1]/15 border border-[#9275FF]/30 dark:border-[#6C4CF1]/30 text-[#6C4CF1] dark:text-[#9275FF]">
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-[#6C4CF1]" />
                  <span className="font-medium">Tested Assumptions</span>
                </div>
                <span className="font-bold font-mono tabular-nums">{assumptionCount}</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-sky-50/70 dark:bg-sky-950/20 border border-sky-200/60 dark:border-sky-500/20 text-sky-900 dark:text-sky-300">
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-sky-500" />
                  <span className="font-medium">Unverified / Data Gaps</span>
                </div>
                <span className="font-bold font-mono tabular-nums">{unverifiedCount}</span>
              </div>
            </div>

            <p className="text-[11px] text-gray-500 dark:text-[#AAB4C8] text-center pt-2">
              High-quality decisions convert unverified assertions into verified facts through pre-decision discovery.
            </p>
          </div>
        </div>

        {/* Recent Analysis History Table */}
        <div className="bg-white dark:bg-[#1A2238] rounded-2xl border border-gray-200 dark:border-white/10 shadow-xs overflow-hidden">
          <div className="p-6 border-b border-gray-100 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-[#20243A] dark:text-white">Analysis History</h2>
              <p className="text-xs text-gray-500 dark:text-[#AAB4C8]">Click any decision to inspect its complete 10-dimension intelligence report.</p>
            </div>

            {records.length > 0 && (
              <button
                onClick={onNewAnalysis}
                className="text-xs font-bold text-[#6C4CF1] dark:text-[#39D5F6] hover:underline transition-colors flex items-center space-x-1"
              >
                <span>+ Analyze Another Decision</span>
              </button>
            )}
          </div>

          {records.length === 0 ? (
            <div className="p-12 text-center space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#6C4CF1]/10 text-[#6C4CF1] dark:text-[#39D5F6] flex items-center justify-center mx-auto">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-[#20243A] dark:text-white">No Decisions Analyzed Yet</h3>
              <p className="text-xs text-gray-500 dark:text-[#AAB4C8] max-w-md mx-auto">
                Submit a high-stakes decision you are facing, or load the official Hackathon benchmark scenario to explore the platform.
              </p>
              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={onNewAnalysis}
                  className="bg-gradient-to-r from-[#6C4CF1] to-[#9275FF] text-white px-5 py-2.5 rounded-xl text-xs font-semibold shadow-xs"
                >
                  Start New Analysis
                </button>
                <button
                  onClick={onLoadBenchmarkDemo}
                  className="bg-white dark:bg-white/10 border border-[#6C4CF1] text-[#6C4CF1] dark:text-[#39D5F6] hover:bg-[#F0EDFF] px-4 py-2.5 rounded-xl text-xs font-semibold"
                >
                  Load 6-Month Internship Demo
                </button>
              </div>
            </div>
          ) : (
            <div className="divide-y divide-gray-100 dark:divide-white/10">
              {records.map((record) => {
                const bCount = record.analysis?.blind_spots?.length || 0;
                const aCount = record.analysis?.hidden_assumptions?.length || 0;
                const rCount = record.analysis?.risks?.length || 0;
                const dateStr = new Date(record.createdAt).toLocaleDateString(undefined, {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                });

                return (
                  <div
                    key={record.id}
                    className="p-5 hover:bg-[#F6F8FC] dark:hover:bg-white/5 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4 group"
                  >
                    <div 
                      className="flex-1 cursor-pointer"
                      onClick={() => onSelectRecord(record)}
                    >
                      <div className="flex items-center space-x-2 mb-1.5 flex-wrap gap-y-1">
                        <span className="text-xs font-mono text-gray-500 dark:text-[#AAB4C8] flex items-center space-x-1">
                          <Calendar className="w-3 h-3" />
                          <span>{dateStr}</span>
                        </span>
                        {record.analysis?.isDemo && (
                          <span className="text-[10px] font-bold uppercase tracking-wider bg-[#39D5F6]/10 text-[#0284C7] dark:text-[#39D5F6] border border-[#39D5F6]/30 px-2 py-0.5 rounded-full">
                            Benchmark Demo
                          </span>
                        )}
                        {(record.input.tags || []).map((t) => (
                          <span key={t} className="text-[10px] bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded">
                            {t}
                          </span>
                        ))}
                      </div>

                      <h3 className="text-base font-bold text-[#20243A] dark:text-white group-hover:text-[#6C4CF1] dark:group-hover:text-[#39D5F6] transition-colors">
                        {record.input.title}
                      </h3>

                      <p className="text-xs text-gray-500 dark:text-[#AAB4C8] line-clamp-1 mt-1">
                        {record.analysis?.summary || record.input.description}
                      </p>
                    </div>

                    <div className="flex items-center space-x-4">
                      {/* Metric pills */}
                      <div className="flex items-center space-x-2 text-xs">
                        <span className="bg-[#6C4CF1]/10 text-[#6C4CF1] dark:text-[#39D5F6] border border-[#6C4CF1]/20 px-2.5 py-1 rounded-lg font-semibold">
                          {bCount} Blind Spots
                        </span>
                        <span className="bg-[#9275FF]/10 text-[#6C4CF1] dark:text-[#9275FF] border border-[#9275FF]/20 px-2.5 py-1 rounded-lg font-semibold">
                          {aCount} Assumptions
                        </span>
                        <span className="bg-rose-50 dark:bg-rose-950/30 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-800/40 px-2.5 py-1 rounded-lg font-semibold">
                          {rCount} Risks
                        </span>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center space-x-1">
                        <button
                          onClick={() => onSelectRecord(record)}
                          className="p-2 text-gray-500 hover:text-[#6C4CF1] dark:hover:text-[#39D5F6] hover:bg-white dark:hover:bg-white/10 rounded-lg transition-colors"
                          title="Open Analysis"
                        >
                          <ArrowRight className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onDeleteRecord(record.id)}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-white dark:hover:bg-white/10 rounded-lg transition-colors"
                          title="Delete Record"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
