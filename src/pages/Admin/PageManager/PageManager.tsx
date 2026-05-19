import React, { useState, useEffect } from 'react';
import { PageList } from './PageList';
import { PageEditor } from './PageEditor';
import { SectionManager } from './SectionManager';
import { contentApi } from '../../../services/contentApi';
import type { Page } from '../../../services/contentApi';
import styles from './PageManager.module.css';

export const PageManager: React.FC = () => {
  const [pages, setPages] = useState<Page[]>([]);
  const [selectedPage, setSelectedPage] = useState<Page | null>(null);
  const [activeTab, setActiveTab] = useState<'sections' | 'seo'>('sections');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPages();
  }, []);

  const loadPages = async () => {
    try {
      const response = await contentApi.getPages();
      setPages(response.data);
    } catch (error) {
      console.error('Failed to load pages:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageSelect = (page: Page) => {
    setSelectedPage(page);
    setActiveTab('sections');
  };

  if (loading) {
    return <div className={styles.loading}>Loading pages...</div>;
  }

  return (
    <div className={styles.pageManager}>
      <div className={styles.sidebar}>
        <h2 className={styles.sidebarTitle}>Pages</h2>
        <PageList pages={pages} selectedPage={selectedPage} onSelectPage={handlePageSelect} />
      </div>

      <div className={styles.mainContent}>
        {selectedPage ? (
          <>
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

            {activeTab === 'seo' ? (
              <PageEditor page={selectedPage} onUpdate={setSelectedPage} />
            ) : (
              <SectionManager pageSlug={selectedPage.slug} />
            )}
          </>
        ) : (
          <div className={styles.emptyState}>Select a page from the sidebar to start editing</div>
        )}
      </div>
    </div>
  );
};