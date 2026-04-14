import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '../../common/Button/Button';
import { Container } from '../../layout/Container/Container';
import styles from './HeroCarousel.module.css';

import domesticImage from '../../../assets/images/domestic.jpg';
import heroImage from '../../../assets/images/hero-2.jpeg';

type ShipmentType = 'domestic' | 'international';
type PackageType = 'document' | 'parcel';

interface Slide {
  id: number;
  image: string;
  title: string;
  heading: string;
  description: string;
}

interface EstimateFormData {
  shipmentType: ShipmentType;
  from: string;
  to: string;
  packageType: PackageType;
  weight: string;
}

const slides: Slide[] = [
  {
    id: 1,
    image: domesticImage,
    title: 'REAL-TIME LOGISTICS',
    heading: 'Track your shipment',
    description: 'Get instant updates on your package\'s journey.',
  },
  {
    id: 2,
    image: heroImage,
    title: 'FAST & RELIABLE',
    heading: 'Nationwide Express Delivery',
    description: 'From Lusaka to every corner of Zambia and beyond.',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1494412651409-8963ce7935a7?q=80&w=2070',
    title: 'GLOBAL REACH',
    heading: 'International Shipping',
    description: 'Connecting Zambia to the world with secure, tracked air and sea freight solutions.',
  },
];

// Zambian Cities (Domestic)
const zambianCities = [
  'Lusaka',
  'Kitwe',
  'Ndola',
  'Livingstone',
  'Chipata',
  'Kabwe',
  'Solwezi',
  'Chingola',
  'Kasama',
  'Mansa',
  'Mongu',
  'Choma',
  'Mazabuka',
  'Kafue',
  'Chililabombwe',
  'Luanshya',
  'Mufulira',
  'Kapiri Mposhi',
];

// International Cities (City names only)
const internationalCities = [
  'Johannesburg',
  'Cape Town',
  'Durban',
  'Harare',
  'Bulawayo',
  'Lilongwe',
  'Blantyre',
  'Gaborone',
  'Windhoek',
  'Maputo',
  'Dar es Salaam',
  'Nairobi',
  'Lubumbashi',
  'Kinshasa',
  'London',
  'Dubai',
  'Mumbai',
  'Guangzhou',
  'Shanghai',
  'New York',
];

