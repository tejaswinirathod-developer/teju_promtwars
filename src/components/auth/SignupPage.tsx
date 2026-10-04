import React, { useState } from 'react';
import { Eye, EyeOff, Lock, Mail, User, ArrowRight, Sparkles, AlertCircle, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface SignupPageProps {
  onNavigate: (view: any) => void;
}

export const SignupPage: React.FC<SignupPageProps> = ({ onNavigate }) => {
  const { signup, loginWithGoogle, isLoading } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Simple password strength calculation
  const getPasswordStrength = () => {
    if (!password) return 0;
    let score = 0;
    if (password.length >= 6) score += 25;
    if (password.length >= 10) score += 25;
    if (/[A-Z]/.test(password)) score += 25;
    if (/[0-9!@#$%^&*]/.test(password)) score += 25;
    return score;
  };

  const strength = getPasswordStrength();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError('Please provide your full name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setError('Please provide a valid email address.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match. Please re-enter your password.');
      return;
    }
    if (!agreeTerms) {
      setError('You must agree to the Terms of Service & Privacy Policy.');
      return;
    }

    const result = await signup(name, email, password);
    if (result.success) {
      onNavigate('dashboard');
    } else {
      setError(result.error || 'Registration failed.');
    }
  };

  const handleGoogleSignup = async () => {
    setError(null);
    const result = await loginWithGoogle();
    if (result.success) {
      onNavigate('dashboard');
    } else {
      setError(result.error || 'Google signup failed.');
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden bg-[#F6F8FC] dark:bg-[#101426] transition-colors duration-300">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-[#6C4CF1]/20 dark:bg-[#6C4CF1]/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-[#39D5F6]/15 dark:bg-[#39D5F6]/20 rounded-full blur-3xl pointer-events-none" />

      {/* Glassmorphic Signup Card */}
      <div className="w-full max-w-md relative z-10 glass-panel dark:glass-panel-dark rounded-3xl p-6 sm:p-8 shadow-2xl border border-gray-200 dark:border-white/10 text-[#20243A] dark:text-white transition-all">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#6C4CF1] to-[#39D5F6] p-[2px] shadow-lg shadow-[#6C4CF1]/30 mx-auto mb-3">
            <div className="w-full h-full bg-[#101426] rounded-[14px] flex items-center justify-center">
              <span className="text-xl">👁️</span>
            </div>
          </div>

          <h1 className="text-2xl font-extrabold tracking-tight">
            Create Your Account
          </h1>
          <p className="text-xs text-gray-500 dark:text-[#AAB4C8] mt-1">
            Join decision makers pressure-testing assumptions with AI.
          </p>
        </div>

        {/* Error notification */}
        {error && (
          <div className="mb-4 p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-xs flex items-start space-x-2 animate-in fade-in">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-1">
              Full Name
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Dr. Alex Vance"
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#1A2238] text-sm text-[#20243A] dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6C4CF1]/40 focus:border-[#6C4CF1] transition-all"
                disabled={isLoading}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="alex@company.com"
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#1A2238] text-sm text-[#20243A] dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6C4CF1]/40 focus:border-[#6C4CF1] transition-all"
                disabled={isLoading}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 6 characters"
                className="w-full pl-10 pr-10 py-2 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#1A2238] text-sm text-[#20243A] dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6C4CF1]/40 focus:border-[#6C4CF1] transition-all"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-white absolute right-2.5 top-1/2 -translate-y-1/2"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {/* Password strength bar */}
            {password && (
              <div className="mt-1.5 flex items-center space-x-2">
                <div className="flex-1 h-1.5 bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      strength <= 25
                        ? 'bg-rose-500 w-1/4'
                        : strength <= 50
                        ? 'bg-amber-500 w-2/4'
                        : strength <= 75
                        ? 'bg-sky-500 w-3/4'
                        : 'bg-emerald-500 w-full'
                    }`}
                  />
                </div>
                <span className="text-[10px] text-gray-500 dark:text-gray-400 font-medium">
                  {strength <= 25 ? 'Weak' : strength <= 50 ? 'Fair' : strength <= 75 ? 'Good' : 'Strong'}
                </span>
              </div>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-1">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter your password"
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#1A2238] text-sm text-[#20243A] dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6C4CF1]/40 focus:border-[#6C4CF1] transition-all"
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="pt-1">
            <label className="flex items-start space-x-2 text-xs text-gray-600 dark:text-[#AAB4C8] cursor-pointer">
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="mt-0.5 rounded border-gray-300 dark:border-gray-600 text-[#6C4CF1] focus:ring-[#6C4CF1]/30"
              />
              <span>
                I agree to the <span className="text-[#6C4CF1] dark:text-[#39D5F6]">Terms of Service</span> and{' '}
                <span className="text-[#6C4CF1] dark:text-[#39D5F6]">Privacy Policy</span>.
              </span>
            </label>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 flex items-center justify-center space-x-2 bg-gradient-to-r from-[#6C4CF1] via-[#9275FF] to-[#39D5F6] text-white py-3 rounded-xl font-bold text-sm shadow-lg shadow-[#6C4CF1]/30 hover:scale-[1.01] active:scale-[0.99] transition-all"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Creating Account...</span>
              </>
            ) : (
              <>
                <span>Create ThinkWise Account</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="my-5 flex items-center">
          <div className="flex-1 border-t border-gray-200 dark:border-white/10" />
          <span className="px-3 text-xs text-gray-400 uppercase tracking-wider font-medium">Or</span>
          <div className="flex-1 border-t border-gray-200 dark:border-white/10" />
        </div>

        {/* Google OAuth Option */}
        <button
          type="button"
          onClick={handleGoogleSignup}
          disabled={isLoading}
          className="w-full flex items-center justify-center space-x-2 py-2 px-4 rounded-xl border border-gray-200 dark:border-white/15 bg-white dark:bg-[#1A2238] hover:bg-gray-50 dark:hover:bg-white/10 text-xs sm:text-sm font-semibold text-[#20243A] dark:text-white transition-all shadow-xs"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span>Sign up with Google</span>
        </button>

        {/* Footer Redirect */}
        <p className="text-center text-xs text-gray-500 dark:text-[#AAB4C8] mt-5">
          Already have an account?{' '}
          <button
            onClick={() => onNavigate('login')}
            className="font-bold text-[#6C4CF1] dark:text-[#39D5F6] hover:underline"
          >
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
};
