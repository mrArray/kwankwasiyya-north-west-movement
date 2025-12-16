// Helper to get full image URL
export function getImageUrl(photoUrl: string): string {
  if (!photoUrl) return '';
  if (photoUrl.startsWith('http')) return photoUrl;
  // Ensure API_BASE_URL ends without trailing slash
  const base = API_BASE_URL.replace(/\/$/, '') || window.location.origin;
  // Ensure photoUrl starts with /
  const path = photoUrl.startsWith('/') ? photoUrl : `/${photoUrl}`;
  return `${base}${path}`;
}
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.kwankwasiyyanorthwestmovement.org';

export interface RegisterSupporterData {
  fullName: string;
  age?: number;
  business?: string;
  state: string;
  LG: string;
  ward: string;
  pollingUnit: string;
  phoneNumber: string;
  email?: string;
  photo: File;
}

export interface Supporter {
  id: number;
  registrationNumber: string;
  fullName: string;
  age?: number;
  business?: string;
  state: string;
  LG: string;
  ward: string;
  pollingUnit: string;
  phoneNumber: string;
  email?: string;
  photoUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  error?: {
    statusCode: number;
    message: string;
  };
}

export interface PaginatedResponse<T> {
  // Support both formats: data[] or supporters[]
  data?: T[];
  supporters?: T[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface Statistics {
  totalSupporters: number;
  todayRegistrations: number;
  weekRegistrations: number;
  monthRegistrations: number;
}

export interface TrendData {
  date: string;
  count: number;
}

export interface StateData {
  state: string;
  count: number;
}

export interface LGData {
  LG: string;
  state: string;
  count: number;
}

export interface Metrics {
  totalSupporters: number;
  averageAge: number;
  statesCount: number;
  lgCount: number;
}

class ApiClient {
  private baseUrl: string;
  private token: string | null = null;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    // Try to get token from localStorage
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('auth_token');
    }
  }

  setToken(token: string) {
    this.token = token;
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', token);
    }
  }

  clearToken() {
    this.token = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const headers: Record<string, string> = {
      ...(options.headers as Record<string, string>),
    };

    if (this.token && !headers['Authorization']) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    // Don't set Content-Type for FormData
    if (!(options.body instanceof FormData)) {
      headers['Content-Type'] = 'application/json';
    }

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'An error occurred');
    }

    return data;
  }

  // Authentication
  async login(email: string, password: string): Promise<ApiResponse<{ token: string }>> {
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    const response = await this.request<{ token: string }>('/api/admin/login', {
      method: 'POST',
      body: formData,
    });

    if (response.success && response.data?.token) {
      this.setToken(response.data.token);
    }

    return response;
  }

  // Public endpoints
  async registerSupporter(data: RegisterSupporterData): Promise<ApiResponse<Supporter>> {
    const formData = new FormData();
    formData.append('fullName', data.fullName);
    if (data.age) formData.append('age', data.age.toString());
    if (data.business) formData.append('business', data.business);
    formData.append('state', data.state);
    formData.append('LG', data.LG);
    formData.append('ward', data.ward);
    formData.append('pollingUnit', data.pollingUnit);
    formData.append('phoneNumber', data.phoneNumber);
    if (data.email) formData.append('email', data.email);
    formData.append('photo', data.photo);

    return this.request<Supporter>('/api/supporters/register', {
      method: 'POST',
      body: formData,
    });
  }

  async verifySupporter(registrationNumber: string): Promise<ApiResponse<Supporter>> {
    return this.request<Supporter>(`/api/supporters/verify/${registrationNumber}`);
  }

  getExportUrl(registrationNumber: string, type: 'pdf' | 'image' = 'pdf'): string {
    return `${this.baseUrl}/api/pdf/${registrationNumber}?type=${type}`;
  }

  // Protected endpoints
  async getAllSupporters(params: {
    page?: number;
    limit?: number;
    search?: string;
    state?: string;
    LG?: string;
  } = {}): Promise<ApiResponse<PaginatedResponse<Supporter>>> {
    const queryParams = new URLSearchParams();
    if (params.page) queryParams.append('page', params.page.toString());
    if (params.limit) queryParams.append('limit', params.limit.toString());
    if (params.search) queryParams.append('search', params.search);
    if (params.state) queryParams.append('state', params.state);
    if (params.LG) queryParams.append('LG', params.LG);

    const query = queryParams.toString();
    return this.request<PaginatedResponse<Supporter>>(
      `/api/supporters${query ? `?${query}` : ''}`
    );
  }

  async getSupporterById(id: number): Promise<ApiResponse<Supporter>> {
    return this.request<Supporter>(`/api/supporters/${id}`);
  }

  async getStatistics(): Promise<ApiResponse<Statistics>> {
    return this.request<Statistics>('/api/supporters/statistics');
  }

  async exportCsv(): Promise<Blob> {
    const headers: HeadersInit = {};
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    const response = await fetch(`${this.baseUrl}/api/supporters/export/csv`, {
      headers,
    });

    if (!response.ok) {
      throw new Error('Failed to export CSV');
    }

    return response.blob();
  }

  async exportExcel(): Promise<Blob> {
    const headers: HeadersInit = {};
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    const response = await fetch(`${this.baseUrl}/api/supporters/export/excel`, {
      headers,
    });

    if (!response.ok) {
      throw new Error('Failed to export Excel');
    }

    return response.blob();
  }

  async getRegistrationTrends(days: number = 30): Promise<ApiResponse<TrendData[]>> {
    return this.request<TrendData[]>(`/api/analytics/trends?days=${days}`);
  }

  async getSupportersByState(): Promise<ApiResponse<StateData[]>> {
    return this.request<StateData[]>('/api/analytics/by-state');
  }

  async getSupportersByLG(): Promise<ApiResponse<LGData[]>> {
    return this.request<LGData[]>('/api/analytics/by-lg');
  }

  async getKeyMetrics(): Promise<ApiResponse<Metrics>> {
    return this.request<Metrics>('/api/analytics/metrics');
  }

  // Location APIs
  async getStates(): Promise<ApiResponse<string[]>> {
    return this.request<string[]>('/api/locations/states');
  }

  async getLGAs(state: string): Promise<ApiResponse<{ state: string; lgas: string[] }>> {
    return this.request<{ state: string; lgas: string[] }>(`/api/locations/lgas?state=${encodeURIComponent(state)}`);
  }

  async getAllStatesWithLGAs(): Promise<ApiResponse<Array<{ state: string; lgas: string[]; lgaCount: number }>>> {
    return this.request<Array<{ state: string; lgas: string[]; lgaCount: number }>>('/api/locations/all');
  }
}

export const api = new ApiClient(API_BASE_URL);
