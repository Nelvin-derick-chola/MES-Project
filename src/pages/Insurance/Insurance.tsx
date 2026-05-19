import React from 'react';
import { Container } from '../../components/layout/Container/Container';
import { LegalHero } from '../../components/sections/LegalHero/LegalHero';
import styles from './Insurance.module.css';
import { useScrollToTop } from '../../hooks/useScrollToTop';

export const Insurance: React.FC = () => {
  useScrollToTop();
  
  return (
    <main className={styles.insurance}>
      <LegalHero 
        title="Insurance Coverage"
        subtitle="Shipment protection and insurance policies"
        icon="umbrella"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Insurance Coverage' }
        ]}
      />
      
      <section className={styles.contentSection}>
        <Container>
          <div className={styles.contentWrapper}>
            
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Shipment Insurance</h2>
              <p className={styles.text}>
                Insurance is available at <strong>2% of the total value</strong> of goods being sent.
              </p>
              {/* <p className={styles.text}>
                <strong>Insurance is Optional for each shipment.</strong>
              </p> */}
            </div>

            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>What Insurance Covers</h2>
              <ul className={styles.list}>
                <li>Loss of the Shipment</li>
                <li>Physical damage to the Shipment</li>
              </ul>
              <p className={styles.text}>
                Coverage is for actual cash value only.
              </p>
            </div>

            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>What Insurance Does NOT Cover</h2>
              <ul className={styles.list}>
                <li>Indirect loss or damage</li>
                <li>Loss or damage caused by delays</li>
                <li>Consequential damages</li>
                <li>Loss of profits or income</li>
              </ul>
            </div>

            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Time Limits for Claims</h2>
              <div className={styles.importantNotice}>
                <p className={styles.text}>
                  <strong>Written claim must be submitted within 24 hours</strong> of notification of loss or damage.
                </p>
              </div>
              <p className={styles.text}>
                Claims after 7 days will not be processed.
              </p>
            </div>

            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Claims Contact</h2>
              <div className={styles.contactCard}>
                <div className={styles.contactRow}>
                  <span className={styles.contactLabel}>Email:</span>
                  <span>claims@mercury.co.zm</span>
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