import React from 'react';
import { AboutHero } from '../../components/sections/AboutHero/AboutHero';
import { CompanyStory } from '../../components/sections/CompanyStory/CompanyStory';
import { MissionVision } from '../../components/sections/MissionVision/MissionVision';
import { CoreValues } from '../../components/sections/CoreValues/CoreValues';
import { CompanyHistory } from '../../components/sections/CompanyHistory/CompanyHistory';
import styles from './About.module.css';
import { useScrollToTop } from '../../hooks/useScrollToTop';

export const About: React.FC = () => {
  useScrollToTop();
  return (
    <main className={styles.about}>
      <AboutHero />
      <MissionVision />
      <CoreValues />
      <CompanyHistory />
      <CompanyStory />
    </main>
  );
};