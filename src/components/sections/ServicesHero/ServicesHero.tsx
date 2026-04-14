import React from 'react';
import { Container } from '../../layout/Container/Container';
import { Package, Plane, Ship, Truck, Warehouse } from 'lucide-react';
import styles from './ServicesHero.module.css';

export const ServicesHero: React.FC = () => {
  const stats = [
    { icon: <Package size={20} />, label: 'Express Delivery', value: 'Same Day' },
    { icon: <Plane size={20} />, label: 'Air Freight', value: 'Global' },
    { icon: <Ship size={20} />, label: 'Sea Freight', value: 'Worldwide' },
    { icon: <Truck size={20} />, label: 'Road Transport', value: 'Regional' },
    { icon: <Warehouse size={20} />, label: 'Warehousing', value: 'Secure' },
  ];

  return (
    <section className={styles.servicesHero}>
      <Container>
        <div className={styles.content}>
          <span className={styles.breadcrumb}>
            Home <span className={styles.separator}>›</span> Services
          </span>
          
          <h1 className={styles.title}>
            Comprehensive Logistics
            <span className={styles.highlight}> Solutions</span>
          </h1>
          
          <p className={styles.subtitle}>
            From express delivery to global freight forwarding, we provide end-to-end 
            logistics services tailored to your business needs.
          </p>

          <div className={styles.statsWrapper}>
            {stats.map((stat, index) => (
              <div key={index} className={styles.statItem}>
                <div className={styles.statIcon}>{stat.icon}</div>
                <div className={styles.statContent}>
                  <span className={styles.statValue}>{stat.value}</span>
                  <span className={styles.statLabel}>{stat.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};