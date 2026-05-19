import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const pageTitles: Record<string, string> = {
  '/': 'Mercury Express Logistics - Home',
  '/about-us': 'About Us - Mercury Express Logistics',
  '/services': 'Our Services - Mercury Express Logistics',
  '/track-shipment': 'Track Shipment - Mercury Express Logistics',
  '/contact-us': 'Contact Us - Mercury Express Logistics',
  '/blog': 'Blog - Mercury Express Logistics',
  '/careers': 'Careers - Mercury Express Logistics',
  '/faq': 'FAQ - Mercury Express Logistics',
  '/privacy-policy': 'Privacy Policy - Mercury Express Logistics',
  '/terms-conditions': 'Terms & Conditions - Mercury Express Logistics',
};

export const usePageTitle = () => {
  const location = useLocation();

  useEffect(() => {
    const title = pageTitles[location.pathname] || 'Mercury Express Logistics';
    document.title = title;
  }, [location]);
};