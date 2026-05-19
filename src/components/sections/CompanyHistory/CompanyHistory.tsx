import React from 'react';
import { Container } from '../../layout/Container/Container';
import { Calendar, Building2, TrendingUp, Globe, Truck, Users, Package, Zap } from 'lucide-react';
import styles from './CompanyHistory.module.css';

interface HistoryItem {
  year: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const historyData: HistoryItem[] = [
  {
    year: 1994,
    title: 'The Beginning',
    description: 'Mercury Courier was established with a clear mission: to provide dependable, efficient, and customer-focused delivery solutions within Zambia.',
    icon: <Building2 size={24} />,
  },
  {
    year: 2000,
    title: 'Company Founded',
    description: 'Mercury Express Logistics was officially founded, marking the beginning of our journey in the logistics industry.',
    icon: <Calendar size={24} />,
  },
  {
    year: 2004,
    title: 'Transformation & Growth',
    description: 'Rebranded to Mercury Express Logistics (MEL), introducing broader logistics capabilities, strategic international partnerships, and alignment with global logistics players.',
    icon: <TrendingUp size={24} />,
  },
  {
    year: 2008,
    title: 'International Operations',
    description: 'Launched international shipping services, connecting Zambia to global markets through strategic partnerships.',
    icon: <Globe size={24} />,
  },
  {
    year: 2015,
    title: 'Network Expansion',
    description: 'Expanded our footprint across Zambia, developing a nationwide operational network of branches and drop centers.',
    icon: <Truck size={24} />,
  },
  {
    year: 2018,
    title: 'Digital Transformation',
    description: 'Embraced technological innovation with advanced tracking systems and enhanced communication platforms.',
    icon: <Zap size={24} />,
  },
  {
    year: 2020,
    title: 'Service Diversification',
    description: 'Expanded service portfolio to include freight forwarding, contract logistics, warehousing, customs clearance, and e-commerce logistics.',
    icon: <Package size={24} />,
  },
  {
    year: 2024,
    title: 'Today & Beyond',
    description: 'Standing as one of Zambia\'s trusted logistics providers — combining local expertise, global connectivity, and continuous innovation.',
    icon: <Users size={24} />,
  },
];

export const CompanyHistory: React.FC = () => {
  return (
    <section className={styles.historySection}>
      <Container>
        <div className={styles.header}>
          <h2 className={styles.title}>Our History</h2>
          <p className={styles.subtitle}>
            The journey of Mercury Express Logistics — from a local courier service to a trusted full-service logistics provider
          </p>
        </div>

        <div className={styles.timeline}>
          {historyData.map((item, index) => (
            <div 
              key={item.year} 
              className={`${styles.timelineItem} ${index % 2 === 0 ? styles.left : styles.right}`}
            >
              <div className={styles.timelineDot}>
                <div className={styles.timelineIcon}>
                  {item.icon}
                </div>
              </div>
              <div className={styles.timelineContent}>
                <div className={styles.yearBadge}>
                  <Calendar size={14} />
                  <span>{item.year}</span>
                </div>
                <h3 className={styles.timelineTitle}>{item.title}</h3>
                <p className={styles.timelineDescription}>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};