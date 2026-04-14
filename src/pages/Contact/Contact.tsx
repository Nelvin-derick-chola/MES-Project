import React from 'react';
import { ContactHero } from '../../components/sections/ContactHero/ContactHero';
import { Contact } from '../../components/sections/Contact/Contact';
import styles from './Contact.module.css';
import { useScrollToTop } from '../../hooks/useScrollToTop';

export const ContactPage: React.FC = () => {
  useScrollToTop();
  
  return (
    <main className={styles.contactPage}>
      <ContactHero />
      <Contact />
    </main>
  );
};