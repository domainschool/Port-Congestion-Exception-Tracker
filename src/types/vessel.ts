export type VesselStatus = 'At Anchor' | 'Moored' | 'Underway';

export interface Vessel {
  id: string;
  name: string;
  status: VesselStatus;
  arrival_timestamp: string; // ISO string
  lat: number;
  lng: number;
  units_carried: number;
}
