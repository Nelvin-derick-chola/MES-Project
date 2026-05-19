import React, { useState } from 'react';
import type { Section } from '../../../services/contentApi';
import { contentApi } from '../../../services/contentApi';
import styles from './ContentEditor.module.css';

interface SectionOrderProps {
  sections: Section[];
  onOrderUpdate: () => void;
}

export const SectionOrder: React.FC<SectionOrderProps> = ({ sections, onOrderUpdate }) => {
  const [orderedSections, setOrderedSections] = useState([...sections]);
  const [saving, setSaving] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null) return;

    const newSections = [...orderedSections];
    const draggedItem = newSections[draggedIndex];
    newSections.splice(draggedIndex, 1);
    newSections.splice(index, 0, draggedItem);

    setOrderedSections(newSections);
    setDraggedIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const orderData = orderedSections.map((section, index) => ({
        id: section.id,
        order: index + 1,
      }));
      await contentApi.updateSectionOrder(orderData);
      onOrderUpdate();
    } catch (error) {
      console.error('Failed to update order:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setOrderedSections([...sections]);
  };

  return (
    <div className={styles.sectionOrder}>
      <div className={styles.orderHeader}>
        <h3>Drag to Reorder Sections</h3>
        <div className={styles.orderActions}>
          <button className={styles.cancelButton} onClick={handleCancel}>
            Cancel
          </button>
          <button className={styles.saveButton} onClick={handleSave} disabled={saving}>
            {saving ? 'Saving...' : 'Save Order'}
          </button>
        </div>
      </div>

      <div className={styles.orderList}>
        {orderedSections.map((section, index) => (
          <div
            key={section.id}
            className={styles.orderItem}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDragEnd={handleDragEnd}
          >
            <div className={styles.dragHandle}>⋮⋮</div>
            <div className={styles.orderItemContent}>
              <span className={styles.orderNumber}>{index + 1}</span>
              <div className={styles.orderItemInfo}>
                <div className={styles.orderItemName}>{section.name}</div>
                <div className={styles.orderItemType}>{section.type}</div>
              </div>
              <div className={`${styles.statusBadge} ${section.is_active ? styles.active : styles.inactive}`}>
                {section.is_active ? 'Active' : 'Hidden'}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};