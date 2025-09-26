import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { apiService, ApiError } from '../services/api';

interface User {
  _id: string;
  username: string;
  email: string;
  fullName: string;
  role: string;
  personalInfo?: any;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string, role: string) => Promise<void>;
  loginWithOtp: (email: string) => Promise<string>;
  verifyOtp: (donorId: string, otp: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  error: string | null;
  clearError: () => void;
}

interface RegisterData {
  username: string;
  email: string;
  fullName: string;
  password: string;
  role: string;
  personalInfo?: any;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const isAuthenticated = !!user;

  useEffect(() => {
    // Check if user is already logged in
    const checkAuth = async () => {
      try {
        if (apiService.isAuthenticated()) {
          const userData = apiService.getUserData();
          if (userData) {
            setUser(userData);
          }
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        apiService.logout();
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string, role: string) => {
    try {
      setError(null);
      setIsLoading(true);

      const response = await apiService.loginUser(email, password);
      
      // Store token and user data
      localStorage.setItem('authToken', response.token);
      localStorage.setItem('userRole', role);
      localStorage.setItem('userData', JSON.stringify(response.user));
      
      setUser(response.user);
    } catch (error) {
      const errorMessage = error instanceof ApiError 
        ? error.message 
        : 'Login failed. Please try again.';
      setError(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithOtp = async (email: string): Promise<string> => {
    try {
      setError(null);
      setIsLoading(true);

      const response = await apiService.requestOtp(email);
      return response.donorId;
    } catch (error) {
      const errorMessage = error instanceof ApiError 
        ? error.message 
        : 'Failed to send OTP. Please try again.';
      setError(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOtp = async (donorId: string, otp: string) => {
    try {
      setError(null);
      setIsLoading(true);

      const response = await apiService.verifyOtp(donorId, otp);
      
      // Store token for donor
      localStorage.setItem('authToken', response.token);
      localStorage.setItem('userRole', 'donor');
      
      // For donors, we might need to fetch user data separately
      // For now, we'll create a basic user object
      const donorUser: User = {
        _id: donorId,
        username: '',
        email: '',
        fullName: '',
        role: 'donor'
      };
      
      localStorage.setItem('userData', JSON.stringify(donorUser));
      setUser(donorUser);
    } catch (error) {
      const errorMessage = error instanceof ApiError 
        ? error.message 
        : 'OTP verification failed. Please try again.';
      setError(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: RegisterData) => {
    try {
      setError(null);
      setIsLoading(true);

      const response = await apiService.registerUser(userData);
      
      // After successful registration, automatically log in
      await login(userData.email, userData.password, userData.role);
    } catch (error) {
      const errorMessage = error instanceof ApiError 
        ? error.message 
        : 'Registration failed. Please try again.';
      setError(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    apiService.logout();
    setUser(null);
    setError(null);
  };

  const clearError = () => {
    setError(null);
  };

  const value: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    login,
    loginWithOtp,
    verifyOtp,
    register,
    logout,
    error,
    clearError,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
