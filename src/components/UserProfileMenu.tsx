import React, { useState, useRef, useEffect } from 'react';
import { 
  User, 
  Settings, 
  Sun, 
  Moon, 
  LogOut, 
  ChevronDown, 
  ShieldCheck, 
  Check, 
  Sparkles, 
  X,
  Mail,
  Calendar,
  KeyRound
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

export const UserProfileMenu: React.FC = () => {
  const { user, logout, updateProfileName, authProviderName } = useAuth();
  const { theme, toggleTheme, isDark } = useTheme();

  const [isOpen, setIsOpen] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [editName, setEditName] = useState(user?.name || '');
  const [isSaved, setIsSaved] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (user) {
      setEditName(user.name);
    }
  }, [user]);

  // Click outside listener
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!user) return null;

  const initials = user.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (editName.trim()) {
      updateProfileName(editName.trim());
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 2000);
    }
  };

  return (
    <div className="relative" ref={menuRef}>
      {/* Avatar Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 p-1.5 rounded-xl hover:bg-white/10 dark:hover:bg-white/10 transition-colors focus:outline-none"
        title="Account & Profile"
      >
        <div className="relative w-8 h-8 rounded-lg bg-gradient-to-tr from-[#6C4CF1] to-[#39D5F6] p-[1.5px] shadow-sm">
          <div className="w-full h-full bg-[#101426] rounded-[7px] flex items-center justify-center text-xs font-bold text-white">
            {initials}
          </div>
          <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 border-2 border-[#101426] rounded-full" />
        </div>
        <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 rounded-2xl glass-panel dark:glass-panel-dark bg-white dark:bg-[#1A2238] shadow-2xl border border-gray-200 dark:border-white/10 py-2 z-50 text-[#20243A] dark:text-white animate-in fade-in slide-in-from-top-2 duration-150">
          {/* User info strip */}
          <div className="px-4 py-3 border-b border-gray-100 dark:border-white/10">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold truncate block">{user.name}</span>
              <span className="text-[9px] font-semibold uppercase px-1.5 py-0.2 rounded bg-[#6C4CF1]/20 text-[#6C4CF1] dark:text-[#39D5F6]">
                Pro
              </span>
            </div>
            <span className="text-[11px] text-gray-500 dark:text-[#AAB4C8] truncate block mt-0.5">{user.email}</span>
          </div>

          {/* Menu Items */}
          <div className="p-1 space-y-0.5 text-xs font-medium">
            <button
              onClick={() => {
                setIsOpen(false);
                setShowProfileModal(true);
              }}
              className="w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl hover:bg-gray-100 dark:hover:bg-white/10 transition-colors text-left"
            >
              <User className="w-4 h-4 text-[#6C4CF1] dark:text-[#39D5F6]" />
              <span>My Profile</span>
            </button>

            <button
              onClick={() => {
                setIsOpen(false);
                setShowSettingsModal(true);
              }}
              className="w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl hover:bg-gray-100 dark:hover:bg-white/10 transition-colors text-left"
            >
              <Settings className="w-4 h-4 text-[#9275FF]" />
              <span>Account Settings</span>
            </button>

            <button
              onClick={() => {
                toggleTheme();
              }}
              className="w-full flex items-center justify-between px-3 py-2 rounded-xl hover:bg-gray-100 dark:hover:bg-white/10 transition-colors text-left"
            >
              <div className="flex items-center space-x-2.5">
                {isDark ? (
                  <Moon className="w-4 h-4 text-[#39D5F6]" />
                ) : (
                  <Sun className="w-4 h-4 text-amber-500" />
                )}
                <span>Theme Preference</span>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                {theme}
              </span>
            </button>

            <div className="border-t border-gray-100 dark:border-white/10 my-1" />

            <button
              onClick={() => {
                setIsOpen(false);
                logout();
              }}
              className="w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl hover:bg-rose-50 dark:hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 transition-colors text-left"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}

      {/* My Profile Modal */}
      {showProfileModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-md bg-white dark:bg-[#1A2238] rounded-3xl p-6 sm:p-7 shadow-2xl border border-gray-200 dark:border-white/15 text-[#20243A] dark:text-white">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-white/10">
              <div className="flex items-center space-x-2">
                <User className="w-5 h-5 text-[#6C4CF1] dark:text-[#39D5F6]" />
                <h3 className="text-base font-bold">My Profile</h3>
              </div>
              <button
                onClick={() => setShowProfileModal(false)}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="py-4 space-y-4">
              <div className="flex items-center space-x-3 p-3 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#6C4CF1] to-[#39D5F6] flex items-center justify-center text-white font-bold text-base shadow-sm">
                  {initials}
                </div>
                <div>
                  <span className="text-xs font-bold block">{user.name}</span>
                  <span className="text-xs text-gray-500 dark:text-[#AAB4C8]">{user.email}</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-1">
                  Display Name
                </label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-gray-200 dark:border-white/15 bg-white dark:bg-[#101426] text-sm text-[#20243A] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#6C4CF1]/30"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-1">
                  Registered Email Address
                </label>
                <input
                  type="email"
                  disabled
                  value={user.email}
                  className="w-full px-3.5 py-2 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-100 dark:bg-white/5 text-sm text-gray-500 cursor-not-allowed"
                />
              </div>

              {isSaved && (
                <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs flex items-center space-x-1.5">
                  <Check className="w-4 h-4" />
                  <span>Profile updated successfully!</span>
                </div>
              )}

              <div className="pt-2 flex items-center justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowProfileModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold border border-gray-200 dark:border-white/15 hover:bg-gray-50 dark:hover:bg-white/10"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-[#6C4CF1] to-[#39D5F6] text-white shadow-xs"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Account Settings Modal */}
      {showSettingsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-md bg-white dark:bg-[#1A2238] rounded-3xl p-6 sm:p-7 shadow-2xl border border-gray-200 dark:border-white/15 text-[#20243A] dark:text-white">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-white/10">
              <div className="flex items-center space-x-2">
                <Settings className="w-5 h-5 text-[#9275FF]" />
                <h3 className="text-base font-bold">Account Settings</h3>
              </div>
              <button
                onClick={() => setShowSettingsModal(false)}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="py-4 space-y-4 text-xs">
              <div className="p-3.5 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-gray-700 dark:text-gray-300">Security Provider</span>
                  <span className="font-semibold text-[#6C4CF1] dark:text-[#39D5F6]">{authProviderName}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-gray-700 dark:text-gray-300">Encryption Method</span>
                  <span className="text-gray-500 dark:text-[#AAB4C8]">SHA-256 Web Crypto</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-gray-700 dark:text-gray-300">Session Persistence</span>
                  <span className="text-emerald-500 font-semibold">Active & Persistent</span>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#6C4CF1]/10 border border-[#6C4CF1]/20 space-y-1">
                <span className="font-bold text-[#6C4CF1] dark:text-[#39D5F6] block">Theme Preferences</span>
                <p className="text-gray-600 dark:text-[#AAB4C8]">
                  Currently using <strong className="uppercase">{theme} Mode</strong>.
                </p>
                <button
                  type="button"
                  onClick={toggleTheme}
                  className="mt-2 text-xs font-bold text-white bg-[#6C4CF1] hover:bg-[#9275FF] px-3 py-1.5 rounded-lg transition-colors"
                >
                  Switch to {isDark ? 'Light' : 'Dark'} Mode
                </button>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setShowSettingsModal(false)}
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 text-[#20243A] dark:text-white"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
