import React from 'react';
import { Container } from '../../components/layout/Container/Container';
import { ServicesHero } from '../../components/sections/ServicesHero/ServicesHero';
import { Plane, Ship, Truck, Warehouse, Globe, Package, Building2 } from 'lucide-react';
import styles from './Services.module.css';

import { useScrollToTop } from '../../hooks/useScrollToTop';
import { CTASection } from '../../components/sections/CTASection/CTASection';

import airFreightImg from '../../assets/images/services/air-freight.jpg';
import oceanFreightImg from '../../assets/images/services/ocean-freight.jpg';
import crossBorderImg from '../../assets/images/services/Cross Border Road Freight.jpeg';
import multimodalImg from '../../assets/images/services/multimodal.jpg';
import roadFreightImg from '../../assets/images/services/road-freight.jpeg';
import warehousingImg from '../../assets/images/services/warehousing.jpeg';
import pharmaceuticalImg from '../../assets/images/services/pharmaceutical.jpg';
import distributionImg from '../../assets/images/services/distribution.jpeg';

import exportExpressImg from '../../assets/images/services/export-express.jpeg';
import importExpressImg from '../../assets/images/services/import-express.jpeg';
import domesticExpressImg from '../../assets/images/services/domestic-express.jpeg';

interface ServiceCard {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  image: string;
}

const services: ServiceCard[] = [
  {
    id: 1,
    icon: <Plane size={32} />,
    title: 'Air Freight',
    description: 'Global and cost-effective air freight solutions with complete door-to-door transportation and smooth customs clearance.',
    features: [
      'Worldwide network coverage',
      'Real-time shipment tracking',
      'Door-to-door delivery',
      'Customs clearance expertise',
    ],
    image: airFreightImg,
  },
  {
    id: 2,
    icon: <Ship size={32} />,
    title: 'Ocean Freight',
    description: 'Comprehensive ocean freight forwarding including FCL, LCL, import/export, and project cargo solutions.',
    features: [
      'Full Container Loads (FCL)',
      'Less Than Container Loads (LCL)',
      'Door-to-door or door-to-port',
      'Export & import clearance',
    ],
    image: oceanFreightImg,
  },
  {
    id: 3,
    icon: <Globe size={32} />,
    title: 'Cross Border Road Freight',
    description: 'Effective transportation and freight management covering Southern, Central and Eastern Africa.',
    features: [
      'Full Truck Load (FTL)',
      'Less than Truck Load (LTL)',
      'Buyer consolidation',
      'Regional connectivity',
    ],
    image: crossBorderImg,
  },
  {
    id: 4,
    icon: <Truck size={32} />,
    title: 'Multimodal Freight',
    description: 'Mix modes of shipping for cost-effective and convenient delivery of your goods.',
    features: [
      'Air-land combinations',
      'Cost-effective solutions',
      'Innovative routing',
      'Outstanding delivery system',
    ],
    image: multimodalImg,
  },
  {
    id: 5,
    icon: <Truck size={32} />,
    title: 'Road Freight',
    description: 'One of the largest and most advanced land freight networks in Zambia with modern truck fleets.',
    features: [
      'Modern truck fleets',
      'Scheduled services',
      'Strategic terminal hubs',
      'Proof of Delivery (POD)',
    ],
    image: roadFreightImg,
  },
  {
    id: 6,
    icon: <Warehouse size={32} />,
    title: 'Warehousing',
    description: 'Over 10,000 sqm warehousing space with comprehensive storage and cross-docking capabilities.',
    features: [
      '10,000+ sqm space',
      'Bulk & break-bulk management',
      'Nationwide distribution',
      'Proof of Delivery (POD)',
    ],
    image: warehousingImg,
  },
  {
    id: 7,
    icon: <Building2 size={32} />,
    title: 'Pharmaceutical Warehousing',
    description: 'Specialized warehousing for pharmaceutical products with temperature control and regulatory compliance.',
    features: [
      'Temperature controlled',
      'Government compliant',
      'International standards',
      'Proper stock handling',
    ],
    image: pharmaceuticalImg,
  },
  {
    id: 8,
    icon: <Package size={32} />,
    title: 'Distribution',
    description: 'Reliable distribution services delivering products to customers through dedicated fleet trucks.',
    features: [
      'Dedicated fleet trucks',
      'Massive land network',
      'Complete visibility',
      'Proof of Delivery notes',
    ],
    image: distributionImg,
  },
];

// Border posts and airports information
const locations = {
  borderPosts: ['Kazungula', 'Chirundu', 'Chirundu'],
  airports: ['Kenneth Kaunda International Airport'],
};

