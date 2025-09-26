export interface BloodRequest {
  id: string;
  bloodType: string;
  unitsRequired: number;
  urgency: 'Low' | 'Medium' | 'High' | 'Critical';
  patientId: string;
  patientName: string;
  requestedBy: string;
  status: 'Pending' | 'Fulfilled' | 'Cancelled';
  createdAt: Date;
  requiredBy: Date;
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  bloodType: string;
  condition: string;
  admittedDate: Date;
  assignedDoctor: string;
  emergencyContact: string;
  status: 'Active' | 'Discharged' | 'Critical';
}

export interface BloodInventory {
  bloodType: string;
  unitsAvailable: number;
  minThreshold: number;
  expirationDates: Date[];
}

export interface OrganInventory {
  organType: string;
  available: number;
  pending: number;
  compatibility: string[];
}

export interface EmergencyRequest {
  id: string;
  type: 'Blood' | 'Organ';
  bloodType?: string;
  organType?: string;
  urgency: 'Critical' | 'Emergency';
  patientName: string;
  location: string;
  requestedAt: Date;
  status: 'Active' | 'Fulfilled' | 'Expired';
  responses: number;
}

export interface MatchedDonor {
  id: string;
  name: string;
  bloodType: string;
  compatibility: number;
  distance: number;
  lastDonation: Date;
  availability: 'Available' | 'Not Available' | 'Pending';
  contactInfo: string;
}

export interface StaffMember {
  id: string;
  name: string;
  role: 'Doctor' | 'Nurse' | 'Coordinator' | 'Admin';
  department: string;
  email: string;
  phone: string;
  status: 'Active' | 'Inactive';
  lastLogin: Date;
}

export interface AnalyticsData {
  totalDonations: number;
  totalRequests: number;
  averageResponseTime: number;
  criticalShortages: number;
  monthlyTrends: {
    month: string;
    donations: number;
    requests: number;
  }[];
}