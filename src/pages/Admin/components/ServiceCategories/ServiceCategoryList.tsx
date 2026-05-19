import React, { useState, useEffect } from 'react';
import { serviceCategoryApi } from '../../../../services/adminApi';
import { DataTable } from '../../../../components/admin/DataTable/DataTable';
import { Modal } from '../../../../components/admin/Modal/Modal';
import { ServiceCategoryForm } from './ServiceCategoriesForm';
import { Plus, Edit, Trash2, ToggleLeft, ToggleRight, Home, Loader } from 'lucide-react';
import styles from './ServiceCategories.module.css';

interface ServiceCategory {
  uuid: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  image_url?: string;
  color: string;
  sort_order: number;
  is_active: boolean;
  show_on_homepage: boolean;
  services_count?: number;
  created_at: string;
}

export const ServiceCategoryList: React.FC = () => {
  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<ServiceCategory | null>(null);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await serviceCategoryApi.getAll();
      setCategories(response.data.data || response.data);
      setError(null);
    } catch (err) {
      setError('Failed to load service categories');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCreate = async (data: FormData) => {
    try {
      await serviceCategoryApi.create(data);
      await fetchCategories();
      setIsModalOpen(false);
    } catch (err) {
      console.error('Failed to create category:', err);
      throw err;
    }
  };

  const handleUpdate = async (data: FormData) => {
    if (!editingCategory) return;
    try {
      await serviceCategoryApi.update(editingCategory.uuid, data);
      await fetchCategories();
      setIsModalOpen(false);
      setEditingCategory(null);
    } catch (err) {
      console.error('Failed to update category:', err);
      throw err;
    }
  };

  const handleDelete = async (uuid: string) => {
    if (!confirm('Are you sure you want to delete this category? All associated services will also be deleted.')) return;
    try {
      await serviceCategoryApi.delete(uuid);
      await fetchCategories();
    } catch (err) {
      alert('Failed to delete category. It may have associated services.');
    }
  };

  const handleToggleActive = async (uuid: string) => {
    try {
      await serviceCategoryApi.toggleActive(uuid);
      await fetchCategories();
    } catch (err) {
      console.error('Failed to toggle active:', err);
    }
  };

  const handleToggleHomepage = async (uuid: string) => {
    try {
      await serviceCategoryApi.toggleHomepage(uuid);
      await fetchCategories();
    } catch (err) {
      console.error('Failed to toggle homepage:', err);
    }
  };

  const columns = [
    {
      key: 'image',
      label: 'Image',
      render: (_: any, row: ServiceCategory) => (
        <div className={styles.categoryImage}>
          {row.image_url ? (
            <img src={row.image_url} alt={row.name} />
          ) : (
            <div className={styles.imagePlaceholder} style={{ backgroundColor: row.color || '#22c55e' }}>
              <span>{row.icon || '📦'}</span>
            </div>
          )}
        </div>
      ),
    },
    {
      key: 'color',
      label: 'Color',
      render: (value: string) => (
        <div className={styles.colorDot} style={{ backgroundColor: value || '#22c55e' }} />
      ),
    },
    { key: 'name', label: 'Name' },
    { key: 'slug', label: 'Slug' },
    {
      key: 'services_count',
      label: 'Services',
      render: (value: number) => value || 0,
    },
    { key: 'sort_order', label: 'Order' },
    {
      key: 'show_on_homepage',
      label: 'Homepage',
      render: (value: boolean) => value ? <Home size={16} className={styles.homepageIcon} /> : '-',
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
      render: (_: any, row: ServiceCategory) => (
        <div className={styles.actions}>
          <button
            className={styles.iconBtn}
            onClick={() => handleToggleHomepage(row.uuid)}
            title={row.show_on_homepage ? 'Remove from homepage' : 'Show on homepage'}
          >
            <Home size={18} className={row.show_on_homepage ? styles.homepageActive : ''} />
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
              setEditingCategory(row);
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
        <p>Loading service categories...</p>
      </div>
    );
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Service Categories</h1>
        <button
          className={styles.addBtn}
          onClick={() => {
            setEditingCategory(null);
            setIsModalOpen(true);
          }}
        >
          <Plus size={18} />
          Add Category
        </button>
      </div>

      <DataTable columns={columns} data={categories} />

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingCategory(null);
        }}
        title={editingCategory ? 'Edit Category' : 'Add Category'}
        size="lg"
      >
        <ServiceCategoryForm
          initialData={editingCategory}
          onSubmit={editingCategory ? handleUpdate : handleCreate}
          onCancel={() => {
            setIsModalOpen(false);
            setEditingCategory(null);
          }}
        />
      </Modal>
    </div>
  );
};