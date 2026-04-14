import React, { useState } from 'react';
import { Container } from '../../components/layout/Container/Container';
import { TeamHero } from '../../components/sections/TeamHero/TeamHero';
import { Mail, Phone } from 'lucide-react';
import styles from './Team.module.css';
import { useScrollToTop } from '../../hooks/useScrollToTop';

// Team member placeholder images
const placeholderImages = {
  male: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
  female: 'https://images.unsplash.com/photo-1494790108755-2616c510d128?w=400',
};

// Define the TeamMember interface
interface TeamMember {
  id: number;
  name: string;
  position: string;
  bio: string;
  image: string;
  email?: string;
  phone?: string;
  department: 'leadership' | 'operations' | 'finance' | 'customerservice';
}

// Real Mercury Express Team Members
const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: 'Tigger Fodden',
    position: 'Managing Director',
    bio: 'Leading Mercury Express Logistics with strategic vision and over two decades of industry expertise. Driving growth and innovation across all operations.',
    image: placeholderImages.male,
    email: 'tigger@mercury.co.zm',
    phone: '+260 977 301 327',
    department: 'leadership',
  },
  {
    id: 2,
    name: 'Zipiwe Banda',
    position: 'Finance Director',
    bio: 'Overseeing all financial operations, ensuring fiscal responsibility and strategic financial planning for Mercury Express Logistics.',
    image: placeholderImages.female,
    email: 'zipiwe@mercury.co.zm',
    phone: '+260 760 000 050',
    department: 'finance',
  },
  {
    id: 3,
    name: 'Audrey Chambika Griffiths',
    position: 'Head of Retail and Customer Service',
    bio: 'Leading customer experience initiatives and retail operations, ensuring every client receives exceptional service and support.',
    image: placeholderImages.female,
    email: 'audrey@mercury.co.zm',
    phone: '+260 767 820 918',
    department: 'customerservice',
  },
  {
    id: 4,
    name: 'Alex Mwashi',
    position: 'National Operations Manager',
    bio: 'Managing nationwide logistics operations, coordinating our 11 branch offices and 20+ agent locations across Zambia.',
    image: placeholderImages.male,
    email: 'opsmanager@mercury.co.zm',
    phone: '+260 760 000 007',
    department: 'operations',
  },
];

// Type the departments array
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
];

export const Team: React.FC = () => {
  useScrollToTop();
  
  const [activeDepartment, setActiveDepartment] = useState<string>('all');

  const filteredMembers: TeamMember[] = activeDepartment === 'all' 
    ? teamMembers 
    : teamMembers.filter((member: TeamMember) => member.department === activeDepartment);

  const formatPhoneNumber = (phone: string): string => {
    return phone.replace(/\s+/g, '').replace(/(\d{3})(\d{3})(\d{3})/, '+$1 $2 $3');
  };

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

      {/* Join Team CTA */}
      {/* <section className={styles.ctaSection}>
        <Container>
          <div className={styles.ctaCard}>
            <h2 className={styles.ctaTitle}>Join Our Growing Team</h2>
            <p className={styles.ctaText}>
              With 11 branch offices and over 20 agent locations across Zambia, 
              we're always looking for talented individuals to join Mercury Express Logistics.
            </p>
            <button className={styles.ctaButton}>View Career Opportunities</button>
          </div>
        </Container>
      </section> */}
    </main>
  );
};