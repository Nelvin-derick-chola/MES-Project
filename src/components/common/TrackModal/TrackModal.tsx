import React, { useState, useEffect } from 'react';
import { X, Package, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import styles from './TrackModal.module.css';

interface TrackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TrackModal: React.FC<TrackModalProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [trackingNumber, setTrackingNumber] = useState('');
  const [error, setError] = useState('');

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleTrack = () => {
    if (!trackingNumber.trim()) {
      setError('Please enter a tracking number');
      return;
    }

    setError('');
    const trimmedNumber = trackingNumber.trim().toUpperCase();
    
    // Close modal and navigate to internal track page
    onClose();
    navigate(`/track-shipment?tracking=${encodeURIComponent(trimmedNumber)}`);
    
    // Clear input
    setTrackingNumber('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleTrack();
    }
  };

  const handleClose = () => {
    setTrackingNumber('');
    setError('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={handleClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>
            <Package size={20} />
            Track Your Shipment
          </h2>
          <button className={styles.closeButton} onClick={handleClose}>
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className={styles.modalBody}>
          {/* Tracking Input */}
          <div className={styles.inputWrapper}>
            <input
              type="text"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value.toUpperCase())}
              onKeyPress={handleKeyPress}
              placeholder="Enter tracking number"
              className={styles.trackingInput}
              maxLength={20}
              autoFocus
            />
            <button className={styles.trackButton} onClick={handleTrack}>
              Track
              <ArrowRight size={14} />
            </button>
          </div>
          {error && <span className={styles.errorMessage}>{error}</span>}
        </div>
      </div>
    </div>
  );
};