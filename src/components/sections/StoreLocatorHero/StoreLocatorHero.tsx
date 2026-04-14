import React from 'react';
import { Container } from '../../layout/Container/Container';
import { MapPin } from 'lucide-react';
import styles from './StoreLocatorHero.module.css';

export const StoreLocatorHero: React.FC = () => {
  return (
    <section className={styles.hero}>
      <Container>
        <div className={styles.content}>
          <span className={styles.breadcrumb}>
            Home <span className={styles.separator}>›</span> Store Locator
          </span>
          <div className={styles.titleWrapper}>
            <div className={styles.iconWrapper}>
              <MapPin size={32} />
            </div>
            <h1 className={styles.title}>Find a Mercury Express Location</h1>
          </div>
          <p className={styles.subtitle}>
            Visit one of our {18}+ locations across Zambia for all your shipping and logistics needs
          </p>
        </div>
      </Container>
    </section>
  );
};