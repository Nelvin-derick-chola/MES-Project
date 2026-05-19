import { HeroCarousel } from '../../components/sections/HeroCarousel/HeroCarousel';
import { WhoWeAre } from '../../components/sections/WhoWeAre/WhoWeAre';
import { Services } from '../../components/sections/Services/Services';
import { Stats } from '../../components/sections/Stats/Stats';
import { Testimonials } from '../../components/sections/Testimonials/Testimonials';
//import { Contact } from '../../components/sections/Contact/Contact';
import { useScrollToTop } from '../../hooks/useScrollToTop';
import { MobileApp } from '../../components/sections/MobileApp/MobileApp';
import { CTASection } from '../../components/sections/CTASection/CTASection';
import { useMesApi } from '../../hooks/useMesApi';
import React, { useEffect } from 'react';
import {FAQS} from '../../components/sections/FAQS/FAQS'


export const Home: React.FC = () => {
    useScrollToTop();
  const { loading: locationsLoading, error: locationsError, locationData, getLocationData } = useMesApi();

  // Fetch location data when Home page mounts
  useEffect(() => {
    getLocationData();
  }, [getLocationData]);

  return (
    <>
      <HeroCarousel 
        locationData={locationData}
        locationsLoading={locationsLoading}
        locationsError={locationsError}
        onRetryLocations={getLocationData}
      />
      <WhoWeAre />
      <Services />
      <Stats />
      <MobileApp />
      <CTASection/>
      <Testimonials />
      <FAQS/>
      {/* <Contact/> */}
    </>
  );
};