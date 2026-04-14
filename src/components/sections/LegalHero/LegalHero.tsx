import React from 'react';
import { Container } from '../../layout/Container/Container';
import { Shield, FileText, AlertTriangle, Umbrella, Scale, Lock } from 'lucide-react';
import styles from './LegalHero.module.css';

interface LegalHeroProps {
  title: string;
  subtitle: string;
  icon?: 'shield' | 'file' | 'alert' | 'umbrella' | 'scale' | 'lock';
  breadcrumbs?: { label: string; href?: string }[];
}

export const LegalHero: React.FC<LegalHeroProps> = ({ 
  title, 
  subtitle, 
  icon = 'shield',
  breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Legal', href: '/legal' }
  ]
}) => {
  const getIcon = () => {
    switch (icon) {
      case 'file':
        return <FileText size={32} />;
      case 'alert':
        return <AlertTriangle size={32} />;
      case 'umbrella':
        return <Umbrella size={32} />;
      case 'scale':
        return <Scale size={32} />;
      case 'lock':
        return <Lock size={32} />;
      case 'shield':
      default:
        return <Shield size={32} />;
    }
  };

  return (
    <section className={styles.legalHero}>
      <Container>
        <div className={styles.content}>
          {/* Breadcrumbs */}
          <div className={styles.breadcrumb}>
            {breadcrumbs.map((crumb, index) => (
              <React.Fragment key={index}>
                {index > 0 && <span className={styles.separator}>›</span>}
                {crumb.href ? (
                  <a href={crumb.href} className={styles.breadcrumbLink}>
                    {crumb.label}
                  </a>
                ) : (
                  <span className={styles.breadcrumbCurrent}>{crumb.label}</span>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Title with Icon */}
          <div className={styles.titleWrapper}>
            <div className={styles.iconWrapper}>
              {getIcon()}
            </div>
            <h1 className={styles.title}>{title}</h1>
          </div>

          {/* Subtitle */}
          <p className={styles.subtitle}>{subtitle}</p>
        </div>
      </Container>
    </section>
  );
};