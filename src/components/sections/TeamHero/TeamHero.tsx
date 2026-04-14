import React from 'react';
import { Container } from '../../layout/Container/Container';
import { Users } from 'lucide-react';
import styles from './TeamHero.module.css';

export const TeamHero: React.FC = () => {
  return (
    <section className={styles.teamHero}>
      <Container>
        <div className={styles.content}>
          <span className={styles.breadcrumb}>
            Home <span className={styles.separator}>›</span> Company <span className={styles.separator}>›</span> Our Team
          </span>
          <div className={styles.titleWrapper}>
            <div className={styles.iconWrapper}>
              <Users size={32} />
            </div>
            <h1 className={styles.title}>Our Team</h1>
          </div>
          <p className={styles.subtitle}>
            Meet the dedicated professionals driving Mercury Express Logistics forward
          </p>
        </div>
      </Container>
    </section>
  );
};