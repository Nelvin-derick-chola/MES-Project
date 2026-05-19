// src/services/adminApi.ts
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

// ✅ Helper function for authenticated requests
export const authFetch = async (endpoint: string, options: RequestInit = {}) => {
  const token = localStorage.getItem('admin_token');
  
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
      ...options.headers,
    },
  });
  
  const data = await response.json();
  
  // If unauthorized, redirect to login
  if (response.status === 401) {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    window.location.href = '/admin/login';
    throw new Error('Unauthorized. Please login again.');
  }
  
  if (!data.success) {
    throw new Error(data.message || 'API request failed');
  }
  
  return data;
};

// ==================== Types ====================
export interface Page {
  id: number;
  uuid: string;
  slug: string;
  name: string;
  title: string;
  meta_description: string;
  meta_keywords: string;
  is_active: boolean;
}

export interface Section {
  id: number;
  uuid: string;
  key: string;
  name: string;
  type: string;
  order: number;
  settings: any;
  is_active: boolean;
  content: Record<string, any>;
}

// ==================== Team Categories ====================
export const teamCategoryApi = {
  getAll: () => authFetch('/team-categories'),
  getById: (uuid: string) => authFetch(`/team-categories/${uuid}`),
  create: (data: any) => authFetch('/team-categories', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (uuid: string, data: any) => authFetch(`/team-categories/${uuid}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (uuid: string) => authFetch(`/team-categories/${uuid}`, {
    method: 'DELETE',
  }),
  toggleActive: (uuid: string) => authFetch(`/team-categories/${uuid}/toggle-active`, {
    method: 'PATCH',
  }),
};

// ==================== Team Members ====================
export const teamMemberApi = {
  getAll: () => authFetch('/team-members'),
  getById: (uuid: string) => authFetch(`/team-members/${uuid}`),
  create: (data: FormData) => {
    const token = localStorage.getItem('admin_token');
    
    return fetch(`${API_BASE_URL}/team-members`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
      },
      body: data,
    })
    .then(async (response) => {
      const text = await response.text();
      
      try {
        const json = JSON.parse(text);
        if (response.status === 422) {
          console.error('Validation errors:', json.errors);
        }
        if (!response.ok) {
          throw new Error(json.message || 'Request failed');
        }
        return json;
      } catch (e) {
        console.error('Response text:', text);
        throw new Error('Invalid response from server');
      }
    });
  },
  update: (uuid: string, data: FormData) => {
    const token = localStorage.getItem('admin_token');
    data.append('_method', 'PUT');
    return fetch(`${API_BASE_URL}/team-members/${uuid}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
      },
      body: data,
    }).then(res => res.json());
  },
  delete: (uuid: string) => authFetch(`/team-members/${uuid}`, {
    method: 'DELETE',
  }),
  toggleActive: (uuid: string) => authFetch(`/team-members/${uuid}/toggle-active`, {
    method: 'PATCH',
  }),
  toggleFeatured: (uuid: string) => authFetch(`/team-members/${uuid}/toggle-featured`, {
    method: 'PATCH',
  }),
};

// ==================== Service Categories ====================
export const serviceCategoryApi = {
  getAll: () => authFetch('/service-categories'),
  getById: (uuid: string) => authFetch(`/service-categories/${uuid}`),
  create: (data: any) => authFetch('/service-categories', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (uuid: string, data: any) => authFetch(`/service-categories/${uuid}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (uuid: string) => authFetch(`/service-categories/${uuid}`, {
    method: 'DELETE',
  }),
  toggleActive: (uuid: string) => authFetch(`/service-categories/${uuid}/toggle-active`, {
    method: 'PATCH',
  }),
  toggleHomepage: (uuid: string) => authFetch(`/service-categories/${uuid}/toggle-homepage`, {
    method: 'PATCH',
  }),
};

// ==================== Services ====================
export const serviceApi = {
  getAll: () => authFetch('/services'),
  getById: (uuid: string) => authFetch(`/services/${uuid}`),
  
  create: async (data: FormData) => {
    const token = localStorage.getItem('admin_token');
    if (!token) throw new Error('No authentication token found');
    
    const response = await fetch(`${API_BASE_URL}/services`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
      },
      body: data,
    });
    
    if (response.redirected) {
      throw new Error('Authentication failed - redirect detected');
    }
    
    if (!response.ok) {
      const text = await response.text();
      if (response.status === 401) {
        localStorage.removeItem('admin_token');
        localStorage.removeItem('admin_user');
        window.location.href = '/admin/login';
        throw new Error('Session expired');
      }
      throw new Error(`HTTP ${response.status}: ${text.substring(0, 200)}`);
    }
    
    return response.json();
  },
  
  update: async (uuid: string, data: FormData) => {
    const token = localStorage.getItem('admin_token');
    data.append('_method', 'PUT');
    
    if (!token) throw new Error('No authentication token found');
    
    const response = await fetch(`${API_BASE_URL}/services/${uuid}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
      },
      body: data,
    });
    
    if (response.redirected) {
      throw new Error('Authentication failed');
    }
    
    if (!response.ok) {
      const text = await response.text();
      if (response.status === 401) {
        localStorage.removeItem('admin_token');
        localStorage.removeItem('admin_user');
        window.location.href = '/admin/login';
        throw new Error('Session expired');
      }
      throw new Error(`HTTP ${response.status}: ${text.substring(0, 200)}`);
    }
    
    return response.json();
  },
  
  delete: (uuid: string) => authFetch(`/services/${uuid}`, {
    method: 'DELETE',
  }),
  toggleActive: (uuid: string) => authFetch(`/services/${uuid}/toggle-active`, {
    method: 'PATCH',
  }),
  toggleFeatured: (uuid: string) => authFetch(`/services/${uuid}/toggle-featured`, {
    method: 'PATCH',
  }),
};

