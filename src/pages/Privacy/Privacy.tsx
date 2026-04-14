import React from 'react';
import { Container } from '../../components/layout/Container/Container';
import { LegalHero } from '../../components/sections/LegalHero/LegalHero';
import styles from './Privacy.module.css';
import { useScrollToTop } from '../../hooks/useScrollToTop';

export const Privacy: React.FC = () => {
  useScrollToTop();
  
  return (
    <main className={styles.privacy}>
      <LegalHero 
        title="Privacy Policy"
        subtitle="How we collect, use, and protect your personal information"
        icon="shield"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Privacy Policy' }
        ]}
      />
      
      <section className={styles.contentSection}>
        <Container>
          <div className={styles.contentWrapper}>
            
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Introduction</h2>
              <p className={styles.text}>
                Mercury Express Logistics ("we," "our," or "us") is committed to protecting your privacy. 
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information 
                when you use our courier and logistics services.
              </p>
              <p className={styles.text}>
                We are a wholly owned Zambian company operating since 1994, with 11 branch offices and 
                over 20 agent locations across the country.
              </p>
            </div>

            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Information We Collect</h2>
              <ul className={styles.list}>
                <li>Full name and contact details (email, phone, physical address)</li>
                <li>Shipping and delivery information</li>
                <li>Payment and billing information</li>
                <li>Government-issued identification (for customs clearance)</li>
                <li>Business information for corporate accounts</li>
              </ul>
            </div>

            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Account Information</h2>
              <p className={styles.text}>
                A valid Mercury Express Logistics account number is required for all shipments. 
                Account numbers are issued by our finance department and are not transferable.
              </p>
            </div>

            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Data Security</h2>
              <p className={styles.text}>
                We implement appropriate technical and organizational security measures to protect 
                your personal information, including secure servers, firewalls, and access controls.
              </p>
            </div>

            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Your Rights</h2>
              <ul className={styles.list}>
                <li><strong>Access:</strong> Request a copy of your personal data</li>
                <li><strong>Rectification:</strong> Correct inaccurate data</li>
                <li><strong>Erasure:</strong> Request deletion of your data</li>
                <li><strong>Objection:</strong> Object to processing activities</li>
              </ul>
            </div>

            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Contact Us</h2>
              <div className={styles.contactCard}>
                <div className={styles.contactRow}>
                  <span className={styles.contactLabel}>Email:</span>
                  <span>enquiries@mercury.co.zm</span>
                </div>
                <div className={styles.contactRow}>
                  <span className={styles.contactLabel}>Phone:</span>
                  <span>+260 971 269 390-29</span>
                </div>
              </div>
            </div>

          </div>
        </Container>
      </section>
    </main>
  );
};