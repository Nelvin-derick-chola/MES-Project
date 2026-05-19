interface ApiClientConfig {
  baseURL: string;
  email?: string;
  privateKey?: string;
}

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  params?: Record<string, any>;
  body?: any;
  isFormData?: boolean;
  requiresAuth?: boolean;
}

class ApiClient {
  private baseURL: string;
  private email?: string;
  private privateKey?: string;

  constructor(config: ApiClientConfig) {
    this.baseURL = config.baseURL;
    this.email = config.email;
    this.privateKey = config.privateKey;
  }

private getAuthParams(): URLSearchParams {
  const params = new URLSearchParams();
  
  console.log('[Auth Debug]', {
    email: this.email,
    privateKey: this.privateKey ? '***' : 'MISSING',
  });
  
  if (this.email && this.privateKey) {
    params.append('email', this.email);
    params.append('private_key', this.privateKey);
  }
  return params;
}

  private async request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const { method = 'GET', params = {}, body, isFormData = false, requiresAuth = true } = options;

    const url = new URL(`${this.baseURL}${endpoint}`, window.location.origin);
    
    // Add auth params if required
    if (requiresAuth) {
      const authParams = this.getAuthParams();
      authParams.forEach((value, key) => {
        url.searchParams.append(key, value);
      });
    }

    // Add additional params
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        // If value is an object or array, stringify it for GET requests
        if (typeof value === 'object') {
          url.searchParams.append(key, JSON.stringify(value));
        } else {
          url.searchParams.append(key, String(value));
        }
      }
    });

    const headers: HeadersInit = {};
    let requestBody: any = undefined;

    if (!isFormData && body && method !== 'GET') {
      headers['Content-Type'] = 'application/json';
      requestBody = JSON.stringify(body);
    }

    // Log the request URL (hide private key for security)
    const logUrl = url.toString().replace(/private_key=[^&]+/, 'private_key=***');
    console.log('[API Request]', { method, url: logUrl });

    const response = await fetch(url.toString(), {
      method,
      headers,
      body: requestBody,
    });

  

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[API Error]', errorText);
      
      try {
        const errorJson = JSON.parse(errorText);
        throw new Error(errorJson.error_msg || `API Error: ${response.status}`);
      } catch {
        throw new Error(`API Error: ${response.status} - ${errorText}`);
      }
    }

    const data = await response.json();
    console.log('[API Response]', data);
    return data;
  }

  async get<T>(endpoint: string, params?: Record<string, any>, requiresAuth = true): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET', params, requiresAuth });
  }

  async post<T>(endpoint: string, body?: any, params?: Record<string, any>, requiresAuth = true): Promise<T> {
    return this.request<T>(endpoint, { method: 'POST', body, params, requiresAuth });
  }

  async postFormData<T>(endpoint: string, body: FormData, params?: Record<string, any>, requiresAuth = true): Promise<T> {
    return this.request<T>(endpoint, { method: 'POST', body, params, isFormData: true, requiresAuth });
  }
}

export const createApiClient = (config: ApiClientConfig): ApiClient => {
  return new ApiClient(config);
};