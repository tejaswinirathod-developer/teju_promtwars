import React from 'react';
import { 
  Eye, 
  PlusCircle, 
  LayoutDashboard, 
  History, 
  Sparkles, 
  HelpCircle, 
  Sun, 
  Moon, 
  LogIn, 
  User,
  LogOut
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { UserProfileMenu } from './UserProfileMenu';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: any) => void;
  hasActiveResult: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate, hasActiveResult }) => {
  const { isAuthenticated, logout } = useAuth();
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <header className="sticky top-0 z-50 bg-white/90 dark:bg-[#101426]/95 backdrop-blur-md border-b border-gray-200 dark:border-[#6C4CF1]/20 shadow-sm dark:shadow-lg dark:shadow-[#101426]/30 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo with Intelligent Eye */}
          <div 
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => onNavigate(isAuthenticated ? 'dashboard' : 'login')}
          >
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-[#6C4CF1] via-[#9275FF] to-[#39D5F6] p-[1.5px] shadow-lg shadow-[#6C4CF1]/25 group-hover:shadow-[#39D5F6]/40 transition-all duration-300">
              <div className="w-full h-full bg-[#101426] rounded-[10px] flex items-center justify-center">
                <Eye className="w-5 h-5 text-[#39D5F6] group-hover:text-white transition-colors duration-300 stroke-[2.2]" />
              </div>
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-[#39D5F6] rounded-full animate-ping opacity-75" />
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-[#39D5F6] rounded-full" />
            </div>
            
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="text-lg font-bold tracking-tight text-[#20243A] dark:text-white font-sans">
                  ThinkWise
                </span>
                <span className="text-lg font-extrabold bg-gradient-to-r from-[#6C4CF1] to-[#39D5F6] dark:from-[#9275FF] dark:to-[#39D5F6] bg-clip-text text-transparent">
                  AI
                </span>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#6C4CF1]/10 dark:bg-[#6C4CF1]/20 text-[#6C4CF1] dark:text-[#39D5F6] border border-[#6C4CF1]/20 dark:border-[#39D5F6]/30 ml-1.5">
                  Decision Intelligence
                </span>
              </div>
              <p className="text-[11px] text-gray-500 dark:text-[#9275FF]/80 hidden md:block leading-none tracking-wide">
                Think Beyond What You See
              </p>
            </div>
          </div>

          {/* Navigation Links - ONLY visible when authenticated */}
          {isAuthenticated ? (
            <nav className="hidden md:flex items-center space-x-1">
              <button
                onClick={() => onNavigate('home')}
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 relative ${
                  currentView === 'home'
                    ? 'text-[#6C4CF1] dark:text-white bg-[#6C4CF1]/10 dark:bg-[#6C4CF1]/25 font-semibold'
                    : 'text-gray-600 dark:text-gray-300 hover:text-[#20243A] dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5'
                }`}
              >
                Home
                {currentView === 'home' && (
                  <span className="absolute bottom-0 left-3.5 right-3.5 h-0.5 bg-gradient-to-r from-[#6C4CF1] to-[#39D5F6] rounded-full" />
                )}
              </button>

              <button
                onClick={() => onNavigate('dashboard')}
                className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 relative ${
                  currentView === 'dashboard'
                    ? 'text-[#6C4CF1] dark:text-white bg-[#6C4CF1]/10 dark:bg-[#6C4CF1]/25 font-semibold'
                    : 'text-gray-600 dark:text-gray-300 hover:text-[#20243A] dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5'
                }`}
              >
                <LayoutDashboard className="w-4 h-4 text-[#6C4CF1] dark:text-[#9275FF]" />
                <span>Dashboard</span>
                {currentView === 'dashboard' && (
                  <span className="absolute bottom-0 left-3.5 right-3.5 h-0.5 bg-gradient-to-r from-[#6C4CF1] to-[#39D5F6] rounded-full" />
                )}
              </button>

              {hasActiveResult && (
                <button
                  onClick={() => onNavigate('result')}
                  className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 relative ${
                    currentView === 'result'
                      ? 'text-[#6C4CF1] dark:text-white bg-[#6C4CF1]/10 dark:bg-[#6C4CF1]/25 font-semibold'
                      : 'text-gray-600 dark:text-gray-300 hover:text-[#20243A] dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5'
                  }`}
                >
                  <Sparkles className="w-4 h-4 text-[#39D5F6] animate-pulse" />
                  <span>Active Analysis</span>
                  {currentView === 'result' && (
                    <span className="absolute bottom-0 left-3.5 right-3.5 h-0.5 bg-gradient-to-r from-[#6C4CF1] to-[#39D5F6] rounded-full" />
                  )}
                </button>
              )}

              <button
                onClick={() => onNavigate('history')}
                className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 relative ${
                  currentView === 'history'
                    ? 'text-[#6C4CF1] dark:text-white bg-[#6C4CF1]/10 dark:bg-[#6C4CF1]/25 font-semibold'
                    : 'text-gray-600 dark:text-gray-300 hover:text-[#20243A] dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5'
                }`}
              >
                <History className="w-4 h-4 text-[#6C4CF1] dark:text-[#9275FF]" />
                <span>History & Compare</span>
                {currentView === 'history' && (
                  <span className="absolute bottom-0 left-3.5 right-3.5 h-0.5 bg-gradient-to-r from-[#6C4CF1] to-[#39D5F6] rounded-full" />
                )}
              </button>

              <button
                onClick={() => onNavigate('about')}
                className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 relative ${
                  currentView === 'about'
                    ? 'text-[#6C4CF1] dark:text-white bg-[#6C4CF1]/10 dark:bg-[#6C4CF1]/25 font-semibold'
                    : 'text-gray-600 dark:text-gray-300 hover:text-[#20243A] dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5'
                }`}
              >
                <HelpCircle className="w-4 h-4 text-[#6C4CF1] dark:text-[#9275FF]" />
                <span>How It Works</span>
                {currentView === 'about' && (
                  <span className="absolute bottom-0 left-3.5 right-3.5 h-0.5 bg-gradient-to-r from-[#6C4CF1] to-[#39D5F6] rounded-full" />
                )}
              </button>
            </nav>
          ) : (
            <div className="hidden md:flex items-center space-x-2">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#6C4CF1]/10 text-[#6C4CF1] dark:text-[#39D5F6] border border-[#6C4CF1]/20">
                🔒 Protected Workspace
              </span>
            </div>
          )}

          {/* Right Actions: Theme Toggle + New Analysis CTA + Profile */}
          <div className="flex items-center space-x-2.5">
            {/* Theme Toggle Button (Sun for Light, Moon for Dark) */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl text-gray-500 dark:text-gray-300 hover:text-[#6C4CF1] dark:hover:text-[#39D5F6] hover:bg-gray-100 dark:hover:bg-white/10 transition-colors border border-transparent dark:border-white/5"
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDark ? (
                <Moon className="w-4 h-4 text-[#39D5F6]" />
              ) : (
                <Sun className="w-4 h-4 text-amber-500" />
              )}
            </button>

            {/* Authenticated Actions */}
            {isAuthenticated ? (
              <>
                {/* New Analysis Action Button */}
                <button
                  onClick={() => onNavigate('input')}
                  className="group relative inline-flex items-center space-x-2 bg-gradient-to-r from-[#6C4CF1] via-[#9275FF] to-[#39D5F6] text-white px-3.5 sm:px-4 py-2 rounded-xl font-semibold text-xs sm:text-sm shadow-md shadow-[#6C4CF1]/25 hover:shadow-[#39D5F6]/40 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <PlusCircle className="w-4 h-4 text-white group-hover:rotate-90 transition-transform duration-300" />
                  <span className="hidden sm:inline">New Analysis</span>
                  <span className="sm:hidden">New</span>
                </button>

                {/* Profile Menu with integrated working Sign Out */}
                <UserProfileMenu />

                {/* Direct quick Logout button */}
                <button
                  onClick={() => {
                    logout();
                    onNavigate('login');
                  }}
                  className="hidden sm:inline-flex items-center space-x-1.5 px-2.5 py-2 rounded-xl text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/15 border border-transparent hover:border-rose-300 dark:hover:border-rose-500/20 transition-all"
                  title="Sign Out of ThinkWise AI"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                {currentView === 'signup' ? (
                  <button
                    onClick={() => onNavigate('login')}
                    className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold text-[#6C4CF1] dark:text-[#39D5F6] border border-[#6C4CF1]/30 hover:bg-[#6C4CF1]/10 transition-all"
                  >
                    <LogIn className="w-3.5 h-3.5" />
                    <span>Sign In</span>
                  </button>
                ) : (
                  <button
                    onClick={() => onNavigate('signup')}
                    className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold bg-gradient-to-r from-[#6C4CF1] to-[#39D5F6] text-white shadow-sm hover:scale-[1.02] transition-all"
                  >
                    <User className="w-3.5 h-3.5" />
                    <span>Create Account</span>
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Sub Bar - ONLY for authenticated users */}
      {isAuthenticated && (
        <div className="md:hidden flex items-center justify-around border-t border-gray-200 dark:border-[#6C4CF1]/20 py-2 px-3 bg-white dark:bg-[#101426] text-xs">
          <button
            onClick={() => onNavigate('home')}
            className={`py-1 px-2 rounded-lg font-medium transition-colors ${currentView === 'home' ? 'text-[#6C4CF1] dark:text-[#39D5F6] font-bold' : 'text-gray-500 dark:text-gray-400'}`}
          >
            Home
          </button>
          <button
            onClick={() => onNavigate('dashboard')}
            className={`py-1 px-2 rounded-lg font-medium transition-colors ${currentView === 'dashboard' ? 'text-[#6C4CF1] dark:text-[#39D5F6] font-bold' : 'text-gray-500 dark:text-gray-400'}`}
          >
            Dashboard
          </button>
          {hasActiveResult && (
            <button
              onClick={() => onNavigate('result')}
              className={`py-1 px-2 rounded-lg font-medium transition-colors ${currentView === 'result' ? 'text-[#6C4CF1] dark:text-[#39D5F6] font-bold' : 'text-gray-500 dark:text-gray-400'}`}
            >
              Analysis
            </button>
          )}
          <button
            onClick={() => onNavigate('history')}
            className={`py-1 px-2 rounded-lg font-medium transition-colors ${currentView === 'history' ? 'text-[#6C4CF1] dark:text-[#39D5F6] font-bold' : 'text-gray-500 dark:text-gray-400'}`}
          >
            History
          </button>
          <button
            onClick={() => onNavigate('about')}
            className={`py-1 px-2 rounded-lg font-medium transition-colors ${currentView === 'about' ? 'text-[#6C4CF1] dark:text-[#39D5F6] font-bold' : 'text-gray-500 dark:text-gray-400'}`}
          >
            About
          </button>
        </div>
      )}
    </header>
  );
};
