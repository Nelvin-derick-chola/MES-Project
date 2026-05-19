import { authFetch } from './adminApi';

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

export const contentApi = {
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
};
