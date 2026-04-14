import React from 'react';
import { Container } from '../../layout/Container/Container';
import { Shield, Clock, Scale, Heart, CheckCircle, Lightbulb } from 'lucide-react';
import styles from './CoreValues.module.css';

export const CoreValues: React.FC = () => {
  const values = [
    {
      icon: <Shield size={32} />,
      title: 'Integrity',
      description: 'We uphold the highest standards of honesty and moral principles in every delivery.'
    },
    {
      icon: <Clock size={32} />,
      title: 'Reliability',
      description: 'Consistent, dependable service that our customers can count on every time.'
    },
    {
      icon: <Scale size={32} />,
      title: 'Ethical',
      description: 'We conduct business with fairness, transparency and respect for all.'
    },
    {
      icon: <Heart size={32} />,
      title: 'Honest',
      description: 'Clear communication and truthful relationships with clients and partners.'
    },
    {
      icon: <CheckCircle size={32} />,
      title: 'Accountable',
      description: 'We take ownership of our actions and deliver on our commitments.'
    },
    {
      icon: <Lightbulb size={32} />,
      title: 'Innovative',
      description: 'Continuously improving through technology and creative solutions.'
    }
  ];

  return (
    <section className={styles.coreValues}>
      <Container>
        {/* Section Header */}
        <div className={styles.header}>
          <span className={styles.sectionLabel}>Our Principles</span>
          <h2 className={styles.title}>Core Values</h2>
          <p className={styles.subtitle}>
            The foundation of everything we do — tailored for logistics excellence
          </p>
        </div>

        {/* Values Grid */}
        <div className={styles.valuesGrid}>
          {values.map((value, index) => (
            <div key={index} className={styles.valueCard}>
              <div className={styles.iconWrapper}>
                {value.icon}
              </div>
              <h3 className={styles.valueTitle}>{value.title}</h3>
              <p className={styles.valueDescription}>{value.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};