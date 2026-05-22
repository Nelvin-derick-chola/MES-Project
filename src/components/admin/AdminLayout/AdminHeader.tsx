import React, { useState } from 'react';
//import { Link } from 'react-router-dom';
import { 
 // Bell, 
 // LogOut, 
  ChevronDown,
  Menu
} from 'lucide-react';
import styles from './AdminHeader.module.css';

interface AdminHeaderProps {
  sidebarCollapsed: boolean;
  onToggleSidebar: () => void;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({ 
  //sidebarCollapsed, 
  onToggleSidebar 
}) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
 // const [showNotifications, setShowNotifications] = useState(false);
  
  const user = JSON.parse(localStorage.getItem('admin_user') || '{"name":"Admin User","email":"admin@mercury.co.zm"}');

  // const handleLogout = () => {
  //   localStorage.removeItem('admin_token');
  //   localStorage.removeItem('admin_user');
  //   window.location.href = '/admin/login';
  // };

  // const notifications = [
  //   { id: 1, title: 'New testimonial submitted', time: '5 minutes ago', unread: true },
  //   { id: 2, title: 'Team member updated', time: '1 hour ago', unread: true },
  //   { id: 3, title: 'Service created', time: '3 hours ago', unread: false },
  // ];

  // const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <button 
          className={styles.menuBtn}
          onClick={onToggleSidebar}
          aria-label="Toggle sidebar"
        >
          <Menu size={22} />
        </button>
      </div>

      <div className={styles.right}>
        {/* Notifications */}
        {/* <div className={styles.notificationWrapper}>
          <button 
            className={styles.iconBtn}
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <Bell size={20} />
            {unreadCount > 0 && (
              <span className={styles.badge}>{unreadCount}</span>
            )}
          </button>

          {showNotifications && (
            <div className={styles.notificationDropdown}>
              <div className={styles.notificationHeader}>
                <h3>Notifications</h3>
                <button className={styles.markRead}>Mark all read</button>
              </div>
              <div className={styles.notificationList}>
                {notifications.map(notification => (
                  <div 
                    key={notification.id} 
                    className={`${styles.notificationItem} ${notification.unread ? styles.unread : ''}`}
                  >
                    <div className={styles.notificationContent}>
                      <p className={styles.notificationTitle}>{notification.title}</p>
                      <span className={styles.notificationTime}>{notification.time}</span>
                    </div>
                    {notification.unread && <span className={styles.unreadDot} />}
                  </div>
                ))}
              </div>
              <Link to="/admin/notifications" className={styles.viewAll}>
                View all notifications
              </Link>
            </div>
          )}
        </div> */}

        {/* User Menu */}
        <div className={styles.userWrapper}>
          <button 
            className={styles.userBtn}
            onClick={() => setShowUserMenu(!showUserMenu)}
          >
            <div className={styles.avatar}>
              {user?.name?.charAt(0) || 'A'}
            </div>
            <span className={styles.userName}>{user?.name || 'Admin User'}</span>
            <ChevronDown size={16} className={styles.chevron} />
          </button>

          {showUserMenu && (
            <div className={styles.userDropdown}>
              <div className={styles.userHeader}>
                <div className={styles.userAvatarLarge}>
                  {user?.name?.charAt(0) || 'A'}
                </div>
                <div className={styles.userInfo}>
                  <p className={styles.userFullName}>{user?.name || 'Admin User'}</p>
                  <p className={styles.userEmail}>{user?.email || 'admin@mercury.co.zm'}</p>
                </div>
              </div>
              <div className={styles.dropdownDivider} />
              {/* <button className={styles.dropdownItem} onClick={handleLogout}>
                <LogOut size={18} />
                <span>Logout</span>
              </button> */}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};