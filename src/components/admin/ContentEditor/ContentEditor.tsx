import React, { useState } from 'react';
import type { Section } from '../../../services/contentApi';
import { contentApi } from '../../../services/contentApi';
import { ImageUploader } from './ImageUploader';
import { RepeaterField } from './RepeaterField';
import styles from './ContentEditor.module.css';

interface ContentEditorProps {
  section: Section;
  onUpdate: (section: Section) => void;
}

// Field configurations for each section type
const fieldConfigs: Record<string, any[]> = {
  hero: [
    { key: 'title', label: 'Title', type: 'text', required: true },
    { key: 'heading', label: 'Heading', type: 'text', required: true },
    { key: 'description', label: 'Description', type: 'textarea', required: true },
    { key: 'button_text', label: 'Button Text', type: 'text' },
    { key: 'button_link', label: 'Button Link', type: 'url' },
  ],
  stats: [
    { key: 'title', label: 'Section Title', type: 'text' },
    { key: 'description', label: 'Description', type: 'textarea' },
    { key: 'button_text', label: 'Button Text', type: 'text' },
    { key: 'button_link', label: 'Button Link', type: 'url' },
    {
      key: 'stats',
      label: 'Statistics',
      type: 'repeater',
      fields: [
        { key: 'number', label: 'Number', type: 'text', placeholder: 'e.g., 153+' },
        { key: 'label', label: 'Label', type: 'text', placeholder: 'e.g., Registered Customers' },
      ],
    },
  ],
  who_we_are: [
    { key: 'title', label: 'Title', type: 'text' },
    { key: 'description_1', label: 'Description (First Paragraph)', type: 'textarea' },
    { key: 'description_2', label: 'Description (Second Paragraph)', type: 'textarea' },
    { key: 'button_text', label: 'Button Text', type: 'text' },
    { key: 'button_link', label: 'Button Link', type: 'url' },
  ],
  cta: [
    { key: 'title', label: 'Title', type: 'text' },
    { key: 'subtitle', label: 'Subtitle', type: 'textarea' },
    { key: 'button_text', label: 'Button Text', type: 'text' },
    { key: 'button_link', label: 'Button Link', type: 'url' },
    { key: 'whatsapp_number', label: 'WhatsApp Number', type: 'text' },
    { key: 'whatsapp_message', label: 'WhatsApp Message', type: 'textarea' },
    { key: 'show_qr_code', label: 'Show QR Code', type: 'checkbox' },
  ],
  faq: [
    { key: 'title', label: 'Section Title', type: 'text' },
    { key: 'subtitle', label: 'Section Subtitle', type: 'textarea' },
    {
      key: 'faqs',
      label: 'FAQ Items',
      type: 'repeater',
      fields: [
        { key: 'question', label: 'Question', type: 'text' },
        { key: 'answer', label: 'Answer', type: 'textarea' },
      ],
    },
  ],
  testimonials: [
    { key: 'title', label: 'Section Title', type: 'text' },
    { key: 'subtitle', label: 'Section Subtitle', type: 'textarea' },
    {
      key: 'testimonials',
      label: 'Testimonials',
      type: 'repeater',
      fields: [
        { key: 'name', label: 'Name', type: 'text' },
        { key: 'position', label: 'Position', type: 'text' },
        { key: 'message', label: 'Message', type: 'textarea' },
        { key: 'rating', label: 'Rating (1-5)', type: 'number' },
      ],
    },
  ],
};

export const ContentEditor: React.FC<ContentEditorProps> = ({ section, onUpdate }) => {
  const [content, setContent] = useState<Record<string, any>>(section.content || {});
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<'success' | 'error'>('success');

  const fields = fieldConfigs[section.type] || [];

  const handleChange = (key: string, value: any) => {
    setContent({ ...content, [key]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      await contentApi.updateSectionContent(section.id, content);
      onUpdate({ ...section, content });
      setMessageType('success');
      setMessage('Section content saved successfully!');
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      setMessageType('error');
      setMessage('Failed to save section content');
    } finally {
      setSaving(false);
    }
  };

  const renderField = (field: any) => {
    const value = content[field.key] !== undefined ? content[field.key] : '';

    switch (field.type) {
      case 'text':
      case 'email':
      case 'url':
      case 'number':
        return (
          <div className={styles.field} key={field.key}>
            <label className={styles.label}>
              {field.label} {field.required && <span className={styles.required}>*</span>}
            </label>
            <input
              type={field.type}
              value={value}
              onChange={(e) => handleChange(field.key, e.target.value)}
              placeholder={field.placeholder}
              className={styles.input}
              required={field.required}
            />
          </div>
        );

      case 'textarea':
        return (
          <div className={styles.field} key={field.key}>
            <label className={styles.label}>
              {field.label} {field.required && <span className={styles.required}>*</span>}
            </label>
            <textarea
              value={value}
              onChange={(e) => handleChange(field.key, e.target.value)}
              rows={4}
              placeholder={field.placeholder}
              className={styles.textarea}
              required={field.required}
            />
          </div>
        );

      case 'image':
        return (
          <div className={styles.field} key={field.key}>
            <label className={styles.label}>{field.label}</label>
            <ImageUploader
              value={value}
              onChange={(url) => handleChange(field.key, url)}
            />
          </div>
        );

      case 'checkbox':
        return (
          <div className={styles.checkboxField} key={field.key}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={value === true || value === 'true'}
                onChange={(e) => handleChange(field.key, e.target.checked)}
              />
              <span>{field.label}</span>
            </label>
          </div>
        );

      case 'repeater':
        return (
          <RepeaterField
            key={field.key}
            label={field.label}
            fields={field.fields}
            value={Array.isArray(value) ? value : []}
            onChange={(val) => handleChange(field.key, val)}
          />
        );

      default:
        return null;
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.contentEditor}>
      <div className={styles.header}>
        <h2 className={styles.title}>{section.name}</h2>
        <div className={styles.badge}>
          <span className={styles.badgeLabel}>Type:</span>
          <span className={styles.badgeValue}>{section.type}</span>
        </div>
      </div>

      {message && (
        <div className={`${styles.message} ${styles[messageType]}`}>{message}</div>
      )}

      <div className={styles.fields}>{fields.map(renderField)}</div>

      <div className={styles.actions}>
        <button type="submit" className={styles.saveButton} disabled={saving}>
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </form>
  );
};