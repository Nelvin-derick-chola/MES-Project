import React, { useState, useEffect } from 'react';
import { teamCategoryApi } from '../../../../services/adminApi';
import { DataTable } from '../../../../components/admin/DataTable/DataTable';
import { Modal } from '../../../../components/admin/Modal/Modal';
import { TeamCategoryForm } from './TeamCategoryForm';
import { Plus, Edit, Trash2, ToggleLeft, ToggleRight, Loader } from 'lucide-react';
import styles from './TeamCategories.module.css';

interface TeamCategory {
  uuid: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
  sort_order: number;
  is_active: boolean;
  created_at: string;
}

export const TeamCategoryList: React.FC = () => {
  const [categories, setCategories] = useState<TeamCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<TeamCategory | null>(null);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await teamCategoryApi.getAll();
      setCategories(response.data.data);
      setError(null);
    } catch (err) {
      setError('Failed to load team categories');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCreate = async (data: any) => {
    try {
      await teamCategoryApi.create(data);
      await fetchCategories();
      setIsModalOpen(false);
    } catch (err) {
      console.error('Failed to create category:', err);
      throw err;
    }
  };

  const handleUpdate = async (data: any) => {
    if (!editingCategory) return;
    try {
      await teamCategoryApi.update(editingCategory.uuid, data);
      await fetchCategories();
      setIsModalOpen(false);
      setEditingCategory(null);
    } catch (err) {
      console.error('Failed to update category:', err);
      throw err;
    }
  };

  const handleDelete = async (uuid: string) => {
    if (!confirm('Are you sure you want to delete this category?')) return;
    try {
      await teamCategoryApi.delete(uuid);
      await fetchCategories();
    } catch (err) {
      alert('Failed to delete category. It may have associated team members.');
    }
  };

  const handleToggleActive = async (uuid: string) => {
    try {
      await teamCategoryApi.toggleActive(uuid);
      await fetchCategories();
    } catch (err) {
      console.error('Failed to toggle active:', err);
    }
  };

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'slug', label: 'Slug' },
    { key: 'sort_order', label: 'Order' },
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
      render: (_: any, row: TeamCategory) => (
        <div className={styles.actions}>
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
        <p>Loading team categories...</p>
      </div>
    );
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Team Categories</h1>
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
      >
        <TeamCategoryForm
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