import { useState, useCallback } from 'react';
import { mesApi } from '../services/mes';
import type {
  FreightChargeRequest,
  FreightChargeResponse,
  BookShipmentRequest,
  BookShipmentResponse,
  TrackingResponse,
  ShipmentStatusResponse,
  WaybillResponse,
  CountryStateCityResponse,
} from '../services/mes/mesTypes';

interface UseMesApiReturn {
  loading: boolean;
  error: string | null;
  locationData: CountryStateCityResponse | null;
  freightCharge: FreightChargeResponse | null;
  trackingDetails: TrackingResponse | null;
  shipmentStatus: ShipmentStatusResponse | null;
  waybillDetails: WaybillResponse | null;
  bookingResponse: BookShipmentResponse | null;
  getLocationData: () => Promise<void>;
  getFreightCharge: (shipment: FreightChargeRequest[], domesticService?: string, internationalService?: string) => Promise<FreightChargeResponse | null>;
  bookShipment: (request: BookShipmentRequest, internationalService?: string) => Promise<BookShipmentResponse | null>;
  getTrackingDetails: (waybillNumber: string) => Promise<void>;
  getShipmentStatus: (waybillNumber: string) => Promise<void>;
  getWaybillDetails: (waybillNumber: string) => Promise<void>;
  clearError: () => void;
}

export const useMesApi = (): UseMesApiReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [locationData, setLocationData] = useState<CountryStateCityResponse | null>(null);
  const [freightCharge, setFreightCharge] = useState<FreightChargeResponse | null>(null);
  const [trackingDetails, setTrackingDetails] = useState<TrackingResponse | null>(null);
  const [shipmentStatus, setShipmentStatus] = useState<ShipmentStatusResponse | null>(null);
  const [waybillDetails, setWaybillDetails] = useState<WaybillResponse | null>(null);
  const [bookingResponse, setBookingResponse] = useState<BookShipmentResponse | null>(null);

  const clearError = useCallback(() => setError(null), []);

  const handleRequest = useCallback(async <T>(
    request: () => Promise<T>,
    setter?: (data: T) => void
  ): Promise<T | null> => {
    setLoading(true);
    setError(null);
    try {
      const result = await request();
      if (setter) setter(result);
      return result;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An error occurred';
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const getLocationData = useCallback(async () => {
    await handleRequest(
      () => mesApi.getCountryStateCity(),
      setLocationData
    );
  }, [handleRequest]);

  const getFreightCharge = useCallback(async (
    shipment: FreightChargeRequest[],
    domesticService?: string,
    internationalService?: string
  ) => {
    return handleRequest(
      () => mesApi.getFreightCharge(shipment, domesticService, internationalService),
      setFreightCharge
    );
  }, [handleRequest]);

  const bookShipment = useCallback(async (
    request: BookShipmentRequest,
    internationalService?: string
  ) => {
    return handleRequest(
      () => mesApi.bookShipment(request, internationalService),
      setBookingResponse
    );
  }, [handleRequest]);

  const getTrackingDetails = useCallback(async (waybillNumber: string) => {
    await handleRequest(
      () => mesApi.getTrackingDetails(waybillNumber),
      setTrackingDetails
    );
  }, [handleRequest]);

  const getShipmentStatus = useCallback(async (waybillNumber: string) => {
    await handleRequest(
      () => mesApi.getShipmentStatus(waybillNumber),
      setShipmentStatus
    );
  }, [handleRequest]);

  const getWaybillDetails = useCallback(async (waybillNumber: string) => {
    await handleRequest(
      () => mesApi.getWaybillDetails(waybillNumber),
      setWaybillDetails
    );
  }, [handleRequest]);

  return {
    loading,
    error,
    locationData,
    freightCharge,
    trackingDetails,
    shipmentStatus,
    waybillDetails,
    bookingResponse,
    getLocationData,
    getFreightCharge,
    bookShipment,
    getTrackingDetails,
    getShipmentStatus,
    getWaybillDetails,
    clearError,
  };
};