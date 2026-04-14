import React from 'react';
import { Card } from '../../common/Card/Card';
import { Container } from '../../layout/Container/Container';
import { Clock, ClipboardList } from 'lucide-react';
import styles from './QuickActions.module.css';

export const QuickActions: React.FC = () => {
  return (
    <section className={styles.quickActions}>
      <Container>
        <div className={styles.grid}>
          {/* Book a Collection Card */}
          <Card className={styles.actionCard}>
            <div className={styles.iconWrapper}>
              <Clock size={52} strokeWidth={1.6} />
            </div>
            <h3>Book a collection</h3>
            <p>Schedule a pickup from your location at a time that suits you. Our team will collect your parcel quickly and safely.</p>
            <button className={styles.actionButton}>
              Book Collection
            </button>
          </Card>

          {/* Track Shipments Card */}
          <Card className={styles.actionCard}>
            <div className={styles.iconWrapper}>
              <ClipboardList size={52} strokeWidth={1.6} />
            </div>
            <h3>Track Shipments</h3>
            <p>Monitor your deliveries in real-time with detailed updates on location, status, and estimated arrival time.</p>
            <button className={styles.actionButton}>
              Track Shipments
            </button>
          </Card>
        </div>
      </Container>
    </section>
  );
};