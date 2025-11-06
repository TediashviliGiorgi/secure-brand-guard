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
        // Mock producer user
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
        }
        // Mock consortium user
        else if (credentials.email === 'admin@consortium.ge' && credentials.password === 'password') {
          const mockResponse: AuthResponse = {
            token: 'mock-jwt-token-' + Date.now(),
            user: {
              id: 'cons-001',
              email: credentials.email,
              name: 'Nino Beridze',
              role: 'consortium',
              consortiumName: 'Kakheti Wine Consortium',
              memberCount: 24,
              phone: '+995 555 987 654'
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
            email: data.email,
            name: data.fullName,
            role: data.accountType,
            companyName: data.companyName,
            consortiumName: data.consortiumName,
            region: data.region,
            industry: data.industry,
            phone: data.phone,
            memberCount: data.memberCount
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
