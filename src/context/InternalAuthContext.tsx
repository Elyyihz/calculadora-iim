import React, { createContext, useContext, useState, ReactNode } from 'react';

/**
 * Interface defining the internal team authentication state and operations.
 */
interface InternalAuthContextType {
  /** Whether the operator is authenticated for the internal environment. */
  isAuthenticated: boolean;
  /** Authenticates the operator against the team passcode. */
  login: (passcode: string) => boolean;
  /** Logs out the operator and clears the active session. */
  logout: () => void;
}

const STORAGE_KEY = 'urbanflow_internal_session';
// Master passcode for UrbanFlow internal consultants and analysts
const INTERNAL_PASSCODE = 'urbanflow2026';

const InternalAuthContext = createContext<InternalAuthContextType | undefined>(undefined);

/**
 * Provider managing session authentication for the private UrbanFlow workspace.
 *
 * Persists session status in sessionStorage to survive page refreshes while ensuring
 * closure upon browser window termination.
 */
export const InternalAuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem(STORAGE_KEY) === 'true';
    } catch {
      return false;
    }
  });

  const login = (passcode: string): boolean => {
    const trimmed = passcode.trim();
    if (trimmed === INTERNAL_PASSCODE) {
      setIsAuthenticated(true);
      try {
        sessionStorage.setItem(STORAGE_KEY, 'true');
      } catch {
        // Fall back gracefully if storage is restricted
      }
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      // Fall back gracefully
    }
  };

  return (
    <InternalAuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </InternalAuthContext.Provider>
  );
};

/**
 * Hook to consume the internal team authentication context.
 *
 * @throws {Error} If called outside of InternalAuthProvider.
 */
export const useInternalAuth = (): InternalAuthContextType => {
  const context = useContext(InternalAuthContext);
  if (!context) {
    throw new Error('useInternalAuth must be used within an InternalAuthProvider');
  }
  return context;
};
