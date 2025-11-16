import { api } from './api';
import { 
  LoginCredentials, 
  RegisterData, 
  AuthResponse, 
  ForgotPasswordData 
} from '@/types/auth';

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (credentials.email === 'producer@winery.ge' && credentials.password === 'password') {
          const mockResponse: AuthResponse = {
            token: 'mock-jwt-token-' + Date.now(),
            user: {
              id: 'prod-001',
              email: credentials.email,
              name: 'Giorgi Meladze',
              role: 'producer',
              companyName: 'Saperavi Winery',
              region: 'Kakheti',
              industry: 'Wine',
              phone: '+995 555 123 456'
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
  },

  async register(data: RegisterData): Promise<AuthResponse> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockResponse: AuthResponse = {
          token: 'mock-jwt-token-' + Date.now(),
          user: {
            id: Date.now().toString(),
            email: data.email,
            name: data.fullName,
            role: 'producer',
            companyName: data.companyName,
            region: data.region,
            industry: data.industry,
            phone: data.phone,
          }
        };
        resolve(mockResponse);
      }, 1000);
    });
  },

  async forgotPassword(data: ForgotPasswordData): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(), 800);
    });
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
