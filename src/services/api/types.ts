// Location Types
export interface Country {
  id: number;
  country_name: string;
}

export interface State {
  id: number;
  state_name: string;
}

export interface City {
  id: number;
  city_name: string;
}

export interface LocationData {
  countries: Country[];
  states: State[];
  cities: City[];
}

// API Response Types
export interface ApiResponse<T = any> {
  error_msg: string;
  error_code: number;
  data?: T;
}

// Freight Charge Types
export interface FreightChargeRequest {
  id?: string;
  vendor_id: string | number;
  source_country: string | number;
  source_city: string | number;
  destination_country: string | number;
  destination_city: string | number;
  insurance: 0 | 1;
  pieces: number;
  length: number;
  width: number;
  height: number;
  gross_weight: number;
  declared_value: number;
}

export interface FreightChargeResponse {
  error_msg: string;
  error_code: number;
  rate: number;
}

// Shipment Types
export interface PickupAddress {
  s_first_name: string;
  s_last_name: string;
  s_country: string | number;
  s_statelist: string | number;
  s_city: string | number;
  s_add_1: string;
  s_add_2: string;
  s_pin: string;
  s_mobile_no: string;
  s_phone_no: string;
  s_ext: string;
  s_email: string;
}

export interface DeliveryAddress {
  r_first_name: string;
  r_last_name: string;
  r_country: string | number;
  r_statelist: string | number;
  r_city: string | number;
  r_add_1: string;
  r_add_2: string;
  r_pin: string;
  r_mobile_no: string;
  r_phone_no: string;
  r_ext: string;
  r_email: string;
}

export interface ShipmentDetails {
  paymenttype: '2' | '3' | '4'; // 2=Cash, 3=On Account, 4=COD
}

export interface ItemDetails {
  pieces: number;
  length: number;
  width: number;
  height: number;
  gross_weight: number;
  declared_value: number;
}

export interface BookShipmentRequest {
  token_no: string;
  international_service: string | number;
  insurance: 0 | 1;
  shipment: Array<{
    shipment_pickup_address: PickupAddress[];
    shipment_delivery_address: DeliveryAddress[];
    shipment_details: ShipmentDetails[];
    item_details: ItemDetails[];
  }>;
}

export interface BookShipmentResponse {
  error_msg1: string;
  error_code: number;
  rate: number;
  waybill: string[];
}

// Tracking Types
export interface TrackingEvent {
  status_timestamp: string;
  location: string;
  status_comment: string;
}

export interface TrackingOtherDetail {
  receiver_name: string;
  national_id: string;
  pod: string;
}

export interface TrackingResponse {
  error_msg: string;
  error_code: number;
  detail: TrackingEvent[];
  other_detail: TrackingOtherDetail;
}

// Shipment Status Types
export interface ShipmentStatusResponse {
  error_msg: string;
  error_code: number;
  detail: TrackingEvent[];
}

// Waybill Types
export interface WaybillParcel {
  pieces: string;
  length_cm: string;
  breadth_cm: string;
  height_cm: string;
  mass_kg: string;
  volume: string;
  chargeable_weight: string;
  total_chargeabl_weight_kgs: string;
}

export interface WaybillDetail {
  WayBill: string;
  insurance_no: string;
  indemnity_no: string;
  received_by: string;
  payment_name: string;
  origin: string;
  destination: string;
  date: string;
  time: string;
  account_no: string | null;
  company_name: string | null;
  company_address: string | null;
  receiver_name: string;
  receiver_address: string;
  receiver_city: string;
  receiver_state: string;
  receiver_country: string;
  receiver_phone_no: string;
  sender_name: string;
  sender_address: string;
  sender_city: string;
  sender_state: string;
  sender_country: string;
  sender_phone_no: string;
  waybill_captured_by: string | null;
  special_instruction: string;
  declared_value: string;
  insurance: string;
  surcharge: string | null;
  service_name: string;
  price: number;
  fuel_charges: string;
  vat: string;
  discount: string;
  insurance_amount: string;
  covid_19_surcharge: string;
  total: string;
  barcode_img_path: string;
  parcel: WaybillParcel[];
}

export interface WaybillResponse {
  error_msg: string;
  error_code: number;
  detail: WaybillDetail;
}

// Location Response Types
export interface CountryStateCityResponse {
  Message: string;
  Status: boolean;
  id: number;
  country_name: string;
  state_name: string;
  city_name: string;
}