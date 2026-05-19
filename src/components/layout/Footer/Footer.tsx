import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../../layout/Container/Container';
import { Phone, Mail, Clock, MapPin, ChevronRight, ChevronDown } from 'lucide-react';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';
import logo from '../../../assets/images/MES-logo.png';
import styles from './Footer.module.css';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  // ✅ State for mobile dropdowns
  const [openDropdowns, setOpenDropdowns] = useState({
    company: false,
    usefulLinks: false,
    getInTouch: false
  });

  const toggleDropdown = (key: keyof typeof openDropdowns) => {
    setOpenDropdowns(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const companyLinks = [
    { label: 'About Us', href: '/about-us' },
    { label: 'Services', href: '/services' },
    { label: 'Our Team', href: '/team' },
  ];

  const usefulLinks = [
    { label: 'Home', href: '/' },
    { label: 'Contact Us', href: '/contact-us' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Indemnity & Liability', href: '/indemnity' },
    { label: 'Insurance Coverage', href: '/insurance' },
    { label: 'Restricted Items', href: '/restricted' },
  ];

  const socialLinks = [
    { icon: <FaFacebookF size={16} />, href: 'https://www.facebook.com/MercuryExpressLogisticsZambia', label: 'Facebook' },
    { icon: <FaLinkedinIn size={16} />, href: 'https://www.linkedin.com/company/mercury-express-logistics/', label: 'LinkedIn' },
    { icon: <FaInstagram size={16} />, href: 'https://www.instagram.com/mercuryexpresslogistics?igsh=MTFia2w2dzF5dWNrbw==', label: 'Instagram' },
    { icon: <FaTwitter size={16} />, href: 'https://twitter.com/mercuryexpress', label: 'Twitter' },
  ];

  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.footerContent}>
          {/* Column 1 - Company Info (always visible, no dropdown) */}
          <div className={styles.companyColumn}>
            <Link to="/" className={styles.footerLogo}>
              <img src={logo} alt="Mercury Express Logistics" />
            </Link>
            <p className={styles.companyDesc}>
              Effective, Efficient & Excellent - One stop solution for your logistics services. 
              Globally, the company has access to over 200,000 employees that are able to deliver 
              efficiencies in various service offerings.
            </p>
            <div className={styles.socialLinks}>
              {socialLinks.map((social, index) => (
                <a 
                  key={index}
                  href={social.href} 
                  className={styles.socialIcon}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2 - Company (with mobile dropdown) */}
          <div className={styles.linksColumn}>
            {/* Desktop title */}
            <h3 className={styles.columnTitle}>COMPANY</h3>
            
            {/* Mobile dropdown button */}
            <button 
              className={styles.mobileDropdownBtn}
              onClick={() => toggleDropdown('company')}
            >
              COMPANY
              <ChevronDown 
                size={16} 
                className={`${styles.mobileDropdownIcon} ${openDropdowns.company ? styles.rotated : ''}`}
              />
            </button>
            
            {/* Desktop links list */}
            <ul className={styles.linksList}>
              {companyLinks.map((link, index) => (
                <li key={index}>
                  <Link to={link.href} className={styles.linkItem}>
                    <ChevronRight size={14} className={styles.linkIcon} />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
            
            {/* Mobile dropdown items */}
            <div className={`${styles.mobileDropdownItems} ${openDropdowns.company ? styles.open : ''}`}>
              <ul className={styles.mobileLinksList}>
                {companyLinks.map((link, index) => (
                  <li key={index}>
                    <Link to={link.href} className={styles.linkItem}>
                      <ChevronRight size={14} className={styles.linkIcon} />
                      <span>{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Column 3 - Useful Links (with mobile dropdown) */}
          <div className={styles.linksColumn}>
            {/* Desktop title */}
            <h3 className={styles.columnTitle}>USEFUL LINKS</h3>
            
            {/* Mobile dropdown button */}
            <button 
              className={styles.mobileDropdownBtn}
              onClick={() => toggleDropdown('usefulLinks')}
            >
              USEFUL LINKS
              <ChevronDown 
                size={16} 
                className={`${styles.mobileDropdownIcon} ${openDropdowns.usefulLinks ? styles.rotated : ''}`}
              />
            </button>
            
            {/* Desktop links list */}
            <ul className={styles.linksList}>
              {usefulLinks.map((link, index) => (
                <li key={index}>
                  <Link to={link.href} className={styles.linkItem}>
                    <ChevronRight size={14} className={styles.linkIcon} />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
            
            {/* Mobile dropdown items */}
            <div className={`${styles.mobileDropdownItems} ${openDropdowns.usefulLinks ? styles.open : ''}`}>
              <ul className={styles.mobileLinksList}>
                {usefulLinks.map((link, index) => (
                  <li key={index}>
                    <Link to={link.href} className={styles.linkItem}>
                      <ChevronRight size={14} className={styles.linkIcon} />
                      <span>{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Column 4 - Get In Touch (with mobile dropdown) */}
          <div className={styles.contactColumn}>
            {/* Desktop title */}
            <h3 className={styles.columnTitle}>GET IN TOUCH</h3>
            
            {/* Mobile dropdown button */}
            <button 
              className={styles.mobileDropdownBtn}
              onClick={() => toggleDropdown('getInTouch')}
            >
              GET IN TOUCH
              <ChevronDown 
                size={16} 
                className={`${styles.mobileDropdownIcon} ${openDropdowns.getInTouch ? styles.rotated : ''}`}
              />
            </button>
            
            {/* Desktop contact list */}
            <ul className={styles.contactList}>
              <li className={styles.contactItem}>
                <Phone size={18} className={styles.contactIcon} />
                <div>
                  <span className={styles.contactLabel}>CALL</span>
                  <a href="tel:+26097126939029" className={styles.contactValue}>
                    +260 971 269 390
                  </a>
                </div>
              </li>
              <li className={styles.contactItem}>
                <Mail size={18} className={styles.contactIcon} />
                <div>
                  <span className={styles.contactLabel}>EMAIL</span>
                  <a href="mailto:enquiries@mercury.co.zm" className={styles.contactValue}>
                    enquiries@mercury.co.zm
                  </a>
                </div>
              </li>
              <li className={styles.contactItem}>
                <Clock size={18} className={styles.contactIcon} />
                <div>
                  <span className={styles.contactLabel}>WORKING HOURS</span>
                  <span className={styles.contactValue}>07:45 - 17:15 Hrs</span>
                </div>
              </li>
              <li className={styles.contactItem}>
                <MapPin size={18} className={styles.contactIcon} />
                <div>
                  <span className={styles.contactLabel}>LOCATION</span>
                  <span className={styles.contactValue}>Plot 6392 Dundudza Chididza Road, Longacres, Lusaka, Zambia</span>
                </div>
              </li>
            </ul>
            
            {/* Mobile dropdown contact items */}
            <div className={`${styles.mobileDropdownItems} ${openDropdowns.getInTouch ? styles.open : ''}`}>
              <ul className={styles.mobileContactList}>
                <li className={styles.contactItem}>
                  <Phone size={18} className={styles.contactIcon} />
                  <div>
                    <span className={styles.contactLabel}>CALL</span>
                    <a href="tel:+26097126939029" className={styles.contactValue}>
                      +260 971 269 390
                    </a>
                  </div>
                </li>
                <li className={styles.contactItem}>
                  <Mail size={18} className={styles.contactIcon} />
                  <div>
                    <span className={styles.contactLabel}>EMAIL</span>
                    <a href="mailto:enquiries@mercury.co.zm" className={styles.contactValue}>
                      enquiries@mercury.co.zm
                    </a>
                  </div>
                </li>
                <li className={styles.contactItem}>
                  <Clock size={18} className={styles.contactIcon} />
                  <div>
                    <span className={styles.contactLabel}>WORKING HOURS</span>
                    <span className={styles.contactValue}>07:45 - 17:15 Hrs</span>
                  </div>
                </li>
                <li className={styles.contactItem}>
                  <MapPin size={18} className={styles.contactIcon} />
                  <div>
                    <span className={styles.contactLabel}>LOCATION</span>
                    <span className={styles.contactValue}>Plot 6392 Dundudza Chididza Road, Longacres, Lusaka, Zambia</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={styles.bottomBar}>
          <p className={styles.copyright}>
            © {currentYear} Mercury Express Logistics. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
};