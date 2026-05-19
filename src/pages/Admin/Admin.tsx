import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AdminSidebar } from '../../components/admin/AdminLayout/AdminSidebar';
import { AdminHeader } from '../../components/admin/AdminLayout/AdminHeader';
import { Dashboard } from './components/Dashboard/Dashboard';
import { TeamCategoryList } from './components/TeamCategories/TeamCategoryList';
import { TeamMemberList } from './components/TeamMembers/TeamMemberList';
import { ServiceCategoryList } from './components/ServiceCategories/ServiceCategoryList';
import { ServiceList } from './components/Services/ServiceList';
import { TestimonialList } from './components/Testimonials/TestimonialList';
import { adminAuthApi } from '../../services/adminApi';
import { Loader } from 'lucide-react';
import styles from './Admin.module.css';
import { PageManager } from './PageManager/PageManager';
import { PageEditor } from './PageManager/PageEditor';


export const Admin: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);


  useEffect(() => {
    const verifyAuth = async () => {
      const token = localStorage.getItem('admin_token');
      
      if (!token) {
        setIsLoading(false);
        setIsAuthenticated(false);
        return;
      }

      try {
        // Verify token by fetching profile
        await adminAuthApi.getProfile();
        setIsAuthenticated(true);
      } catch (error) {
        // Token is invalid or expired
        console.error('Auth verification failed:', error);
        localStorage.removeItem('admin_token');
        localStorage.removeItem('admin_user');
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    verifyAuth();
  }, []);

  // Show loading state while verifying
  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <Loader size={48} className={styles.spinner} />
        <p>Verifying authentication...</p>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className={styles.adminLayout}>
      <AdminSidebar 
        collapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
      />
      <div className={`${styles.mainWrapper} ${sidebarCollapsed ? styles.expanded : ''}`}>
        <AdminHeader 
          sidebarCollapsed={sidebarCollapsed}
          onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
        <main className={styles.mainContent}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/team-categories" element={<TeamCategoryList />} />
            <Route path="/team-members" element={<TeamMemberList />} />
            <Route path="/service-categories" element={<ServiceCategoryList />} />
            <Route path="/services" element={<ServiceList />} />
            <Route path="/testimonials" element={<TestimonialList />} />


            <Route path="/pages" element={<PageManager />} />
            <Route path="/pages/:slug" element={<PageEditor />} />

          </Routes>
        </main>
      </div>
    </div>
  );
};