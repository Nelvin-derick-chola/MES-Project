import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../../layout/Container/Container';
import styles from './Stats.module.css';
import StatsImage from '../../../assets/images/excellence.jpeg';

export const Stats: React.FC = () => {

  return (
    <section className={styles.stats}>
      <Container>
        <div className={styles.grid}>
          {/* Left - Image with Stat Cards Overlay */}
          <div className={styles.imageWrapper}>
            <img 
              src={StatsImage} 
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
              {/* ✅ Option 1: Using Link component */}
              <Link to="/contact-us" className={styles.contactButton}>
                Contact Us
              </Link>
              
              {/* ✅ Option 2: Using button with navigation */}
              {/* <button className={styles.bookButton} onClick={handleBookCollection}>
                
              </button> */}
              <Link to="https://www.mercury.co.zm/mes/addshipment" className={styles.bookButton}>
              Book Collection
            </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};