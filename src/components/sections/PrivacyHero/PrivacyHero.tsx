import React from 'react';
import { Container } from '../../layout/Container/Container';
import { Shield } from 'lucide-react';
import styles from './PrivacyHero.module.css';

export const PrivacyHero: React.FC = () => {
  return (
    <section className={styles.privacyHero}>
      <Container>
        <div className={styles.content}>
          <span className={styles.breadcrumb}>
            Home <span className={styles.separator}>›</span> Legal <span className={styles.separator}>›</span> Privacy Policy
          </span>
          <div className={styles.titleWrapper}>
            <div className={styles.iconWrapper}>
              <Shield size={32} />
            </div>
            <h1 className={styles.title}>Privacy Policy</h1>
          </div>
          <p className={styles.subtitle}>
            How we collect, use, and protect your personal information
          </p>
          <p className={styles.effectiveDate}>
            Effective Date: January 1, 2024 | Last Updated: January 1, 2024
          </p>
        </div>
      </Container>
    </section>
  );
};