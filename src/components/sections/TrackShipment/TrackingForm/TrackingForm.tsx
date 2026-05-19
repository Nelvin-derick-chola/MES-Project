import React, { useState, useEffect } from 'react';
import { Search, Loader, Truck } from 'lucide-react';
//import { useSearchParams } from 'react-router-dom';
import styles from './TrackingForm.module.css';

interface TrackingFormProps {
  onSubmit: (trackingNumber: string) => void;
  loading: boolean;
  initialValue?: string;  // ✅ Add this prop
}

export const TrackingForm: React.FC<TrackingFormProps> = ({ 
  onSubmit, 
  loading,
  initialValue = '' 
}) => {
  const [trackingNumber, setTrackingNumber] = useState(initialValue);

  // ✅ Update input when initialValue changes (e.g., on refresh or from URL)
  useEffect(() => {
    setTrackingNumber(initialValue);
  }, [initialValue]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackingNumber.trim()) {
      onSubmit(trackingNumber.trim().toUpperCase());
    }
  };

  return (
    <div className={styles.trackingForm}>
      <div className={styles.formContainer}>
        {/* Simple Header */}
        <div className={styles.formHeader}>
          <Truck size={20} className={styles.headerIcon} />
          <span className={styles.headerText}>Track your shipment</span>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <div className={styles.inputWrapper}>
              <Search size={18} className={styles.searchIcon} />
              <input
                type="text"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                placeholder="Enter tracking number"
                className={styles.trackingInput}
                disabled={loading}
                autoComplete="off"
                spellCheck={false}
              />
            </div>
            <button 
              type="submit" 
              className={styles.submitButton}
              disabled={loading || !trackingNumber.trim()}
            >
              {loading ? (
                <Loader size={18} className={styles.spinner} />
              ) : (
                'Track'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};