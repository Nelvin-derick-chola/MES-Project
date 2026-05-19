// src/components/admin/AdminLayout/AdminSidebar.tsx
import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Package, 
  Folder, 
  MessageCircle, 
  FileText, 
  LogOut,
  ChevronDown,
  ChevronRight,
  Home,
  Info,
  Phone,
  Truck,
  HelpCircle
} from 'lucide-react';
//import { adminApi, type Page } from '../../services/adminApi';
import { adminApi, type Page } from '../../../services/adminApi';
import styles from './AdminSidebar.module.css';

// ✅ Add the props interface
interface AdminSidebarProps {
  collapsed?: boolean;
  onToggle?: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ collapsed = false, onToggle }) => {
  const navigate = useNavigate();
  const [pages, setPages] = useState<Page[]>([]);
  const [isPagesOpen, setIsPagesOpen] = useState(false);
  const [isContentOpen, setIsContentOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    try {
      const response = await adminApi.getPages();
      setPages(response.data);
    } catch (error) {
      console.error('Failed to fetch pages:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    navigate('/admin/login');
  };

  const getPageIcon = (slug: string) => {
    switch (slug) {
      case 'home': return <Home size={16} />;
      case 'about-us': return <Info size={16} />;
      case 'services': return <Truck size={16} />;
      case 'contact-us': return <Phone size={16} />;
      case 'faq': return <HelpCircle size={16} />;
      default: return <FileText size={16} />;
    }
  };

  const mainMenuItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/admin' },
  ];

  const contentMenuItems = [
    { name: 'Team Members', icon: <Users size={20} />, path: '/admin/team-members' },
    { name: 'Services', icon: <Package size={20} />, path: '/admin/services' },
    { name: 'Service Categories', icon: <Folder size={20} />, path: '/admin/service-categories' },
    { name: 'Testimonials', icon: <MessageCircle size={20} />, path: '/admin/testimonials' },
  ];

  return (
    <aside className={`${styles.sidebar} ${collapsed ? styles.collapsed : ''}`}>
      <div className={styles.logo}>
        {!collapsed && <h2>Admin Panel</h2>}
        {collapsed && onToggle && (
          <button className={styles.toggleBtn} onClick={onToggle}>
            ☰
          </button>
        )}
      </div>

      <nav className={styles.nav}>
        {mainMenuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => 
              isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
            }
            title={collapsed ? item.name : undefined}
          >
            {item.icon}
            {!collapsed && <span>{item.name}</span>}
          </NavLink>
        ))}

        {/* Pages & Sections Dropdown */}
        <div className={styles.dropdown}>
          <button
            className={`${styles.dropdownButton} ${isPagesOpen ? styles.open : ''}`}
            onClick={() => setIsPagesOpen(!isPagesOpen)}
            title={collapsed ? "Pages & Sections" : undefined}
          >
            <FileText size={20} />
            {!collapsed && <span>Pages & Sections</span>}
            {!collapsed && (isPagesOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />)}
          </button>
          
          {isPagesOpen && !collapsed && (
            <div className={styles.dropdownMenu}>
              {loading ? (
                <div className={styles.loadingItem}>Loading pages...</div>
              ) : (
                pages.map((page) => (
                  <NavLink
                    key={page.id}
                    to={`/admin/pages/${page.slug}`}
                    className={({ isActive }) => 
                      isActive ? `${styles.dropdownLink} ${styles.active}` : styles.dropdownLink
                    }
                  >
                    <span className={styles.pageIcon}>{getPageIcon(page.slug)}</span>
                    <span>{page.name}</span>
                  </NavLink>
                ))
              )}
            </div>
          )}
        </div>

        {/* Content Management Dropdown */}
        <div className={styles.dropdown}>
          <button
            className={`${styles.dropdownButton} ${isContentOpen ? styles.open : ''}`}
            onClick={() => setIsContentOpen(!isContentOpen)}
            title={collapsed ? "Content Management" : undefined}
          >
            <Package size={20} />
            {!collapsed && <span>Content Management</span>}
            {!collapsed && (isContentOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />)}
          </button>
          
          {isContentOpen && !collapsed && (
            <div className={styles.dropdownMenu}>
              {contentMenuItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) => 
                    isActive ? `${styles.dropdownLink} ${styles.active}` : styles.dropdownLink
                  }
                >
                  <span className={styles.pageIcon}>{item.icon}</span>
                  <span>{item.name}</span>
                </NavLink>
              ))}
            </div>
          )}
        </div>

        <div className={styles.divider} />

        <button className={styles.logoutButton} onClick={handleLogout} title={collapsed ? "Logout" : undefined}>
          <LogOut size={20} />
          {!collapsed && <span>Logout</span>}
        </button>
      </nav>
    </aside>
  );
};