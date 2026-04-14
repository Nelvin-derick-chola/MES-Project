import React from 'react';
import { Container } from '../../layout/Container/Container';
import { Globe, Truck, Plane, Award } from 'lucide-react';
import styles from './WhoWeAre.module.css';

export const WhoWeAre: React.FC = () => {
  return (
    <section className={styles.whoWeAre}>
      <Container>
        <div className={styles.contentGrid}>
          {/* Left Side - Text Content */}
          <div className={styles.textContent}>
            <div className={styles.sectionLabel}>WHO WE ARE</div>
            
            <h2>We are your trusted delivery partner</h2>
            
            <p className={styles.description}>
              We are your delivery partner and we are able to deliver shipments of any kind, 
              to any preferred place of your destination — whether by air, ocean, road 
              (both international and local). Our shipping abilities give you our valued 
              customers the personalised attention you need.
            </p>

            <p className={styles.description}>
              Our systems are trackable and traceable 24/7. We are continually improving 
              our transportation network to give you a competitive advantage in the evolving 
              market by getting your shipments faster and more efficiently.
            </p>

            <button className={styles.readMoreBtn}>
              Read More 
              <span className={styles.arrow}>↗</span>
            </button>
          </div>

          {/* Right Side - Visual Banner */}
          <div className={styles.visualBanner}>
            <div className={styles.bannerContent}>
              <div className={styles.welcome}>Welcome To</div>
              <h3 className={styles.logoText}>
                MERCURY <span className={styles.express}>EXPRESS LOGISTICS</span>
              </h3>
              <p className={styles.tagline}>Local Expertise, International Capabilities</p>

              {/* Decorative Icons */}
              <div className={styles.icons}>
                <div className={styles.iconCircle}>
                  <Plane size={28} />
                </div>
                <div className={styles.iconCircle}>
                  <Truck size={28} />
                </div>
                <div className={styles.iconCircle}>
                  <Award size={28} />
                </div>
              </div>
            </div>

            {/* Globe Background Effect */}
            <div className={styles.globeContainer}>
              <Globe size={220} className={styles.globe} />
              <div className={styles.mapOverlay} />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};