const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

class ApiService {
  private baseURL: string;

  constructor() {
    this.baseURL = API_BASE_URL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    // Add auth token if available
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new ApiError(
          response.status,
          errorData.message || `HTTP error! status: ${response.status}`
        );
      }

      return await response.json();
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(0, 'Network error occurred');
    }
  }

  // Donor Authentication Methods
  async requestOtp(email: string) {
    return this.request<{ message: string; donorId: string }>('/api/donor/login/request-otp', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

  async verifyOtp(donorId: string, otp: string) {
    return this.request<{ message: string; token: string }>('/api/donor/login/verify-otp', {
      method: 'POST',
      body: JSON.stringify({ donorId, otp }),
    });
  }

  // User Registration (for all roles)
  async registerUser(userData: {
    username: string;
    email: string;
    fullName: string;
    password: string;
    role: string;
    personalInfo?: any;
  }) {
    // Map frontend role names to backend role names
    const roleMapping: { [key: string]: string } = {
      'blood_bank': 'blood_bank',
      'hospital_admin': 'hospital_admin',
      'donor': 'donor'
    };
    
    const mappedUserData = {
      ...userData,
      role: roleMapping[userData.role] || userData.role
    };
    
    console.log('Sending registration data:', mappedUserData);
    
    return this.request<{ message: string; user: any }>('/api/v1/users/register', {
      method: 'POST',
      body: JSON.stringify(mappedUserData),
    });
  }

  // User Login (for non-donor roles)
  async loginUser(email: string, password: string) {
    console.log('Sending login data:', { email, password: '***' });
    
    return this.request<{ message: string; token: string; user: any }>('/api/v1/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  // Get current user profile
  async getCurrentUser() {
    return this.request<{ user: any }>('/api/v1/users/me');
  }

  // Logout
  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userData');
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
  }

  // Get stored user data
  getUserData() {
    const userData = localStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
  }

  // Get stored user role
  getUserRole(): string | null {
    return localStorage.getItem('userRole');
  }
}

export const apiService = new ApiService();
export { ApiError };
