import React, { useState } from 'react';
import { Container } from '../../components/layout/Container/Container';
import { StoreLocatorHero } from '../../components/sections/StoreLocatorHero/StoreLocatorHero';
import { MapPin, Phone, Clock, Mail, Search, Navigation } from 'lucide-react';
import { useScrollToTop } from '../../hooks/useScrollToTop';
import styles from './StoreLocator.module.css';

interface StoreLocation {
  id: number;
  city: string;
  address: string;
  phone: string;
  email: string;
  hours: string;
  services: string[];
  isMain?: boolean;
}

const storeLocations: StoreLocation[] = [
  {
    id: 1,
    city: 'Lusaka (Main Office)',
    address: 'Plot 6392 Dundudza Chididza Road, Longacres, Lusaka',
    phone: '+260 971 269 390',
    email: 'lusaka@mercury.co.zm',
    hours: 'Mon-Fri: 07:45 - 17:15, Sat: 08:00 - 13:00',
    services: ['Express Delivery', 'Air Freight', 'Sea Freight', 'Warehousing', 'Customs Clearance'],
    isMain: true,
  },
  {
    id: 2,
    city: 'Kitwe',
    address: 'Plot 1245, President Avenue, Nkana East, Kitwe',
    phone: '+260 971 269 391',
    email: 'kitwe@mercury.co.zm',
    hours: 'Mon-Fri: 08:00 - 17:00, Sat: 08:00 - 13:00',
    services: ['Express Delivery', 'Road Freight', 'Warehousing', 'Pick and Pack'],
  },
  {
    id: 3,
    city: 'Ndola',
    address: 'Plot 789, Broadway, Ndola Central, Ndola',
    phone: '+260 971 269 392',
    email: 'ndola@mercury.co.zm',
    hours: 'Mon-Fri: 08:00 - 17:00, Sat: 08:00 - 13:00',
    services: ['Express Delivery', 'Cross Border Road Freight', 'Warehousing'],
  },
  {
    id: 4,
    city: 'Livingstone',
    address: 'Plot 456, Mosi-Oa-Tunya Road, Livingstone',
    phone: '+260 971 269 393',
    email: 'livingstone@mercury.co.zm',
    hours: 'Mon-Fri: 08:00 - 17:00, Sat: 08:00 - 12:00',
    services: ['Express Delivery', 'Cross Border Road Freight', 'Customs Clearance'],
  },
  {
    id: 5,
    city: 'Chipata',
    address: 'Plot 234, Umodzi Highway, Chipata',
    phone: '+260 971 269 394',
    email: 'chipata@mercury.co.zm',
    hours: 'Mon-Fri: 08:00 - 17:00, Sat: 08:00 - 12:00',
    services: ['Express Delivery', 'Cross Border Road Freight', 'Customs Clearance'],
  },
  {
    id: 6,
    city: 'Kabwe',
    address: 'Plot 567, Independence Avenue, Kabwe',
    phone: '+260 971 269 395',
    email: 'kabwe@mercury.co.zm',
    hours: 'Mon-Fri: 08:00 - 17:00, Sat: 08:00 - 12:00',
    services: ['Express Delivery', 'Road Freight', 'Warehousing'],
  },
  {
    id: 7,
    city: 'Solwezi',
    address: 'Plot 890, Kansanshi Road, Solwezi',
    phone: '+260 971 269 396',
    email: 'solwezi@mercury.co.zm',
    hours: 'Mon-Fri: 08:00 - 17:00, Sat: 08:00 - 12:00',
    services: ['Express Delivery', 'Road Freight', 'Mining Logistics'],
  },
  {
    id: 8,
    city: 'Chingola',
    address: 'Plot 123, Kabundi Road, Chingola',
    phone: '+260 971 269 397',
    email: 'chingola@mercury.co.zm',
    hours: 'Mon-Fri: 08:00 - 17:00, Sat: 08:00 - 12:00',
    services: ['Express Delivery', 'Road Freight', 'Mining Logistics'],
  },
];

