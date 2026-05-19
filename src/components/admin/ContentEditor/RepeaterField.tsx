import React from 'react';
import { Plus, X } from 'lucide-react';
import styles from './ContentEditor.module.css';

interface RepeaterFieldProps {
  label: string;
  fields: Array<{ key: string; label: string; type: string; placeholder?: string }>;
  value: any[];
  onChange: (value: any[]) => void;
}

export const RepeaterField: React.FC<RepeaterFieldProps> = ({
  label,
  fields,
  value,
  onChange,
}) => {
  const addItem = () => {
    const newItem: any = {};
    fields.forEach((field) => {
      newItem[field.key] = '';
    });
    onChange([...value, newItem]);
  };

  const removeItem = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  const updateItem = (index: number, fieldKey: string, fieldValue: any) => {
    const newValue = [...value];
    newValue[index][fieldKey] = fieldValue;
    onChange(newValue);
  };

  return (
    <div className={styles.repeaterField}>
      <label className={styles.label}>{label}</label>
      <div className={styles.repeaterItems}>
        {value.map((item, index) => (
          <div key={index} className={styles.repeaterItem}>
            {fields.map((field) => (
              <input
                key={field.key}
                type={field.type}
                placeholder={field.placeholder || field.label}
                value={item[field.key] || ''}
                onChange={(e) => updateItem(index, field.key, e.target.value)}
                className={styles.repeaterInput}
              />
            ))}
            <button
              type="button"
              className={styles.removeButton}
              onClick={() => removeItem(index)}
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
      <button type="button" className={styles.addButton} onClick={addItem}>
        <Plus size={14} /> Add Item
      </button>
    </div>
  );
};