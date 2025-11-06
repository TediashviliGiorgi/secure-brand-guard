import { api } from './api';
import { 
  LoginCredentials, 
  RegisterData, 
  AuthResponse, 
  ForgotPasswordData 
} from '@/types/auth';

// Mock authentication service
// Replace with actual API calls when backend is ready

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    // Mock implementation
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (credentials.email === 'demo@authit.com' && credentials.password === 'password') {
          const mockResponse: AuthResponse = {
            token: 'mock-jwt-token-' + Date.now(),
            user: {
              id: '1',
              email: credentials.email,
              fullName: 'Demo User',
              companyName: 'Demo Company',
              phone: '+995 555 123 456',
              region: 'Kakheti'
            }
          };
          
          if (credentials.rememberMe) {
            localStorage.setItem('rememberMe', 'true');
          }
          
          resolve(mockResponse);
        } else {
          reject(new Error('Invalid email or password'));
        }
      }, 800);
    });
    
    // Real implementation (uncomment when backend is ready):
    // const response = await api.post<AuthResponse>('/auth/login', credentials);
    // return response.data;
  },

  async register(data: RegisterData): Promise<AuthResponse> {
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockResponse: AuthResponse = {
          token: 'mock-jwt-token-' + Date.now(),
          user: {
            id: Date.now().toString(),
            email: data.businessEmail,
            fullName: data.fullName,
            companyName: data.companyName,
            phone: data.phone,
            region: data.region
          }
        };
        resolve(mockResponse);
      }, 1000);
    });
    
    // Real implementation:
    // const response = await api.post<AuthResponse>('/auth/register', data);
    // return response.data;
  },

  async forgotPassword(data: ForgotPasswordData): Promise<void> {
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 800);
    });
    
    // Real implementation:
    // await api.post('/auth/forgot-password', data);
  },

  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('rememberMe');
  },

  getToken(): string | null {
    return localStorage.getItem('authToken');
  },

  setToken(token: string): void {
    localStorage.setItem('authToken', token);
  },

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
};