export const HeroCarousel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null);
  
  // Estimate form state
  const [formData, setFormData] = useState<EstimateFormData>({
    shipmentType: 'domestic',
    from: 'Lusaka',
    to: 'Kitwe',
    packageType: 'document',
    weight: '',
  });

  // Get available cities based on shipment type
  const getAvailableCities = useCallback(() => {
    return formData.shipmentType === 'domestic' ? zambianCities : internationalCities;
  }, [formData.shipmentType]);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  // Auto-play logic with pause on hover
  useEffect(() => {
    if (!isAutoPlaying || isHovered) return;
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, isHovered, nextSlide]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 8000);
  };

  const handleShipmentTypeChange = (type: ShipmentType) => {
    const availableCities = type === 'domestic' ? zambianCities : internationalCities;
    setFormData((prev) => ({ 
      ...prev, 
      shipmentType: type,
      from: availableCities[0],
      to: availableCities[1] || availableCities[0],
    }));
    setEstimatedPrice(null);
  };

  const handlePackageTypeChange = (type: PackageType) => {
    setFormData((prev) => ({ 
      ...prev, 
      packageType: type,
      weight: ''
    }));
    setEstimatedPrice(null);
  };

  const handleInputChange = (field: keyof EstimateFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setEstimatedPrice(null);
  };

  const calculateEstimate = (): number => {
    const weight = parseFloat(formData.weight) || 0;
    const isDomestic = formData.shipmentType === 'domestic';
    const isDocument = formData.packageType === 'document';
    
    // Base price calculation
    let basePrice = 0;
    
    if (isDomestic) {
      basePrice = isDocument ? 150 : 250;
      if (weight > 0) {
        basePrice += weight * (isDocument ? 20 : 35);
      }
    } else {
      basePrice = isDocument ? 500 : 800;
      if (weight > 0) {
        basePrice += weight * (isDocument ? 50 : 80);
      }
    }
    
    // Tax calculation (16% VAT)
    const tax = basePrice * 0.16;
    const total = Math.round((basePrice + tax) * 100) / 100;
    
    return total;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const price = calculateEstimate();
    setEstimatedPrice(price);
  };

  const getWeightPlaceholder = (): string => {
    if (formData.packageType === 'document') {
      return 'Weight (1 - 2.5) kg';
    }
    return 'Weight (0 - 500) kg';
  };

  const getWeightStep = (): string => {
    return formData.packageType === 'document' ? '0.1' : '0.5';
  };

  const current = slides[currentSlide];
  const availableCities = getAvailableCities();

  return (
    <section 
      className={styles.hero}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Slides */}
      <div className={styles.slidesContainer}>
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`${styles.slide} ${index === currentSlide ? styles.active : ''}`}
            style={{ backgroundImage: `url(${slide.image})` }}
          />
        ))}
      </div>

      <div className={styles.overlay} />

      {/* Navigation Arrows */}
      <button className={`${styles.arrow} ${styles.arrowLeft}`} onClick={prevSlide} aria-label="Previous slide">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>
      <button className={`${styles.arrow} ${styles.arrowRight}`} onClick={nextSlide} aria-label="Next slide">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>

      <Container>
        <div className={styles.content}>
          {/* Left Side - Text Content */}
          <div className={styles.textContent}>
            <div className={styles.badge}>{current.title}</div>
            <h1 className={styles.heading}>{current.heading}</h1>
            <p className={styles.description}>{current.description}</p>
          </div>

          {/* Right Side - Estimate Form Card */}
          <div className={styles.estimateCard}>
            {/* Shipment Type Toggle */}
            <div className={styles.shipmentToggle}>
              <button
                type="button"
                className={`${styles.toggleOption} ${formData.shipmentType === 'domestic' ? styles.active : ''}`}
                onClick={() => handleShipmentTypeChange('domestic')}
              >
                Domestic
              </button>
              <button
                type="button"
                className={`${styles.toggleOption} ${formData.shipmentType === 'international' ? styles.active : ''}`}
                onClick={() => handleShipmentTypeChange('international')}
              >
                International
              </button>
            </div>

            <form onSubmit={handleSubmit} className={styles.estimateForm}>
              {/* From / To */}
              <div className={styles.locationRow}>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>From</label>
                  <select
                    value={formData.from}
                    onChange={(e) => handleInputChange('from', e.target.value)}
                    className={styles.select}
                  >
                    {availableCities.map((city) => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>To</label>
                  <select
                    value={formData.to}
                    onChange={(e) => handleInputChange('to', e.target.value)}
                    className={styles.select}
                  >
                    {availableCities.map((city) => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Shipment Categories */}
              <div className={styles.packageTypes}>
                <label className={styles.sectionLabel}>Shipment Categories</label>
                <div className={styles.packageToggle}>
                  <button
                    type="button"
                    className={`${styles.packageOption} ${formData.packageType === 'document' ? styles.active : ''}`}
                    onClick={() => handlePackageTypeChange('document')}
                  >
                    <span className={styles.packageIcon}>📄</span>
                    <span className={styles.packageName}>Document</span>
                    <span className={styles.packageRange}>Weight (1 - 2.5) kg</span>
                  </button>
                  <button
                    type="button"
                    className={`${styles.packageOption} ${formData.packageType === 'parcel' ? styles.active : ''}`}
                    onClick={() => handlePackageTypeChange('parcel')}
                  >
                    <span className={styles.packageIcon}>📦</span>
                    <span className={styles.packageName}>Parcel</span>
                    <span className={styles.packageRange}>Weight (0 - 500) kg</span>
                  </button>
                </div>
              </div>

              {/* Weight */}
              <div className={styles.weightSection}>
                <label className={styles.label}>Weight</label>
                <div className={styles.weightInputWrapper}>
                  <input
                    type="number"
                    value={formData.weight}
                    onChange={(e) => handleInputChange('weight', e.target.value)}
                    placeholder={getWeightPlaceholder()}
                    step={getWeightStep()}
                    min={formData.packageType === 'document' ? '1' : '0'}
                    max={formData.packageType === 'document' ? '2.5' : '500'}
                    className={styles.weightInput}
                    required
                  />
                  <span className={styles.weightUnit}>kg</span>
                </div>
              </div>

              <Button type="submit" variant="primary" size="lg" className={styles.submitButton}>
                Get Estimate
              </Button>
            </form>

            {/* Compact Estimate Result */}
            {estimatedPrice !== null && (
              <div className={styles.estimateResult}>
                <span className={styles.resultLabel}>Estimated Price</span>
                <div className={styles.resultPrice}>
                  <span className={styles.currency}>ZMW</span>
                  <span className={styles.price}>{estimatedPrice.toFixed(2)}</span>
                </div>
                <p className={styles.resultDisclaimer}>*Final price may vary</p>
              </div>
            )}
          </div>
        </div>

        {/* Slide Indicators */}
        <div className={styles.indicatorsWrapper}>
          <div className={styles.indicators}>
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`${styles.indicator} ${index === currentSlide ? styles.activeIndicator : ''}`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};