import React from 'react';
import { Container } from '../../layout/Container/Container';
import { Target, Eye, CheckCircle } from 'lucide-react';
import styles from './MissionVision.module.css';

export const MissionVision: React.FC = () => {
  return (
    <section className={styles.missionVision}>
      <Container>
        {/* Section Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>Mission & Vision</h2>
          <p className={styles.subtitle}>Guiding our path to excellence</p>
        </div>

        {/* Mission & Vision Cards */}
        <div className={styles.cardsGrid}>
          {/* Mission Card */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.iconWrapper}>
                <Target size={28} />
              </div>
              <h3 className={styles.cardTitle}>OUR MISSION</h3>
            </div>
            <p className={styles.cardText}>
              Driving innovative solutions across all sectors of logistics ensuring 
              compliance on delivery and information flows in order to provide value 
              to <span className={styles.highlight}>"our client"</span>.
            </p>
            <div className={styles.tagline}>
              <CheckCircle size={16} className={styles.checkIcon} />
              <span>"We are about solutions, values and technology"</span>
            </div>
          </div>

          {/* Vision Card */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.iconWrapper}>
                <Eye size={28} />
              </div>
              <h3 className={styles.cardTitle}>OUR VISION</h3>
            </div>
            <p className={styles.cardText}>
              To build Mercury into leading courier and logistic brand in Southern Africa 
              with retail expansion across country and best in class overnight distribution 
              network. Offering high quality service experience through technology 
              integration to our innovative work culture and network partnership.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
};