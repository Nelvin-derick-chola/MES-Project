import React, { useState, useEffect } from 'react';
import { Edit, Trash2, Eye, EyeOff, Star, Plus, Loader, CheckCircle, XCircle, Mail } from 'lucide-react';
import { adminApi, type Testimonial } from '../../../../services/adminApi';
import { TestimonialForm } from './TestimonialsForm';
import { RatingStars } from './RatingStars';
import { Modal } from '../../../../components/admin/Modal/Modal';
import styles from './Testimonials.module.css';

export const TestimonialList: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    fetchData();
    fetchStats();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await adminApi.getTestimonials();
      setTestimonials(response.data.data || response.data);
    } catch (error) {
      console.error('Failed to fetch testimonials:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await adminApi.getTestimonialStats();
      setStats(response.data);
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    }
  };

  const handleCreate = async (data: FormData) => {
    setSubmitting(true);
    try {
      await adminApi.createTestimonial(data);
      await fetchData();
      await fetchStats();
      setIsModalOpen(false);
    } catch (error) {
      console.error('Failed to create testimonial:', error);
      throw error;
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdate = async (data: FormData) => {
    if (!editingTestimonial) return;
    setSubmitting(true);
    try {
      await adminApi.updateTestimonial(editingTestimonial.uuid, data);
      await fetchData();
      await fetchStats();
      setIsModalOpen(false);
      setEditingTestimonial(null);
    } catch (error) {
      console.error('Failed to update testimonial:', error);
      throw error;
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (uuid: string) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return;
    try {
      await adminApi.deleteTestimonial(uuid);
      await fetchData();
      await fetchStats();
    } catch (error) {
      alert('Failed to delete testimonial.');
    }
  };

  const handleToggleActive = async (uuid: string) => {
    try {
      await adminApi.toggleTestimonialActive(uuid);
      await fetchData();
      await fetchStats();
    } catch (error) {
      console.error('Failed to toggle status:', error);
    }
  };

  const handleToggleFeatured = async (uuid: string) => {
    try {
      await adminApi.toggleTestimonialFeatured(uuid);
      await fetchData();
      await fetchStats();
    } catch (error) {
      console.error('Failed to toggle featured:', error);
    }
  };

  const handleVerify = async (uuid: string) => {
    try {
      await adminApi.verifyTestimonial(uuid);
      await fetchData();
      await fetchStats();
    } catch (error) {
      console.error('Failed to verify testimonial:', error);
    }
  };

  const handleResendVerification = async (uuid: string) => {
    try {
      await adminApi.resendVerification(uuid);
      alert('Verification email sent successfully!');
    } catch (error) {
      console.error('Failed to resend verification:', error);
      alert('Failed to send verification email.');
    }
  };

  const columns = [
    { key: 'avatar', label: 'Avatar', render: (row: Testimonial) => (
      <div className={styles.avatarCell}>
        {row.avatar_url ? (
          <img src={row.avatar_url} alt={row.name} className={styles.avatar} />
        ) : (
          <div className={styles.avatarPlaceholder}>
            {row.name?.charAt(0) || 'T'}
          </div>
        )}
      </div>
    )},
    { key: 'name', label: 'Customer', render: (row: Testimonial) => (
      <div>
        <div className={styles.customerName}>{row.name}</div>
        <div className={styles.customerMeta}>
          {row.position && <span>{row.position}</span>}
          {row.position && row.company && <span> • </span>}
          {row.company && <span>{row.company}</span>}
        </div>
      </div>
    )},
    { key: 'content', label: 'Testimonial', render: (row: Testimonial) => (
      <div className={styles.contentCell}>
        "{row.content.substring(0, 80)}..."
      </div>
    )},
    { key: 'rating', label: 'Rating', render: (row: Testimonial) => (
      <RatingStars rating={row.rating} readonly size={16} />
    )},
    { key: 'verified', label: 'Verified', render: (row: Testimonial) => (
      <button
        className={`${styles.verifyBtn} ${row.is_verified ? styles.verified : ''}`}
        onClick={() => !row.is_verified && handleVerify(row.uuid)}
        title={row.is_verified ? 'Verified' : 'Click to verify'}
        disabled={row.is_verified}
      >
        {row.is_verified ? (
          <CheckCircle size={16} className={styles.verifiedIcon} />
        ) : (
          <XCircle size={16} className={styles.unverifiedIcon} />
        )}
        <span>{row.is_verified ? 'Verified' : 'Pending'}</span>
      </button>
    )},
    { key: 'is_featured', label: 'Featured', render: (row: Testimonial) => (
      <button
        className={`${styles.featuredBtn} ${row.is_featured ? styles.active : ''}`}
        onClick={() => handleToggleFeatured(row.uuid)}
        title={row.is_featured ? 'Remove featured' : 'Make featured'}
      >
        <Star size={16} />
      </button>
    )},
    { key: 'is_active', label: 'Status', render: (row: Testimonial) => (
      <button
        className={`${styles.statusBtn} ${row.is_active ? styles.active : styles.inactive}`}
        onClick={() => handleToggleActive(row.uuid)}
        title={row.is_active ? 'Deactivate' : 'Activate'}
      >
        {row.is_active ? <Eye size={16} /> : <EyeOff size={16} />}
      </button>
    )},
    { key: 'actions', label: 'Actions', render: (row: Testimonial) => (
      <div className={styles.actions}>
        {!row.is_verified && row.email && (
          <button
            className={styles.emailBtn}
            onClick={() => handleResendVerification(row.uuid)}
            title="Resend verification email"
          >
            <Mail size={16} />
          </button>
        )}
        <button
          className={styles.editBtn}
          onClick={() => {
            setEditingTestimonial(row);
            setIsModalOpen(true);
          }}
          title="Edit"
        >
          <Edit size={16} />
        </button>
        <button
          className={styles.deleteBtn}
          onClick={() => handleDelete(row.uuid)}
          title="Delete"
        >
          <Trash2 size={16} />
        </button>
      </div>
    )},
  ];

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <Loader size={32} className={styles.spinner} />
        <p>Loading testimonials...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1>Testimonials</h1>
          {stats && (
            <div className={styles.statsBar}>
              <span>Total: {stats.total}</span>
              <span>Active: {stats.active}</span>
              <span>Verified: {stats.verified}</span>
              <span>Featured: {stats.featured}</span>
              <span>Avg Rating: {typeof stats.average_rating === 'number' ? stats.average_rating.toFixed(1) : parseFloat(stats.average_rating)?.toFixed(1) || '0.0'} ⭐</span>
            </div>
          )}
        </div>
        <button
          className={styles.addBtn}
          onClick={() => {
            setEditingTestimonial(null);
            setIsModalOpen(true);
          }}
        >
          <Plus size={18} />
          Add Testimonial
        </button>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col.label}>{col.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {testimonials.map((testimonial) => (
              <tr key={testimonial.uuid}>
                {columns.map((col) => (
                  <td key={col.label}>
                    {col.render ? col.render(testimonial) : (testimonial as any)[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingTestimonial(null);
        }}
        title={editingTestimonial ? 'Edit Testimonial' : 'Add Testimonial'}
        size="lg"
      >
        <TestimonialForm
          initialData={editingTestimonial || undefined}
          onSubmit={editingTestimonial ? handleUpdate : handleCreate}
          onCancel={() => {
            setIsModalOpen(false);
            setEditingTestimonial(null);
          }}
          loading={submitting}
        />
      </Modal>
    </div>
  );
};