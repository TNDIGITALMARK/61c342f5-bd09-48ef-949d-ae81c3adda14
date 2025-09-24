import { FireCall, ResponseUnit, DepartmentStats, CallVolumeTrend, CrewMember } from '../types/fire-calls';

const crewMembers: CrewMember[] = [
  { id: '1', name: 'Captain Martinez', rank: 'Captain', certification: ['EMT-P', 'Fire Officer I'] },
  { id: '2', name: 'FF Johnson', rank: 'Firefighter', certification: ['EMT-B', 'Firefighter II'] },
  { id: '3', name: 'FF Chen', rank: 'Firefighter', certification: ['EMT-B', 'Firefighter I'] },
  { id: '4', name: 'Lt. Williams', rank: 'Lieutenant', certification: ['EMT-I', 'Fire Officer I'] },
  { id: '5', name: 'FF Rodriguez', rank: 'Firefighter', certification: ['EMT-B', 'Firefighter II'] },
  { id: '6', name: 'Chief Thompson', rank: 'Battalion Chief', certification: ['EMT-P', 'Fire Officer III'] },
];

export const mockResponseUnits: ResponseUnit[] = [
  {
    id: 'engine-1',
    callSign: 'Engine 1',
    type: 'engine',
    status: 'on-scene',
    location: { lat: 40.7128, lng: -74.0060 },
    currentCallId: 'call-001',
    crew: crewMembers.slice(0, 3),
    vehicleInfo: {
      make: 'Pierce',
      model: 'Enforcer',
      year: 2020,
      equipmentLevel: 'Class A Pumper'
    }
  },
  {
    id: 'engine-2',
    callSign: 'Engine 2',
    type: 'engine',
    status: 'available',
    location: { lat: 40.7089, lng: -74.0012 },
    crew: crewMembers.slice(3, 6),
    vehicleInfo: {
      make: 'Seagrave',
      model: 'Marauder II',
      year: 2019,
      equipmentLevel: 'Class A Pumper'
    }
  },
  {
    id: 'ladder-1',
    callSign: 'Ladder 1',
    type: 'ladder',
    status: 'enroute',
    location: { lat: 40.7150, lng: -74.0080 },
    currentCallId: 'call-002',
    crew: crewMembers.slice(0, 4),
    vehicleInfo: {
      make: 'Pierce',
      model: 'Ascendant',
      year: 2021,
      equipmentLevel: '105ft Ladder'
    }
  },
  {
    id: 'rescue-1',
    callSign: 'Rescue 1',
    type: 'rescue',
    status: 'dispatched',
    location: { lat: 40.7100, lng: -74.0030 },
    currentCallId: 'call-003',
    crew: crewMembers.slice(2, 5),
    vehicleInfo: {
      make: 'Ferrara',
      model: 'Heavy Rescue',
      year: 2020,
      equipmentLevel: 'Technical Rescue'
    }
  },
  {
    id: 'ambulance-1',
    callSign: 'Ambulance 1',
    type: 'ambulance',
    status: 'on-scene',
    location: { lat: 40.7140, lng: -74.0070 },
    currentCallId: 'call-004',
    crew: crewMembers.slice(1, 3),
    vehicleInfo: {
      make: 'Ford',
      model: 'E-450',
      year: 2019,
      equipmentLevel: 'ALS'
    }
  },
  {
    id: 'chief-1',
    callSign: 'Chief 1',
    type: 'chief',
    status: 'available',
    location: { lat: 40.7110, lng: -74.0020 },
    crew: [crewMembers[5]],
    vehicleInfo: {
      make: 'Ford',
      model: 'F-250',
      year: 2021,
      equipmentLevel: 'Command Unit'
    }
  },
  {
    id: 'engine-3',
    callSign: 'Engine 3',
    type: 'engine',
    status: 'returning',
    location: { lat: 40.7080, lng: -74.0040 },
    crew: crewMembers.slice(0, 3),
    vehicleInfo: {
      make: 'Pierce',
      model: 'Enforcer',
      year: 2018,
      equipmentLevel: 'Class A Pumper'
    }
  },
  {
    id: 'hazmat-1',
    callSign: 'HazMat 1',
    type: 'hazmat',
    status: 'out-of-service',
    location: { lat: 40.7095, lng: -74.0015 },
    crew: crewMembers.slice(3, 6),
    vehicleInfo: {
      make: 'Freightliner',
      model: 'M2',
      year: 2017,
      equipmentLevel: 'Level A Response'
    }
  },
  {
    id: 'brush-1',
    callSign: 'Brush 1',
    type: 'brush',
    status: 'available',
    location: { lat: 40.7120, lng: -74.0050 },
    crew: crewMembers.slice(1, 4),
    vehicleInfo: {
      make: 'Ford',
      model: 'F-550',
      year: 2020,
      equipmentLevel: 'Wildland Interface'
    }
  },
  {
    id: 'ladder-2',
    callSign: 'Ladder 2',
    type: 'ladder',
    status: 'maintenance',
    crew: [],
    vehicleInfo: {
      make: 'Seagrave',
      model: 'Aerialscope',
      year: 2016,
      equipmentLevel: '100ft Platform'
    }
  },
  {
    id: 'ambulance-2',
    callSign: 'Ambulance 2',
    type: 'ambulance',
    status: 'on-scene',
    location: { lat: 40.7160, lng: -74.0090 },
    currentCallId: 'call-007',
    crew: crewMembers.slice(4, 6),
    vehicleInfo: {
      make: 'Mercedes',
      model: 'Sprinter',
      year: 2021,
      equipmentLevel: 'BLS'
    }
  },
  {
    id: 'support-1',
    callSign: 'Support 1',
    type: 'support',
    status: 'available',
    location: { lat: 40.7105, lng: -74.0025 },
    crew: crewMembers.slice(2, 4),
    vehicleInfo: {
      make: 'Freightliner',
      model: 'M2',
      year: 2019,
      equipmentLevel: 'Air/Light Unit'
    }
  }
];

