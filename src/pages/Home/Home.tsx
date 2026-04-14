import React from 'react';
import { HeroCarousel } from '../../components/sections/HeroCarousel/HeroCarousel';
import { WhoWeAre } from '../../components/sections/WhoWeAre/WhoWeAre';
import { Services } from '../../components/sections/Services/Services';
import { Stats } from '../../components/sections/Stats/Stats';
import { Testimonials } from '../../components/sections/Testimonials/Testimonials';
import { Contact } from '../../components/sections/Contact/Contact';
import { useScrollToTop } from '../../hooks/useScrollToTop';
import { MobileApp } from '../../components/sections/MobileApp/MobileApp';
import { CTASection } from '../../components/sections/CTASection/CTASection';

export const Home: React.FC = () => {
  useScrollToTop();
  
  return (
    <>
      <HeroCarousel />
      <WhoWeAre />
      <Services />
      <Stats />
      <MobileApp />
      <Testimonials />
      <CTASection/>
      <Contact/>

    </>
  );
};