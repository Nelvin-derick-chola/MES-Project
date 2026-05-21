import React, { useState, useEffect } from 'react';
import { Edit, Trash2, Eye, EyeOff, Star, Plus, Loader } from 'lucide-react';
import { adminApi, type Service, type ServiceCategory } from '../../../../services/adminApi';
import { ServiceForm } from './ServicesForm';
import { Modal } from '../../../../components/admin/Modal/Modal';
import styles from './Services.module.css';

export const ServiceList: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [servicesRes, categoriesRes] = await Promise.all([
        adminApi.getServices(),
        adminApi.getServiceCategories(),
      ]);
      setServices(servicesRes.data.data || servicesRes.data);
      setCategories(categoriesRes.data.data || categoriesRes.data);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (data: FormData) => {
    setSubmitting(true);
    try {
      await adminApi.createService(data);
      await fetchData();
      setIsModalOpen(false);
    } catch (error) {
      console.error('Failed to create service:', error);
      throw error;
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdate = async (data: FormData) => {
    if (!editingService) return;
    setSubmitting(true);
    try {
      await adminApi.updateService(editingService.uuid, data);
      await fetchData();
      setIsModalOpen(false);
      setEditingService(null);
    } catch (error) {
      console.error('Failed to update service:', error);
      throw error;
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (uuid: string) => {
    if (!confirm('Are you sure you want to delete this service?')) return;
    try {
      await adminApi.deleteService(uuid);
      await fetchData();
    } catch (error) {
      alert('Failed to delete service. It may have associated data.');
    }
  };

  const handleToggleActive = async (uuid: string) => {
    try {
      await adminApi.toggleServiceActive(uuid);
      await fetchData();
    } catch (error) {
      console.error('Failed to toggle status:', error);
    }
  };

  const handleToggleFeatured = async (uuid: string) => {
    try {
      await adminApi.toggleServiceFeatured(uuid);
      await fetchData();
    } catch (error) {
      console.error('Failed to toggle featured:', error);
    }
  };

  const columns = [
    { 
      key: 'image', 
      label: 'Image', 
      render: (row: Service) => (
        <div className={styles.imageCell}>
          {row.image_url ? (
            <img src={row.image_url} alt={row.name} className={styles.thumbnail} />
          ) : (
            <div className={styles.placeholderIcon}>📦</div>
          )}
        </div>
      )
    },
    { 
      key: 'name', 
      label: 'Service Name', 
      render: (row: Service) => (
        <div>
          <div className={styles.serviceName}>{row.name}</div>
          <div className={styles.serviceCategory}>{row.category_name}</div>
        </div>
      )
    },
    { 
      key: 'short_description', 
      label: 'Description', 
      render: (row: Service) => (
        <div className={styles.descriptionCell}>
          {row.short_description?.substring(0, 80)}...
        </div>
      )
    },
    { key: 'sort_order', label: 'Order', render: (row: Service) => row.sort_order },
    { 
      key: 'is_featured', 
      label: 'Featured', 
      render: (row: Service) => (
        <button
          className={`${styles.featuredBtn} ${row.is_featured ? styles.active : ''}`}
          onClick={() => handleToggleFeatured(row.uuid)}
          title={row.is_featured ? 'Remove featured' : 'Make featured'}
        >
          <Star size={16} />
        </button>
      )
    },
    { 
      key: 'is_active', 
      label: 'Status', 
      render: (row: Service) => (
        <button
          className={`${styles.statusBtn} ${row.is_active ? styles.active : styles.inactive}`}
          onClick={() => handleToggleActive(row.uuid)}
          title={row.is_active ? 'Deactivate' : 'Activate'}
        >
          {row.is_active ? <Eye size={16} /> : <EyeOff size={16} />}
        </button>
      )
    },
    { 
      key: 'actions', 
      label: 'Actions', 
      render: (row: Service) => (
        <div className={styles.actions}>
          <button
            className={styles.editBtn}
            onClick={() => {
              setEditingService(row);
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
      )
    },
  ];

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <Loader size={32} className={styles.spinner} />
        <p>Loading services...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Services</h1>
        <button
          className={styles.addBtn}
          onClick={() => {
            setEditingService(null);
            setIsModalOpen(true);
          }}
        >
          <Plus size={18} />
          Add Service
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
            {services.map((service) => (
              <tr key={service.uuid}>
                {columns.map((col) => (
                  <td key={col.label}>
                    {col.render ? col.render(service) : (service as any)[col.key]}
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
          setEditingService(null);
        }}
        title={editingService ? 'Edit Service' : 'Add Service'}
        size="lg"
      >
        <ServiceForm
          initialData={editingService || undefined}
          categories={categories}
          onSubmit={editingService ? handleUpdate : handleCreate}
          onCancel={() => {
            setIsModalOpen(false);
            setEditingService(null);
          }}
          loading={submitting}
        />
      </Modal>
    </div>
  );
};