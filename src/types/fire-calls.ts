export interface FireCall {
  id: string;
  callNumber: string;
  type: CallType;
  priority: Priority;
  status: CallStatus;
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  dispatchTime: Date;
  responseTime?: Date;
  arrivalTime?: Date;
  clearedTime?: Date;
  description: string;
  assignedUnits: string[];
  reportingParty?: string;
  notes?: string;
}

export interface ResponseUnit {
  id: string;
  callSign: string;
  type: UnitType;
  status: UnitStatus;
  location?: {
    lat: number;
    lng: number;
  };
  currentCallId?: string;
  crew: CrewMember[];
  vehicleInfo: {
    make: string;
    model: string;
    year: number;
    equipmentLevel: string;
  };
}

export interface CrewMember {
  id: string;
  name: string;
  rank: string;
  certification: string[];
}

export type CallType =
  | 'structure-fire'
  | 'vehicle-fire'
  | 'wildland-fire'
  | 'medical-emergency'
  | 'vehicle-accident'
  | 'hazmat'
  | 'rescue'
  | 'false-alarm'
  | 'other';

export type Priority = 'low' | 'medium' | 'high' | 'critical';

export type CallStatus =
  | 'dispatched'
  | 'enroute'
  | 'on-scene'
  | 'contained'
  | 'controlled'
  | 'cleared'
  | 'cancelled';

export type UnitType =
  | 'engine'
  | 'ladder'
  | 'rescue'
  | 'ambulance'
  | 'chief'
  | 'hazmat'
  | 'brush'
  | 'support';

export type UnitStatus =
  | 'available'
  | 'dispatched'
  | 'enroute'
  | 'on-scene'
  | 'returning'
  | 'out-of-service'
  | 'maintenance';

export interface DepartmentStats {
  totalCalls24h: number;
  activeCalls: number;
  averageResponseTime: string;
  unitsAvailable: number;
  unitsDeployed: number;
  unitsOutOfService: number;
}

export interface CallVolumeTrend {
  hour: number;
  calls: number;
  date: string;
}

export interface FilterOptions {
  callTypes: CallType[];
  priorities: Priority[];
  statuses: CallStatus[];
  units: string[];
  dateRange: {
    start: Date;
    end: Date;
  };
}