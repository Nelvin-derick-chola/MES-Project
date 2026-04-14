import React from 'react';
import { Container } from '../../layout/Container/Container';
import { QRCodeSVG } from 'qrcode.react';
import styles from './CTASection.module.css';

interface CTASectionProps {
  title?: string;
  subtitle?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
  showQRCode?: boolean;
  whatsappNumber?: string;
  qrCodeMessage?: string;
}

export const CTASection: React.FC<CTASectionProps> = ({
  title = 'Need a Custom Logistics Solution?',
  subtitle = 'Our team of experts is ready to help you find the perfect shipping solution for your business.',
  primaryButtonText = 'Get a Quote',
  secondaryButtonText = 'Contact Sales',
  onPrimaryClick,
  onSecondaryClick,
  showQRCode = true,
  whatsappNumber = '+26097126939029',
  qrCodeMessage = 'Hello Mercury Express, I need assistance with...',
}) => {
  const handlePrimaryClick = () => {
    if (onPrimaryClick) {
      onPrimaryClick();
    } else {
      console.log('Primary CTA clicked');
      window.location.href = '/contact-us';
    }
  };

  const handleSecondaryClick = () => {
    if (onSecondaryClick) {
      onSecondaryClick();
    } else {
      console.log('Secondary CTA clicked');
      window.location.href = '/contact-us';
    }
  };

  // Generate WhatsApp URL
  const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(qrCodeMessage)}`;

  return (
    <section className={styles.ctaSection}>
      <Container>
        <div className={styles.ctaWrapper}>
          {/* Left Content */}
          <div className={styles.ctaContent}>
            <div className={styles.ctaCard}>
              <h2 className={styles.ctaTitle}>{title}</h2>
              <p className={styles.ctaText}>{subtitle}</p>
              <div className={styles.ctaButtons}>
                <button className={styles.ctaPrimary} onClick={handlePrimaryClick}>
                  {primaryButtonText}
                </button>
                {secondaryButtonText && (
                  <button className={styles.ctaSecondary} onClick={handleSecondaryClick}>
                    {secondaryButtonText}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Right Content - QR Code */}
          {showQRCode && (
            <div className={styles.qrCodeWrapper}>
              <div className={styles.qrCodeCard}>
                <div className={styles.qrCodeHeader}>
                  <span className={styles.qrCodeIcon}>💬</span>
                  <h3 className={styles.qrCodeTitle}>Chat with us on WhatsApp</h3>
                </div>
                <div className={styles.qrCodeContainer}>
                  <a 
                    href={whatsappUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={styles.qrCodeLink}
                  >
                    <QRCodeSVG 
                      value={whatsappUrl}
                      size={140}
                      bgColor="#ffffff"
                      fgColor="#22c55e"
                      level="H"
                      includeMargin={true}
                      className={styles.qrCode}
                    />
                  </a>
                </div>
                <p className={styles.qrCodeInstruction}>
                  Scan this QR code with your phone camera to chat with our support team on WhatsApp
                </p>
                <a 
                  href={whatsappUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={styles.qrCodeButton}
                >
                  Or click here to open WhatsApp
                </a>
              </div>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
};