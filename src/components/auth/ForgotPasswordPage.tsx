import React, { useState } from 'react';
import { Mail, ArrowLeft, ArrowRight, CheckCircle2, AlertCircle, KeyRound, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface ForgotPasswordPageProps {
  onNavigate: (view: any) => void;
}

export const ForgotPasswordPage: React.FC<ForgotPasswordPageProps> = ({ onNavigate }) => {
  const { forgotPassword, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    if (!email.trim() || !email.includes('@')) {
      setError('Please provide a valid registered email address.');
      return;
    }

    const res = await forgotPassword(email);
    if (res.success) {
      setSuccessMessage(res.message || 'Recovery email sent successfully.');
    } else {
      setError(res.error || 'Unable to dispatch reset email. Please try again.');
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden bg-[#F6F8FC] dark:bg-[#101426] transition-colors duration-300">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#6C4CF1]/20 dark:bg-[#6C4CF1]/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-[#39D5F6]/15 dark:bg-[#39D5F6]/20 rounded-full blur-3xl pointer-events-none" />

      {/* Glassmorphic Card */}
      <div className="w-full max-w-md relative z-10 glass-panel dark:glass-panel-dark rounded-3xl p-6 sm:p-8 shadow-2xl border border-gray-200 dark:border-white/10 text-[#20243A] dark:text-white transition-all">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#6C4CF1] to-[#39D5F6] p-[2px] shadow-lg shadow-[#6C4CF1]/30 mx-auto mb-3">
            <div className="w-full h-full bg-[#101426] rounded-[14px] flex items-center justify-center">
              <KeyRound className="w-5 h-5 text-[#39D5F6]" />
            </div>
          </div>

          <h1 className="text-2xl font-extrabold tracking-tight">
            Reset Your Password
          </h1>
          <p className="text-xs text-gray-500 dark:text-[#AAB4C8] mt-1 max-w-xs mx-auto">
            Enter your registered email address and we&apos;ll send you recovery instructions.
          </p>
        </div>

        {/* Error notification */}
        {error && (
          <div className="mb-4 p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-xs flex items-start space-x-2 animate-in fade-in">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Success notification */}
        {successMessage && (
          <div className="mb-4 p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs flex items-start space-x-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-1.5">
              Registered Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="alex@company.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#1A2238] text-sm text-[#20243A] dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6C4CF1]/40 focus:border-[#6C4CF1] transition-all"
                disabled={isLoading}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-[#6C4CF1] via-[#9275FF] to-[#39D5F6] text-white py-3 rounded-xl font-bold text-sm shadow-lg shadow-[#6C4CF1]/30 hover:scale-[1.01] active:scale-[0.99] transition-all"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Sending Instructions...</span>
              </>
            ) : (
              <>
                <span>Send Password Reset Link</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Back to Login */}
        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-white/10 text-center">
          <button
            onClick={() => onNavigate('login')}
            className="inline-flex items-center space-x-1.5 text-xs font-semibold text-gray-600 dark:text-[#AAB4C8] hover:text-[#6C4CF1] dark:hover:text-[#39D5F6] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Sign In</span>
          </button>
        </div>
      </div>
    </div>
  );
};
