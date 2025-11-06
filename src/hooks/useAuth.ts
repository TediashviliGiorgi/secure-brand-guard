import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '@/services/authService';
import { User, LoginCredentials, RegisterData, ForgotPasswordData } from '@/types/auth';
import { toast } from '@/hooks/use-toast';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = authService.getToken();
    setIsAuthenticated(!!token);
  }, []);

  const login = async (credentials: LoginCredentials) => {
    try {
      setLoading(true);
      const response = await authService.login(credentials);
      
      authService.setToken(response.token);
      setUser(response.user);
      setIsAuthenticated(true);
      
      toast({
        title: 'Welcome back!',
        description: `Logged in as ${response.user.email}`,
      });
      
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: 'Login failed',
        description: error instanceof Error ? error.message : 'Invalid credentials',
        variant: 'destructive',
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (data: RegisterData) => {
    try {
      setLoading(true);
      const response = await authService.register(data);
      
      authService.setToken(response.token);
      setUser(response.user);
      setIsAuthenticated(true);
      
      toast({
        title: 'Registration successful!',
        description: 'Welcome to AuthIt',
      });
      
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: 'Registration failed',
        description: error instanceof Error ? error.message : 'Please try again',
        variant: 'destructive',
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const forgotPassword = async (data: ForgotPasswordData) => {
    try {
      setLoading(true);
      await authService.forgotPassword(data);
      
      toast({
        title: 'Email sent',
        description: 'Check your inbox for password reset instructions',
      });
      
      return true;
    } catch (error) {
      toast({
        title: 'Failed to send email',
        description: error instanceof Error ? error.message : 'Please try again',
        variant: 'destructive',
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    setIsAuthenticated(false);
    
    toast({
      title: 'Logged out',
      description: 'See you soon!',
    });
    
    navigate('/login');
  };

  return {
    user,
    loading,
    isAuthenticated,
    login,
    register,
    forgotPassword,
    logout,
  };
};