export const mockFireCalls: FireCall[] = [
  {
    id: 'call-001',
    callNumber: 'FC24-0234',
    type: 'structure-fire',
    priority: 'critical',
    status: 'on-scene',
    address: '123 Main Street, Downtown',
    coordinates: { lat: 40.7128, lng: -74.0060 },
    dispatchTime: new Date(Date.now() - 1800000), // 30 minutes ago
    responseTime: new Date(Date.now() - 1680000), // 28 minutes ago
    arrivalTime: new Date(Date.now() - 1620000), // 27 minutes ago
    description: 'Apartment building fire, 2nd floor kitchen',
    assignedUnits: ['engine-1', 'ladder-1', 'chief-1'],
    reportingParty: 'Neighbor - Jane Doe',
    notes: 'Residents evacuated, fire contained to kitchen area'
  },
  {
    id: 'call-002',
    callNumber: 'FC24-0235',
    type: 'vehicle-accident',
    priority: 'high',
    status: 'enroute',
    address: '456 Oak Avenue & 2nd Street',
    coordinates: { lat: 40.7150, lng: -74.0080 },
    dispatchTime: new Date(Date.now() - 900000), // 15 minutes ago
    responseTime: new Date(Date.now() - 840000), // 14 minutes ago
    description: 'Multi-vehicle accident with entrapment',
    assignedUnits: ['ladder-1', 'ambulance-1'],
    reportingParty: 'Police dispatch',
    notes: 'PD on scene, requesting heavy rescue'
  },
  {
    id: 'call-003',
    callNumber: 'FC24-0236',
    type: 'medical-emergency',
    priority: 'high',
    status: 'dispatched',
    address: '789 Elm Street, Apt 4B',
    coordinates: { lat: 40.7100, lng: -74.0030 },
    dispatchTime: new Date(Date.now() - 300000), // 5 minutes ago
    description: 'Cardiac arrest, 65 y/o male',
    assignedUnits: ['rescue-1', 'ambulance-1'],
    reportingParty: 'Family member',
    notes: 'CPR in progress by family'
  },
  {
    id: 'call-004',
    callNumber: 'FC24-0237',
    type: 'vehicle-fire',
    priority: 'medium',
    status: 'on-scene',
    address: 'Highway 95 Mile Marker 12',
    coordinates: { lat: 40.7140, lng: -74.0070 },
    dispatchTime: new Date(Date.now() - 2400000), // 40 minutes ago
    responseTime: new Date(Date.now() - 2280000), // 38 minutes ago
    arrivalTime: new Date(Date.now() - 2100000), // 35 minutes ago
    description: 'Semi-truck fire, diesel fuel involved',
    assignedUnits: ['engine-2', 'hazmat-1'],
    reportingParty: 'State Police',
    notes: 'Highway closed, hazmat on standby'
  },
  {
    id: 'call-005',
    callNumber: 'FC24-0238',
    type: 'false-alarm',
    priority: 'low',
    status: 'cleared',
    address: '321 Pine Street, Office Building',
    coordinates: { lat: 40.7090, lng: -74.0010 },
    dispatchTime: new Date(Date.now() - 3600000), // 1 hour ago
    responseTime: new Date(Date.now() - 3480000), // 58 minutes ago
    arrivalTime: new Date(Date.now() - 3300000), // 55 minutes ago
    clearedTime: new Date(Date.now() - 3000000), // 50 minutes ago
    description: 'Fire alarm activation, smoke detector',
    assignedUnits: ['engine-3'],
    reportingParty: 'ADT Security',
    notes: 'Faulty detector, maintenance notified'
  },
  {
    id: 'call-006',
    callNumber: 'FC24-0239',
    type: 'rescue',
    priority: 'medium',
    status: 'contained',
    address: 'City Park, Hiking Trail #3',
    coordinates: { lat: 40.7170, lng: -74.0100 },
    dispatchTime: new Date(Date.now() - 5400000), // 90 minutes ago
    responseTime: new Date(Date.now() - 5280000), // 88 minutes ago
    arrivalTime: new Date(Date.now() - 5100000), // 85 minutes ago
    description: 'Hiker fell, possible leg fracture',
    assignedUnits: ['rescue-1', 'ambulance-2'],
    reportingParty: 'Park Ranger',
    notes: 'Patient evacuated by stretcher'
  },
  {
    id: 'call-007',
    callNumber: 'FC24-0240',
    type: 'medical-emergency',
    priority: 'high',
    status: 'on-scene',
    address: '555 Broadway, Restaurant',
    coordinates: { lat: 40.7160, lng: -74.0090 },
    dispatchTime: new Date(Date.now() - 600000), // 10 minutes ago
    responseTime: new Date(Date.now() - 540000), // 9 minutes ago
    arrivalTime: new Date(Date.now() - 480000), // 8 minutes ago
    description: 'Choking incident, adult female',
    assignedUnits: ['ambulance-2'],
    reportingParty: 'Restaurant Manager',
    notes: 'Heimlich maneuver performed, airway cleared'
  },
  {
    id: 'call-008',
    callNumber: 'FC24-0241',
    type: 'wildland-fire',
    priority: 'high',
    status: 'dispatched',
    address: 'County Road 15, Brush Area',
    coordinates: { lat: 40.7200, lng: -74.0120 },
    dispatchTime: new Date(Date.now() - 120000), // 2 minutes ago
    description: 'Grass fire, 2 acres involved',
    assignedUnits: ['brush-1', 'engine-2'],
    reportingParty: 'County Sheriff',
    notes: 'Wind from SW at 15mph'
  }
];

export const mockDepartmentStats: DepartmentStats = {
  totalCalls24h: 27,
  activeCalls: 8,
  averageResponseTime: '4:32',
  unitsAvailable: 6,
  unitsDeployed: 5,
  unitsOutOfService: 1
};

export const mockCallVolumeTrend: CallVolumeTrend[] = Array.from({ length: 24 }, (_, i) => ({
  hour: i,
  calls: Math.floor(Math.random() * 5) + 1,
  date: new Date().toISOString().split('T')[0]
}));

export const getActiveCallsCount = (): number => {
  return mockFireCalls.filter(call =>
    ['dispatched', 'enroute', 'on-scene', 'contained'].includes(call.status)
  ).length;
};

export const getUnitsByStatus = (status: string) => {
  return mockResponseUnits.filter(unit => unit.status === status);
};

export const getCallById = (id: string): FireCall | undefined => {
  return mockFireCalls.find(call => call.id === id);
};

export const getUnitById = (id: string): ResponseUnit | undefined => {
  return mockResponseUnits.find(unit => unit.id === id);
};