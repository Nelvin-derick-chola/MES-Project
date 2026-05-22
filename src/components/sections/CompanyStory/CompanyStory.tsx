import React from 'react';
import { Container } from '../../layout/Container/Container';
import { Quote} from 'lucide-react';
import styles from './CompanyStory.module.css';

export const CompanyStory: React.FC = () => {
  return (
    <section className={styles.companyStory}>
      <Container>
        <div className={styles.storyWrapper}>
          <div className={styles.quoteIcon}>
            <Quote size={48} />
          </div>

          {/* Who We Are Section */}
          <div className={styles.storyContent}>
            <h2 className={styles.title}>Who We Are</h2>
            <div className={styles.storyText}>
              <p className={styles.firstParagraph}>
                Mercury Express Logistics is a dynamic logistics and supply chain company built on trust, 
                innovation, and service excellence. With over 30 years of combined logistics expertise in Zambia, 
                we understand the importance of speed, security, and consistency in every delivery.
              </p>
              <p>
                We are driven by a customer-first philosophy that focuses on creating dependable logistics experiences 
                for businesses, institutions, and individuals alike. Our experienced team combines local market knowledge 
                with global logistics capabilities to deliver solutions that are efficient, flexible, and cost-effective.
              </p>
              <p>
                As the logistics landscape continues to evolve, we remain committed to embracing technology, strengthening 
                partnerships, and expanding our reach to better serve our customers across Zambia and internationally.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};