import React, { useState, useEffect } from 'react';
import { Upload, X, Loader, Star } from 'lucide-react';
import { RatingStars } from './RatingStars';
import styles from './Testimonials.module.css';

interface TestimonialFormProps {
  initialData?: any;
  onSubmit: (data: FormData) => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
}

export const TestimonialForm: React.FC<TestimonialFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  loading: externalLoading,
}) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    email: initialData?.email || '',
    position: initialData?.position || '',
    company: initialData?.company || '',
    content: initialData?.content || '',
    rating: initialData?.rating || 5,
    sort_order: initialData?.sort_order || 0,
    is_active: initialData?.is_active ?? true,
    is_featured: initialData?.is_featured ?? false,
  });
  
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(initialData?.avatar_url || null);
  const [internalLoading, setInternalLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loading = externalLoading || internalLoading;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseInt(value) || 0 : value,
    }));
  };

  const handleRatingChange = (rating: number) => {
    setFormData(prev => ({ ...prev, rating }));
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError('Please select an image file');
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        setError('Image must be less than 2MB');
        return;
      }
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
      setError(null);
    }
  };

  const removeAvatar = () => {
    if (avatarPreview && avatarPreview.startsWith('blob:')) {
      URL.revokeObjectURL(avatarPreview);
    }
    setAvatarFile(null);
    setAvatarPreview(null);
  };

  useEffect(() => {
    return () => {
      if (avatarPreview && avatarPreview.startsWith('blob:')) {
        URL.revokeObjectURL(avatarPreview);
      }
    };
  }, [avatarPreview]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setInternalLoading(true);
    setError(null);

    try {
      const formDataToSend = new FormData();
      
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formDataToSend.append(key, String(value));
        }
      });
      
      if (avatarFile) {
        formDataToSend.append('avatar', avatarFile);
      }
      
      if (initialData) {
        formDataToSend.append('_method', 'PUT');
      }
      
      await onSubmit(formDataToSend);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setInternalLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {error && <div className={styles.formError}>{error}</div>}
      
      {/* Avatar Upload */}
      <div className={styles.avatarUpload}>
        <label>Customer Avatar</label>
        <div className={styles.avatarPreview}>
          {avatarPreview ? (
            <div className={styles.avatarWrapper}>
              <img src={avatarPreview} alt="Avatar Preview" className={styles.avatarImage} />
              <button
                type="button"
                className={styles.removeAvatarBtn}
                onClick={removeAvatar}
              >
                <X size={16} />
              </button>
            </div>
          ) : (
            <div className={styles.avatarPlaceholder}>
              <span>{formData.name?.charAt(0) || 'U'}</span>
            </div>
          )}
        </div>
        <div className={styles.fileInputWrapper}>
          <input
            type="file"
            id="avatar-upload"
            accept="image/jpeg,image/png,image/jpg,image.webp"
            onChange={handleAvatarChange}
            className={styles.fileInput}
          />
          <label htmlFor="avatar-upload" className={styles.fileInputLabel}>
            <Upload size={16} />
            Choose Avatar
          </label>
        </div>
        <span className={styles.fileName}>
          {avatarFile ? avatarFile.name : (initialData?.avatar_url ? 'Current avatar will be replaced' : 'No file chosen')}
        </span>
      </div>

      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Customer Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email (for verification)</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={styles.input}
            placeholder="customer@example.com"
          />
        </div>
      </div>

      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label htmlFor="position">Position</label>
          <input
            type="text"
            id="position"
            name="position"
            value={formData.position}
            onChange={handleChange}
            className={styles.input}
            placeholder="e.g., CEO, Manager"
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="company">Company</label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className={styles.input}
            placeholder="Company name"
          />
        </div>
      </div>

      <div className={styles.formGroup}>
        <label>Rating</label>
        <RatingStars rating={formData.rating} onRatingChange={handleRatingChange} size={24} />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="content">Testimonial *</label>
        <textarea
          id="content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          rows={5}
          required
          className={styles.textarea}
          placeholder="Share your experience with Mercury Express Logistics..."
        />
      </div>

      <div className={styles.formRow}>
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
      </div>

      <div className={styles.toggleGrid}>
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
            Featured on Homepage
          </label>
        </div>
      </div>

      <div className={styles.formActions}>
        <button type="button" onClick={onCancel} className={styles.cancelBtn} disabled={loading}>
          Cancel
        </button>
        <button type="submit" className={styles.submitBtn} disabled={loading}>
          {loading ? (
            <>
              <Loader size={16} className={styles.spinner} />
              Saving...
            </>
          ) : (
            initialData ? 'Update Testimonial' : 'Create Testimonial'
          )}
        </button>
      </div>
    </form>
  );
};