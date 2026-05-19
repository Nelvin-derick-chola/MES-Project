import React, { useState, useEffect } from 'react';
import { testimonialApi } from '../../../../services/adminApi';
import { DataTable } from '../../../../components/admin/DataTable/DataTable';
import { Modal } from '../../../../components/admin/Modal/Modal';
import { TestimonialForm } from './TestimonialsForm';
import { Plus, Edit, Trash2, ToggleLeft, ToggleRight, Star, CheckCircle, Loader } from 'lucide-react';
import styles from './Testimonials.module.css';

interface Testimonial {
  uuid: string;
  client_name: string;
  client_position: string;
  client_company: string;
  content: string;
  rating: number;
  is_active: boolean;
  is_featured: boolean;
  is_verified: boolean;
  created_at: string;
}

export const TestimonialList: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [testimonialsRes, statsRes] = await Promise.all([
        testimonialApi.getAll(),
        testimonialApi.getStats(),
      ]);
      setTestimonials(testimonialsRes.data.data || testimonialsRes.data);
      setStats(statsRes.data);
      setError(null);
    } catch (err) {
      setError('Failed to load testimonials');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreate = async (data: any) => {
    try {
      await testimonialApi.create(data);
      await fetchData();
      setIsModalOpen(false);
    } catch (err) {
      console.error('Failed to create testimonial:', err);
      throw err;
    }
  };

  const handleUpdate = async (data: any) => {
    if (!editingTestimonial) return;
    try {
      await testimonialApi.update(editingTestimonial.uuid, data);
      await fetchData();
      setIsModalOpen(false);
      setEditingTestimonial(null);
    } catch (err) {
      console.error('Failed to update testimonial:', err);
      throw err;
    }
  };

  const handleDelete = async (uuid: string) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return;
    try {
      await testimonialApi.delete(uuid);
      await fetchData();
    } catch (err) {
      alert('Failed to delete testimonial.');
    }
  };

  const handleToggleActive = async (uuid: string) => {
    try {
      await testimonialApi.toggleActive(uuid);
      await fetchData();
    } catch (err) {
      console.error('Failed to toggle active:', err);
    }
  };

  const handleToggleFeatured = async (uuid: string) => {
    try {
      await testimonialApi.toggleFeatured(uuid);
      await fetchData();
    } catch (err) {
      console.error('Failed to toggle featured:', err);
    }
  };

  const handleVerify = async (uuid: string) => {
    try {
      await testimonialApi.verify(uuid);
      await fetchData();
    } catch (err) {
      console.error('Failed to verify testimonial:', err);
    }
  };

  const columns = [
    { key: 'client_name', label: 'Client' },
    { key: 'client_position', label: 'Position' },
    { key: 'client_company', label: 'Company' },
    {
      key: 'rating',
      label: 'Rating',
      render: (value: number) => (
        <div className={styles.rating}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={14}
              className={i < value ? styles.filledStar : styles.emptyStar}
            />
          ))}
        </div>
      ),
    },
    {
      key: 'is_verified',
      label: 'Verified',
      render: (value: boolean) => value ? (
        <span className={styles.verified}><CheckCircle size={14} /> Verified</span>
      ) : (
        <span className={styles.unverified}>Pending</span>
      ),
    },
    {
      key: 'is_featured',
      label: 'Featured',
      render: (value: boolean) => value ? <Star size={16} className={styles.featured} /> : '-',
    },
    {
      key: 'is_active',
      label: 'Status',
      render: (value: boolean) => (
        <span className={value ? styles.active : styles.inactive}>
          {value ? 'Active' : 'Inactive'}
        </span>
      ),
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (_: any, row: Testimonial) => (
        <div className={styles.actions}>
          {!row.is_verified && (
            <button
              className={styles.iconBtn}
              onClick={() => handleVerify(row.uuid)}
              title="Verify"
            >
              <CheckCircle size={18} />
            </button>
          )}
          <button
            className={styles.iconBtn}
            onClick={() => handleToggleFeatured(row.uuid)}
            title={row.is_featured ? 'Remove featured' : 'Make featured'}
          >
            <Star size={18} className={row.is_featured ? styles.featured : ''} />
          </button>
          <button
            className={styles.iconBtn}
            onClick={() => handleToggleActive(row.uuid)}
            title={row.is_active ? 'Deactivate' : 'Activate'}
          >
            {row.is_active ? <ToggleRight size={18} /> : <ToggleLeft size={18} />}
          </button>
          <button
            className={styles.iconBtn}
            onClick={() => {
              setEditingTestimonial(row);
              setIsModalOpen(true);
            }}
            title="Edit"
          >
            <Edit size={18} />
          </button>
          <button
            className={`${styles.iconBtn} ${styles.delete}`}
            onClick={() => handleDelete(row.uuid)}
            title="Delete"
          >
            <Trash2 size={18} />
          </button>
        </div>
      ),
    },
  ];

  if (loading) {
    return (
      <div className={styles.loader}>
        <Loader size={32} className={styles.spinner} />
        <p>Loading testimonials...</p>
      </div>
    );
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Testimonials</h1>
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

      {stats && (
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <span className={styles.statValue}>{stats.total}</span>
            <span className={styles.statLabel}>Total</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statValue}>{stats.average_rating}</span>
            <span className={styles.statLabel}>Avg Rating</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statValue}>{stats.featured_count}</span>
            <span className={styles.statLabel}>Featured</span>
          </div>
        </div>
      )}

      <DataTable columns={columns} data={testimonials} />

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
          initialData={editingTestimonial}
          onSubmit={editingTestimonial ? handleUpdate : handleCreate}
          onCancel={() => {
            setIsModalOpen(false);
            setEditingTestimonial(null);
          }}
        />
      </Modal>
    </div>
  );
};