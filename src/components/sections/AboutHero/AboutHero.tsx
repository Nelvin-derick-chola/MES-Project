import React from 'react';
import { Container } from '../../layout/Container/Container';
import { Lightbulb, Users, Settings, Award } from 'lucide-react';
import styles from './AboutHero.module.css';
import aboutImage from '../../../assets/images/trucks.jpg';

export const AboutHero: React.FC = () => {
  const features = [
    { icon: <Lightbulb size={18} />, label: 'Innovative Solutions' },
    { icon: <Users size={18} />, label: 'Customer Support' },
    { icon: <Settings size={18} />, label: 'Smart Logistics' },
    { icon: <Award size={18} />, label: 'Industry Expertise' },
  ];

  return (
    <section className={styles.aboutHero}>
      <Container>
        <div className={styles.grid}>
          {/* Left Content */}
          <div className={styles.content}>
            <span className={styles.breadcrumb}>
              Home <span className={styles.separator}>›</span> About
            </span>
            
            <h1 className={styles.headline}>
              Local Expertise -<br />
              <span className={styles.highlight}>International Capabilities</span>
            </h1>
            
            <p className={styles.description}>
              Mercury Express Logistics wholly owned Zambian company that is a leading 
              provider of comprehensive logistics and transportation solutions. We began 
              operations in 1994 under the name of Mercury Couriers, in direct response 
              to the needs of the customers we diversified our operations and developed 
              into a full service logistics company, to ensure that we offer our customers 
              the complete solution. With 11 branch offices and over 20 agent locations and 
              still growing, we are able to deliver and pick up parcels to any part of the 
              country!
              Globally, the company has access to over 200,000 employees that are able to 
              deliver efficiencies in various service offerings. We have the required knowledge, 
              employee dedication and strong culture of passion for excellence to provide the 
              best logistics solutions at very competitive rates.
              The range of services offered by Mercury Express Logistics includes international 
              and domestic express delivery, freight forwarding, contract logistics, and online 
              shopping services.
            </p>

            {/* Feature Tags */}
            <div className={styles.features}>
              {features.map((feature, index) => (
                <div key={index} className={styles.featureTag}>
                  <span className={styles.featureIcon}>{feature.icon}</span>
                  <span>{feature.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Image */}
          <div className={styles.imageWrapper}>
            <img 
              src={aboutImage} 
              alt="Mercury Express Logistics Team" 
              className={styles.image}
            />
            <div className={styles.imageOverlay} />
          </div>
        </div>
      </Container>
    </section>
  );
};