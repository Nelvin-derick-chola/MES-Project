import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '../../common/Button/Button';
import { Container } from '../../layout/Container/Container';
import { useMesApi } from '../../../hooks/useMesApi';
import { AlertCircle, RefreshCw } from 'lucide-react';
import styles from './HeroCarousel.module.css';

import domesticImage from '../../../assets/images/domestic.jpg';
import heroImage from '../../../assets/images/hero-2.jpeg';
import heroImage3 from '../../../assets/images/hero-3.jpeg';


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
  country: string;           // ✅ Single country for international (both from/to same country)
  fromCity: string;
  toCity: string;
  packageType: PackageType;
  weight: string;
}

interface CityData {
  id: number;
  name: string;
  country_id: number;
  country_name?: string;
}

interface CountryData {
  id: number;
  name: string;
  cities: CityData[];
}

interface CountryStateCityResponse {
  message: string;
  status: boolean;
  data: {
    country: any[];
  };
}

interface HeroCarouselProps {
  locationData: CountryStateCityResponse | null;
  locationsLoading: boolean;
  locationsError: string | null;
  onRetryLocations: () => void;
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
    image: heroImage3,
    title: 'GLOBAL REACH',
    heading: 'International Shipping',
    description: 'Connecting Zambia to the world with secure, tracked air and sea freight solutions.',
  },
];

