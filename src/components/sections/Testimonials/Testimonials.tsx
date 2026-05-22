import React, { useState, useEffect, useCallback } from 'react';
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
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const nextTestimonial = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const prevTestimonial = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    // Resume auto-play after 5 seconds of inactivity
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  // ✅ FIXED: Using ReturnType<typeof setTimeout> instead of NodeJS.Timeout
  useEffect(() => {
    let interval: ReturnType<typeof setTimeout>;
    
    if (isAutoPlaying) {
      interval = setInterval(() => {
        nextTestimonial();
      }, 5000); // Change slide every 5 seconds
    }
    
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isAutoPlaying, nextTestimonial]);

  // Pause auto-play on hover
  const handleMouseEnter = () => {
    setIsAutoPlaying(false);
  };

  const handleMouseLeave = () => {
    setIsAutoPlaying(true);
  };

  // Touch events for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      // Swipe left - next slide
      nextTestimonial();
    }
    
    if (touchStart - touchEnd < -50) {
      // Swipe right - previous slide
      prevTestimonial();
    }
    
    // Reset values
    setTouchStart(0);
    setTouchEnd(0);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        prevTestimonial();
        setIsAutoPlaying(false);
      } else if (e.key === 'ArrowRight') {
        nextTestimonial();
        setIsAutoPlaying(false);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [prevTestimonial, nextTestimonial]);

  const current = testimonials[currentIndex];

  return (
    <section className={styles.testimonials}>
      <Container>
        <div className={styles.header}>
          <span className={styles.sectionLabel}>Testimonials</span>
          <h2>What our customers say</h2>
        </div>

        <div 
          className={styles.carouselWrapper}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className={styles.testimonialCard}>
            {/* Quote Icon */}
            <div className={styles.quoteIcon}>"</div>

            {/* Rating Stars */}
            <div className={styles.rating}>
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  size={18} 
                  className={styles.star} 
                  fill={i < current.rating ? "#fbbf24" : "none"}
                  stroke={i < current.rating ? "#fbbf24" : "#cbd5e1"}
                />
              ))}
            </div>

            {/* Quote */}
            <p className={styles.quote}>"{current.quote}"</p>

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
                  onClick={() => goToTestimonial(index)}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};