export const Services: React.FC = () => {
  useScrollToTop();
  
  return (
    <main className={styles.services}>
      <ServicesHero />
      
      {/* Services Grid */}
      <section className={styles.servicesSection}>
        <Container>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Our Logistics Services</h2>
            <p className={styles.sectionSubtitle}>
              Comprehensive solutions tailored to meet your shipping and logistics needs across Zambia and beyond
            </p>
          </div>
          
          <div className={styles.servicesGrid}>
            {services.map((service) => (
              <div key={service.id} className={styles.serviceCard}>
                <div className={styles.cardImage}>
                  <img src={service.image} alt={service.title} />
                  <div className={styles.imageOverlay} />
                  <div className={styles.cardIcon}>
                    {service.icon}
                  </div>
                </div>
                <div className={styles.cardContent}>
                  <h3 className={styles.cardTitle}>{service.title}</h3>
                  <p className={styles.cardDescription}>{service.description}</p>
                  <ul className={styles.featuresList}>
                    {service.features.map((feature, idx) => (
                      <li key={idx} className={styles.featureItem}>
                        <span className={styles.featureIcon}>✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Express Services Section */}
      <section className={styles.expressSection}>
        <Container>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Express Services</h2>
            <p className={styles.sectionSubtitle}>
              Fast, reliable door-to-door shipping solutions across Zambia and around the world
            </p>
          </div>
          
          <div className={styles.expressGrid}>
            {/* Export Express */}
            <div className={styles.expressCard}>
              <div className={styles.cardImage}>
                <img 
                  src={exportExpressImg} 
                  alt="Export Express" 
                />
                <div className={styles.imageOverlay} />
                <div className={styles.cardIcon}>
                  <Globe size={32} />
                </div>
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>Export Express</h3>
                <p className={styles.cardDescription}>
                  Mercury Express Logistics provides global door-to-door shipping solutions for your packages. 
                  With Export Express, you can ship and send your packages, door-to-door and to anywhere in 
                  the world — all you need to do is visit an office near you.
                </p>
                <ul className={styles.featuresList}>
                  <li className={styles.featureItem}>
                    <span className={styles.featureIcon}>✓</span>
                    <span>Global door-to-door shipping</span>
                  </li>
                  <li className={styles.featureItem}>
                    <span className={styles.featureIcon}>✓</span>
                    <span>Worldwide network coverage</span>
                  </li>
                  <li className={styles.featureItem}>
                    <span className={styles.featureIcon}>✓</span>
                    <span>Visit any office near you</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Import Express */}
            <div className={styles.expressCard}>
              <div className={styles.cardImage}>
                <img 
                  src={importExpressImg} 
                  alt="Import Express" 
                />
                <div className={styles.imageOverlay} />
                <div className={styles.cardIcon}>
                  <Package size={32} />
                </div>
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>Import Express</h3>
                <p className={styles.cardDescription}>
                  With Import Express, we bring the world closer to your doorstep in smarter ways. 
                  Our courier service operates around the clock and throughout the year so we are always 
                  on hand to help, and do our best to transport your goods to wherever you need and at 
                  whatever time you specify.
                </p>
                <ul className={styles.featuresList}>
                  <li className={styles.featureItem}>
                    <span className={styles.featureIcon}>✓</span>
                    <span>24/7/365 operations</span>
                  </li>
                  <li className={styles.featureItem}>
                    <span className={styles.featureIcon}>✓</span>
                    <span>Doorstep delivery</span>
                  </li>
                  <li className={styles.featureItem}>
                    <span className={styles.featureIcon}>✓</span>
                    <span>Flexible timing options</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Domestic Express */}
            <div className={styles.expressCard}>
              <div className={styles.cardImage}>
                <img 
                  src={domesticExpressImg} 
                  alt="Domestic Express" 
                />
                <div className={styles.imageOverlay} />
                <div className={styles.cardIcon}>
                  <Truck size={32} />
                </div>
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>Domestic Express</h3>
                <p className={styles.cardDescription}>
                  Domestic Express Services offers reliable door-to-door solutions for time-critical 
                  packages to be delivered to any city/town within Zambia or within your city. 
                  We pick up and deliver your packages within agreed delivery times.
                </p>
                <ul className={styles.featuresList}>
                  <li className={styles.featureItem}>
                    <span className={styles.featureIcon}>✓</span>
                    <span>Nationwide coverage</span>
                  </li>
                  <li className={styles.featureItem}>
                    <span className={styles.featureIcon}>✓</span>
                    <span>Pickup and delivery</span>
                  </li>
                  <li className={styles.featureItem}>
                    <span className={styles.featureIcon}>✓</span>
                    <span>Agreed delivery times</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Customs Clearance Locations */}
      <section className={styles.locationsSection}>
        <Container>
          <div className={styles.locationsCard}>
            <h3 className={styles.locationsTitle}>Customs Clearance Presence</h3>
            <div className={styles.locationsGrid}>
              <div className={styles.locationGroup}>
                <span className={styles.locationLabel}>Border Posts</span>
                <div className={styles.locationTags}>
                  {locations.borderPosts.map((post) => (
                    <span key={post} className={styles.locationTag}>{post}</span>
                  ))}
                </div>
              </div>
              <div className={styles.locationGroup}>
                <span className={styles.locationLabel}>International Airports</span>
                <div className={styles.locationTags}>
                  {locations.airports.map((airport) => (
                    <span key={airport} className={styles.locationTag}>{airport}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <CTASection/>
    </main>
  );
};