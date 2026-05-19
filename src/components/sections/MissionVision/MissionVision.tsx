import React from 'react';
import { Container } from '../../layout/Container/Container';
import { Target, Eye } from 'lucide-react';
import styles from './MissionVision.module.css';

export const MissionVision: React.FC = () => {
  return (
    <section className={styles.missionVision}>
      <Container>
        <div className={styles.header}>
          <h2 className={styles.title}>Our Mission & Vision</h2>
          <p className={styles.subtitle}>
            Guiding principles that drive our commitment to excellence in logistics
          </p>
        </div>
        
        <div className={styles.grid}>
          {/* Mission Card */}
          <div className={styles.card}>
            <div className={styles.iconWrapper}>
              <Target size={32} />
            </div>
            <h3>Our Mission</h3>
            <p>
              To provide dependable, efficient, and customer-focused delivery solutions within Zambia 
              and beyond, leveraging innovation, strategic partnerships, and operational excellence 
              to connect businesses, people, and opportunities.
            </p>
          </div>

          {/* Vision Card */}
          <div className={styles.card}>
            <div className={styles.iconWrapper}>
              <Eye size={32} />
            </div>
            <h3>Our Vision</h3>
            <p>
              To become Zambia's most trusted logistics provider — combining local expertise, 
              global connectivity, and a commitment to continuous innovation to power the future 
              of logistics in Africa.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
};