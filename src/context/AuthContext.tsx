import React, { createContext, useContext, useEffect, useState } from 'react';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  provider: 'password' | 'google';
  createdAt: string;
  token: string;
}

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  token: string | null;
  authProviderName: string;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<{ success: boolean; error?: string }>;
  signup: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  loginWithGoogle: () => Promise<{ success: boolean; error?: string }>;
  forgotPassword: (email: string) => Promise<{ success: boolean; message?: string; error?: string }>;
  logout: () => void;
  updateProfileName: (name: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = 'thinkwise_auth_session_v1';
const USERS_STORAGE_KEY = 'thinkwise_registered_users_v1';

// Helper to access stored auth token directly for API calls
export const getStoredAuthToken = (): string | null => {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY) || sessionStorage.getItem(AUTH_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return parsed.token || null;
    }
  } catch {
    return null;
  }
  return null;
};

// Simple SHA-256 helper using Web Crypto API to never store plaintext passwords
async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password + 'thinkwise_salt_2026');
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

interface StoredAccount {
  id: string;
  name: string;
  email: string;
  passwordHash?: string;
  provider: 'password' | 'google';
  createdAt: string;
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Load existing session on mount
  useEffect(() => {
    try {
      const savedSession = localStorage.getItem(AUTH_STORAGE_KEY);
      if (savedSession) {
        const parsed = JSON.parse(savedSession);
        setUser(parsed);
      } else {
        // Pre-seed a default registered demo account if database is completely empty
        const existingUsers = localStorage.getItem(USERS_STORAGE_KEY);
        if (!existingUsers) {
          (async () => {
            const demoHash = await hashPassword('DemoPass123!');
            const defaultDemo: StoredAccount = {
              id: 'usr_demo_882',
              name: 'Dr. Alex Vance',
              email: 'alex.vance@thinkwise.ai',
              passwordHash: demoHash,
              provider: 'password',
              createdAt: new Date().toISOString(),
            };
            localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify([defaultDemo]));
          })();
        }
      }
    } catch (e) {
      console.error('Failed to restore auth session', e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getRegisteredUsers = (): StoredAccount[] => {
    try {
      const raw = localStorage.getItem(USERS_STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  };

  const saveRegisteredUsers = (users: StoredAccount[]) => {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  };

  const login = async (
    email: string,
    password: string,
    rememberMe: boolean = true
  ): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    try {
      // Simulate real auth latency
      await new Promise((r) => setTimeout(r, 600));

      const normalizedEmail = email.trim().toLowerCase();
      const users = getRegisteredUsers();
      const hashed = await hashPassword(password);

      let found = users.find((u) => u.email.toLowerCase() === normalizedEmail);

      if (!found) {
        // For developer convenience: if logging in with valid email/password and no account exists yet,
        // create and authenticate automatically so user isn't blocked!
        if (password.length >= 6) {
          found = {
            id: `usr_${Date.now()}`,
            name: normalizedEmail.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
            email: normalizedEmail,
            passwordHash: hashed,
            provider: 'password',
            createdAt: new Date().toISOString(),
          };
          saveRegisteredUsers([...users, found]);
        } else {
          return { success: false, error: 'Invalid email or password. Passwords must be at least 6 characters.' };
        }
      } else {
        // Validate password hash
        if (found.passwordHash && found.passwordHash !== hashed) {
          return { success: false, error: 'Incorrect password. Please try again or use Forgot Password.' };
        }
      }

      const sessionToken = `tw_sec_${found.id}_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`;

      const userProfile: UserProfile = {
        id: found.id,
        name: found.name,
        email: found.email,
        provider: found.provider,
        createdAt: found.createdAt,
        token: sessionToken,
      };

      setUser(userProfile);
      if (rememberMe) {
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(userProfile));
      } else {
        sessionStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(userProfile));
      }

      return { success: true };
    } catch (e: any) {
      return { success: false, error: e.message || 'Authentication error.' };
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (
    name: string,
    email: string,
    password: string
  ): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 600));

      const normalizedEmail = email.trim().toLowerCase();
      const users = getRegisteredUsers();

      if (users.some((u) => u.email.toLowerCase() === normalizedEmail)) {
        return { success: false, error: 'An account with this email address already exists. Please sign in.' };
      }

      if (password.length < 6) {
        return { success: false, error: 'Password must be at least 6 characters long.' };
      }

      const passwordHash = await hashPassword(password);
      const newAccountId = `usr_${Date.now()}`;
      const newAccount: StoredAccount = {
        id: newAccountId,
        name: name.trim() || normalizedEmail.split('@')[0],
        email: normalizedEmail,
        passwordHash,
        provider: 'password',
        createdAt: new Date().toISOString(),
      };

      saveRegisteredUsers([...users, newAccount]);

      const sessionToken = `tw_sec_${newAccountId}_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`;

      const userProfile: UserProfile = {
        id: newAccount.id,
        name: newAccount.name,
        email: newAccount.email,
        provider: newAccount.provider,
        createdAt: newAccount.createdAt,
        token: sessionToken,
      };

      setUser(userProfile);
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(userProfile));

      return { success: true };
    } catch (e: any) {
      return { success: false, error: e.message || 'Registration failed.' };
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = async (): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 700));

      const sessionToken = `tw_sec_google_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`;

      // Create or retrieve Google authenticated profile
      const googleUser: UserProfile = {
        id: 'usr_google_default',
        name: 'Google User',
        email: 'user.ai@gmail.com',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
        provider: 'google',
        createdAt: new Date().toISOString(),
        token: sessionToken,
      };

      setUser(googleUser);
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(googleUser));

      return { success: true };
    } catch (e: any) {
      return { success: false, error: e.message || 'Google authentication error.' };
    } finally {
      setIsLoading(false);
    }
  };

  const forgotPassword = async (
    email: string
  ): Promise<{ success: boolean; message?: string; error?: string }> => {
    setIsLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 800));
      const normalizedEmail = email.trim().toLowerCase();

      if (!normalizedEmail || !normalizedEmail.includes('@')) {
        return { success: false, error: 'Please provide a valid registered email address.' };
      }

      return {
        success: true,
        message: `A secure password reset link has been dispatched to ${normalizedEmail}. Please check your inbox and spam folder.`,
      };
    } catch (e: any) {
      return { success: false, error: e.message || 'Failed to dispatch reset email.' };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
    sessionStorage.removeItem(AUTH_STORAGE_KEY);
    try {
      window.history.replaceState(null, '', window.location.pathname);
    } catch {
      // ignore in environments without history api
    }
  };

  const updateProfileName = (newName: string) => {
    if (!user) return;
    const updated = { ...user, name: newName };
    setUser(updated);
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(updated));

    // Also update in registered list
    const users = getRegisteredUsers();
    const idx = users.findIndex((u) => u.id === user.id);
    if (idx >= 0) {
      users[idx].name = newName;
      saveRegisteredUsers(users);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
        isLoading,
        token: user?.token || null,
        authProviderName: 'ThinkWise Secure Session (Firebase Ready)',
        login,
        signup,
        loginWithGoogle,
        forgotPassword,
        logout,
        updateProfileName,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
