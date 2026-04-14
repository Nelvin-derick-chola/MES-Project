import React from 'react';
import { Container } from '../../layout/Container/Container';
import { MapPin, Calendar, Shield, Download } from 'lucide-react';
import appMockup from '../../../assets/images/mes-app.jpeg';
import styles from './MobileApp.module.css';

export const MobileApp: React.FC = () => {
  const features = [
    {
      icon: <MapPin size={18} />,
      title: 'Get peace of mind',
      description: 'Track orders in real time',
    },
    {
      icon: <Calendar size={18} />,
      title: 'Be in control',
      description: 'Schedule shipments easily',
    },
    {
      icon: <Shield size={18} />,
      title: 'Stay safe',
      description: 'Secure, contactless payments',
    },
  ];

  const handleDownloadAPK = () => {
    // Link to your APK file - replace with actual APK URL
    const apkUrl = '/downloads/mercury-express.apk';
    
    // Create a temporary link and trigger download
    const link = document.createElement('a');
    link.href = apkUrl;
    link.download = 'Mercury-Express.apk';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className={styles.mobileApp}>
      <Container>
        <div className={styles.grid}>
          {/* Left Content */}
          <div className={styles.content}>
            <h2 className={styles.title}>
              Download the <span className={styles.highlight}>Mercury Express</span> App
            </h2>
            
            <div className={styles.features}>
              {features.map((feature, index) => (
                <div key={index} className={styles.featureItem}>
                  <div className={styles.featureIcon}>
                    {feature.icon}
                  </div>
                  <div className={styles.featureContent}>
                    <h4 className={styles.featureTitle}>{feature.title}</h4>
                    <p className={styles.featureDescription}>{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* App Store Buttons */}
            <div className={styles.storeButtons}>
              <button className={styles.storeButton}>
                <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" />
              </button>
              <button className={styles.storeButton}>
                <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="App Store" />
              </button>
              <button className={styles.apkButton} onClick={handleDownloadAPK}>
                <Download size={16} />
                <span>Download APK</span>
              </button>
            </div>
          </div>

          {/* Right - App Mockup Image with Animation */}
          <div className={styles.mockupWrapper}>
            <div className={styles.mockupContainer}>
              <img 
                src={appMockup} 
                alt="Mercury Express Mobile App" 
                className={styles.appMockup}
              />
              <div className={styles.mockupGlow} />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};