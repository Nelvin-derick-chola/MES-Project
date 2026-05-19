import React, { useState, useEffect } from 'react';
import { teamMemberApi, teamCategoryApi } from '../../../../services/adminApi';
import { DataTable } from '../../../../components/admin/DataTable/DataTable';
import { Modal } from '../../../../components/admin/Modal/Modal';
import { TeamMemberForm } from './TeamMemberForm';
import { Plus, Edit, Trash2, ToggleLeft, ToggleRight, Star, Loader } from 'lucide-react';
import styles from './TeamMembers.module.css';

interface TeamMember {
  uuid: string;
  first_name: string;
  last_name: string;
  full_name: string;
  position: string;
  email: string;
  phone: string;
  image_url?: string;
  is_active: boolean;
  is_featured: boolean;
  category?: { name: string };
  created_at: string;
}

export const TeamMemberList: React.FC = () => {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [membersRes, categoriesRes] = await Promise.all([
        teamMemberApi.getAll(),
        teamCategoryApi.getAll(),
      ]);
      setMembers(membersRes.data.data || membersRes.data);
      setCategories(categoriesRes.data.data || categoriesRes.data);
      setError(null);
    } catch (err) {
      setError('Failed to load team members');
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
      await teamMemberApi.create(data);
      await fetchData();
      setIsModalOpen(false);
    } catch (err) {
      console.error('Failed to create member:', err);
      throw err;
    }
  };

  const handleUpdate = async (data: FormData) => {
    if (!editingMember) return;
    try {
      await teamMemberApi.update(editingMember.uuid, data);
      await fetchData();
      setIsModalOpen(false);
      setEditingMember(null);
    } catch (err) {
      console.error('Failed to update member:', err);
      throw err;
    }
  };

  const handleDelete = async (uuid: string) => {
    if (!confirm('Are you sure you want to delete this team member?')) return;
    try {
      await teamMemberApi.delete(uuid);
      await fetchData();
    } catch (err) {
      alert('Failed to delete team member.');
    }
  };

  const handleToggleActive = async (uuid: string) => {
    try {
      await teamMemberApi.toggleActive(uuid);
      await fetchData();
    } catch (err) {
      console.error('Failed to toggle active:', err);
    }
  };

  const handleToggleFeatured = async (uuid: string) => {
    try {
      await teamMemberApi.toggleFeatured(uuid);
      await fetchData();
    } catch (err) {
      console.error('Failed to toggle featured:', err);
    }
  };

  const columns = [
    {
      key: 'image',
      label: 'Photo',
      render: (_: any, row: TeamMember) => (
        <div className={styles.avatar}>
          {row.image_url ? (
            <img src={row.image_url} alt={row.full_name} />
          ) : (
            <span>{row.first_name?.[0]}{row.last_name?.[0]}</span>
          )}
        </div>
      ),
    },
    { key: 'full_name', label: 'Name' },
    { key: 'position', label: 'Position' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone' },
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
      render: (_: any, row: TeamMember) => (
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
              setEditingMember(row);
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
        <p>Loading team members...</p>
      </div>
    );
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Team Members</h1>
        <button
          className={styles.addBtn}
          onClick={() => {
            setEditingMember(null);
            setIsModalOpen(true);
          }}
        >
          <Plus size={18} />
          Add Member
        </button>
      </div>

      <DataTable columns={columns} data={members} />

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingMember(null);
        }}
        title={editingMember ? 'Edit Team Member' : 'Add Team Member'}
        size="lg"
      >
        <TeamMemberForm
          initialData={editingMember}
          categories={categories}
          onSubmit={editingMember ? handleUpdate : handleCreate}
          onCancel={() => {
            setIsModalOpen(false);
            setEditingMember(null);
          }}
        />
      </Modal>
    </div>
  );
};