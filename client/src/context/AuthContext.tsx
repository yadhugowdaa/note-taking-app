import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define the shape of the user data and the context
interface AuthState {
  token: string | null;
  user: { name: string; email: string } | null;
}

interface AuthContextType extends AuthState {
  login: (data: { token: string; name: string; email: string }) => void;
  logout: () => void;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create a provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    token: null,
    user: null,
  });

  const login = (data: { token: string; name: string; email: string }) => {
    // In a real app, you'd also save the token to localStorage to persist login
    setAuthState({
      token: data.token,
      user: { name: data.name, email: data.email },
    });
  };

  const logout = () => {
    // Clear token from localStorage as well
    setAuthState({ token: null, user: null });
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Create a custom hook to use the auth context easily
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};