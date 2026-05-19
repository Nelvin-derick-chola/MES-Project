import React from 'react';
import { Container } from '../../layout/Container/Container';
import { Shield, Zap, Users, Heart, Globe, Award } from 'lucide-react';
import styles from './CoreValues.module.css';

interface ValueItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const values: ValueItem[] = [
  {
    icon: <Shield size={28} />,
    title: 'Reliability',
    description: 'We deliver on our promises with consistency and dependability.',
  },
  {
    icon: <Zap size={28} />,
    title: 'Innovation',
    description: 'We embrace technology to enhance efficiency and transparency.',
  },
  {
    icon: <Users size={28} />,
    title: 'Customer First',
    description: 'Our customers are at the heart of everything we do.',
  },
  {
    icon: <Heart size={28} />,
    title: 'Integrity',
    description: 'We operate with honesty, transparency, and ethical practices.',
  },
  {
    icon: <Globe size={28} />,
    title: 'Global Connectivity',
    description: 'We connect Zambia to the world through strategic partnerships.',
  },
  {
    icon: <Award size={28} />,
    title: 'Service Excellence',
    description: 'We strive for excellence in every delivery and interaction.',
  },
];

export const CoreValues: React.FC = () => {
  return (
    <section className={styles.coreValues}>
      <Container>
        <div className={styles.header}>
          <h2 className={styles.title}>Our Core Values</h2>
          <p className={styles.subtitle}>
            The principles that guide everything we do at Mercury Express Logistics
          </p>
        </div>
        <div className={styles.valuesGrid}>
          {values.map((value, index) => (
            <div key={index} className={styles.valueCard}>
              <div className={styles.iconWrapper}>{value.icon}</div>
              <h3 className={styles.valueTitle}>{value.title}</h3>
              <p className={styles.valueDescription}>{value.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};