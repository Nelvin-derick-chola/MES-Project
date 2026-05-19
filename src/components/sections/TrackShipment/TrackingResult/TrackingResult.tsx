import React from 'react';
import { Package, Clock, CheckCircle, Truck, FileText, Send, User, Home } from 'lucide-react';
import styles from './TrackingResult.module.css';

interface TrackingEvent {
  status_type: string;
  status_comment: string;
  status_timestamp: string;
  cityname?: string;
  city?: string;
}

interface ParcelDetails {
  barcode: string;
  waybill?: string;
  // Sender fields
  pickup_first_name?: string;
  pickup_last_name?: string;
  pickup_add_line_1?: string;
  pickup_add_line_2?: string;
  pickup_mobile_no?: string;
  pickup_phone_no?: string;
  // Receiver fields
  delivery_first_name?: string;
  delivery_last_name?: string;
  delivery_add_line_1?: string;
  delivery_add_line_2?: string;
  delivery_mobile_no?: string;
  delivery_phone_no?: string;
  // Location fields
  source_city_name?: string;
  destination_city_name?: string;
  origin?: string;
  destination?: string;
  // Status
  current_parcel_status?: string;
  status?: string;
  pod?: string;
  barcode_image?: string;
}

interface TrackingData {
  parcelDetails: ParcelDetails;
  parceltrack: TrackingEvent[];
  parceltrackdetail?: {
    pod?: string;
    receiver_name?: string;
    national_id?: string;
    status?: string;
    status_string?: string;
  };
}

interface TrackingResponse {
  status: boolean;
  message: string;
  data: TrackingData;
}

interface TrackingResultProps {
  trackingData: TrackingResponse | null;
  trackingNumber: string;
}

