import React from 'react';
import { Container } from '../../components/layout/Container/Container';
import { LegalHero } from '../../components/sections/LegalHero/LegalHero';
import styles from './Indemnity.module.css';
import { useScrollToTop } from '../../hooks/useScrollToTop';

export const Indemnity: React.FC = () => {
  useScrollToTop();
  
  return (
    <main className={styles.indemnity}>
      <LegalHero 
        title="Indemnity & Liability"
        subtitle="Liability coverage and indemnification terms"
        icon="scale"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Indemnity' }
        ]}
      />
      
      <section className={styles.contentSection}>
        <Container>
          <div className={styles.contentWrapper}>
            
            <div className={styles.section}>
              <div className={styles.importantNotice}>
                <h2 className={styles.noticeTitle}>LIABILITIES NOT ASSUMED</h2>
                <p className={styles.text}>
                  MERCURY EXPRESS LOGISTICS WILL NOT BE LIABLE FOR DAMAGES IN EXCESS OF THE LIMITS 
                  STIPULATED UNDER "DECLARED VALUE AND LIMITS OF LIABILITY."
                </p>
              </div>
            </div>

            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>No Special or Consequential Damages</h2>
              <p className={styles.text}>
                We are not liable for special, incidental or consequential damages, including loss of profits or income.
              </p>
            </div>

            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Events Beyond Our Control</h2>
              <ul className={styles.list}>
                <li>Acts of terrorism and criminal acts</li>
                <li>Weather conditions and natural disasters</li>
                <li>Strikes and labor disruptions</li>
                <li>Pandemic conditions</li>
                <li>Disruption of communication systems</li>
              </ul>
            </div>

            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Shipper's Warranties and Indemnity</h2>
              <p className={styles.text}>
                Shipper shall indemnify and hold Mercury Express Logistics harmless for any loss 
                arising from failure to comply with laws or breach of warranties.
              </p>
              <ul className={styles.list}>
                <li>All information provided is complete and accurate</li>
                <li>Shipment is properly marked, addressed, and packed</li>
              </ul>
            </div>

            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Indemnity Agreement</h2>
              <p className={styles.text}>
                You agree to indemnify us against all claims, costs, damages, and legal expenses 
                arising from your breach of any warranties, representations, and guarantees.
              </p>
            </div>

          </div>
        </Container>
      </section>
    </main>
  );
};