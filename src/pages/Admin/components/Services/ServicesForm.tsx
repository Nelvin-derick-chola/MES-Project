// src/pages/Admin/components/Services/ServiceForm.tsx
import React, { useState, useEffect } from 'react';
import { Plus, X, Loader, Upload, Image as ImageIcon, Trash2 } from 'lucide-react';
import { type ServiceCategory } from '../../../../services/adminApi';
import styles from './Services.module.css';

interface ServiceFormProps {
  initialData?: any;
  categories: ServiceCategory[];
  onSubmit: (data: FormData) => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
}

export const ServiceForm: React.FC<ServiceFormProps> = ({
  initialData,
  categories,
  onSubmit,
  onCancel,
  loading: externalLoading,
}) => {
  // Normalize features to always be an array
  const getInitialFeatures = () => {
    if (initialData?.features) {
      if (Array.isArray(initialData.features)) {
        return initialData.features.length ? initialData.features : [''];
      }
      if (typeof initialData.features === 'string') {
        try {
          const parsed = JSON.parse(initialData.features);
          return Array.isArray(parsed) ? (parsed.length ? parsed : ['']) : [parsed];
        } catch {
          return [initialData.features];
        }
      }
    }
    return [''];
  };

  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    slug: initialData?.slug || '',
    short_description: initialData?.short_description || '',
    description: initialData?.description || '',
    icon: initialData?.icon || 'package',
    service_category_uuid: initialData?.category?.uuid || '',
    features: getInitialFeatures(),
    sort_order: initialData?.sort_order || 0,
    is_active: initialData?.is_active ?? true,
    is_featured: initialData?.is_featured ?? false,
    show_on_homepage: initialData?.show_on_homepage ?? false,
    show_on_services_page: initialData?.show_on_services_page ?? true,
  });
  
  // Image states
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);
  const [bannerLoading, setBannerLoading] = useState(false);
  const [bannerError, setBannerError] = useState(false);
  
  const [internalLoading, setInternalLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loading = externalLoading || internalLoading;

  // ✅ Set image previews from existing data when editing
  useEffect(() => {
    if (initialData) {
      // Handle service image
      if (initialData.image_url) {
        setImagePreview(initialData.image_url);
        setImageLoading(true);
        setImageError(false);
        
        // Test if image loads
        const img = new Image();
        img.onload = () => {
          setImageLoading(false);
          setImageError(false);
        };
        img.onerror = () => {
          setImageLoading(false);
          setImageError(true);
          console.error('Failed to load image:', initialData.image_url);
        };
        img.src = initialData.image_url;
      }
      
      // Handle banner image
      if (initialData.banner_image_url) {
        setBannerPreview(initialData.banner_image_url);
        setBannerLoading(true);
        setBannerError(false);
        
        const img = new Image();
        img.onload = () => {
          setBannerLoading(false);
          setBannerError(false);
        };
        img.onerror = () => {
          setBannerLoading(false);
          setBannerError(true);
          console.error('Failed to load banner:', initialData.banner_image_url);
        };
        img.src = initialData.banner_image_url;
      }
    }
  }, [initialData]);

  const iconOptions = [
    'package', 'truck', 'plane', 'ship', 'warehouse', 'globe',
    'zap', 'shield', 'clock', 'map-pin', 'phone', 'mail',
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseInt(value) || 0 : value,
    }));
  };

  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData(prev => ({ ...prev, features: newFeatures }));
  };

  const addFeature = () => {
    setFormData(prev => ({ ...prev, features: [...prev.features, ''] }));
  };

  const removeFeature = (index: number) => {
    if (formData.features.length > 1) {
      const newFeatures = formData.features.filter((_: string, i: number) => i !== index);
      setFormData(prev => ({ ...prev, features: newFeatures }));
    }
  };

  // ✅ Fixed image change handler for new uploads
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'image' | 'banner') => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError('Please select an image file');
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('Image must be less than 5MB');
        return;
      }
      
      const previewUrl = URL.createObjectURL(file);
      
      if (type === 'image') {
        setImageFile(file);
        setImagePreview(previewUrl);
        setImageError(false);
      } else {
        setBannerFile(file);
        setBannerPreview(previewUrl);
        setBannerError(false);
      }
    }
  };

  // ✅ Remove image handlers
  const handleRemoveImage = (type: 'image' | 'banner') => {
    if (type === 'image') {
      if (imagePreview && imagePreview.startsWith('blob:')) {
        URL.revokeObjectURL(imagePreview);
      }
      setImageFile(null);
      setImagePreview(null);
      setImageError(false);
    } else {
      if (bannerPreview && bannerPreview.startsWith('blob:')) {
        URL.revokeObjectURL(bannerPreview);
      }
      setBannerFile(null);
      setBannerPreview(null);
      setBannerError(false);
    }
  };

  // ✅ Cleanup preview URLs on unmount
  useEffect(() => {
    return () => {
      if (imagePreview && imagePreview.startsWith('blob:')) {
        URL.revokeObjectURL(imagePreview);
      }
      if (bannerPreview && bannerPreview.startsWith('blob:')) {
        URL.revokeObjectURL(bannerPreview);
      }
    };
  }, [imagePreview, bannerPreview]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setInternalLoading(true);
    setError(null);

    try {
      const formDataToSend = new FormData();
      
      // Append text fields
      Object.entries(formData).forEach(([key, value]) => {
        if (key === 'features' && Array.isArray(value)) {
          const validFeatures = value.filter((f: string) => f.trim() !== '');
          formDataToSend.append('features', JSON.stringify(validFeatures));
        } else if (value !== undefined && value !== null && key !== 'features') {
          formDataToSend.append(key, String(value));
        }
      });
      
      // ✅ Append images only if new files are selected
      if (imageFile) {
        formDataToSend.append('image', imageFile);
      }
      if (bannerFile) {
        formDataToSend.append('banner_image', bannerFile);
      }
      
      // For update, add _method PUT
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
      
      {/* Image Uploads */}
      <div className={styles.imageUploadRow}>
        {/* Service Image */}
        <div className={styles.imageUpload}>
          <label>Service Image</label>
          <div className={styles.imagePreviewContainer}>
            {imageLoading && (
              <div className={styles.imageLoading}>
                <Loader size={24} className={styles.spinner} />
                <span>Loading image...</span>
              </div>
            )}
            {!imageLoading && imagePreview && !imageError && (
              <div className={styles.imagePreviewWrapper}>
                <img 
                  src={imagePreview} 
                  alt="Service Preview" 
                  className={styles.preview}
                  onError={() => setImageError(true)}
                />
                <button
                  type="button"
                  className={styles.removeImageBtn}
                  onClick={() => handleRemoveImage('image')}
                  title="Remove image"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            )}
            {!imageLoading && imageError && (
              <div className={styles.imageError}>
                <ImageIcon size={32} />
                <span>Failed to load image</span>
                <button
                  type="button"
                  className={styles.retryBtn}
                  onClick={() => {
                    setImageError(false);
                    setImageLoading(true);
                    const img = new Image();
                    img.onload = () => {
                      setImageLoading(false);
                      setImageError(false);
                    };
                    img.onerror = () => {
                      setImageLoading(false);
                      setImageError(true);
                    };
                    img.src = initialData?.image_url;
                  }}
                >
                  Retry
                </button>
              </div>
            )}
            {!imagePreview && !imageLoading && (
              <div className={styles.placeholder}>
                <ImageIcon size={32} />
                <span>No image selected</span>
                <span className={styles.placeholderHint}>Recommended: 800x600px</span>
              </div>
            )}
          </div>
          <div className={styles.fileInputWrapper}>
            <input
              type="file"
              id="image-upload"
              accept="image/jpeg,image/png,image/jpg,image.webp"
              onChange={(e) => handleImageChange(e, 'image')}
              className={styles.fileInput}
            />
            <label htmlFor="image-upload" className={styles.fileInputLabel}>
              <Upload size={16} />
              Choose File
            </label>
          </div>
          <span className={styles.fileName}>
            {imageFile ? imageFile.name : (initialData?.image_url ? 'Current image will be replaced' : 'No file chosen')}
          </span>
        </div>
        
        {/* Banner Image */}
        <div className={styles.imageUpload}>
          <label>Banner Image</label>
          <div className={styles.imagePreviewContainer}>
            {bannerLoading && (
              <div className={styles.imageLoading}>
                <Loader size={24} className={styles.spinner} />
                <span>Loading banner...</span>
              </div>
            )}
            {!bannerLoading && bannerPreview && !bannerError && (
              <div className={styles.imagePreviewWrapper}>
                <img 
                  src={bannerPreview} 
                  alt="Banner Preview" 
                  className={styles.preview}
                  onError={() => setBannerError(true)}
                />
                <button
                  type="button"
                  className={styles.removeImageBtn}
                  onClick={() => handleRemoveImage('banner')}
                  title="Remove banner"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            )}
            {!bannerLoading && bannerError && (
              <div className={styles.imageError}>
                <ImageIcon size={32} />
                <span>Failed to load banner</span>
                <button
                  type="button"
                  className={styles.retryBtn}
                  onClick={() => {
                    setBannerError(false);
                    setBannerLoading(true);
                    const img = new Image();
                    img.onload = () => {
                      setBannerLoading(false);
                      setBannerError(false);
                    };
                    img.onerror = () => {
                      setBannerLoading(false);
                      setBannerError(true);
                    };
                    img.src = initialData?.banner_image_url;
                  }}
                >
                  Retry
                </button>
              </div>
            )}
            {!bannerPreview && !bannerLoading && (
              <div className={styles.placeholder}>
                <ImageIcon size={32} />
                <span>No banner selected</span>
                <span className={styles.placeholderHint}>Recommended: 1920x400px</span>
              </div>
            )}
          </div>
          <div className={styles.fileInputWrapper}>
            <input
              type="file"
              id="banner-upload"
              accept="image/jpeg,image/png,image/jpg,image.webp"
              onChange={(e) => handleImageChange(e, 'banner')}
              className={styles.fileInput}
            />
            <label htmlFor="banner-upload" className={styles.fileInputLabel}>
              <Upload size={16} />
              Choose File
            </label>
          </div>
          <span className={styles.fileName}>
            {bannerFile ? bannerFile.name : (initialData?.banner_image_url ? 'Current banner will be replaced' : 'No file chosen')}
          </span>
        </div>
      </div>

      {/* Rest of your form remains the same... */}
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
          className={styles.textarea}
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
            {categories.map((cat) => (
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
          {formData.features.map((feature: string, index: number) => (
            <div key={index} className={styles.featureItem}>
              <input
                type="text"
                value={feature}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                  handleFeatureChange(index, e.target.value)
                }
                placeholder={`Feature ${index + 1}`}
                className={styles.input}
              />
              {formData.features.length > 1 && (
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
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                setFormData(prev => ({ ...prev, is_active: e.target.checked }))
              }
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
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                setFormData(prev => ({ ...prev, is_featured: e.target.checked }))
              }
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
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                setFormData(prev => ({ ...prev, show_on_homepage: e.target.checked }))
              }
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
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                setFormData(prev => ({ ...prev, show_on_services_page: e.target.checked }))
              }
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
          {loading ? (
            <>
              <Loader size={16} className={styles.spinner} />
              Saving...
            </>
          ) : (
            initialData ? 'Update Service' : 'Create Service'
          )}
        </button>
      </div>
    </form>
  );
};