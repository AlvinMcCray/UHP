
export interface MissionStats {
  distance: number;
  elevation: number;
  calories: number;
  days: number;
}

export interface RouteStage {
  id: number;
  title: string;
  description: string;
  status: 'Completed' | 'In Progress' | 'Pending';
  image: string;
  icon: 'map-pin' | 'circle' | 'dot';
}

export interface GroundingSource {
  title: string;
  uri: string;
}

export interface TelemetryData {
  heartRate: number;
  speed: number;
  power: number;
  cadence: number;
  latitude: number;
  longitude: number;
}