const agentLocations = [
  { city: 'Kasama', phone: '+260 971 269 400' },
  { city: 'Mansa', phone: '+260 971 269 401' },
  { city: 'Mongu', phone: '+260 971 269 402' },
  { city: 'Choma', phone: '+260 971 269 403' },
  { city: 'Mazabuka', phone: '+260 971 269 404' },
  { city: 'Kafue', phone: '+260 971 269 405' },
  { city: 'Chililabombwe', phone: '+260 971 269 406' },
  { city: 'Luanshya', phone: '+260 971 269 407' },
  { city: 'Mufulira', phone: '+260 971 269 408' },
  { city: 'Kapiri Mposhi', phone: '+260 971 269 409' },
];

export const StoreLocator: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Scroll to top on page load
  useScrollToTop();

  const filteredStores = storeLocations.filter(store =>
    store.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    store.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleGetDirections = (address: string) => {
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`, '_blank');
  };

  return (
    <main className={styles.storeLocator}>
      <StoreLocatorHero />
      
      <section className={styles.contentSection}>
        <Container>
          {/* Search Bar */}
          <div className={styles.searchWrapper}>
            <div className={styles.searchInput}>
              <Search size={18} className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search by city or address..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchField}
              />
            </div>
          </div>

          {/* Stats */}
          <div className={styles.statsGrid}>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>{storeLocations.length}</span>
              <span className={styles.statLabel}>Branch Offices</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>{agentLocations.length}</span>
              <span className={styles.statLabel}>Agent Locations</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>18</span>
              <span className={styles.statLabel}>Cities Covered</span>
            </div>
          </div>

          {/* Store Grid */}
          <div className={styles.storeGrid}>
            {filteredStores.length > 0 ? (
              filteredStores.map((store) => (
                <div key={store.id} className={`${styles.storeCard} ${store.isMain ? styles.mainStore : ''}`}>
                  {store.isMain && (
                    <span className={styles.mainBadge}>Main Office</span>
                  )}
                  <div className={styles.storeHeader}>
                    <h3 className={styles.storeCity}>{store.city}</h3>
                  </div>
                  
                  <div className={styles.storeInfo}>
                    <div className={styles.infoRow}>
                      <MapPin size={14} className={styles.infoIcon} />
                      <span>{store.address}</span>
                    </div>
                    <div className={styles.infoRow}>
                      <Phone size={14} className={styles.infoIcon} />
                      <a href={`tel:${store.phone.replace(/\s/g, '')}`}>{store.phone}</a>
                    </div>
                    <div className={styles.infoRow}>
                      <Mail size={14} className={styles.infoIcon} />
                      <a href={`mailto:${store.email}`}>{store.email}</a>
                    </div>
                    <div className={styles.infoRow}>
                      <Clock size={14} className={styles.infoIcon} />
                      <span>{store.hours}</span>
                    </div>
                  </div>

                  <div className={styles.servicesList}>
                    <span className={styles.servicesLabel}>Services Available:</span>
                    <div className={styles.servicesTags}>
                      {store.services.map((service, idx) => (
                        <span key={idx} className={styles.serviceTag}>{service}</span>
                      ))}
                    </div>
                  </div>

                  <button 
                    className={styles.directionsBtn}
                    onClick={() => handleGetDirections(store.address)}
                  >
                    <Navigation size={14} />
                    Get Directions
                  </button>
                </div>
              ))
            ) : (
              <div className={styles.noResults}>
                <p>No locations found matching "{searchTerm}"</p>
                <button onClick={() => setSearchTerm('')}>Clear Search</button>
              </div>
            )}
          </div>

          {/* Agent Locations */}
          <div className={styles.agentSection}>
            <h3 className={styles.agentTitle}>Agent Locations</h3>
            <div className={styles.agentGrid}>
              {agentLocations.map((agent, index) => (
                <div key={index} className={styles.agentCard}>
                  <span className={styles.agentCity}>{agent.city}</span>
                  <a href={`tel:${agent.phone.replace(/\s/g, '')}`} className={styles.agentPhone}>
                    <Phone size={12} />
                    {agent.phone}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
};