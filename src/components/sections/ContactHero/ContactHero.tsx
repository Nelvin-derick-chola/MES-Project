import React from 'react';
import { Container } from '../../layout/Container/Container';
import styles from './ContactHero.module.css';

export const ContactHero: React.FC = () => {
  return (
    <section className={styles.contactHero}>
      <Container>
        <div className={styles.content}>
          <span className={styles.breadcrumb}>
            Home <span className={styles.separator}>›</span> Contact
          </span>
          <h1 className={styles.title}>Contact Us</h1>
        </div>
      </Container>
    </section>
  );
};