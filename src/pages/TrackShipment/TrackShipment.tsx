import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { TrackingForm } from '../../components/sections/TrackShipment/TrackingForm/TrackingForm';
import { TrackingResult } from '../../components/sections/TrackShipment/TrackingResult/TrackingResult';
import { useScrollToTop } from '../../hooks/useScrollToTop';
import { AlertCircle, PackageX } from 'lucide-react';
import styles from './TrackShipment.module.css';

const API_URL = import.meta.env.VITE_MES_API_URL || '/tracking-api';

export const TrackShipment: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const trackingFromUrl = searchParams.get('tracking') || '';
  const [submittedTracking, setSubmittedTracking] = useState(trackingFromUrl);
  const [hasSearched, setHasSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [trackingData, setTrackingData] = useState<any>(null);
  
  useScrollToTop();

  useEffect(() => {
    if (trackingFromUrl) {
      handleTrack(trackingFromUrl);
    }
  }, [trackingFromUrl]);

  const handleTrack = async (trackingNumber: string) => {
    setLoading(true);
    setError(null);
    setSubmittedTracking(trackingNumber);
    setHasSearched(true);
    setSearchParams({ tracking: trackingNumber });
    
    try {
      const url = `${API_URL}/trackshipment?barcode=${trackingNumber}`;
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // ✅ Updated: Check the new response structure
      if (data.status === true && data.data) {
        setTrackingData(data);
      } else {
        throw new Error(data.message || 'Shipment not found');
      }
      
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An error occurred';
      setError(message);
      console.error('Tracking error:', message);
    } finally {
      setLoading(false);
    }
  };

  // Check if we have valid shipment data
  const hasValidShipment = trackingData?.data?.parcelDetails?.barcode || trackingData?.data?.parcelDetails?.waybill;
  
  const isShipmentNotFound = hasSearched && !loading && !hasValidShipment && !error;

  return (
    <main className={styles.trackShipment}>
      <section className={styles.contentSection}>
        <TrackingForm onSubmit={handleTrack} loading={loading} initialValue={submittedTracking}/>
        
        {/* Shipment Not Found */}
        {isShipmentNotFound && !loading && (
          <div className={styles.errorContainer}>
            <div className={styles.notFoundCard}>
              <div className={styles.notFoundIcon}>
                <PackageX size={48} />
              </div>
              <h3 className={styles.notFoundTitle}>Shipment Not Found</h3>
              <p className={styles.notFoundMessage}>
                We couldn't find a shipment with tracking number <strong>{submittedTracking}</strong>.
              </p>
              <p className={styles.notFoundHint}>
                Please check the tracking number and try again, or contact customer support for assistance.
              </p>
              <div className={styles.notFoundActions}>
                <button 
                  className={styles.retryButton}
                  onClick={() => handleTrack(submittedTracking)}
                >
                  Try Again
                </button>
                <a href="/contact-us" className={styles.contactButton}>
                  Contact Support
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Other Errors */}
        {error && !isShipmentNotFound && !loading && (
          <div className={styles.errorContainer}>
            <div className={styles.errorCard}>
              <div className={styles.errorIcon}>
                <AlertCircle size={48} />
              </div>
              <h3 className={styles.errorTitle}>Something went wrong</h3>
              <p className={styles.errorMessage}>{error}</p>
              <button 
                className={styles.retryButton}
                onClick={() => handleTrack(submittedTracking)}
              >
                Try Again
              </button>
            </div>
          </div>
        )}
        
        {/* Show Results */}
        {hasValidShipment && !loading && !error && (
          <TrackingResult 
            trackingData={trackingData}
            trackingNumber={submittedTracking}
          />
        )}

        {/* Loading State */}
        {loading && (
          <div className={styles.loadingContainer}>
            <div className={styles.loadingCard}>
              <div className={styles.loadingSpinner}>
                <div className={styles.spinner} />
              </div>
              <h3 className={styles.loadingTitle}>Tracking your shipment</h3>
              <p className={styles.loadingText}>
                Please wait while we fetch the latest information for <strong>{submittedTracking}</strong>
              </p>
            </div>
          </div>
        )}
      </section>
    </main>
  );
};