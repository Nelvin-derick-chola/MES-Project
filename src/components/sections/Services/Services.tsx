import React, { useState, useEffect } from 'react';
import { Container } from '../../layout/Container/Container';
import styles from './Services.module.css';

import RoadExpress from '../../../assets/images/road-express.jpg';
import Warehousing from '../../../assets/images/warehousing.jpg';
import Distribution from '../../../assets/images/distribution.jpg';
import DomesticExpress from '../../../assets/images/domestic-express.jpg';
import ExportExpress from '../../../assets/images/export-express.jpg';
import ImportExpress from '../../../assets/images/import-express.png';

const services = [
  {
    id: 1,
    title: "RoadExpress",
    description: "With Road Express, guaranteed extensive and affordable domestic delivery of parcels between all towns within Zambia.",
    image: RoadExpress,
  },
  {
    id: 2,
    title: "Warehousing",
    description: "Mercury Express Logistics currently offers over 10,000 square meter warehousing space, servicing all storage and cross-docking requirements.",
    image: Warehousing,
  },
  {
    id: 3,
    title: "Distribution",
    description: "Our services extend beyond the walls of the warehouse. You can rely on us for your distribution service.",
    image: Distribution,
  },
  {
    id: 4,
    title: "DomesticExpress",
    description: "Domestic Express Services offers reliable door to door solutions for time-critical packages to be delivered within any city.",
    image: DomesticExpress,
  },
  {
    id: 5,
    title: "ExportExpress",
    description: "Mercury Express Logistics provides global door to door shipping solutions.",
    image: ExportExpress,
  },
  {
    id: 6,
    title: "ImportExpress",
    description: "Our courier service operates around the clock and throughout the year so we're always on hand to help.",
    image: ImportExpress,
  },
];

export const Services: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % services.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section className={styles.services}>
      <Container>
        <div className={styles.header}>
          <h2>Our Services</h2>
          <p>Comprehensive logistics solutions designed for reliability and excellence</p>
        </div>

        <div className={styles.carousel}>
          <div 
            className={styles.slideTrack}
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {services.map((service) => (
              <div key={service.id} className={styles.slide}>
                <div className={styles.imageContainer}>
                  <img src={service.image} alt={service.title} />
                </div>

                <div className={styles.content}>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <button className={styles.readMore}>Read More</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Indicators */}
        <div className={styles.indicators}>
          {services.map((_, index) => (
            <button
              key={index}
              className={`${styles.indicator} ${index === currentIndex ? styles.active : ''}`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      </Container>
    </section>
  );
};