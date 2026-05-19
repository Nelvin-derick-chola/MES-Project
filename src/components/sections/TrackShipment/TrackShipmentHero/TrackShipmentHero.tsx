import React from 'react';
import { Container } from '../../../layout/Container/Container';
import { Search, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import styles from './TrackShipmentHero.module.css';

export const TrackShipmentHero: React.FC = () => {
  return (
    <section className={styles.hero}>
      <Container>
        <div className={styles.content}>
          <div className={styles.breadcrumb}>
            <Link to="/" className={styles.breadcrumbLink}>Home</Link>
            <ChevronRight size={14} className={styles.breadcrumbIcon} />
            <span className={styles.breadcrumbCurrent}>Track Shipment</span>
          </div>
          
          <div className={styles.titleWrapper}>
            <div className={styles.iconWrapper}>
              <Search size={32} />
            </div>
            <h1 className={styles.title}>Shipment Tracking</h1>
          </div>
          
          <p className={styles.subtitle}>
            Enter your tracking number to get real-time updates on your shipment
          </p>
        </div>
      </Container>
    </section>
  );
};