import React from 'react';
import { Container } from '../../layout/Container/Container';
import styles from './Stats.module.css';
import trucksImage from '../../../assets/images/trucks.jpg';

export const Stats: React.FC = () => {
  return (
    <section className={styles.stats}>
      <Container>
        <div className={styles.grid}>
          {/* Left - Image with Stat Cards Overlay */}
          <div className={styles.imageWrapper}>
            <img 
              src={trucksImage} 
              alt="Mercury Express Fleet" 
              className={styles.trucksImage}
            />
            
            {/* Stats Cards - Horizontal Row Top-Left */}
            <div className={styles.statsContainer}>
              <div className={styles.statCard}>
                <span className={styles.statNumber}>153+</span>
                <span className={styles.statLabel}>Registered Customers</span>
              </div>
              <div className={styles.statCard}>
                <span className={styles.statNumber}>20+</span>
                <span className={styles.statLabel}>Years Of Experience</span>
              </div>
              <div className={styles.statCard}>
                <span className={styles.statNumber}>100+</span>
                <span className={styles.statLabel}>Cities Covered</span>
              </div>
              <div className={styles.statCard}>
                <span className={styles.statNumber}>3M</span>
                <span className={styles.statLabel}>Parcels Delivered</span>
              </div>
            </div>
          </div>

          {/* Right - Content */}
          <div className={styles.content}>
            <h2>Delivering excellence across Zambia and beyond</h2>
            <p className={styles.paragraph}>
              With over two decades of logistics expertise, Mercury Express connects businesses 
              and individuals to destinations worldwide. Our commitment to reliability and 
              speed has made us Zambia's trusted shipping partner.
            </p>
            <div className={styles.buttonGroup}>
              <button className={styles.contactButton}>Contact Us</button>
              <button className={styles.bookButton}>Book Collection</button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};