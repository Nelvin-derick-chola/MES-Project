import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../../layout/Container/Container';
import styles from './WhoWeAre.module.css';
import whoWeAreImage from '../../../assets/images/who-we-are1.png';

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

            <Link to="/about-us" className={styles.readMoreBtn}>
              Read More 
              <span className={styles.arrow}>↗</span>
            </Link>
          </div>

          {/* Right Side - Image Banner */}
          <div className={styles.imageBanner}>
            <div className={styles.imageWrapper}>
              <img 
                src={whoWeAreImage} 
                alt="Mercury Express Logistics - Trusted Delivery Partner" 
                className={styles.bannerImage}
              />
              <div className={styles.imageOverlay} />
              {/* <div className={styles.imageCaption}>
                <span className={styles.captionText}>Effective, Efficient & Excellent</span>
              </div> */}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};