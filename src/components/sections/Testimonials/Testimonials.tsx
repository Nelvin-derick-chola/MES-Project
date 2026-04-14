import React, { useState } from 'react';
import { Container } from '../../layout/Container/Container';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import styles from './Testimonials.module.css';

// Import testimonial images
import person1 from '../../../assets/images/person1.png';
import person2 from '../../../assets/images/person2.jpg';
import person3 from '../../../assets/images/person3.jpg';

const testimonials = [
  {
    id: 1,
    quote: "Goods are delivered on time to my home",
    name: "Brandon Mwaba",
    role: "Domestic Courier",
    image: person1,
    rating: 5,
  },
  {
    id: 2,
    quote: "Reliable international shipping, my packages always arrive safely",
    name: "Sarah Tembo",
    role: "Business Owner",
    image: person2,
    rating: 5,
  },
  {
    id: 3,
    quote: "Best logistics company in Zambia, highly recommended",
    name: "James Banda",
    role: "Regular Customer",
    image: person3,
    rating: 5,
  },
];

export const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const current = testimonials[currentIndex];

  return (
    <section className={styles.testimonials}>
      <Container>
        <div className={styles.header}>
          <span className={styles.sectionLabel}>Testimonials</span>
          <h2>What our customers say</h2>
        </div>

        <div className={styles.testimonialCard}>
          {/* Quote Icon */}
          <div className={styles.quoteIcon}>"</div>

          {/* Rating Stars */}
          <div className={styles.rating}>
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={18} className={styles.star} fill="#fbbf24" />
            ))}
          </div>

          {/* Quote */}
          <p className={styles.quote}>{current.quote}</p>

          {/* Author */}
          <div className={styles.author}>
            <div className={styles.avatar}>
              <img src={current.image} alt={current.name} />
            </div>
            <div className={styles.authorInfo}>
              <h4 className={styles.name}>{current.name}</h4>
              <p className={styles.role}>{current.role}</p>
            </div>
          </div>

          {/* Navigation Arrows */}
          <div className={styles.navigation}>
            <button 
              className={styles.arrowButton} 
              onClick={prevTestimonial}
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              className={styles.arrowButton} 
              onClick={nextTestimonial}
              aria-label="Next testimonial"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className={styles.dots}>
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`${styles.dot} ${index === currentIndex ? styles.activeDot : ''}`}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};