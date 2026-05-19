import React, { useEffect, useState } from 'react';
import { 
  Users, 
  UserCog, 
  Package, 
  FolderTree, 
  Wrench, 
  MessageSquare,
  TrendingUp,
  Star,
  Activity
} from 'lucide-react';
import { teamCategoryApi, teamMemberApi, serviceCategoryApi, serviceApi, testimonialApi } from '../../../../services/adminApi';
import styles from './Dashboard.module.css';

export const Dashboard: React.FC = () => {
  const [stats, setStats] = useState({
    teamCategories: 0,
    teamMembers: 0,
    serviceCategories: 0,
    services: 0,
    testimonials: 0,
    averageRating: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [
          teamCategoriesRes,
          teamMembersRes,
          serviceCategoriesRes,
          servicesRes,
          testimonialsRes,
          testimonialStatsRes,
        ] = await Promise.all([
          teamCategoryApi.getAll(),
          teamMemberApi.getAll(),
          serviceCategoryApi.getAll(),
          serviceApi.getAll(),
          testimonialApi.getAll(),
          testimonialApi.getStats(),
        ]);

        setStats({
          teamCategories: teamCategoriesRes.data.data?.length || teamCategoriesRes.data?.length || 0,
          teamMembers: teamMembersRes.data.data?.length || teamMembersRes.data?.length || 0,
          serviceCategories: serviceCategoriesRes.data.data?.length || serviceCategoriesRes.data?.length || 0,
          services: servicesRes.data.data?.length || servicesRes.data?.length || 0,
          testimonials: testimonialsRes.data.data?.length || testimonialsRes.data?.length || 0,
          averageRating: testimonialStatsRes.data?.average_rating || 0,
        });
      } catch (error) {
        console.error('Failed to fetch dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      title: 'Team Categories',
      value: stats.teamCategories,
      icon: <FolderTree size={28} />,
      color: '#22c55e',
      bgColor: '#f0fdf4',
    },
    {
      title: 'Team Members',
      value: stats.teamMembers,
      icon: <UserCog size={28} />,
      color: '#3b82f6',
      bgColor: '#eff6ff',
    },
    {
      title: 'Service Categories',
      value: stats.serviceCategories,
      icon: <Package size={28} />,
      color: '#f59e0b',
      bgColor: '#fffbeb',
    },
    {
      title: 'Services',
      value: stats.services,
      icon: <Wrench size={28} />,
      color: '#ec4899',
      bgColor: '#fdf2f8',
    },
    {
      title: 'Testimonials',
      value: stats.testimonials,
      icon: <MessageSquare size={28} />,
      color: '#8b5cf6',
      bgColor: '#f5f3ff',
    },
    {
      title: 'Average Rating',
      value: `${stats.averageRating} ★`,
      icon: <Star size={28} />,
      color: '#eab308',
      bgColor: '#fefce8',
    },
  ];

  const quickLinks = [
    { label: 'Add Team Member', path: '/admin/team-members', icon: <UserCog size={18} /> },
    { label: 'Add Service', path: '/admin/services', icon: <Wrench size={18} /> },
    { label: 'Add Testimonial', path: '/admin/testimonials', icon: <MessageSquare size={18} /> },
    { label: 'Manage Categories', path: '/admin/team-categories', icon: <FolderTree size={18} /> },
  ];

  if (loading) {
    return (
      <div className={styles.loader}>
        <div className={styles.spinner}></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className={styles.dashboard}>
      <div className={styles.header}>
        <h1 className={styles.title}>Dashboard</h1>
        <p className={styles.subtitle}>Welcome to Mercury Express Admin Panel</p>
      </div>

      <div className={styles.statsGrid}>
        {statCards.map((stat, index) => (
          <div key={index} className={styles.statCard}>
            <div 
              className={styles.statIcon} 
              style={{ backgroundColor: stat.bgColor, color: stat.color }}
            >
              {stat.icon}
            </div>
            <div className={styles.statContent}>
              <span className={styles.statValue}>{stat.value}</span>
              <span className={styles.statLabel}>{stat.title}</span>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.quickSection}>
        <h2 className={styles.sectionTitle}>
          <Activity size={20} />
          Quick Actions
        </h2>
        <div className={styles.quickLinks}>
          {quickLinks.map((link, index) => (
            <a key={index} href={link.path} className={styles.quickLink}>
              <span className={styles.quickIcon}>{link.icon}</span>
              <span>{link.label}</span>
            </a>
          ))}
        </div>
      </div>

      <div className={styles.infoSection}>
        <h2 className={styles.sectionTitle}>
          <TrendingUp size={20} />
          System Overview
        </h2>
        <div className={styles.infoGrid}>
          <div className={styles.infoCard}>
            <h3>Content Management</h3>
            <p>Manage all dynamic content including team members, services, and testimonials from the sidebar navigation.</p>
          </div>
          <div className={styles.infoCard}>
            <h3>Quick Tips</h3>
            <ul>
              <li>Use the sidebar to navigate between modules</li>
              <li>Toggle active status to show/hide content</li>
              <li>Featured items appear prominently on the website</li>
              <li>Sort order controls the display sequence</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};