import React, { useState } from 'react';
import { Container } from '../../components/layout/Container/Container';
import { TeamHero } from '../../components/sections/TeamHero/TeamHero';
import { Mail, Phone } from 'lucide-react';
import styles from './Team.module.css';
import { useScrollToTop } from '../../hooks/useScrollToTop';

// Import local images
import tiggerImage from '../../assets/images/team/tigger-fodden.jpeg';
import zipiweImage from '../../assets/images/team/zipiwe-banda.jpeg';
import placeholderMale from '../../assets/images/team/place-holder.jpg';
import vikas from '../../assets/images/team/vikas.jpeg';
import musiiwa from '../../assets/images/team/musiiwa.jpeg';

const placeholderFemale = placeholderMale;

// Define the TeamMember interface
interface TeamMember {
  id: number;
  name: string;
  position: string;
  bio: string;
  image: string;
  email?: string;
  phone?: string;
  department: 'leadership' | 'operations' | 'finance' | 'customerservice' | 'sales';
  imagePosition?: string; // Optional: custom object-position for specific images
}

const teamMembers: TeamMember[] = [
  // ========== LEADERSHIP TEAM ==========

   {
    id: 1,
    name: 'Tigger Fodden',
    position: 'Managing Director',
    bio: 'Leading Mercury Express Logistics with strategic vision and over two decades of industry expertise. Driving growth and innovation across all operations.',
    image: tiggerImage || placeholderMale,
    email: 'tigger@mercury.co.zm',
    phone: '+260 977 301 327',
    department: 'leadership',
    imagePosition: 'center 10%',
  },
  {
    id: 2,
    name: 'Vikas Kumar',
    position: 'Chief Executive Officer (CEO)',
    bio: 'Vikas brings more than 20 years of experience in distribution, supply chain operations, and business leadership across various organizations. With a strong passion for digital innovation in logistics, he plays a key role in modernizing operations and driving strategic growth within the company. His forward-thinking leadership focuses on integrating technology, improving operational efficiency, and creating customer-centric logistics solutions that meet the demands of today\'s fast-moving business environment.',
    image: vikas || placeholderMale,
    email: 'vikas@mercury.co.zm',
    phone: '+260 971 269 390',
    department: 'leadership',
    imagePosition: 'center 10%', // Focus on face
  },
 
  {
    id: 3,
    name: 'Zipiwe Banda',
    position: 'Finance Director',
    bio: 'Overseeing all financial operations, ensuring fiscal responsibility and strategic financial planning for Mercury Express Logistics.',
    image: zipiweImage || placeholderFemale,
    email: 'zipiwe@mercury.co.zm',
    phone: '+260 760 000 050',
    department: 'finance',
    imagePosition: 'center 30%',
  },
  {
    id: 6,
    name: 'Hlomayi Musiwa',
    position: 'National Operations Manager',
    bio: 'Hlomayi Musiwa leads national operations with a strong focus on service excellence, operational efficiency, and nationwide coordination. His experience in logistics operations ensures smooth execution across the company\'s branch network, helping maintain consistent, reliable service delivery throughout Zambia.',
    image: musiiwa || placeholderMale,
    email: 'hlomayi.musiwa@mercury.co.zm',
    phone: '+260 971 269 392',
    department: 'operations',
    imagePosition: 'center 15%',
  },
];

// Departments array
interface Department {
  id: string;
  label: string;
}

const departments: Department[] = [
  { id: 'all', label: 'All Team' },
  { id: 'leadership', label: 'Leadership' },
  { id: 'finance', label: 'Finance' },
  { id: 'operations', label: 'Operations' },
  { id: 'customerservice', label: 'Customer Service' },
  { id: 'sales', label: 'Sales & Marketing' },
];

export const Team: React.FC = () => {
  useScrollToTop();
  
  const [activeDepartment, setActiveDepartment] = useState<string>('all');

  const filteredMembers: TeamMember[] = activeDepartment === 'all' 
    ? teamMembers 
    : teamMembers.filter((member: TeamMember) => member.department === activeDepartment);

  return (
    <main className={styles.team}>
      <TeamHero />
      
      {/* Department Filter */}
      <section className={styles.filterSection}>
        <Container>
          <div className={styles.filterWrapper}>
            {departments.map((dept: Department) => (
              <button
                key={dept.id}
                className={`${styles.filterBtn} ${activeDepartment === dept.id ? styles.activeFilter : ''}`}
                onClick={() => setActiveDepartment(dept.id)}
              >
                {dept.label}
              </button>
            ))}
          </div>
        </Container>
      </section>

      {/* Team Grid */}
      <section className={styles.teamSection}>
        <Container>
          <div className={styles.teamGrid}>
            {filteredMembers.map((member: TeamMember) => (
              <div key={member.id} className={styles.teamCard}>
                <div className={styles.imageWrapper}>
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className={styles.memberImage}
                    style={{ objectPosition: member.imagePosition || 'center 25%' }}
                  />
                </div>
                <div className={styles.memberInfo}>
                  <h3 className={styles.memberName}>{member.name}</h3>
                  <p className={styles.memberPosition}>{member.position}</p>
                  <p className={styles.memberBio}>{member.bio}</p>
                  
                  <div className={styles.memberContact}>
                    {member.email && (
                      <a href={`mailto:${member.email}`} className={styles.contactLink}>
                        <Mail size={16} />
                        <span className={styles.contactText}>{member.email}</span>
                      </a>
                    )}
                    {member.phone && (
                      <a href={`tel:${member.phone.replace(/\s+/g, '')}`} className={styles.contactLink}>
                        <Phone size={16} />
                        <span className={styles.contactText}>{member.phone}</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredMembers.length === 0 && (
            <div className={styles.emptyState}>
              <p>No team members found in this department.</p>
            </div>
          )}
        </Container>
      </section>

      {/* Stats Section */}
      <section className={styles.statsSection}>
        <Container>
          <div className={styles.statsGrid}>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>3M</span>
              <span className={styles.statLabel}>Parcels Delivered</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>72+</span>
              <span className={styles.statLabel}>Cities Covered</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>153+</span>
              <span className={styles.statLabel}>Registered Customers</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>10K+</span>
              <span className={styles.statLabel}>Pick And Packs</span>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
};