// ==================== Testimonials ====================
export const testimonialApi = {
  getAll: () => authFetch('/testimonials'),
  getById: (uuid: string) => authFetch(`/testimonials/${uuid}`),
  create: (data: any) => authFetch('/testimonials', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (uuid: string, data: any) => authFetch(`/testimonials/${uuid}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (uuid: string) => authFetch(`/testimonials/${uuid}`, {
    method: 'DELETE',
  }),
  toggleActive: (uuid: string) => authFetch(`/testimonials/${uuid}/toggle-active`, {
    method: 'PATCH',
  }),
  toggleFeatured: (uuid: string) => authFetch(`/testimonials/${uuid}/toggle-featured`, {
    method: 'PATCH',
  }),
  verify: (uuid: string) => authFetch(`/testimonials/${uuid}/verify`, {
    method: 'PATCH',
  }),
  getStats: () => authFetch('/testimonials/stats'),
};

// ==================== Auth ====================
export const adminAuthApi = {
  login: async (email: string, password: string) => {
    const response = await fetch(`${API_BASE_URL}/admin/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    
    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.message || 'Login failed');
    }
    
    return data;
  },
  
  logout: async () => {
    const token = localStorage.getItem('admin_token');
    const response = await fetch(`${API_BASE_URL}/admin/logout`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
      },
    });
    
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    
    return response.json();
  },
  
  getProfile: () => authFetch('/admin/profile'),
  updateProfile: (data: any) => authFetch('/admin/profile', {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
};

// ==================== Page & Section Management (Unified) ====================
export const adminApi = {
  // Pages
  getPages: () => authFetch('/admin/pages'),
  getPage: (slug: string) => authFetch(`/admin/pages/${slug}`),
  updatePage: (id: number, data: Partial<Page>) =>
    authFetch(`/admin/pages/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  // Sections
  updateSectionOrder: (sections: { id: number; order: number }[]) =>
    authFetch('/admin/sections/order', {
      method: 'POST',
      body: JSON.stringify({ sections }),
    }),

  updateSectionContent: (sectionId: number, content: Record<string, any>) =>
    authFetch(`/admin/sections/${sectionId}/content`, {
      method: 'PUT',
      body: JSON.stringify({ content }),
    }),

  toggleSection: (sectionId: number) =>
    authFetch(`/admin/sections/${sectionId}/toggle`, { method: 'PATCH' }),
  
  // Team Members (convenience)
  getTeamMembers: teamMemberApi.getAll,
  getTeamMember: teamMemberApi.getById,
  createTeamMember: teamMemberApi.create,
  updateTeamMember: teamMemberApi.update,
  deleteTeamMember: teamMemberApi.delete,
  toggleTeamMemberActive: teamMemberApi.toggleActive,
  toggleTeamMemberFeatured: teamMemberApi.toggleFeatured,
  
  // Services (convenience)
  getServices: serviceApi.getAll,
  getService: serviceApi.getById,
  createService: serviceApi.create,
  updateService: serviceApi.update,
  deleteService: serviceApi.delete,
  toggleServiceActive: serviceApi.toggleActive,
  toggleServiceFeatured: serviceApi.toggleFeatured,
  
  // Service Categories (convenience)
  getServiceCategories: serviceCategoryApi.getAll,
  getServiceCategory: serviceCategoryApi.getById,
  createServiceCategory: serviceCategoryApi.create,
  updateServiceCategory: serviceCategoryApi.update,
  deleteServiceCategory: serviceCategoryApi.delete,
  toggleServiceCategoryActive: serviceCategoryApi.toggleActive,
  
  // Testimonials (convenience)
  getTestimonials: testimonialApi.getAll,
  getTestimonial: testimonialApi.getById,
  createTestimonial: testimonialApi.create,
  updateTestimonial: testimonialApi.update,
  deleteTestimonial: testimonialApi.delete,
  toggleTestimonialActive: testimonialApi.toggleActive,
  toggleTestimonialFeatured: testimonialApi.toggleFeatured,
};

// Export all types
//export type { Page, Section };