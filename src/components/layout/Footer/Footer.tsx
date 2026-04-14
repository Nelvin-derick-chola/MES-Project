import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../../layout/Container/Container';
import { Phone, Mail, Clock, MapPin, ChevronRight } from 'lucide-react';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';
import logo from '../../../assets/images/MES-logo.png';
import styles from './Footer.module.css';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const companyLinks = [
    { label: 'About Us', href: '/about-us' },
    { label: 'Services', href: '/services' },
    { label: 'Our Team', href: '/team' },
  ];

  const usefulLinks = [
    { label: 'Home', href: '/' },
    { label: 'Contact Us', href: '/contact-us' },
    { label: 'Track Shipment', href: '#' },
    { label: 'FAQs', href: '/faqs' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms & Conditions', href: '/terms' },
  ];

  const socialLinks = [
    { icon: <FaFacebookF size={16} />, href: 'https://facebook.com/mercuryexpress', label: 'Facebook' },
    { icon: <FaTwitter size={16} />, href: 'https://twitter.com/mercuryexpress', label: 'Twitter' },
    { icon: <FaLinkedinIn size={16} />, href: 'https://linkedin.com/company/mercuryexpress', label: 'LinkedIn' },
    { icon: <FaInstagram size={16} />, href: 'https://instagram.com/mercuryexpress', label: 'Instagram' },
  ];

  return (
    <footer className={styles.footer}>
      <Container>
        {/* Main Footer Content */}
        <div className={styles.footerContent}>
          {/* Column 1 - Company Info */}
          <div className={styles.companyColumn}>
            <Link to="/" className={styles.footerLogo}>
              <img src={logo} alt="Mercury Express Logistics" />
            </Link>
            <p className={styles.companyDesc}>
              Effective, Efficient & Excellent - One stop solution for your logistics services. 
              Globally, the company has access to over 200,000 employees that are able to deliver 
              efficiencies in various service offerings.
            </p>
            {/* Social Media Links */}
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

          {/* Column 2 - Company */}
          <div className={styles.linksColumn}>
            <h3 className={styles.columnTitle}>COMPANY</h3>
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
          </div>

          {/* Column 3 - Useful Links */}
          <div className={styles.linksColumn}>
            <h3 className={styles.columnTitle}>USEFUL LINKS</h3>
            <ul className={styles.linksList}>
              {usefulLinks.map((link, index) => (
                <li key={index}>
                  {link.href.startsWith('/') ? (
                    <Link to={link.href} className={styles.linkItem}>
                      <ChevronRight size={14} className={styles.linkIcon} />
                      <span>{link.label}</span>
                    </Link>
                  ) : (
                    <a 
                      href={link.href} 
                      className={styles.linkItem}
                      onClick={(e) => {
                        if (link.href === '#') {
                          e.preventDefault();
                          // Open track modal - you can add this functionality
                          console.log('Open track modal');
                        }
                      }}
                    >
                      <ChevronRight size={14} className={styles.linkIcon} />
                      <span>{link.label}</span>
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 - Get In Touch */}
          <div className={styles.contactColumn}>
            <h3 className={styles.columnTitle}>GET IN TOUCH</h3>
            <ul className={styles.contactList}>
              <li className={styles.contactItem}>
                <Phone size={18} className={styles.contactIcon} />
                <div>
                  <span className={styles.contactLabel}>CALL</span>
                  <a href="tel:+26097126939029" className={styles.contactValue}>
                    +260 971 269 390-29
                  </a>
                </div>
              </li>
              <li className={styles.contactItem}>
                <Mail size={18} className={styles.contactIcon} />
                <div>
                  <span className={styles.contactLabel}>EMAIL</span>
                  <a href="mailto:Enquiries@Mercury.Co.Zm" className={styles.contactValue}>
                    Enquiries@Mercury.Co.Zm
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

        {/* Bottom Bar - Copyright Only */}
        <div className={styles.bottomBar}>
          <p className={styles.copyright}>
            © {currentYear} Mercury Express Logistics. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
};