export const TrackingResult: React.FC<TrackingResultProps> = ({ 
  trackingData,
  trackingNumber 
}) => {
  if (!trackingData?.data) return null;

  const parcelDetails = trackingData.data.parcelDetails;
  const events: TrackingEvent[] = trackingData.data.parceltrack || [];
  const trackDetail = trackingData.data.parceltrackdetail;
  
  // ✅ Build sender name from first and last name
  const senderName = parcelDetails.pickup_first_name || parcelDetails.pickup_last_name 
    ? `${parcelDetails.pickup_first_name || ''} ${parcelDetails.pickup_last_name || ''}`.trim()
    : '-';
  
  // ✅ Build receiver name
  const receiverName = trackDetail?.receiver_name || 
    (parcelDetails.delivery_first_name || parcelDetails.delivery_last_name
      ? `${parcelDetails.delivery_first_name || ''} ${parcelDetails.delivery_last_name || ''}`.trim()
      : '-');
  
  // ✅ Get addresses
  const senderAddress = parcelDetails.pickup_add_line_1 || parcelDetails.pickup_add_line_2 || '-';
  const receiverAddress = parcelDetails.delivery_add_line_1 || parcelDetails.delivery_add_line_2 || '-';
  
  // ✅ Get phone numbers
  const senderPhone = parcelDetails.pickup_mobile_no || parcelDetails.pickup_phone_no || '-';
  const receiverPhone = parcelDetails.delivery_mobile_no || parcelDetails.delivery_phone_no || '-';
  
  // ✅ Get locations
  const origin = parcelDetails.source_city_name || parcelDetails.origin || '-';
  const destination = parcelDetails.destination_city_name || parcelDetails.destination || '-';
  
  // Get current status
  const currentStatus = trackDetail?.status_string || parcelDetails.current_parcel_status || parcelDetails.status || events[0]?.status_comment || 'Pending';
  
  // Get POD image URL (fix the path)
 const podImage = trackDetail?.pod || parcelDetails.pod || parcelDetails.barcode_image;
const podImageUrl = podImage?.startsWith('http') 
  ? podImage 
  : `http://116.202.29.37/mes1sep/public/images/${podImage?.replace(/ /g, '%20')}`;
  
  // Define status steps
  const statusSteps = [
    { label: 'Shipment Booked', icon: <FileText size={18} />, key: ['booked', 'drop off', 'created'] },
    { label: 'Invoice Created', icon: <FileText size={18} />, key: ['invoice'] },
    { label: 'Dispatched', icon: <Send size={18} />, key: ['dispatched'] },
    { label: 'In Transit', icon: <Truck size={18} />, key: ['intransit', 'transit', 'received'] },
    { label: 'Out for Delivery', icon: <User size={18} />, key: ['assigned', 'driver'] },
    { label: 'Delivered', icon: <Home size={18} />, key: ['delivered'] },
  ];

  const getStepStatus = (stepKeys: string[]): 'completed' | 'current' | 'pending' => {
    const statusLower = currentStatus.toLowerCase();
    for (const key of stepKeys) {
      if (statusLower.includes(key)) return 'current';
    }
    return 'pending';
  };

  const getCurrentStatusMessage = (): string => {
    const statusLower = currentStatus.toLowerCase();
    if (statusLower.includes('delivered')) return 'Your package has been delivered successfully!';
    if (statusLower.includes('assigned') || statusLower.includes('driver')) return 'Your package is out for delivery today!';
    if (statusLower.includes('transit')) return 'Your package is on its way to the destination.';
    if (statusLower.includes('dispatched')) return 'Your package has been dispatched from the collection center.';
    if (statusLower.includes('invoice')) return 'Invoice has been created for your shipment.';
    return currentStatus;
  };

  const getStatusTimeMessage = (): string => {
    if (events.length === 0) return '';
    const latestEvent = events[0];
    if (latestEvent?.status_timestamp) {
      const date = new Date(latestEvent.status_timestamp);
      if (currentStatus.toLowerCase().includes('delivered')) {
        return `Delivered on ${date.toLocaleDateString('en-GB', {
          day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
        })}`;
      }
      return `Last updated: ${date.toLocaleDateString('en-GB', {
        day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
      })}`;
    }
    return '';
  };

  return (
    <div className={styles.trackingResult}>
      {/* Parcel Details Section */}
      <div className={styles.parcelSection}>
        <h2 className={styles.sectionTitle}>
          <Package size={20} />
          Parcel Details
        </h2>
        
        <div className={styles.fromToGrid}>
          {/* From Column - Sender */}
          <div className={styles.fromColumn}>
            <div className={styles.columnHeader}>
              <span className={styles.columnTitle}>From</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Name:</span>
              <span className={styles.detailValue}>{senderName}</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Address:</span>
              <span className={styles.detailValue}>{senderAddress}</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Phone:</span>
              <span className={styles.detailValue}>{senderPhone}</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Origin:</span>
              <span className={styles.detailValue}>{origin}</span>
            </div>
          </div>

          {/* To Column - Receiver */}
          <div className={styles.toColumn}>
            <div className={styles.columnHeader}>
              <span className={styles.columnTitle}>To</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Name:</span>
              <span className={styles.detailValue}>{receiverName}</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Address:</span>
              <span className={styles.detailValue}>{receiverAddress}</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Phone:</span>
              <span className={styles.detailValue}>{receiverPhone}</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Destination:</span>
              <span className={styles.detailValue}>{destination}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <div className={styles.timelineSection}>
        <h2 className={styles.sectionTitle}>
          <Clock size={20} />
          Shipment Progress
        </h2>

        {/* Status Message */}
        <div className={styles.statusMessageCard}>
          <div className={styles.statusMessageIcon}>
            <CheckCircle size={24} />
          </div>
          <div className={styles.statusMessageContent}>
            <h3 className={styles.statusMessageTitle}>{getCurrentStatusMessage()}</h3>
            <p className={styles.statusMessageTime}>{getStatusTimeMessage()}</p>
          </div>
        </div>

        {/* Progress Steps */}
        <div className={styles.progressSteps}>
          {statusSteps.map((step, index) => {
            const stepStatus = getStepStatus(step.key);
            return (
              <React.Fragment key={index}>
                <div className={`${styles.progressStep} ${stepStatus === 'completed' ? styles.completed : stepStatus === 'current' ? styles.current : styles.pending}`}>
                  <div className={styles.progressStepIcon}>
                    {stepStatus === 'completed' ? <CheckCircle size={18} /> : step.icon}
                  </div>
                  <span className={styles.progressStepLabel}>{step.label}</span>
                  {stepStatus === 'current' && <span className={styles.currentIndicator}>Current</span>}
                </div>
                {index < statusSteps.length - 1 && (
                  <div className={`${styles.progressConnector} ${stepStatus === 'completed' ? styles.completed : ''}`} />
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Tracking History Table */}
        {events.length > 0 && (
          <div className={styles.tableContainer}>
            <h3 className={styles.tableTitle}>Detailed Tracking History</h3>
            <table className={styles.trackingTable}>
              <thead>
                <tr><th>Date & Time</th><th>Location</th><th>Status</th></tr>
              </thead>
              <tbody>
                {events.map((event, index) => (
                  <tr key={index} className={index === 0 ? styles.latestRow : ''}>
                    <td className={styles.dateCell}>
                      {new Date(event.status_timestamp).toLocaleString('en-GB', {
                        day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
                      })}
                    </td>
                    <td className={styles.cityCell}>{event.cityname || event.city || '-'}</td>
                    <td className={styles.statusCell}>
                      {event.status_comment}
                      {index === 0 && <span className={styles.latestBadge}>Latest</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Additional Info */}
        <div className={styles.receiverRow}>
          <div className={styles.receiverItem}>
            <span className={styles.receiverLabel}>Tracking Number</span>
            <span className={styles.receiverValue}>{parcelDetails.barcode || trackingNumber}</span>
          </div>
          <div className={styles.receiverItem}>
            <span className={styles.receiverLabel}>Waybill Number</span>
            <span className={styles.receiverValue}>{parcelDetails.waybill || '-'}</span>
          </div>
          <div className={styles.receiverItem}>
            <span className={styles.receiverLabel}>National ID</span>
            <span className={styles.receiverValue}>{trackDetail?.national_id || '-'}</span>
          </div>
          <div className={styles.receiverItem}>
            <span className={styles.receiverLabel}>Proof of Delivery</span>
            <span className={styles.receiverValue}>{podImage ? '✓ Available' : '— Pending'}</span>
          </div>
        </div>

        {/* POD Image */}
        {podImageUrl && (
          <div className={styles.podImageWrapper}>
            <img 
              src={podImageUrl}
              alt="Proof of Delivery" 
              className={styles.podImage}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};