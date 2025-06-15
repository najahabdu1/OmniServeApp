import React, { createContext, useContext, useEffect, useState } from 'react';

// Define the shape of user data
interface User {
  id: string;
  name: string;
  email: string;
}

// Define the shape of the AuthContext
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  login: async () => {},
  logout: () => {},
  isAuthenticated: false,
});

// Custom hook for using the auth context
export const useAuth = () => useContext(AuthContext);

// Provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is logged in on mount
  useEffect(() => {
    // In a real app, you would check for stored credentials/tokens
    checkUserSession();
  }, []);

  const checkUserSession = async () => {
    try {
      // Mock authentication check
      // In a real app, this would verify saved tokens or credentials
      setIsLoading(true);
      
      // Simulation of API call
      setTimeout(() => {
        setUser(null);  // No user found initially
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Auth check failed:', error);
      setIsLoading(false);
    }
  };

  // Login function
  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      
      // Mock login - in a real app, this would be an API call
      // Simulating successful login after 1 second
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data
      const userData: User = {
        id: '1',
        name: 'Demo User',
        email: email,
      };
      
      setUser(userData);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      throw new Error('Login failed');
    }
  };

  // Logout function
  const logout = () => {
    // Clear user data
    setUser(null);
  };

  const value = {
    user,
    isLoading,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
