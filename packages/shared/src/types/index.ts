export type UserRole = 'engineer' | 'technician' | 'crew' | 'manager';

export interface User {
  id: string;
  username: string;
  name: string;
  role: UserRole;
  permissions: string[];
  token?: string;
}

export type AirworthinessStatus = 'airworthy' | 'restricted' | 'grounded';

export interface Aircraft {
  tailNumber: string;
  model: string;
  year: number;
  totalFlightHours: number;
  totalCycles: number;
  airworthinessStatus: AirworthinessStatus;
  lastInspection: string;
  nextInspection: string;
}

export type UrgencyLevel = 'low' | 'medium' | 'high' | 'critical';

export interface ThresholdAlert {
  id: string;
  tailNumber: string;
  component: string;
  currentHours: number;
  thresholdHours: number;
  urgency: UrgencyLevel;
  dueDate: string;
}

export type DefectSeverity = 'aog' | 'mel' | 'deferred';
export type DefectStatus = 'open' | 'in-progress' | 'pending-inspection' | 'closed';

export interface TroubleshootingLog {
  id: string;
  defectId: string;
  technician: string;
  date: string;
  testsPerformed: string[];
  findings: string;
  suspectedCause: string;
}

export interface DefectReport {
  id: string;
  tailNumber: string;
  reportedBy: string;
  reportedDate: string;
  description: string;
  severity: DefectSeverity;
  status: DefectStatus;
  photos?: string[];
  troubleshooting?: TroubleshootingLog[];
}

export type WorkOrderStatus = 'scheduled' | 'in-progress' | 'pending-inspection' | 'completed';

export interface PartRequirement {
  partNumber: string;
  description: string;
  quantity: number;
  available: boolean;
}

export interface ProcedureStep {
  order: number;
  description: string;
  completed: boolean;
}

export interface JobCard {
  id: string;
  title: string;
  description: string;
  aircraftType: string;
  estimatedHours: number;
  requiredParts: PartRequirement[];
  procedures: ProcedureStep[];
}

export interface WorkOrder {
  id: string;
  tailNumber: string;
  jobCardId: string;
  assignedTo: string[];
  status: WorkOrderStatus;
  scheduledDate: string;
  startedDate?: string;
  completedDate?: string;
  progress: number;
}
