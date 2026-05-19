import React from 'react';
import { Container } from '../../layout/Container/Container';
import { MapPin, Globe, Users, Truck, CheckCircle, Clock, Shield, Award } from 'lucide-react';
import styles from './AboutHero.module.css';
import aboutHeroImage from '../../../assets/images/about-hero.png';

export const AboutHero: React.FC = () => {
  return (
    <section className={styles.aboutHero}>
      <Container>
        <div className={styles.grid}>
          {/* Left Content */}
          <div className={styles.content}>
            <div className={styles.breadcrumb}>
              <span>Home</span>
              <span className={styles.separator}>/</span>
              <span>About Us</span>
            </div>
            
            <h1 className={styles.headline}>
              About <span className={styles.highlight}>Mercury Express Logistics</span>
            </h1>
            
            <p className={styles.description}>
              Proudly Zambian-owned, delivering reliable logistics solutions since 2000, 
              evolving from a local courier service into a trusted full-service logistics 
              provider with national and global reach.
            </p>
            
            {/* Feature Tags */}
            <div className={styles.features}>
              <div className={styles.featureTag}>
                <span className={styles.featureIcon}>✓</span>
                <span>Nationwide Coverage</span>
              </div>
              <div className={styles.featureTag}>
                <span className={styles.featureIcon}>✓</span>
                <span>Global Partnerships</span>
              </div>
              <div className={styles.featureTag}>
                <span className={styles.featureIcon}>✓</span>
                <span>24/7 Tracking</span>
              </div>
              <div className={styles.featureTag}>
                <span className={styles.featureIcon}>✓</span>
                <span>Expert Team</span>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className={styles.imageWrapper}>
            <img 
              src={aboutHeroImage} 
              alt="Mercury Express Logistics - About Us" 
              className={styles.image}
            />
            <div className={styles.imageOverlay} />
          </div>
        </div>
      </Container>
    </section>
  );
};