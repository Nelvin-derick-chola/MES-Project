import React from 'react';
import { Container } from '../../components/layout/Container/Container';
import { LegalHero } from '../../components/sections/LegalHero/LegalHero';
import styles from './Restricted.module.css';
import { useScrollToTop } from '../../hooks/useScrollToTop';

export const Restricted: React.FC = () => {
  useScrollToTop();
  
  return (
    <main className={styles.restricted}>
      <LegalHero 
        title="Restricted Items"
        subtitle="Prohibited and restricted goods for shipment"
        icon="alert"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Restricted Items' }
        ]}
      />
      
      <section className={styles.contentSection}>
        <Container>
          <div className={styles.contentWrapper}>
            
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Inspection of Shipments</h2>
              <p className={styles.text}>
                Mercury Express Logistics has the right to open and inspect a Shipment without notice.
              </p>
            </div>

            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Prohibited Items</h2>
              <ul className={styles.list}>
                <li>Dangerous goods not properly declared</li>
                <li>Illegal substances and narcotics</li>
                <li>Firearms and ammunition</li>
                <li>Explosives and flammable materials</li>
                <li>Live animals (except by special arrangement)</li>
                <li>Human remains</li>
                <li>Counterfeit goods</li>
              </ul>
            </div>

            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Restricted Items</h2>
              <ul className={styles.list}>
                <li>Perishables damaged by heat or cold</li>
                <li>Alcoholic beverages</li>
                <li>Plants and plant materials</li>
                <li>Tobacco products</li>
                <li>Fluorescent tubes and neon lighting</li>
                <li>Glass tubes and containers</li>
              </ul>
            </div>

            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Packaging Requirements</h2>
              <ul className={styles.list}>
                <li>Use manufacturer's original packaging when available</li>
                <li>Mercury Express laptop packaging required for laptops</li>
                <li>Mercury Express tablet packaging required for tablets</li>
              </ul>
            </div>

          </div>
        </Container>
      </section>
    </main>
  );
};