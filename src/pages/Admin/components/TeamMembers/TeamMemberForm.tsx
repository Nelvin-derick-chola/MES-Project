import React, { useState } from 'react';
import styles from './TeamMembers.module.css';

interface TeamMemberFormProps {
  initialData?: any;
  categories: any[];
  onSubmit: (data: FormData) => Promise<void>;
  onCancel: () => void;
}

export const TeamMemberForm: React.FC<TeamMemberFormProps> = ({
  initialData,
  categories,
  onSubmit,
  onCancel,
}) => {
  const [formData, setFormData] = useState({
    first_name: initialData?.first_name || '',
    last_name: initialData?.last_name || '',
    slug: initialData?.slug || '',
    position: initialData?.position || '',
    bio: initialData?.bio || '',
    email: initialData?.email || '',
    phone: initialData?.phone || '',
    team_category_uuid: initialData?.category?.uuid || '',
    sort_order: initialData?.sort_order || 0,
    is_active: initialData?.is_active ?? true,
    is_featured: initialData?.is_featured ?? false,
    show_on_homepage: initialData?.show_on_homepage ?? true,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(initialData?.image || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseInt(value) || 0 : value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const formDataToSend = new FormData();
      
      formDataToSend.append('first_name', formData.first_name);
      formDataToSend.append('last_name', formData.last_name);
      formDataToSend.append('position', formData.position);
      formDataToSend.append('bio', formData.bio);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phone', formData.phone);
      
      if (formData.slug) {
        formDataToSend.append('slug', formData.slug);
      }
      if (formData.sort_order > 0) {
        formDataToSend.append('sort_order', String(formData.sort_order));
      }
      
      // ✅ CHANGED: Send UUID instead of ID
      if (formData.team_category_uuid) {
        formDataToSend.append('team_category_uuid', formData.team_category_uuid);
      }
      
      formDataToSend.append('is_active', formData.is_active ? '1' : '0');
      formDataToSend.append('is_featured', formData.is_featured ? '1' : '0');
      formDataToSend.append('show_on_homepage', formData.show_on_homepage ? '1' : '0');
      
      console.log('Submitting with category UUID:', formData.team_category_uuid);
      
      if (imageFile) {
        formDataToSend.append('image', imageFile);
      }
      
      await onSubmit(formDataToSend);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {error && <div className={styles.formError}>{error}</div>}
      
      <div className={styles.imageUpload}>
        {imagePreview ? (
          <img src={imagePreview} alt="Preview" className={styles.preview} />
        ) : (
          <div className={styles.placeholder}>📷</div>
        )}
        <input
          type="file"
          accept="image/jpeg,image/png,image/jpg,image/webp"
          onChange={handleImageChange}
          className={styles.fileInput}
        />
      </div>

      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label htmlFor="first_name">First Name *</label>
          <input
            type="text"
            id="first_name"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="last_name">Last Name *</label>
          <input
            type="text"
            id="last_name"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="slug">Slug</label>
        <input
          type="text"
          id="slug"
          name="slug"
          value={formData.slug}
          onChange={handleChange}
          className={styles.input}
          placeholder="auto-generated if empty"
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="position">Position *</label>
        <input
          type="text"
          id="position"
          name="position"
          value={formData.position}
          onChange={handleChange}
          required
          className={styles.input}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="team_category_uuid">Category *</label>
        <select
          id="team_category_uuid"
          name="team_category_uuid"
          value={formData.team_category_uuid}
          onChange={handleChange}
          required
          className={styles.select}
        >
          <option value="">Select Category</option>
          {categories.map((cat: any) => (
            <option key={cat.uuid} value={cat.uuid}>  {/* ✅ CHANGED: use uuid as value */}
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="bio">Bio *</label>
        <textarea
          id="bio"
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          rows={4}
          required
          className={styles.input}
        />
      </div>

      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="phone">Phone *</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="sort_order">Sort Order</label>
        <input
          type="number"
          id="sort_order"
          name="sort_order"
          value={formData.sort_order}
          onChange={handleChange}
          min="0"
          className={styles.input}
        />
      </div>

      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label className={styles.checkbox}>
            <input
              type="checkbox"
              name="is_active"
              checked={formData.is_active}
              onChange={(e) => setFormData(prev => ({ ...prev, is_active: e.target.checked }))}
            />
            Active
          </label>
        </div>
        <div className={styles.formGroup}>
          <label className={styles.checkbox}>
            <input
              type="checkbox"
              name="is_featured"
              checked={formData.is_featured}
              onChange={(e) => setFormData(prev => ({ ...prev, is_featured: e.target.checked }))}
            />
            Featured
          </label>
        </div>
        <div className={styles.formGroup}>
          <label className={styles.checkbox}>
            <input
              type="checkbox"
              name="show_on_homepage"
              checked={formData.show_on_homepage}
              onChange={(e) => setFormData(prev => ({ ...prev, show_on_homepage: e.target.checked }))}
            />
            Show on Homepage
          </label>
        </div>
      </div>

      <div className={styles.formActions}>
        <button type="button" onClick={onCancel} className={styles.cancelBtn} disabled={loading}>
          Cancel
        </button>
        <button type="submit" className={styles.submitBtn} disabled={loading}>
          {loading ? 'Saving...' : initialData ? 'Update' : 'Create'}
        </button>
      </div>
    </form>
  );
};