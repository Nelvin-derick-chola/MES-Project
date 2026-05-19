import React from 'react';
import type { Page } from '../../../services/contentApi';
import styles from './PageManager.module.css';

interface PageListProps {
  pages: Page[];
  selectedPage: Page | null;
  onSelectPage: (page: Page) => void;
}

const pageIcons: Record<string, string> = {
  home: '🏠',
  'about-us': '📖',
  services: '🚚',
  'contact-us': '📧',
  team: '👥',
  privacy: '🔒',
  indemnity: '📄',
  insurance: '🛡️',
  restricted: '⚠️',
};

export const PageList: React.FC<PageListProps> = ({ pages, selectedPage, onSelectPage }) => {
  return (
    <div className={styles.pageList}>
      {pages.map((page) => (
        <button
          key={page.id}
          className={`${styles.pageItem} ${selectedPage?.id === page.id ? styles.active : ''}`}
          onClick={() => onSelectPage(page)}
        >
          <span className={styles.pageIcon}>{pageIcons[page.slug] || '📄'}</span>
          <div className={styles.pageInfo}>
            <div className={styles.pageName}>{page.name}</div>
            <div className={styles.pageSlug}>/{page.slug}</div>
          </div>
        </button>
      ))}
    </div>
  );
};