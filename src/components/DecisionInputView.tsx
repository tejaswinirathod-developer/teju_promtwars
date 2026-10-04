import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Eye, 
  RotateCcw, 
  GraduationCap, 
  Briefcase, 
  AlertCircle, 
  ArrowRight,
  BrainCircuit,
  Cpu,
  CheckCircle2
} from 'lucide-react';
import { DecisionInput } from '../types';
import { INTERNSHIP_SCENARIO, STARTUP_VS_CORP_SCENARIO } from '../data/sampleScenarios';

interface DecisionInputViewProps {
  onSubmit: (input: DecisionInput) => Promise<void>;
  isLoading: boolean;
  prefillInput?: DecisionInput | null;
}

export const DecisionInputView: React.FC<DecisionInputViewProps> = ({
  onSubmit,
  isLoading,
  prefillInput,
}) => {
  const [formData, setFormData] = useState<DecisionInput>({
    title: '',
    description: '',
    background: '',
    reasons: '',
    expectedOutcome: '',
    factorsConsidered: '',
    concerns: '',
    alternatives: '',
    tags: ['Career', 'High-Stakes'],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loadingStage, setLoadingStage] = useState<string>('Synthesizing decision parameters...');

  useEffect(() => {
    if (prefillInput) {
      setFormData(prefillInput);
    }
  }, [prefillInput]);

  // Dynamic loading stages animation
  useEffect(() => {
    if (!isLoading) return;
    const stages = [
      'Deconstructing problem framing and motivational drivers...',
      'Surfacing unverified premises and cognitive blind spots...',
      'Auditing hidden assumptions against empirical logic...',
      'Simulating counter-arguments & stakeholder perspectives...',
      'Cataloging missing information & critical questions...',
      'Synthesizing final unbiasing intelligence report...'
    ];
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % stages.length;
      setLoadingStage(stages[index]);
    }, 2200);

    return () => clearInterval(interval);
  }, [isLoading]);

  const handleChange = (field: keyof DecisionInput, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleLoadInternship = () => {
    setFormData(INTERNSHIP_SCENARIO.input);
    setErrors({});
  };

  const handleLoadStartup = () => {
    setFormData(STARTUP_VS_CORP_SCENARIO.input);
    setErrors({});
  };

  const handleClear = () => {
    setFormData({
      title: '',
      description: '',
      background: '',
      reasons: '',
      expectedOutcome: '',
      factorsConsidered: '',
      concerns: '',
      alternatives: '',
      tags: [],
    });
    setErrors({});
  };

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!formData.title.trim()) {
      errs.title = 'Decision title is required.';
    }
    if (!formData.description.trim()) {
      errs.description = 'Please provide a brief description of the decision.';
    } else if (formData.description.trim().length < 20) {
      errs.description = 'Please describe the decision with a bit more detail (at least 20 characters).';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    await onSubmit(formData);
  };

  return (
    <div className="bg-[#F6F7FC] min-h-[calc(100vh-4rem)] py-8 text-[#20243A]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Header Hero Card */}
        <div className="bg-gradient-to-r from-[#101426] via-[#1A1F3B] to-[#101426] rounded-2xl p-6 sm:p-8 text-white border border-[#6C4CF1]/20 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
            <div>
              <div className="inline-flex items-center space-x-2 text-xs font-semibold text-[#39D5F6] bg-[#39D5F6]/10 px-3 py-1 rounded-full border border-[#39D5F6]/20 mb-2">
                <BrainCircuit className="w-3.5 h-3.5 text-[#39D5F6]" />
                <span>Decision Intelligence Form</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                What Decision Are You Facing?
              </h1>
              <p className="text-xs sm:text-sm text-gray-300 mt-1 max-w-2xl">
                The more context, motives, and doubts you supply, the deeper cognitive blind spots and hidden assumptions ThinkWise AI can uncover.
              </p>
            </div>

            <button
              type="button"
              onClick={handleClear}
              className="self-start sm:self-center flex items-center space-x-1.5 text-xs text-gray-300 hover:text-white transition-colors py-2 px-3.5 rounded-xl border border-white/20 hover:bg-white/10"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Form</span>
            </button>
          </div>

          {/* Preset Buttons */}
          <div className="pt-4 flex flex-wrap items-center gap-2">
            <span className="text-xs text-gray-400 font-medium">1-Click Presets:</span>
            <button
              type="button"
              onClick={handleLoadInternship}
              className="flex items-center space-x-1.5 text-xs font-bold text-[#39D5F6] bg-[#39D5F6]/10 hover:bg-[#39D5F6]/20 border border-[#39D5F6]/30 px-3 py-1.5 rounded-lg transition-all"
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Hackathon Benchmark (6-Month Internship)</span>
            </button>
            <button
              type="button"
              onClick={handleLoadStartup}
              className="flex items-center space-x-1.5 text-xs font-medium text-[#9275FF] bg-[#9275FF]/10 hover:bg-[#9275FF]/20 border border-[#9275FF]/30 px-3 py-1.5 rounded-lg transition-all"
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>Startup vs Corporate</span>
            </button>
          </div>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Section 1: The Core Decision */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-xs space-y-5">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#6C4CF1] flex items-center space-x-2 pb-3 border-b border-gray-100">
              <span className="w-5 h-5 rounded-md bg-[#6C4CF1] text-white flex items-center justify-center text-xs font-bold font-mono">1</span>
              <span>The Core Decision</span>
            </h2>

            {/* Title */}
            <div>
              <label className="block text-xs font-bold text-[#20243A] uppercase tracking-wider mb-1.5">
                1. Decision Title <span className="text-[#6C4CF1]">*</span>
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                placeholder="e.g. Accepting a 6-month startup internship during 3rd year of university"
                className={`w-full px-4 py-2.5 rounded-xl border text-sm text-[#20243A] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6C4CF1]/20 focus:border-[#6C4CF1] transition-all ${
                  errors.title ? 'border-red-500 bg-red-50/20' : 'border-gray-200'
                }`}
                disabled={isLoading}
              />
              {errors.title && (
                <p className="mt-1 text-xs text-red-600 flex items-center space-x-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{errors.title}</span>
                </p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-bold text-[#20243A] uppercase tracking-wider mb-1.5">
                2. Decision Description <span className="text-[#6C4CF1]">*</span>
              </label>
              <textarea
                rows={3}
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                placeholder="Summarize the core choice and what makes it high stakes or uncertain."
                className={`w-full px-4 py-2.5 rounded-xl border text-sm text-[#20243A] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6C4CF1]/20 focus:border-[#6C4CF1] transition-all ${
                  errors.description ? 'border-red-500 bg-red-50/20' : 'border-gray-200'
                }`}
                disabled={isLoading}
              />
              {errors.description && (
                <p className="mt-1 text-xs text-red-600 flex items-center space-x-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{errors.description}</span>
                </p>
              )}
            </div>
          </div>

          {/* Section 2: Context & Reasoning */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-xs space-y-5">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#6C4CF1] flex items-center space-x-2 pb-3 border-b border-gray-100">
              <span className="w-5 h-5 rounded-md bg-[#6C4CF1] text-white flex items-center justify-center text-xs font-bold font-mono">2</span>
              <span>Context & Current Thinking</span>
            </h2>

            {/* Background */}
            <div>
              <label className="block text-xs font-bold text-[#20243A] uppercase tracking-wider mb-1.5">
                3. Background and Current Situation
              </label>
              <textarea
                rows={3}
                value={formData.background}
                onChange={(e) => handleChange('background', e.target.value)}
                placeholder="Where do things stand right now? (Current GPA, financial buffer, current job, timeline constraints)"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-[#20243A] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6C4CF1]/20 focus:border-[#6C4CF1] transition-all"
                disabled={isLoading}
              />
            </div>

            {/* Reasons */}
            <div>
              <label className="block text-xs font-bold text-[#20243A] uppercase tracking-wider mb-1.5">
                4. Reasons Behind the Decision (Why do you want to do this?)
              </label>
              <textarea
                rows={3}
                value={formData.reasons}
                onChange={(e) => handleChange('reasons', e.target.value)}
                placeholder="Why do you favor this path? (e.g. skill building, compensation, resume prestige, founder connections)"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-[#20243A] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6C4CF1]/20 focus:border-[#6C4CF1] transition-all"
                disabled={isLoading}
              />
            </div>

            {/* Expected Outcome */}
            <div>
              <label className="block text-xs font-bold text-[#20243A] uppercase tracking-wider mb-1.5">
                5. Expected Outcome (What do you anticipate happening?)
              </label>
              <textarea
                rows={2}
                value={formData.expectedOutcome}
                onChange={(e) => handleChange('expectedOutcome', e.target.value)}
                placeholder="What is your best-case or anticipated result 6 months to 2 years from now?"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-[#20243A] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6C4CF1]/20 focus:border-[#6C4CF1] transition-all"
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Section 3: Doubts & Alternatives */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-xs space-y-5">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#6C4CF1] flex items-center space-x-2 pb-3 border-b border-gray-100">
              <span className="w-5 h-5 rounded-md bg-[#6C4CF1] text-white flex items-center justify-center text-xs font-bold font-mono">3</span>
              <span>Doubts, Constraints & Options</span>
            </h2>

            {/* Factors Considered */}
            <div>
              <label className="block text-xs font-bold text-[#20243A] uppercase tracking-wider mb-1.5">
                6. Important Factors Already Considered
              </label>
              <textarea
                rows={2}
                value={formData.factorsConsidered}
                onChange={(e) => handleChange('factorsConsidered', e.target.value)}
                placeholder="What variables have you already calculated? (e.g. stipend covers rent, commute time, parent support)"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-[#20243A] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6C4CF1]/20 focus:border-[#6C4CF1] transition-all"
                disabled={isLoading}
              />
            </div>

            {/* Concerns */}
            <div>
              <label className="block text-xs font-bold text-rose-700 uppercase tracking-wider mb-1.5">
                7. Concerns, Doubts or Gut Feelings
              </label>
              <textarea
                rows={3}
                value={formData.concerns}
                onChange={(e) => handleChange('concerns', e.target.value)}
                placeholder="What worries you at night? Where does intuition or past experience signal caution?"
                className="w-full px-4 py-2.5 rounded-xl border border-rose-200 bg-rose-50/20 text-sm text-[#20243A] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-400/20 focus:border-rose-500 transition-all"
                disabled={isLoading}
              />
            </div>

            {/* Alternatives */}
            <div>
              <label className="block text-xs font-bold text-[#20243A] uppercase tracking-wider mb-1.5">
                8. Optional Alternative Choices
              </label>
              <textarea
                rows={2}
                value={formData.alternatives}
                onChange={(e) => handleChange('alternatives', e.target.value)}
                placeholder="What other paths could you choose instead? (e.g. Part-time hours, deferring, choosing Option B)"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-[#20243A] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6C4CF1]/20 focus:border-[#6C4CF1] transition-all"
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Submission Banner */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="text-xs text-gray-500">
              <span className="font-bold text-[#20243A] block">Ready for Cognitive Stress-Testing?</span>
              ThinkWise AI will analyze your reasoning across 10 decision intelligence vectors.
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`flex items-center justify-center space-x-2.5 px-8 py-3.5 rounded-xl font-bold text-sm text-white shadow-lg transition-all duration-300 ${
                isLoading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-[#6C4CF1] via-[#9275FF] to-[#39D5F6] shadow-[#6C4CF1]/30 hover:scale-[1.02] active:scale-[0.98]'
              }`}
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Analyzing Your Thinking...</span>
                </>
              ) : (
                <>
                  <Eye className="w-4 h-4" />
                  <span>Analyze My Thinking</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </>
              )}
            </button>
          </div>

          {/* Loading Animation Box */}
          {isLoading && (
            <div className="bg-[#101426] border border-[#6C4CF1]/40 rounded-2xl p-6 text-center text-white shadow-2xl animate-pulse">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#6C4CF1] to-[#39D5F6] flex items-center justify-center mx-auto mb-3 shadow-lg">
                <BrainCircuit className="w-6 h-6 text-white animate-spin" />
              </div>
              <h3 className="text-sm font-bold text-[#39D5F6] mb-1">
                Cognitive Intelligence Engine Active
              </h3>
              <p className="text-xs text-gray-300 font-mono">
                {loadingStage}
              </p>
              <p className="text-[11px] text-gray-400 mt-2">
                Running 10-dimensional analysis via Gemini 3.8 Flash...
              </p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
