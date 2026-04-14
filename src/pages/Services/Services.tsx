import React from 'react';
import { Container } from '../../components/layout/Container/Container';
import { ServicesHero } from '../../components/sections/ServicesHero/ServicesHero';
import { Plane, Ship, Truck, Warehouse, Globe, ClipboardCheck, Package, Building2 } from 'lucide-react';
import styles from './Services.module.css';

import { useScrollToTop } from '../../hooks/useScrollToTop';
import { CTASection } from '../../components/sections/CTASection/CTASection';

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
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600',
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
    image: 'https://images.unsplash.com/photo-1494412651409-8963ce7935a7?w=600',
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
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600',
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
    image: 'https://images.unsplash.com/photo-1580674285054-bed31e145f59?w=600',
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
    image: 'https://images.unsplash.com/photo-1580674285054-bed31e145f59?w=600',
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
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600',
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
    image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=600',
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
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600',
  },
  {
    id: 9,
    icon: <ClipboardCheck size={32} />,
    title: 'Customs Clearance',
    description: 'Complete customs services to move goods across international borders efficiently and quickly.',
    features: [
      'Document preparation',
      'Border post presence',
      'Airport clearance',
      'Import & export expertise',
    ],
    image: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=600',
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
                  <button className={styles.learnMoreBtn}>
                    Learn More
                  </button>
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
              <div className={styles.expressIcon}>
                <Globe size={28} />
              </div>
              <h3 className={styles.expressTitle}>Export Express</h3>
              <p className={styles.expressDescription}>
                Mercury Express Logistics provides global door-to-door shipping solutions for your packages. 
                With Export Express, you can ship and send your packages, door-to-door and to anywhere in 
                the world — all you need to do is visit an office near you.
              </p>
              <ul className={styles.expressFeatures}>
                <li className={styles.expressFeature}>
                  <span className={styles.featureIcon}>✓</span>
                  <span>Global door-to-door shipping</span>
                </li>
                <li className={styles.expressFeature}>
                  <span className={styles.featureIcon}>✓</span>
                  <span>Worldwide network coverage</span>
                </li>
                <li className={styles.expressFeature}>
                  <span className={styles.featureIcon}>✓</span>
                  <span>Visit any office near you</span>
                </li>
              </ul>
            </div>

            {/* Import Express */}
            <div className={styles.expressCard}>
              <div className={styles.expressIcon}>
                <Package size={28} />
              </div>
              <h3 className={styles.expressTitle}>Import Express</h3>
              <p className={styles.expressDescription}>
                With Import Express, we bring the world closer to your doorstep in smarter ways. 
                Our courier service operates around the clock and throughout the year so we are always 
                on hand to help, and do our best to transport your goods to wherever you need and at 
                whatever time you specify.
              </p>
              <ul className={styles.expressFeatures}>
                <li className={styles.expressFeature}>
                  <span className={styles.featureIcon}>✓</span>
                  <span>24/7/365 operations</span>
                </li>
                <li className={styles.expressFeature}>
                  <span className={styles.featureIcon}>✓</span>
                  <span>Doorstep delivery</span>
                </li>
                <li className={styles.expressFeature}>
                  <span className={styles.featureIcon}>✓</span>
                  <span>Flexible timing options</span>
                </li>
              </ul>
            </div>

            {/* Domestic Express */}
            <div className={styles.expressCard}>
              <div className={styles.expressIcon}>
                <Truck size={28} />
              </div>
              <h3 className={styles.expressTitle}>Domestic Express</h3>
              <p className={styles.expressDescription}>
                Domestic Express Services offers reliable door-to-door solutions for time-critical 
                packages to be delivered to any city/town within Zambia or within your city. 
                We pick up and deliver your packages within agreed delivery times.
              </p>
              <ul className={styles.expressFeatures}>
                <li className={styles.expressFeature}>
                  <span className={styles.featureIcon}>✓</span>
                  <span>Nationwide coverage</span>
                </li>
                <li className={styles.expressFeature}>
                  <span className={styles.featureIcon}>✓</span>
                  <span>Pickup and delivery</span>
                </li>
                <li className={styles.expressFeature}>
                  <span className={styles.featureIcon}>✓</span>
                  <span>Agreed delivery times</span>
                </li>
              </ul>
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