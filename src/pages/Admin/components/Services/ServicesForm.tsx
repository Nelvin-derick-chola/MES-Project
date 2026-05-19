import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import styles from './Services.module.css';

interface ServiceFormProps {
  initialData?: any;
  categories: any[];
  onSubmit: (data: FormData) => Promise<void>;
  onCancel: () => void;
}

export const ServiceForm: React.FC<ServiceFormProps> = ({
  initialData,
  categories,
  onSubmit,
  onCancel,
}) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    slug: initialData?.slug || '',
    short_description: initialData?.short_description || '',
    description: initialData?.description || '',
    icon: initialData?.icon || 'package',
    service_category_uuid: initialData?.category?.uuid || '',
    sort_order: initialData?.sort_order || 0,
    is_active: initialData?.is_active ?? true,
    is_featured: initialData?.is_featured ?? false,
    show_on_homepage: initialData?.show_on_homepage ?? true,
    show_on_services_page: initialData?.show_on_services_page ?? true,
  });
  
  const [features, setFeatures] = useState<string[]>(initialData?.features || ['']);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(initialData?.image_url || null);
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string | null>(initialData?.banner_image_url || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const iconOptions = [
    'package', 'truck', 'plane', 'ship', 'warehouse', 'globe',
    'thermometer', 'file-check', 'package-check', 'network',
    'shuffle', 'zap', 'shield', 'shopping-cart',
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseInt(value) || 0 : value,
    }));
  };

  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...features];
    newFeatures[index] = value;
    setFeatures(newFeatures);
  };

  const addFeature = () => {
    setFeatures([...features, '']);
  };

  const removeFeature = (index: number) => {
    if (features.length > 1) {
      const newFeatures = features.filter((_, i) => i !== index);
      setFeatures(newFeatures);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'image' | 'banner') => {
    const file = e.target.files?.[0];
    if (file) {
      if (type === 'image') {
        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));
      } else {
        setBannerFile(file);
        setBannerPreview(URL.createObjectURL(file));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const formDataToSend = new FormData();
      
      // Append all form fields
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formDataToSend.append(key, String(value));
        }
      });
      
      // Append features as JSON
      const validFeatures = features.filter(f => f.trim() !== '');
      formDataToSend.append('features', JSON.stringify(validFeatures));
      
      // Append images
      if (imageFile) {
        formDataToSend.append('image', imageFile);
      }
      if (bannerFile) {
        formDataToSend.append('banner_image', bannerFile);
      }
      
      // ✅ For update, add _method
      if (initialData) {
        formDataToSend.append('_method', 'PUT');
      }
      
      // ✅ Debug log
      console.log('📤 Submitting service with data:');
      for (let pair of formDataToSend.entries()) {
        console.log(`  ${pair[0]}: ${pair[1]}`);
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
      
      {/* Image Uploads */}
      <div className={styles.imageUploadRow}>
        <div className={styles.imageUpload}>
          <label>Service Image</label>
          {imagePreview ? (
            <img src={imagePreview} alt="Preview" className={styles.preview} />
          ) : (
            <div className={styles.placeholder}>📷</div>
          )}
          <input
            type="file"
            accept="image/jpeg,image/png,image/jpg,image/webp"
            onChange={(e) => handleImageChange(e, 'image')}
            className={styles.fileInput}
          />
        </div>
        
        <div className={styles.imageUpload}>
          <label>Banner Image</label>
          {bannerPreview ? (
            <img src={bannerPreview} alt="Banner Preview" className={styles.preview} />
          ) : (
            <div className={styles.placeholder}>🖼️</div>
          )}
          <input
            type="file"
            accept="image/jpeg,image/png,image/jpg,image/webp"
            onChange={(e) => handleImageChange(e, 'banner')}
            className={styles.fileInput}
          />
        </div>
      </div>

      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Service Name *</label>
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
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="short_description">Short Description</label>
        <input
          type="text"
          id="short_description"
          name="short_description"
          value={formData.short_description}
          onChange={handleChange}
          className={styles.input}
          placeholder="Brief summary (appears on cards)"
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="description">Full Description *</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={5}
          required
          className={styles.input}
        />
      </div>

      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label htmlFor="icon">Icon</label>
          <select
            id="icon"
            name="icon"
            value={formData.icon}
            onChange={handleChange}
            className={styles.select}
          >
            {iconOptions.map(icon => (
              <option key={icon} value={icon}>{icon}</option>
            ))}
          </select>
        </div>
        <div className={styles.formGroup}>
          {/* ✅ CHANGE THIS - id and name to service_category_uuid */}
          <label htmlFor="service_category_uuid">Category *</label>
          <select
            id="service_category_uuid"
            name="service_category_uuid"
            value={formData.service_category_uuid}
            onChange={handleChange}
            required
            className={styles.select}
          >
            <option value="">Select Category</option>
            {categories.map((cat: any) => (
              <option key={cat.uuid} value={cat.uuid}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Features Section */}
      <div className={styles.formGroup}>
        <label>Features</label>
        <div className={styles.featuresList}>
          {features.map((feature, index) => (
            <div key={index} className={styles.featureItem}>
              <input
                type="text"
                value={feature}
                onChange={(e) => handleFeatureChange(index, e.target.value)}
                placeholder={`Feature ${index + 1}`}
                className={styles.input}
              />
              {features.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeFeature(index)}
                  className={styles.removeFeatureBtn}
                >
                  <X size={16} />
                </button>
              )}
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={addFeature}
          className={styles.addFeatureBtn}
        >
          <Plus size={16} />
          Add Feature
        </button>
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

      {/* Toggle Options */}
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
        <div className={styles.formGroup}>
          <label className={styles.checkbox}>
            <input
              type="checkbox"
              name="show_on_services_page"
              checked={formData.show_on_services_page}
              onChange={(e) => setFormData(prev => ({ ...prev, show_on_services_page: e.target.checked }))}
            />
            Show on Services Page
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