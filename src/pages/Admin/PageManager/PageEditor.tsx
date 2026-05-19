// src/pages/Admin/components/PageManager/PageEditor.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { Page } from '../../../services/contentApi';
import { contentApi } from '../../../services/contentApi';
import { SectionManager } from './SectionManager';
import styles from './PageManager.module.css';

interface PageEditorProps {
  page?: Page;           // Optional - if provided, use this; otherwise fetch from route
  onUpdate?: (page: Page) => void;  // Optional - callback when page is updated
}

export const PageEditor: React.FC<PageEditorProps> = ({ page: propPage, onUpdate: propOnUpdate }) => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [page, setPage] = useState<Page | null>(propPage || null);
  const [loading, setLoading] = useState(!propPage);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'seo' | 'sections'>('sections');
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    meta_description: '',
    meta_keywords: '',
  });

  // Fetch page if not provided as prop (route mode)
  useEffect(() => {
    if (propPage) {
      // Props mode - page is provided
      setPage(propPage);
      setLoading(false);
    } else if (slug && slug !== 'new') {
      // Route mode - fetch by slug
      fetchPage();
    } else {
      setLoading(false);
    }
  }, [slug, propPage]);

  // Update form when page changes
  useEffect(() => {
    if (page) {
      setFormData({
        title: page.title || '',
        meta_description: page.meta_description || '',
        meta_keywords: page.meta_keywords || '',
      });
    }
  }, [page]);

  const fetchPage = async () => {
    try {
      const response = await contentApi.getPage(slug!);
      const pageData = response.data.page;
      setPage(pageData);
    } catch (error) {
      console.error('Failed to fetch page:', error);
      setMessage({ type: 'error', text: 'Failed to load page' });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdatePage = (updatedPage: Page) => {
    setPage(updatedPage);
    if (propOnUpdate) {
      propOnUpdate(updatedPage);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!page) return;
    
    setSaving(true);
    setMessage(null);

    try {
      const response = await contentApi.updatePage(page.id, formData);
      handleUpdatePage(response.data);
      setMessage({ type: 'success', text: 'SEO settings updated successfully!' });
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to update SEO settings' });
    } finally {
      setSaving(false);
    }
  };

  const handleBack = () => {
    navigate('/admin/pages');
  };

  if (loading) {
    return <div className={styles.loading}>Loading page...</div>;
  }

  if (!page && slug !== 'new') {
    return <div className={styles.error}>Page not found</div>;
  }

  if (!page) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.pageEditor}>
      <div className={styles.header}>
        <button className={styles.backButton} onClick={handleBack}>
          ← Back to Pages
        </button>
        <h1>Edit {page.name}</h1>
      </div>

      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === 'sections' ? styles.active : ''}`}
          onClick={() => setActiveTab('sections')}
        >
          Sections & Content
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'seo' ? styles.active : ''}`}
          onClick={() => setActiveTab('seo')}
        >
          SEO Settings
        </button>
      </div>

      {activeTab === 'sections' ? (
        <SectionManager pageSlug={page.slug} />
      ) : (
        <form onSubmit={handleSubmit} className={styles.seoSettings}>
          {message && (
            <div className={`${styles.message} ${styles[message.type]}`}>{message.text}</div>
          )}

          <div className={styles.formGroup}>
            <label htmlFor="title">Page Title (SEO)</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter page title for search engines"
              className={styles.input}
            />
            <small>Recommended length: 50-60 characters</small>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="meta_description">Meta Description</label>
            <textarea
              id="meta_description"
              name="meta_description"
              value={formData.meta_description}
              onChange={handleChange}
              rows={3}
              placeholder="Enter meta description for search engines"
              className={styles.textarea}
            />
            <small>Recommended length: 150-160 characters</small>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="meta_keywords">Meta Keywords</label>
            <input
              type="text"
              id="meta_keywords"
              name="meta_keywords"
              value={formData.meta_keywords}
              onChange={handleChange}
              placeholder="Enter comma-separated keywords"
              className={styles.input}
            />
            <small>Comma-separated keywords (e.g., logistics, shipping, Zambia)</small>
          </div>

          <button type="submit" className={styles.saveButton} disabled={saving}>
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      )}
    </div>
  );
};