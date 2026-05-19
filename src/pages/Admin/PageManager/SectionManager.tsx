import React, { useState, useEffect } from 'react';
import type { Section } from '../../../services/contentApi';
import { contentApi } from '../../../services/contentApi';
import { SectionOrder } from '../../../components/admin/ContentEditor/SectionOrder';
import { ContentEditor } from '../../../components/admin/ContentEditor/ContentEditor';
import styles from './PageManager.module.css';

interface SectionManagerProps {
  pageSlug: string;
}

export const SectionManager: React.FC<SectionManagerProps> = ({ pageSlug }) => {
  const [sections, setSections] = useState<Section[]>([]);
  const [selectedSection, setSelectedSection] = useState<Section | null>(null);
  const [view, setView] = useState<'edit' | 'order'>('edit');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPageData();
  }, [pageSlug]);

  const loadPageData = async () => {
    try {
      const response = await contentApi.getPage(pageSlug);
      setSections(response.data.sections);
      if (response.data.sections.length > 0 && !selectedSection) {
        setSelectedSection(response.data.sections[0]);
      }
    } catch (error) {
      console.error('Failed to load page data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSectionSelect = (section: Section) => {
    setSelectedSection(section);
  };

  const handleSectionUpdate = (updatedSection: Section) => {
    setSections(sections.map(s => s.id === updatedSection.id ? updatedSection : s));
    setSelectedSection(updatedSection);
  };

  const handleToggleActive = async (sectionId: number) => {
    await contentApi.toggleSection(sectionId);
    loadPageData();
  };

  if (loading) {
    return <div className={styles.loading}>Loading sections...</div>;
  }

  return (
    <div className={styles.sectionManager}>
      <div className={styles.viewToggle}>
        <button
          className={`${styles.viewButton} ${view === 'edit' ? styles.active : ''}`}
          onClick={() => setView('edit')}
        >
          Edit Content
        </button>
        <button
          className={`${styles.viewButton} ${view === 'order' ? styles.active : ''}`}
          onClick={() => setView('order')}
        >
          Reorder Sections
        </button>
      </div>

      {view === 'edit' ? (
        <div className={styles.editorLayout}>
          <div className={styles.sidebar}>
            <h3 className={styles.sidebarTitle}>Sections</h3>
            <div className={styles.sectionList}>
              {sections.map((section) => (
                <div
                  key={section.id}
                  className={`${styles.sectionItem} ${selectedSection?.id === section.id ? styles.active : ''}`}
                >
                  <button
                    className={styles.sectionButton}
                    onClick={() => handleSectionSelect(section)}
                  >
                    <div className={styles.sectionInfo}>
                      <span className={styles.sectionType}>{section.type}</span>
                      <div className={styles.sectionName}>{section.name}</div>
                    </div>
                  </button>
                  <button
                    className={styles.visibilityToggle}
                    onClick={() => handleToggleActive(section.id)}
                    title={section.is_active ? 'Hide section' : 'Show section'}
                  >
                    {section.is_active ? '👁️' : '👁️‍🗨️'}
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.contentArea}>
            {selectedSection ? (
              <ContentEditor
                section={selectedSection}
                onUpdate={handleSectionUpdate}
              />
            ) : (
              <div className={styles.emptyState}>Select a section to edit</div>
            )}
          </div>
        </div>
      ) : (
        <SectionOrder sections={sections} onOrderUpdate={loadPageData} />
      )}
    </div>
  );
};