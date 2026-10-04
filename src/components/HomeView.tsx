import React from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  Layers, 
  ShieldAlert, 
  Search, 
  Scale, 
  Compass, 
  HelpCircle, 
  FileText, 
  Eye, 
  CheckCircle2, 
  GraduationCap,
  Network,
  Cpu,
  ChevronRight
} from 'lucide-react';
import { NeuralVisualizer } from './NeuralVisualizer';
import { INTERNSHIP_SCENARIO } from '../data/sampleScenarios';

interface HomeViewProps {
  onStartAnalysis: () => void;
  onLoadScenario: (scenarioId: string) => void;
  onExploreDashboard: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onStartAnalysis,
  onLoadScenario,
  onExploreDashboard,
}) => {
  return (
    <div className="bg-[#F6F8FC] dark:bg-[#101426] text-[#20243A] dark:text-white transition-colors duration-200">
      {/* Futuristic Hero Section */}
      <section className="relative overflow-hidden bg-[#101426] text-white pt-12 pb-24 border-b border-[#6C4CF1]/20">
        {/* Ambient lighting glows */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#6C4CF1]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#39D5F6]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Hero Copy & Actions */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#6C4CF1]/20 border border-[#9275FF]/30 text-[#39D5F6] text-xs font-semibold shadow-inner">
                <Sparkles className="w-3.5 h-3.5 text-[#39D5F6]" />
                <span>Next-Generation Decision Intelligence</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] text-white">
                Think Beyond <br />
                <span className="bg-gradient-to-r from-[#9275FF] via-[#6C4CF1] to-[#39D5F6] bg-clip-text text-transparent">
                  What You See.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-gray-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Discover hidden assumptions, overlooked risks, missing information, and contradictions before making important decisions.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  onClick={onStartAnalysis}
                  className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-gradient-to-r from-[#6C4CF1] via-[#9275FF] to-[#39D5F6] text-white px-7 py-3.5 rounded-xl font-bold text-base shadow-lg shadow-[#6C4CF1]/40 hover:shadow-[#39D5F6]/50 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span>Start New Analysis</span>
                  <ArrowRight className="w-5 h-5 ml-1" />
                </button>

                <button
                  onClick={onExploreDashboard}
                  className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-white/10 hover:bg-white/15 text-white border border-white/20 px-6 py-3.5 rounded-xl font-semibold text-base backdrop-blur-xs transition-all duration-200"
                >
                  <span>Explore Dashboard</span>
                </button>
              </div>

              {/* Hackathon benchmark shortcut */}
              <div className="pt-2 flex items-center justify-center lg:justify-start space-x-2 text-xs text-gray-400">
                <span>Want to test immediately?</span>
                <button
                  onClick={() => onLoadScenario(INTERNSHIP_SCENARIO.id)}
                  className="text-[#39D5F6] hover:text-white font-semibold underline decoration-[#39D5F6]/50 flex items-center space-x-1"
                >
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>Launch 6-Month Internship Demo</span>
                </button>
              </div>
            </div>

            {/* Right Column: Neural Brain Interactive Visualization */}
            <div className="lg:col-span-5">
              <NeuralVisualizer />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Hackathon Interactive Case Study */}
      <section className="py-16 bg-white dark:bg-[#101426] border-b border-gray-200 dark:border-white/10 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-[#101426] to-[#1A1F3B] rounded-2xl p-6 sm:p-8 text-white shadow-xl border border-[#6C4CF1]/30">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-white/10">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#6C4CF1] to-[#39D5F6] text-white flex items-center justify-center shrink-0 shadow-md">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#39D5F6] bg-[#39D5F6]/10 border border-[#39D5F6]/20 px-2.5 py-0.5 rounded-full">
                      Live Benchmark Case
                    </span>
                    <span className="text-xs text-gray-400">Section 6 Scenario</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">
                    A Student Considering a Six-Month Internship
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-300 mt-1 max-w-2xl">
                    The student believes the internship will build their resume and boost their career—until ThinkWise AI unpacks overlooked risks.
                  </p>
                </div>
              </div>

              <button
                onClick={() => onLoadScenario(INTERNSHIP_SCENARIO.id)}
                className="self-start lg:self-center flex items-center space-x-2 bg-gradient-to-r from-[#6C4CF1] to-[#39D5F6] text-white px-5 py-2.5 rounded-xl text-xs font-bold hover:scale-[1.02] transition-all shadow-md shrink-0"
              >
                <Sparkles className="w-4 h-4" />
                <span>Launch This Scenario</span>
              </button>
            </div>

            {/* Overlooked Factors Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6">
              <div className="p-4 rounded-xl bg-white/5 border border-purple-500/20 backdrop-blur-xs">
                <div className="flex items-center space-x-2 text-xs font-bold text-[#9275FF] mb-2">
                  <span className="w-2 h-2 rounded-full bg-[#9275FF]" />
                  <span>Hidden Assumption Detected</span>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed">
                  Assuming college coursework, mandatory attendance, and exam periods can &ldquo;easily be caught up on&rdquo; alongside a 40 hr/week in-office schedule.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-red-500/20 backdrop-blur-xs">
                <div className="flex items-center space-x-2 text-xs font-bold text-red-400 mb-2">
                  <span className="w-2 h-2 rounded-full bg-red-400" />
                  <span>Crucial Blind Spot</span>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed">
                  Will there be a dedicated mentor? In high-pressure seed startups, junior engineers are often left without guidance or pair-programming support.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-cyan-500/20 backdrop-blur-xs">
                <div className="flex items-center space-x-2 text-xs font-bold text-[#39D5F6] mb-2">
                  <span className="w-2 h-2 rounded-full bg-[#39D5F6]" />
                  <span>Key Probing Question</span>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed">
                  &ldquo;If the university strictly enforces attendance rules, are you prepared to take a formal gap semester rather than letting your GPA fall?&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-[#F6F8FC] dark:bg-[#101426] border-b border-gray-200 dark:border-white/10 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#6C4CF1] dark:text-[#39D5F6] mb-2">
              Systematic Thinking Process
            </h2>
            <h3 className="text-3xl font-extrabold text-[#20243A] dark:text-white tracking-tight">
              How ThinkWise AI Works
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#AAB4C8] mt-2">
              A 5-step cognitive unbiasing cycle engineered to stress-test rationale without taking away your autonomy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="bg-white dark:bg-[#1A2238] p-5 rounded-2xl border border-gray-200 dark:border-white/10 shadow-xs hover:border-[#6C4CF1]/40 transition-all">
              <span className="text-xs font-extrabold text-[#6C4CF1] dark:text-[#39D5F6] font-mono">01</span>
              <h4 className="text-sm font-bold text-[#20243A] dark:text-white mt-2 mb-1.5">Enter Your Decision</h4>
              <p className="text-xs text-gray-600 dark:text-[#AAB4C8] leading-relaxed">
                Describe your dilemma, reasons, expected outcome, and background context.
              </p>
            </div>

            <div className="bg-white dark:bg-[#1A2238] p-5 rounded-2xl border border-gray-200 dark:border-white/10 shadow-xs hover:border-[#6C4CF1]/40 transition-all">
              <span className="text-xs font-extrabold text-[#6C4CF1] dark:text-[#39D5F6] font-mono">02</span>
              <h4 className="text-sm font-bold text-[#20243A] dark:text-white mt-2 mb-1.5">AI Analyzes Data</h4>
              <p className="text-xs text-gray-600 dark:text-[#AAB4C8] leading-relaxed">
                Gemini decomposes the situation into 10 structured reasoning vectors.
              </p>
            </div>

            <div className="bg-white dark:bg-[#1A2238] p-5 rounded-2xl border border-gray-200 dark:border-white/10 shadow-xs hover:border-[#6C4CF1]/40 transition-all">
              <span className="text-xs font-extrabold text-[#6C4CF1] dark:text-[#39D5F6] font-mono">03</span>
              <h4 className="text-sm font-bold text-[#20243A] dark:text-white mt-2 mb-1.5">Detect Blind Spots</h4>
              <p className="text-xs text-gray-600 dark:text-[#AAB4C8] leading-relaxed">
                Surfaces unexamined premises, conflicts, and omitted variables.
              </p>
            </div>

            <div className="bg-white dark:bg-[#1A2238] p-5 rounded-2xl border border-gray-200 dark:border-white/10 shadow-xs hover:border-[#6C4CF1]/40 transition-all">
              <span className="text-xs font-extrabold text-[#6C4CF1] dark:text-[#39D5F6] font-mono">04</span>
              <h4 className="text-sm font-bold text-[#20243A] dark:text-white mt-2 mb-1.5">Evaluate Trade-Offs</h4>
              <p className="text-xs text-gray-600 dark:text-[#AAB4C8] leading-relaxed">
                Balances downside exposures against uncaptured opportunities.
              </p>
            </div>

            <div className="bg-white dark:bg-[#1A2238] p-5 rounded-2xl border border-[#6C4CF1]/30 dark:border-[#39D5F6]/30 shadow-xs hover:border-[#39D5F6] transition-all bg-gradient-to-br from-white dark:from-[#1A2238] to-[#6C4CF1]/5">
              <span className="text-xs font-extrabold text-[#39D5F6] font-mono">05</span>
              <h4 className="text-sm font-bold text-[#20243A] dark:text-white mt-2 mb-1.5">Actionable Insights</h4>
              <p className="text-xs text-gray-600 dark:text-[#AAB4C8] leading-relaxed">
                Get discovery questions, experiment steps, and decide with conviction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 10 Core Dimensions Grid */}
      <section className="py-20 bg-white dark:bg-[#1A2238]/40 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#6C4CF1] dark:text-[#39D5F6] mb-2">
              Deep Cognitive Architecture
            </h2>
            <h3 className="text-3xl font-extrabold text-[#20243A] dark:text-white tracking-tight">
              10 Dimensions of Decision Intelligence
            </h3>
            <p className="text-sm text-gray-600 dark:text-[#AAB4C8] mt-2">
              Every analysis interrogates your decision across multi-stakeholder and empirical lenses.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl border border-gray-200 dark:border-white/10 bg-[#F6F8FC] dark:bg-[#1A2238] hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-[#6C4CF1]/10 text-[#6C4CF1] dark:text-[#39D5F6] flex items-center justify-center mb-4">
                <Eye className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-[#20243A] dark:text-white mb-2">1. Blind Spot Detection</h4>
              <p className="text-xs text-gray-600 dark:text-[#AAB4C8] leading-relaxed">
                Reveals institutional, operational, and interpersonal factors omitted from your initial framing.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-[#9275FF]/30 bg-[#F0EDFF]/50 dark:bg-[#6C4CF1]/15 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-[#6C4CF1] text-white flex items-center justify-center mb-4">
                <span className="font-bold text-sm">💡</span>
              </div>
              <h4 className="text-base font-bold text-[#6C4CF1] dark:text-[#9275FF] mb-2">2. Hidden Assumptions Audit</h4>
              <p className="text-xs text-[#20243A] dark:text-gray-200 leading-relaxed">
                Highlights premises taken for granted without proof, with concrete experiments to test each one.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-amber-200 dark:border-amber-500/20 bg-amber-50/40 dark:bg-amber-950/20 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center mb-4">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-amber-900 dark:text-amber-300 mb-2">3. Contradiction Detection</h4>
              <p className="text-xs text-gray-700 dark:text-[#AAB4C8] leading-relaxed">
                Detects internal tensions where one stated priority secretly undermines another.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-sky-200 dark:border-sky-500/20 bg-sky-50/40 dark:bg-sky-950/20 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-800 flex items-center justify-center mb-4">
                <Search className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-sky-900 dark:text-sky-300 mb-2">4. Missing Data Gaps</h4>
              <p className="text-xs text-gray-700 dark:text-[#AAB4C8] leading-relaxed">
                Catalogs explicit pieces of uncollected data and clarifies who or where to inquire.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-rose-200 dark:border-rose-500/20 bg-rose-50/40 dark:bg-rose-950/20 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-800 flex items-center justify-center mb-4">
                <Scale className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-rose-900 dark:text-rose-300 mb-2">5. Risk & Pre-Mortem</h4>
              <p className="text-xs text-gray-700 dark:text-[#AAB4C8] leading-relaxed">
                Evaluates downside vulnerability and formulates practical mitigations before signing.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-emerald-200 dark:border-emerald-500/20 bg-emerald-50/40 dark:bg-emerald-950/20 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-4">
                <Compass className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-emerald-900 dark:text-emerald-300 mb-2">6. Stakeholder Perspectives</h4>
              <p className="text-xs text-gray-700 dark:text-[#AAB4C8] leading-relaxed">
                Simulates how mentors, employers, family, and your future self would critique your choice.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#101426] text-gray-400 py-12 border-t border-white/10 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-3">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#6C4CF1] to-[#39D5F6] flex items-center justify-center text-white font-bold text-xs">
              👁️
            </div>
            <span className="font-bold text-white text-sm">ThinkWise AI</span>
            <span>&mdash; AI-Powered Decision Intelligence Platform</span>
          </div>

          <div className="flex items-center space-x-6">
            <span>Powered by Google Gemini 3.8</span>
            <span>Non-Directive Thinking Partner</span>
            <span className="text-[#39D5F6]">Light / Dark Mode Enabled</span>
          </div>

          <div>
            &copy; {new Date().getFullYear()} ThinkWise AI. All final decisions remain the user&apos;s independent choice.
          </div>
        </div>
      </footer>
    </div>
  );
};
