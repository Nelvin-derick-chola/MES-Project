import React, { useState, useEffect } from 'react';
import { serviceApi, serviceCategoryApi } from '../../../../services/adminApi';
import { DataTable } from '../../../../components/admin/DataTable/DataTable';
import { Modal } from '../../../../components/admin/Modal/Modal';
import { ServiceForm } from './ServicesForm';
import { Plus, Edit, Trash2, ToggleLeft, ToggleRight, Star, Loader } from 'lucide-react';
import styles from './Services.module.css';

interface Service {
  uuid: string;
  name: string;
  slug: string;
  short_description: string;
  description: string;
  icon: string;
  is_active: boolean;
  is_featured: boolean;
  category?: { name: string };
  created_at: string;
}

export const ServiceList: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [servicesRes, categoriesRes] = await Promise.all([
        serviceApi.getAll(),
        serviceCategoryApi.getAll(),
      ]);
      setServices(servicesRes.data.data || servicesRes.data);
      setCategories(categoriesRes.data.data || categoriesRes.data);
      setError(null);
    } catch (err) {
      setError('Failed to load services');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreate = async (data: FormData) => {
    try {
      await serviceApi.create(data);
      await fetchData();
      setIsModalOpen(false);
    } catch (err) {
      console.error('Failed to create service:', err);
      throw err;
    }
  };

  const handleUpdate = async (data: FormData) => {
    if (!editingService) return;
    try {
      await serviceApi.update(editingService.uuid, data);
      await fetchData();
      setIsModalOpen(false);
      setEditingService(null);
    } catch (err) {
      console.error('Failed to update service:', err);
      throw err;
    }
  };

  const handleDelete = async (uuid: string) => {
    if (!confirm('Are you sure you want to delete this service?')) return;
    try {
      await serviceApi.delete(uuid);
      await fetchData();
    } catch (err) {
      alert('Failed to delete service.');
    }
  };

  const handleToggleActive = async (uuid: string) => {
    try {
      await serviceApi.toggleActive(uuid);
      await fetchData();
    } catch (err) {
      console.error('Failed to toggle active:', err);
    }
  };

  const handleToggleFeatured = async (uuid: string) => {
    try {
      await serviceApi.toggleFeatured(uuid);
      await fetchData();
    } catch (err) {
      console.error('Failed to toggle featured:', err);
    }
  };

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'short_description', label: 'Description' },
    {
      key: 'category',
      label: 'Category',
      render: (value: any) => value?.name || '-',
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
      render: (_: any, row: Service) => (
        <div className={styles.actions}>
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
              setEditingService(row);
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
        <p>Loading services...</p>
      </div>
    );
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Services</h1>
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

      <DataTable columns={columns} data={services} />

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
          initialData={editingService}
          categories={categories}
          onSubmit={editingService ? handleUpdate : handleCreate}
          onCancel={() => {
            setIsModalOpen(false);
            setEditingService(null);
          }}
        />
      </Modal>
    </div>
  );
};