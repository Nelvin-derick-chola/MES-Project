import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search, Calendar, LogIn, UserPlus, ChevronDown, Users, Building2, Phone, Shield, FileText, AlertTriangle, Umbrella, Mail, Clock, MapPin } from 'lucide-react';
import { Button } from '../../common/Button/Button';
import { Container } from '../Container/Container';
import logo from '../../../assets/images/MES-logo.png';
import styles from './Navbar.module.css';

import { TrackModal } from '../../common/TrackModal/TrackModal';

interface DropdownItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  description?: string;
}

interface NavLink {
  label: string;
  href: string;
  hasDropdown?: boolean;
  dropdownItems?: DropdownItem[];
}

const navLinks: NavLink[] = [
  { label: 'Home', href: '/' },
  { 
    label: 'Services', 
    href: '/services',
    hasDropdown: false,
  },
  { 
    label: 'Company', 
    href: '/company', 
    hasDropdown: true,
    dropdownItems: [
      { label: 'About Us', href: '/about-us', icon: <Building2 size={20} />, description: 'Learn about Mercury' },
      { label: 'Our Team', href: '/team', icon: <Users size={20} />, description: 'Meet our experts' },
      { label: 'Contact', href: '/contact-us', icon: <Phone size={20} />, description: 'Get in touch' },
    ]
  },
  { 
    label: 'Legal', 
    href: '/legal', 
    hasDropdown: true,
    dropdownItems: [
      { label: 'Privacy Policy', href: '/privacy', icon: <Shield size={20} />, description: 'Data protection' },
      { label: 'Indemnity', href: '/indemnity', icon: <FileText size={20} />, description: 'Liability coverage' },
      { label: 'Restricted Items', href: '/restricted', icon: <AlertTriangle size={20} />, description: 'Prohibited goods' },
      { label: 'Insurance Coverage', href: '/insurance', icon: <Umbrella size={20} />, description: 'Shipment protection' },
    ]
  },
];

