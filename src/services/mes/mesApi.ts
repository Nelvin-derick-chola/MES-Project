import { createApiClient } from '../api/client';
import type {
  FreightChargeRequest,
  FreightChargeResponse,
  BookShipmentRequest,
  BookShipmentResponse,
  TrackingResponse,
  ShipmentStatusResponse,
  WaybillResponse,
  CountryStateCityResponse,
} from './mesTypes';

const API_URL = import.meta.env.VITE_MES_API_URL || '/mes-api';
const API_EMAIL = import.meta.env.VITE_MES_API_EMAIL || 'sumit@inerun.com';
const API_PRIVATE_KEY = import.meta.env.VITE_MES_API_PRIVATE_KEY || '$ARtdDYJRDMKhs';

class MesApiService {
  private client = createApiClient({
    baseURL: API_URL,
    email: API_EMAIL,
    privateKey: API_PRIVATE_KEY,
  });

  /**
   * Get countries, states, and cities
   * Returns a single object, not an array
   */
  async getCountryStateCity(): Promise<CountryStateCityResponse> {
    return this.client.get<CountryStateCityResponse>('/getcountrystatecity', {}, false);
  }

  /**
   * Get freight charge estimate
   */
  async getFreightCharge(
    shipment: FreightChargeRequest[],
    domesticService?: string,
    internationalService?: string
  ): Promise<FreightChargeResponse> {
    const domestic = domesticService || import.meta.env.VITE_MES_DOMESTIC_SERVICE_ID || '1';
    const international = internationalService || import.meta.env.VITE_MES_INTERNATIONAL_SERVICE_ID || '4';

    return this.client.get<FreightChargeResponse>(
      '/getfreight',
      {
        domestic_service: domestic,
        international_service: international,
        shipment: shipment,
      },
      true
    );
  }

  /**
   * Book a shipment/collection
   */
  async bookShipment(
    request: BookShipmentRequest,
    internationalService?: string
  ): Promise<BookShipmentResponse> {
    const service = internationalService || import.meta.env.VITE_MES_INTERNATIONAL_SERVICE_ID || '5';

    return this.client.post<BookShipmentResponse>(
      '/bookcollectioninternational',
      request,
      {
        international_service: service,
      },
      true
    );
  }

  /**
   * Get full tracking history
   */
  async getTrackingDetails(waybillNumber: string): Promise<TrackingResponse> {
    return this.client.get<TrackingResponse>(
      `/getshipmenttrackingdetails/wbid/${waybillNumber}`,
      {},
      false
    );
  }

  /**
   * Get current shipment status only
   */
  async getShipmentStatus(waybillNumber: string): Promise<ShipmentStatusResponse> {
    return this.client.get<ShipmentStatusResponse>(
      `/getshipmenttracking/wbid/${waybillNumber}`,
      {},
      false
    );
  }

  /**
   * Get waybill/label details
   */
  async getWaybillDetails(waybillNumber: string): Promise<WaybillResponse> {
    return this.client.get<WaybillResponse>(
      `/getwaybilldetail/bid/${waybillNumber}`,
      {},
      false
    );
  }
}

export const mesApi = new MesApiService();