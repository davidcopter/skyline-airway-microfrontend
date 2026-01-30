import { Aircraft, DefectReport, WorkOrder, ThresholdAlert, User, JobCard } from '../types';

export const mockUsers: User[] = [
  {
    id: 'u1',
    username: 'jdoe',
    name: 'John Doe',
    role: 'engineer',
    permissions: ['all'],
    token: 'mock-token-engineer'
  },
  {
    id: 'u2',
    username: 'asmith',
    name: 'Alice Smith',
    role: 'technician',
    permissions: ['view', 'update_progress'],
    token: 'mock-token-technician'
  },
  {
    id: 'u3',
    username: 'captain_sky',
    name: 'Capt. Robert Sky',
    role: 'crew',
    permissions: ['report_snag'],
    token: 'mock-token-crew'
  }
];

export const mockAircraft: Aircraft[] = [
  {
    tailNumber: 'N123SA',
    model: 'Airbus A320',
    year: 2018,
    totalFlightHours: 12500,
    totalCycles: 8200,
    airworthinessStatus: 'airworthy',
    lastInspection: '2025-12-15',
    nextInspection: '2026-06-15'
  },
  {
    tailNumber: 'N456SA',
    model: 'Boeing 737-800',
    year: 2019,
    totalFlightHours: 10200,
    totalCycles: 6500,
    airworthinessStatus: 'restricted',
    lastInspection: '2026-01-10',
    nextInspection: '2026-07-10'
  },
  {
    tailNumber: 'N789SA',
    model: 'Embraer E190',
    year: 2020,
    totalFlightHours: 5400,
    totalCycles: 4100,
    airworthinessStatus: 'grounded',
    lastInspection: '2025-11-20',
    nextInspection: '2026-05-20'
  },
  {
    tailNumber: 'N101SA',
    model: 'Airbus A321neo',
    year: 2022,
    totalFlightHours: 3200,
    totalCycles: 2100,
    airworthinessStatus: 'airworthy',
    lastInspection: '2026-01-20',
    nextInspection: '2026-07-20'
  }
];

export const mockDefects: DefectReport[] = [
  {
    id: 'def-001',
    tailNumber: 'N456SA',
    reportedBy: 'u3',
    reportedDate: '2026-01-28',
    description: 'Left engine oil pressure warning light flickering during descent.',
    severity: 'aog',
    status: 'in-progress',
    troubleshooting: [
      {
        id: 'ts-001',
        defectId: 'def-001',
        technician: 'u2',
        date: '2026-01-29',
        testsPerformed: ['Oil pressure sensor check', 'Wiring harness inspection'],
        findings: 'Sensor appears to be within limits, suspect intermittent wiring fault.',
        suspectedCause: 'Chafed wiring near connector P102.'
      }
    ]
  },
  {
    id: 'def-002',
    tailNumber: 'N123SA',
    reportedBy: 'u3',
    reportedDate: '2026-01-30',
    description: 'Cabin overhead bin latch on row 12C is broken.',
    severity: 'deferred',
    status: 'open'
  }
];

export const mockThresholds: ThresholdAlert[] = [
  {
    id: 'thr-001',
    tailNumber: 'N123SA',
    component: 'Engine #1 HP Turbine Blades',
    currentHours: 4850,
    thresholdHours: 5000,
    urgency: 'high',
    dueDate: '2026-02-15'
  },
  {
    id: 'thr-002',
    tailNumber: 'N101SA',
    component: 'Landing Gear Actuator',
    currentHours: 1200,
    thresholdHours: 2000,
    urgency: 'low',
    dueDate: '2026-08-10'
  }
];

export const mockJobCards: JobCard[] = [
  {
    id: 'jc-001',
    title: 'A-Check Inspection',
    description: 'Routine 500-hour line maintenance inspection.',
    aircraftType: 'A320 Family',
    estimatedHours: 12,
    requiredParts: [
      { partNumber: 'FILT-778', description: 'Oil Filter', quantity: 2, available: true }
    ],
    procedures: [
      { order: 1, description: 'Inspect engine cowlings for leaks', completed: true },
      { order: 2, description: 'Check hydraulic fluid levels', completed: false }
    ]
  }
];

export const mockWorkOrders: WorkOrder[] = [
  {
    id: 'wo-001',
    tailNumber: 'N123SA',
    jobCardId: 'jc-001',
    assignedTo: ['u2'],
    status: 'in-progress',
    scheduledDate: '2026-01-31',
    progress: 45
  }
];