export const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthDropdownOpen, setIsAuthDropdownOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const location = useLocation();
  const [isTrackModalOpen, setIsTrackModalOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const handleDropdownEnter = (label: string) => {
    setOpenDropdown(label);
  };

  const handleDropdownLeave = () => {
    setOpenDropdown(null);
  };

  const handleTrack = () => {
    setIsTrackModalOpen(true);
    closeMenu();
  };

  const handleBook = () => {
    console.log('Book collection clicked');
    closeMenu();
  };

  const handleSignIn = () => {
    console.log('Sign In clicked');
    setIsAuthDropdownOpen(false);
  };

  const handleRegister = () => {
    console.log('Register clicked');
    setIsAuthDropdownOpen(false);
  };

  const isActive = (href: string): boolean => {
    if (href === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(href);
  };

  const isDropdownActive = (link: NavLink): boolean => {
    if (!link.dropdownItems) return false;
    return link.dropdownItems.some(item => location.pathname.startsWith(item.href));
  };

  return (
    <nav className={styles.navbar}>
      {/* Top Contact Bar */}
      <div className={styles.contactBar}>
        <Container>
          <div className={styles.contactContent}>
            <div className={styles.contactInfo}>
              <a href="mailto:enquiries@mercury.co.zm" className={styles.contactLink}>
                <Mail size={14} />
                <span>enquiries@mercury.co.zm</span>
              </a>
              <a href="tel:+26097126939029" className={styles.contactLink}>
                <Phone size={14} />
                <span>+260 971 269 390-29</span>
              </a>
              <span className={styles.contactItem}>
                <Clock size={14} />
                <span>07:45 AM - 17:15 PM</span>
              </span>
              <Link to="/store-locator" className={styles.contactLink}>
                <MapPin size={14} />
                <span>Store Locator</span>
              </Link>
            </div>
          </div>
        </Container>
      </div>

      {/* Main Navigation */}
      <div className={styles.mainNav}>
        <Container>
          <div className={styles.navContent}>
            {/* Logo */}
            <Link to="/" className={styles.logo}>
              <img 
                src={logo} 
                alt="Mercury Express Logistics" 
                className={styles.logoImage}
              />
            </Link>

            {/* Desktop Navigation Links */}
            <div className={styles.desktopNav}>
              {navLinks.map((link) => (
                <div
                  key={link.label}
                  className={styles.navItem}
                  onMouseEnter={() => link.hasDropdown && handleDropdownEnter(link.label)}
                  onMouseLeave={handleDropdownLeave}
                >
                  <Link 
                    to={link.href} 
                    className={`${styles.navLink} ${isActive(link.href) ? styles.active : ''} ${isDropdownActive(link) ? styles.activeDropdown : ''}`}
                    onClick={closeMenu}
                  >
                    {link.label}
                    {link.hasDropdown && <ChevronDown size={14} className={styles.dropdownArrow} />}
                  </Link>
                  
                  {link.hasDropdown && openDropdown === link.label && link.dropdownItems && (
                    <div className={styles.dropdownMenu}>
                      <div className={styles.dropdownGrid}>
                        {link.dropdownItems.map((item) => (
                          <Link 
                            key={item.label} 
                            to={item.href} 
                            className={`${styles.dropdownCard} ${location.pathname.startsWith(item.href) ? styles.activeDropdownItem : ''}`}
                            onClick={closeMenu}
                          >
                            <div className={styles.dropdownIcon}>
                              {item.icon}
                            </div>
                            <div className={styles.dropdownContent}>
                              <span className={styles.dropdownLabel}>{item.label}</span>
                              {item.description && (
                                <span className={styles.dropdownDescription}>{item.description}</span>
                              )}
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Action Buttons - Track & Book */}
            <div className={styles.actionButtons}>
              <button className={styles.trackBtn} onClick={handleTrack}>
                <Search size={16} />
                <span>Track Shipment</span>
              </button>
              <button className={`${styles.bookBtn} ${styles.pulseAnimation}`} onClick={handleBook}>
                <Calendar size={16} />
                <span>Book Collection</span>
              </button>
            </div>

            {/* Split Button Auth */}
            <div className={styles.splitAuth}>
              <button className={styles.signInMain} onClick={handleSignIn}>
                <LogIn size={16} />
                <span>Sign In</span>
              </button>
              <div 
                className={styles.dropdownWrapper}
                onMouseEnter={() => setIsAuthDropdownOpen(true)}
                onMouseLeave={() => setIsAuthDropdownOpen(false)}
              >
                <button className={styles.dropdownTrigger}>
                  <ChevronDown size={16} />
                </button>
                {isAuthDropdownOpen && (
                  <div className={styles.splitDropdown}>
                    <button className={styles.registerOption} onClick={handleRegister}>
                      <UserPlus size={18} />
                      <div>
                        <div className={styles.optionTitle}>Create Account</div>
                        <div className={styles.optionSubtitle}>New customer? Register here</div>
                      </div>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Hamburger Button (Mobile) */}
            <button 
              className={styles.hamburger} 
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </Container>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className={styles.mobileMenu}>
          <div className={styles.mobileMenuContent}>
            {navLinks.map((link) => (
              <div key={link.label} className={styles.mobileNavSection}>
                <Link 
                  to={link.href} 
                  className={`${styles.mobileNavLink} ${isActive(link.href) ? styles.activeMobile : ''}`}
                  onClick={closeMenu}
                >
                  {link.label}
                </Link>
                {link.hasDropdown && link.dropdownItems && (
                  <div className={styles.mobileDropdown}>
                    {link.dropdownItems.map((item) => (
                      <Link 
                        key={item.label} 
                        to={item.href} 
                        className={`${styles.mobileDropdownItem} ${location.pathname.startsWith(item.href) ? styles.activeMobileDropdown : ''}`}
                        onClick={closeMenu}
                      >
                        <span className={styles.mobileDropdownIcon}>{item.icon}</span>
                        <span>{item.label}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            
            {/* Mobile Action Buttons */}
            <div className={styles.mobileActions}>
              <button className={styles.mobileTrackBtn} onClick={handleTrack}>
                <Search size={20} />
                <span>Track Shipment</span>
              </button>
              <button className={`${styles.mobileBookBtn} ${styles.mobilePulse}`} onClick={handleBook}>
                <Calendar size={20} />
                <span>Book Collection</span>
              </button>
            </div>

            {/* Mobile Auth */}
            <div className={styles.mobileAuth}>
              <Button variant="secondary" size="lg" className={styles.fullWidth} onClick={handleSignIn}>
                Sign In
              </Button>
              <Button variant="primary" size="lg" className={styles.fullWidth} onClick={handleRegister}>
                Register
              </Button>
            </div>
          </div>
        </div>
      )}

      <TrackModal 
        isOpen={isTrackModalOpen}
        onClose={() => setIsTrackModalOpen(false)}
      />
    </nav>
  );
};