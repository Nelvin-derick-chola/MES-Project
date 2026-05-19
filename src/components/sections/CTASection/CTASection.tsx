import React from 'react';
import { Container } from '../../layout/Container/Container';
import { QRCodeSVG } from 'qrcode.react';
import { MessageCircle, Send } from 'lucide-react';
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
  primaryButtonText = 'Get in Touch',
  onPrimaryClick,
  showQRCode = true,
  whatsappNumber = '+260760000008',
  qrCodeMessage = 'Hello Mercury Express, I need your assistance...',
}) => {
  const handlePrimaryClick = () => {
    if (onPrimaryClick) {
      onPrimaryClick();
    } else {
      console.log('Primary CTA clicked');
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
              </div>
            </div>
          </div>

          {/* Right Content - QR Code */}
          {showQRCode && (
            <div className={styles.qrCodeWrapper}>
              <div className={styles.qrCodeCard}>
                <div className={styles.qrCodeHeader}>
                  <div className={styles.whatsappIconWrapper}>
                    <MessageCircle size={24} className={styles.whatsappIcon} />
                  </div>
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
                      size={180}
                      bgColor="#FFFFFF"
                      fgColor="#000000"
                      level="H"
                      includeMargin={true}
                      imageSettings={{
                        src: "https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg",
                        x: undefined,
                        y: undefined,
                        height: 36,
                        width: 36,
                        excavate: true,
                      }}
                    />
                  </a>
                </div>
                <p className={styles.qrCodeInstruction}>
                  Scan with your phone camera to chat with us on WhatsApp
                </p>
                <a 
                  href={whatsappUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={styles.qrCodeButton}
                >
                  <MessageCircle size={16} />
                  <span>Open WhatsApp Now</span>
                  <Send size={14} />
                </a>
              </div>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
};