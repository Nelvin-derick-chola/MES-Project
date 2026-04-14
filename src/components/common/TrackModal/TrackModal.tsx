import React, { useState, useEffect } from 'react';
import { X, Search, Package, MapPin, Clock, CheckCircle, Truck, AlertCircle } from 'lucide-react';
import styles from './TrackModal.module.css';

interface TrackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Mock tracking data
const mockTrackingData = {
  'RS123456789': {
    status: 'in-transit',
    estimatedDelivery: 'April 16, 2025',
    origin: 'Lusaka',
    destination: 'Kitwe',
    currentLocation: 'Kabwe',
    events: [
      { date: 'Apr 14, 2025 - 08:30', location: 'Lusaka', status: 'Shipment picked up' },
      { date: 'Apr 14, 2025 - 11:45', location: 'Lusaka', status: 'Departed sorting facility' },
      { date: 'Apr 14, 2025 - 16:20', location: 'Kabwe', status: 'Arrived at transit hub' },
    ],
  },
  'RS987654321': {
    status: 'delivered',
    estimatedDelivery: 'April 13, 2025',
    origin: 'Ndola',
    destination: 'Livingstone',
    currentLocation: 'Livingstone',
    events: [
      { date: 'Apr 12, 2025 - 09:00', location: 'Ndola', status: 'Shipment picked up' },
      { date: 'Apr 12, 2025 - 14:30', location: 'Lusaka', status: 'Arrived at sorting facility' },
      { date: 'Apr 13, 2025 - 10:15', location: 'Livingstone', status: 'Out for delivery' },
      { date: 'Apr 13, 2025 - 14:45', location: 'Livingstone', status: 'Delivered' },
    ],
  },
};

export const TrackModal: React.FC<TrackModalProps> = ({ isOpen, onClose }) => {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [trackingData, setTrackingData] = useState<any>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

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

    setIsLoading(true);
    setError('');
    setTrackingData(null);

    // Simulate API call
    setTimeout(() => {
      const data = mockTrackingData[trackingNumber as keyof typeof mockTrackingData];
      
      if (data) {
        setTrackingData(data);
        setError('');
        // Add to recent searches
        if (!recentSearches.includes(trackingNumber)) {
          setRecentSearches(prev => [trackingNumber, ...prev].slice(0, 3));
        }
      } else {
        setError('Tracking number not found. Please check and try again.');
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleTrack();
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle size={20} className={styles.statusDelivered} />;
      case 'in-transit':
        return <Truck size={20} className={styles.statusInTransit} />;
      default:
        return <Package size={20} className={styles.statusPending} />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'Delivered';
      case 'in-transit':
        return 'In Transit';
      default:
        return 'Pending';
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>
            <Package size={22} />
            Track Your Shipment
          </h2>
          <button className={styles.closeButton} onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className={styles.modalBody}>
          {/* Tracking Input */}
          <div className={styles.trackingSection}>
            <label className={styles.inputLabel}>ENTER YOUR TRACKING NUMBER</label>
            <div className={styles.inputWrapper}>
              <input
                type="text"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value.toUpperCase())}
                onKeyPress={handleKeyPress}
                placeholder="Tracking number here"
                className={styles.trackingInput}
                maxLength={20}
              />
              <button 
                className={styles.trackButton}
                onClick={handleTrack}
                disabled={isLoading}
              >
                {isLoading ? '...' : 'Go'}
              </button>
            </div>
            {error && <span className={styles.errorMessage}>{error}</span>}
          </div>

          {/* Recent Searches */}
          {recentSearches.length > 0 && !trackingData && (
            <div className={styles.recentSearches}>
              <span className={styles.recentLabel}>Recent:</span>
              <div className={styles.recentTags}>
                {recentSearches.map((num) => (
                  <button
                    key={num}
                    className={styles.recentTag}
                    onClick={() => setTrackingNumber(num)}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Tracking Results */}
          {trackingData && (
            <div className={styles.trackingResults}>
              {/* Status Header */}
              <div className={styles.statusHeader}>
                <div className={styles.statusInfo}>
                  {getStatusIcon(trackingData.status)}
                  <span className={styles.statusText}>{getStatusText(trackingData.status)}</span>
                </div>
                <span className={styles.estimatedDelivery}>
                  Est. Delivery: {trackingData.estimatedDelivery}
                </span>
              </div>

              {/* Route Info */}
              <div className={styles.routeInfo}>
                <div className={styles.routePoint}>
                  <MapPin size={16} className={styles.routeIcon} />
                  <div>
                    <span className={styles.routeLabel}>From</span>
                    <span className={styles.routeValue}>{trackingData.origin}</span>
                  </div>
                </div>
                <div className={styles.routeLine}>
                  <span className={styles.routeArrow}>→</span>
                </div>
                <div className={styles.routePoint}>
                  <MapPin size={16} className={styles.routeIcon} />
                  <div>
                    <span className={styles.routeLabel}>To</span>
                    <span className={styles.routeValue}>{trackingData.destination}</span>
                  </div>
                </div>
              </div>

              {/* Current Location */}
              <div className={styles.currentLocation}>
                <Clock size={16} className={styles.locationIcon} />
                <span>Current Location: {trackingData.currentLocation}</span>
              </div>

              {/* Tracking Timeline */}
              <div className={styles.timeline}>
                <h4 className={styles.timelineTitle}>Shipment Progress</h4>
                {trackingData.events.map((event: any, index: number) => (
                  <div key={index} className={styles.timelineItem}>
                    <div className={styles.timelineDot} />
                    <div className={styles.timelineContent}>
                      <span className={styles.timelineDate}>{event.date}</span>
                      <span className={styles.timelineLocation}>{event.location}</span>
                      <span className={styles.timelineStatus}>{event.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className={styles.modalFooter}>
          <p className={styles.footerText}>
            Need help? Contact customer support at <strong>+260 971 269 390-29</strong>
          </p>
        </div>
      </div>
    </div>
  );
};