export const HeroCarousel: React.FC<HeroCarouselProps> = ({ 
  locationData,
  locationsLoading: _locationsLoading,
  locationsError,
  onRetryLocations 
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);
  
  // State for API location data
  const [zambianCities, setZambianCities] = useState<CityData[]>([]);
  const [internationalCountries, setInternationalCountries] = useState<CountryData[]>([]);
  const [locationsLoaded, setLocationsLoaded] = useState(false);
  
  const { loading, getFreightCharge } = useMesApi();
  
  // Estimate form state
  const [formData, setFormData] = useState<EstimateFormData>({
    shipmentType: 'domestic',
    country: 'Zambia',
    fromCity: '',
    toCity: '',
    packageType: 'document',
    weight: '',
  });

  // Get available cities for selected country
  const getCitiesForCountry = (countryName: string): CityData[] => {
    const country = internationalCountries.find(c => c.name === countryName);
    return country?.cities || [];
  };

  // Process the nested API response
  useEffect(() => {
    if (locationData && locationData.data && locationData.data.country) {
      try {
        const countries = locationData.data.country;
        const zambiaCities: CityData[] = [];
        const internationalCountriesList: CountryData[] = [];
        const seenZambiaCities = new Set<string>();
        const seenCountries = new Set<string>();
        
        countries.forEach((country: any) => {
          const countryId = Number(country.id);
          const countryName = country.country_name;
          const states = country.state || [];
          
          // Check if this is Zambia
          const isZambia = countryId === 3 || countryName === "Zambia";
          
          if (isZambia) {
            // Process Zambian cities
            states.forEach((state: any) => {
              const cities = state.city || [];
              cities.forEach((city: any) => {
                const cityId = Number(city.id);
                const cityName = city.city_name;
                
                if (!seenZambiaCities.has(cityName)) {
                  seenZambiaCities.add(cityName);
                  zambiaCities.push({
                    id: cityId,
                    name: cityName,
                    country_id: countryId,
                    country_name: countryName,
                  });
                }
              });
            });
          } else {
            // Process international countries - only include countries with cities
            const countryCities: CityData[] = [];
            
            states.forEach((state: any) => {
              const cities = state.city || [];
              cities.forEach((city: any) => {
                const cityId = Number(city.id);
                const cityName = city.city_name;
                
                countryCities.push({
                  id: cityId,
                  name: cityName,
                  country_id: countryId,
                  country_name: countryName,
                });
              });
            });
            
            // Only add country if it has at least one city
            if (countryCities.length > 0 && !seenCountries.has(countryName)) {
              seenCountries.add(countryName);
              internationalCountriesList.push({
                id: countryId,
                name: countryName,
                cities: countryCities,
              });
            }
          }
        });
        
        // Sort alphabetically
        zambiaCities.sort((a, b) => a.name.localeCompare(b.name));
        internationalCountriesList.sort((a, b) => a.name.localeCompare(b.name));
        
        setZambianCities(zambiaCities);
        setInternationalCountries(internationalCountriesList);
        
        // Set default form values
        if (zambiaCities.length > 0) {
          setFormData(prev => ({
            ...prev,
            fromCity: prev.fromCity || zambiaCities[0].name,
            toCity: prev.toCity || (zambiaCities.length > 1 ? zambiaCities[1].name : zambiaCities[0].name),
          }));
        }
        
        // Set default international country and cities
        if (internationalCountriesList.length > 0) {
          const firstCountry = internationalCountriesList[0];
          const firstCountryCities = getCitiesForCountry(firstCountry.name);
          
          setFormData(prev => ({
            ...prev,
            country: prev.country || firstCountry.name,
            fromCity: prev.fromCity || (firstCountryCities[0]?.name || ''),
            toCity: prev.toCity || (firstCountryCities[1]?.name || firstCountryCities[0]?.name || ''),
          }));
        }
        
        setLocationsLoaded(true);
      } catch (err) {
        console.error('[Processing Error]', err);
      }
    }
  }, [locationData]);

  // Get available cities for the selected country (international only)
  const getAvailableCities = useCallback((): CityData[] => {
    if (formData.shipmentType === 'domestic') {
      return zambianCities;
    }
    return getCitiesForCountry(formData.country);
  }, [formData.shipmentType, formData.country, zambianCities]);

  // Helper functions for IDs
  const getCityId = (cityName: string, isDomestic: boolean): number => {
    if (isDomestic) {
      const city = zambianCities.find(c => c.name === cityName);
      return city?.id || 1;
    }
    
    const cities = getCitiesForCountry(formData.country);
    const city = cities.find(c => c.name === cityName);
    return city?.id || 1;
  };

  const getCountryId = (isDomestic: boolean): number => {
    if (isDomestic) return 3;
    
    const country = internationalCountries.find(c => c.name === formData.country);
    return country?.id || 142;
  };

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

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
    if (type === 'domestic') {
      setFormData((prev) => ({ 
        ...prev, 
        shipmentType: type,
        fromCity: zambianCities[0]?.name || '',
        toCity: zambianCities[1]?.name || zambianCities[0]?.name || '',
      }));
    } else {
      const firstCountry = internationalCountries[0];
      const firstCountryCities = firstCountry ? getCitiesForCountry(firstCountry.name) : [];
      
      setFormData((prev) => ({ 
        ...prev, 
        shipmentType: type,
        country: firstCountry?.name || '',
        fromCity: firstCountryCities[0]?.name || '',
        toCity: firstCountryCities[1]?.name || firstCountryCities[0]?.name || '',
      }));
    }
    setEstimatedPrice(null);
    setApiError(null);
  };

  const handleCountryChange = (countryName: string) => {
    const newCities = getCitiesForCountry(countryName);
    setFormData((prev) => ({ 
      ...prev, 
      country: countryName,
      fromCity: newCities[0]?.name || '',
      toCity: newCities[1]?.name || newCities[0]?.name || '',
    }));
    setEstimatedPrice(null);
    setApiError(null);
  };

  const handleInputChange = (field: keyof EstimateFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setEstimatedPrice(null);
    setApiError(null);
  };

  const handlePackageTypeChange = (type: PackageType) => {
    setFormData((prev) => ({ 
      ...prev, 
      packageType: type,
      weight: ''
    }));
    setEstimatedPrice(null);
    setApiError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);
    
    const weight = parseFloat(formData.weight) || 0;
    if (weight <= 0) {
      setApiError('Please enter a valid weight');
      return;
    }

    try {
      const isDomestic = formData.shipmentType === 'domestic';
      
      let sourceCountryId: number;
      let sourceCityId: number;
      let destCountryId: number;
      let destCityId: number;
      
      if (isDomestic) {
        sourceCountryId = 3;
        sourceCityId = getCityId(formData.fromCity, true);
        destCountryId = 3;
        destCityId = getCityId(formData.toCity, true);
      } else {
        // ✅ For international, both from/to use the same country
        sourceCountryId = getCountryId(false);
        sourceCityId = getCityId(formData.fromCity, false);
        destCountryId = sourceCountryId;  // Same country
        destCityId = getCityId(formData.toCity, false);
      }
      
      const requestData = [{
        id: "1",
        vendor_id: import.meta.env.VITE_MES_VENDOR_ID || "1",
        source_country: sourceCountryId,
        source_city: sourceCityId,
        destination_country: destCountryId,
        destination_city: destCityId,
        insurance: isDomestic ? 1 : 1,
        pieces: 1,
        length: formData.packageType === 'document' ? 1 : 1,
        width: formData.packageType === 'document' ? 1 : 1,
        height: formData.packageType === 'document' ? 1 : 1,
        gross_weight: weight,
        declared_value: 1,
      }];

      const result = await getFreightCharge(
        requestData,
        import.meta.env.VITE_MES_DOMESTIC_SERVICE_ID || '1',
        import.meta.env.VITE_MES_INTERNATIONAL_SERVICE_ID || '4'
      );
      
      if (result && result.error_code === 508) {
        setEstimatedPrice(result.rate);
      } else {
        setApiError(result?.error_msg || 'Unable to calculate estimate');
      }
    } catch (err) {
      console.error('Estimate error:', err);
      setApiError('Unable to calculate estimate. Please try again.');
    }
  };

  const getWeightPlaceholder = (): string => {
    if (formData.packageType === 'document') {
      return 'Weight (.1 - 2.5) kg';
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
          {locationsLoaded && !locationsError && (
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

              {/* Error State */}
              {locationsError && (
                <div className={styles.locationError}>
                  <AlertCircle size={18} />
                  <span>{locationsError}</span>
                  <button 
                    className={styles.retryButton}
                    onClick={onRetryLocations}
                  >
                    <RefreshCw size={14} />
                    Retry
                  </button>
                </div>
              )}

              <form onSubmit={handleSubmit} className={styles.estimateForm}>
                {/* International: Country + City selects */}
                {formData.shipmentType === 'international' ? (
                  <>
                    {/* Country Selection (same for both from/to) */}
                    <div className={styles.inputGroup}>
                      <label className={styles.label}>Country</label>
                      <select
                        value={formData.country}
                        onChange={(e) => handleCountryChange(e.target.value)}
                        className={styles.select}
                        disabled={loading}
                      >
                        {internationalCountries.map((country) => (
                          <option key={country.id} value={country.name}>
                            {country.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* From City & To City */}
                    <div className={styles.locationRow}>
                      <div className={styles.inputGroup}>
                        <label className={styles.label}>From City</label>
                        <select
                          value={formData.fromCity}
                          onChange={(e) => handleInputChange('fromCity', e.target.value)}
                          className={styles.select}
                          disabled={loading || availableCities.length === 0}
                        >
                          {availableCities.map((city) => (
                            <option key={city.id} value={city.name}>
                              {city.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className={styles.inputGroup}>
                        <label className={styles.label}>To City</label>
                        {/* For the "To City" dropdown, optionally filter out the selected "From City" */}
<select
  value={formData.toCity}
  onChange={(e) => handleInputChange('toCity', e.target.value)}
  className={styles.select}
  disabled={loading}
>
  {availableCities
    .filter(city => city.name !== formData.fromCity)
    .map((city) => (
      <option key={city.id} value={city.name}>
        {city.name}
      </option>
    ))}
</select>
                      </div>
                    </div>
                  </>
                ) : (
                  /* Domestic: City selects only */
                  <div className={styles.locationRow}>
                    <div className={styles.inputGroup}>
                      <label className={styles.label}>From City</label>
                      <select
                        value={formData.fromCity}
                        onChange={(e) => handleInputChange('fromCity', e.target.value)}
                        className={styles.select}
                        disabled={loading}
                      >
                        {zambianCities.map((city) => (
                          <option key={city.id} value={city.name}>
                            {city.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className={styles.inputGroup}>
                      <label className={styles.label}>To City</label>
                      <select
                        value={formData.toCity}
                        onChange={(e) => handleInputChange('toCity', e.target.value)}
                        className={styles.select}
                        disabled={loading}
                      >
                        {zambianCities.map((city) => (
                          <option key={city.id} value={city.name}>
                            {city.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}

                {/* Shipment Categories */}
                <div className={styles.packageTypes}>
                  <label className={styles.sectionLabel}>Shipment Categories</label>
                  <div className={styles.packageToggle}>
                    <button
                      type="button"
                      className={`${styles.packageOption} ${formData.packageType === 'document' ? styles.active : ''}`}
                      onClick={() => handlePackageTypeChange('document')}
                      disabled={loading}
                    >
                      <span className={styles.packageIcon}>📄</span>
                      <span className={styles.packageName}>Document</span>
                      <span className={styles.packageRange}>Weight (.1 - 2.5) kg</span>
                    </button>
                    <button
                      type="button"
                      className={`${styles.packageOption} ${formData.packageType === 'parcel' ? styles.active : ''}`}
                      onClick={() => handlePackageTypeChange('parcel')}
                      disabled={loading}
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
                      min={formData.packageType === 'document' ? 0 : 0}
                      max={formData.packageType === 'document' ? 2.5 : 500}
                      className={styles.weightInput}
                      required
                      disabled={loading}
                    />
                    <span className={styles.weightUnit}>kg</span>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  variant="primary" 
                  size="lg" 
                  className={styles.submitButton}
                  disabled={loading}
                >
                  Get Estimate
                </Button>
              </form>

              {/* API Error Message */}
              {apiError && (
                <div className={styles.apiError}>
                  <AlertCircle size={14} />
                  <span>{apiError}</span>
                </div>
              )}

              {/* Estimate Result */}
              {estimatedPrice !== null && !apiError && (
                <div className={styles.estimateResult}>
                  <div className={styles.resultPrice}>
                    <span className={styles.currency}>ZMW</span>
                    <span className={styles.price}>{estimatedPrice.toFixed(2)}</span>
                  </div>
                  <p className={styles.resultNote}>*Final price may vary based on exact weight and dimensions</p>
                </div>
              )}
            </div>
          )}
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