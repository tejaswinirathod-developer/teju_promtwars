import React from 'react';
import { 
  Eye, 
  Layers, 
  BrainCircuit, 
  GraduationCap, 
  ArrowRight, 
  HelpCircle, 
  CheckCircle2, 
  ShieldCheck, 
  Scale, 
  Compass, 
  Sparkles,
  Search,
  Cpu
} from 'lucide-react';
import { INTERNSHIP_SCENARIO } from '../data/sampleScenarios';

interface AboutViewProps {
  onStartAnalysis: () => void;
  onLoadBenchmarkDemo: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({
  onStartAnalysis,
  onLoadBenchmarkDemo,
}) => {
  return (
    <div className="bg-[#F6F7FC] min-h-[calc(100vh-4rem)] py-8 text-[#20243A]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header Hero Banner */}
        <div className="bg-gradient-to-r from-[#101426] via-[#1A1F3B] to-[#101426] rounded-2xl p-6 sm:p-10 text-white border border-[#6C4CF1]/20 shadow-xl text-center space-y-3">
          <div className="inline-flex items-center space-x-2 text-xs font-semibold text-[#39D5F6] bg-[#39D5F6]/10 px-3 py-1 rounded-full border border-[#39D5F6]/20">
            <Eye className="w-3.5 h-3.5 text-[#39D5F6]" />
            <span>The ThinkWise AI Philosophy</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Think Beyond What You See.
          </h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto leading-relaxed">
            ThinkWise AI is an AI-powered cognitive unbiasing and decision intelligence platform. It does not replace human judgment&mdash;it fortifies it by revealing what optimism, tunnel vision, or limited information conceal.
          </p>
        </div>

        {/* 5-Step Process Section */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-xs space-y-6">
          <div className="flex items-center space-x-2 pb-4 border-b border-gray-100">
            <Layers className="w-5 h-5 text-[#6C4CF1]" />
            <h2 className="text-xl font-bold text-[#20243A]">
              How It Works &mdash; The 5-Step Intelligence Architecture
            </h2>
          </div>

          <div className="space-y-4">
            {/* Step 1 */}
            <div className="p-5 rounded-xl border border-gray-200 bg-[#F6F7FC] flex items-start space-x-4">
              <div className="w-10 h-10 rounded-xl bg-[#6C4CF1] text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-xs">
                01
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-[#20243A]">Step 1: Enter Your Decision</h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Provide your decision title, context, expected outcomes, motivating reasons, and any doubts or alternatives you are weighing.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-5 rounded-xl border border-gray-200 bg-[#F6F7FC] flex items-start space-x-4">
              <div className="w-10 h-10 rounded-xl bg-[#6C4CF1] text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-xs">
                02
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-[#20243A]">Step 2: AI Analyzes Your Information</h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Gemini decomposes your rationale into structured analytical vectors, auditing premises against empirical logic and cognitive bias models.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-5 rounded-xl border border-purple-200 bg-[#F0EDFF]/60 flex items-start space-x-4">
              <div className="w-10 h-10 rounded-xl bg-[#9275FF] text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-xs">
                03
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-[#6C4CF1]">Step 3: Detect Hidden Blind Spots</h4>
                <p className="text-xs text-gray-700 leading-relaxed">
                  Uncovers omitted operational details, unverified assumptions, conflicting priorities, and simulated stakeholder counter-arguments.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="p-5 rounded-xl border border-gray-200 bg-[#F6F7FC] flex items-start space-x-4">
              <div className="w-10 h-10 rounded-xl bg-[#6C4CF1] text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-xs">
                04
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-[#20243A]">Step 4: Evaluate Risks and Opportunities</h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Performs a pre-mortem risk assessment with actionable safeguards while identifying unexplored positive angles and hybrid options.
                </p>
              </div>
            </div>

            {/* Step 5 */}
            <div className="p-5 rounded-xl border border-[#39D5F6]/40 bg-gradient-to-r from-white to-[#39D5F6]/10 flex items-start space-x-4">
              <div className="w-10 h-10 rounded-xl bg-[#39D5F6] text-[#101426] flex items-center justify-center font-bold text-sm shrink-0 shadow-xs">
                05
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-[#20243A]">Step 5: Get Actionable Insights</h4>
                <p className="text-xs text-gray-700 leading-relaxed">
                  Receive concrete validation experiments, data collection checklists, and Socratic follow-up assistance to decide with independence and conviction.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Cognitive Biases Catalog */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-xs space-y-6">
          <div className="flex items-center space-x-2 pb-4 border-b border-gray-100">
            <BrainCircuit className="w-5 h-5 text-[#6C4CF1]" />
            <h2 className="text-xl font-bold text-[#20243A]">
              Why Do Blind Spots Occur? (Biases We Counter)
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-gray-200 bg-[#F6F7FC] space-y-1">
              <span className="text-xs font-bold text-[#6C4CF1]">1. Optimism Bias</span>
              <p className="text-xs text-gray-600 leading-relaxed">
                Believing that best-case timelines will prevail while ignoring institutional friction and unexpected delays.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-gray-200 bg-[#F6F7FC] space-y-1">
              <span className="text-xs font-bold text-[#6C4CF1]">2. Confirmation Bias</span>
              <p className="text-xs text-gray-600 leading-relaxed">
                Overvaluing information supporting the desired choice while downplaying negative evidence or warning signs.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-gray-200 bg-[#F6F7FC] space-y-1">
              <span className="text-xs font-bold text-[#6C4CF1]">3. Sunk Cost Fallacy</span>
              <p className="text-xs text-gray-600 leading-relaxed">
                Persisting with unviable commitments simply because previous effort or money has already been spent.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-gray-200 bg-[#F6F7FC] space-y-1">
              <span className="text-xs font-bold text-[#6C4CF1]">4. Availability Heuristic</span>
              <p className="text-xs text-gray-600 leading-relaxed">
                Overestimating the likelihood of vivid success stories without looking at baseline survival rates.
              </p>
            </div>
          </div>
        </div>

        {/* Hackathon Benchmark Showcase */}
        <div className="bg-gradient-to-br from-[#101426] via-[#1A1F3B] to-[#101426] rounded-2xl p-6 sm:p-8 text-white border border-[#6C4CF1]/30 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#39D5F6] bg-[#39D5F6]/10 px-2.5 py-0.5 rounded-full border border-[#39D5F6]/20">
              Hackathon Demonstration
            </span>
            <h3 className="text-lg font-bold text-white">
              Experience the 6-Month Internship Scenario
            </h3>
            <p className="text-xs text-gray-300 max-w-xl">
              See how ThinkWise AI flags academic attendance compliance, mentor bandwidth in seed startups, and student commute burnout in real time.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <button
              onClick={onLoadBenchmarkDemo}
              className="bg-gradient-to-r from-[#6C4CF1] to-[#39D5F6] text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-md transition-all hover:scale-102"
            >
              Load Demo Scenario
            </button>
            <button
              onClick={onStartAnalysis}
              className="bg-white/10 border border-white/20 hover:bg-white/15 text-white px-4 py-2.5 rounded-xl text-xs font-semibold transition-all"
            >
              Start Custom Analysis
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
