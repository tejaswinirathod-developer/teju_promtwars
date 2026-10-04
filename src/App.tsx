import React, { useState, useEffect } from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { HomeView } from './components/HomeView';
import { DashboardView } from './components/DashboardView';
import { DecisionInputView } from './components/DecisionInputView';
import { AnalysisResultView } from './components/AnalysisResultView';
import { HistoryView } from './components/HistoryView';
import { AboutView } from './components/AboutView';
import { LoginPage } from './components/auth/LoginPage';
import { SignupPage } from './components/auth/SignupPage';
import { ForgotPasswordPage } from './components/auth/ForgotPasswordPage';
import { DecisionInput, AnalysisResult, DecisionRecord } from './types';
import { 
  getDecisionHistory, 
  saveDecision, 
  deleteDecision, 
  exportHistoryAsJSON 
} from './services/historyStorage';
import { analyzeDecisionAPI } from './services/apiClient';
import { INTERNSHIP_SCENARIO, STARTUP_VS_CORP_SCENARIO } from './data/sampleScenarios';

type ViewMode = 'home' | 'dashboard' | 'input' | 'result' | 'history' | 'about' | 'login' | 'signup' | 'forgot-password';

function AppContent() {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const { isDark } = useTheme();

  // Strict Login-First: Default entry route is 'login' for unauthenticated users, or 'dashboard' if session exists
  const [currentView, setCurrentView] = useState<ViewMode>(() => {
    try {
      const savedSession = localStorage.getItem('thinkwise_auth_session_v1') || sessionStorage.getItem('thinkwise_auth_session_v1');
      if (savedSession) {
        return 'dashboard';
      }
    } catch {}
    return 'login';
  });

  const [records, setRecords] = useState<DecisionRecord[]>([]);
  const [activeDecision, setActiveDecision] = useState<DecisionInput | null>(null);
  const [activeAnalysis, setActiveAnalysis] = useState<AnalysisResult | null>(null);
  const [prefillInput, setPrefillInput] = useState<DecisionInput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  // Load decision history on mount (only for authenticated workspace)
  useEffect(() => {
    if (isAuthenticated) {
      const loaded = getDecisionHistory();
      setRecords(loaded);
      if (loaded.length > 0 && !activeAnalysis) {
        setActiveDecision(loaded[0].input);
        setActiveAnalysis(loaded[0].analysis);
      }
    }
  }, [isAuthenticated]);

  // Synchronize route state with authentication status
  useEffect(() => {
    if (!authLoading) {
      if (!isAuthenticated) {
        // If unauthenticated, force login unless user is intentionally on signup or forgot-password
        if (currentView !== 'login' && currentView !== 'signup' && currentView !== 'forgot-password') {
          setCurrentView('login');
        }
      } else {
        // If authenticated and currently on an auth page, redirect directly to dashboard
        if (currentView === 'login' || currentView === 'signup' || currentView === 'forgot-password') {
          setCurrentView('dashboard');
        }
      }
    }
  }, [isAuthenticated, authLoading, currentView]);

  // Prevent browser back button from accessing protected views after logout
  useEffect(() => {
    const handlePopState = () => {
      if (!isAuthenticated) {
        setCurrentView('login');
        window.history.pushState(null, '', window.location.pathname);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [isAuthenticated]);

  const refreshRecords = () => {
    const updated = getDecisionHistory();
    setRecords(updated);
  };

  // Strict Navigation Guard: protect all routes
  const handleNavigate = (targetView: ViewMode) => {
    const publicAuthViews: ViewMode[] = ['login', 'signup', 'forgot-password'];

    // Unauthenticated users are strictly barred from internal views
    if (!isAuthenticated && !publicAuthViews.includes(targetView)) {
      setCurrentView('login');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Authenticated users trying to access login/signup go straight to dashboard
    if (isAuthenticated && (targetView === 'login' || targetView === 'signup')) {
      setCurrentView('dashboard');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setCurrentView(targetView);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartAnalysis = () => {
    if (!isAuthenticated) {
      handleNavigate('login');
      return;
    }
    setPrefillInput(null);
    handleNavigate('input');
  };

  const handleSubmitDecision = async (input: DecisionInput) => {
    if (!isAuthenticated) {
      handleNavigate('login');
      return;
    }

    setIsLoading(true);
    setApiError(null);
    try {
      const result = await analyzeDecisionAPI(input);
      setActiveDecision(input);
      setActiveAnalysis(result);

      // Save to local storage history
      saveDecision(input, result);
      refreshRecords();

      setCurrentView('result');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      console.error('Submission failed', err);
      setApiError(err.message || 'Analysis request failed.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadScenario = (scenarioId: string) => {
    if (!isAuthenticated) {
      handleNavigate('login');
      return;
    }

    const preset = scenarioId === STARTUP_VS_CORP_SCENARIO.id 
      ? STARTUP_VS_CORP_SCENARIO 
      : INTERNSHIP_SCENARIO;

    setActiveDecision(preset.input);
    setActiveAnalysis(preset.precomputedAnalysis);
    setPrefillInput(preset.input);

    saveDecision(preset.input, preset.precomputedAnalysis, preset.id);
    refreshRecords();

    handleNavigate('result');
  };

  const handleSelectRecord = (record: DecisionRecord) => {
    if (!isAuthenticated) {
      handleNavigate('login');
      return;
    }
    setActiveDecision(record.input);
    setActiveAnalysis(record.analysis);
    handleNavigate('result');
  };

  const handleDeleteRecord = (id: string) => {
    deleteDecision(id);
    refreshRecords();
    if (activeAnalysis?.decisionId === id) {
      setActiveDecision(null);
      setActiveAnalysis(null);
    }
  };

  const handleExportHistory = () => {
    const jsonStr = exportHistoryAsJSON();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ThinkWise-History-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCompareRecords = (id1: string, id2: string) => {
    handleNavigate('history');
  };

  // Sleek security loading gate while session is verified
  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#F6F8FC] dark:bg-[#101426] flex flex-col items-center justify-center p-6 text-center select-none transition-colors duration-300">
        <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#6C4CF1] via-[#9275FF] to-[#39D5F6] p-[2px] shadow-2xl shadow-[#6C4CF1]/30 mb-6 animate-pulse">
          <div className="w-full h-full bg-[#101426] rounded-[14px] flex items-center justify-center">
            <span className="text-2xl">👁️</span>
          </div>
        </div>
        <h2 className="text-xl font-bold tracking-tight text-[#20243A] dark:text-white">
          ThinkWise AI
        </h2>
        <p className="text-xs text-gray-500 dark:text-[#AAB4C8] mt-2 font-mono">
          Verifying secure authentication session...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F6F8FC] dark:bg-[#101426] text-[#20243A] dark:text-white flex flex-col font-sans selection:bg-[#6C4CF1] selection:text-white transition-colors duration-200">
      {/* Navigation */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        hasActiveResult={Boolean(activeAnalysis)}
      />

      {/* Global API Error Notice */}
      {apiError && (
        <div className="bg-red-500/10 border-b border-red-500/20 px-4 py-3 text-xs text-red-600 dark:text-red-400 flex items-center justify-between">
          <span>{apiError}</span>
          <button 
            onClick={() => setApiError(null)}
            className="font-bold hover:underline"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Main Views with Strict Authentication Protection */}
      <main className="flex-1">
        {!isAuthenticated ? (
          /* Strictly public authentication routes */
          <>
            {currentView === 'signup' ? (
              <SignupPage onNavigate={handleNavigate} />
            ) : currentView === 'forgot-password' ? (
              <ForgotPasswordPage onNavigate={handleNavigate} />
            ) : (
              <LoginPage onNavigate={handleNavigate} returnView="dashboard" />
            )}
          </>
        ) : (
          /* Fully authenticated intelligence workspace */
          <>
            {currentView === 'home' && (
              <HomeView
                onStartAnalysis={handleStartAnalysis}
                onLoadScenario={handleLoadScenario}
                onExploreDashboard={() => handleNavigate('dashboard')}
              />
            )}

            {(currentView === 'dashboard' || currentView === 'login' || currentView === 'signup' || currentView === 'forgot-password') && (
              <DashboardView
                records={records}
                onSelectRecord={handleSelectRecord}
                onNewAnalysis={handleStartAnalysis}
                onDeleteRecord={handleDeleteRecord}
                onCompareRecords={handleCompareRecords}
                onLoadBenchmarkDemo={() => handleLoadScenario(INTERNSHIP_SCENARIO.id)}
              />
            )}

            {currentView === 'input' && (
              <DecisionInputView
                onSubmit={handleSubmitDecision}
                isLoading={isLoading}
                prefillInput={prefillInput}
              />
            )}

            {currentView === 'result' && activeDecision && activeAnalysis && (
              <AnalysisResultView
                decision={activeDecision}
                analysis={activeAnalysis}
                onSaveToHistory={() => {
                  saveDecision(activeDecision, activeAnalysis);
                  refreshRecords();
                }}
                onBackToEdit={() => {
                  setPrefillInput(activeDecision);
                  handleNavigate('input');
                }}
                onCompareWithAnother={() => handleNavigate('history')}
              />
            )}

            {currentView === 'history' && (
              <HistoryView
                records={records}
                onSelectRecord={handleSelectRecord}
                onDeleteRecord={handleDeleteRecord}
                onExportHistory={handleExportHistory}
                onNewAnalysis={handleStartAnalysis}
              />
            )}

            {currentView === 'about' && (
              <AboutView
                onStartAnalysis={handleStartAnalysis}
                onLoadBenchmarkDemo={() => handleLoadScenario(INTERNSHIP_SCENARIO.id)}
              />
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}
