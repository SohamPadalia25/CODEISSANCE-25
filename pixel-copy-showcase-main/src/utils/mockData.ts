import { BloodRequest, Patient, BloodInventory, OrganInventory, EmergencyRequest, MatchedDonor, StaffMember, AnalyticsData } from '../types';

export const mockBloodRequests: BloodRequest[] = [
  {
    id: '1',
    bloodType: 'O-',
    unitsRequired: 3,
    urgency: 'Critical',
    patientId: 'P001',
    patientName: 'John Smith',
    requestedBy: 'Dr. Johnson',
    status: 'Pending',
    createdAt: new Date('2024-01-15T08:30:00'),
    requiredBy: new Date('2024-01-15T12:00:00')
  },
  {
    id: '2',
    bloodType: 'A+',
    unitsRequired: 2,
    urgency: 'High',
    patientId: 'P002',
    patientName: 'Maria Garcia',
    requestedBy: 'Dr. Brown',
    status: 'Fulfilled',
    createdAt: new Date('2024-01-15T10:15:00'),
    requiredBy: new Date('2024-01-16T09:00:00')
  }
];

export const mockPatients: Patient[] = [
  {
    id: 'P001',
    name: 'John Smith',
    age: 45,
    bloodType: 'O-',
    condition: 'Acute bleeding',
    admittedDate: new Date('2024-01-15T06:00:00'),
    assignedDoctor: 'Dr. Johnson',
    emergencyContact: '+1-555-0101',
    status: 'Critical'
  },
  {
    id: 'P002',
    name: 'Maria Garcia',
    age: 32,
    bloodType: 'A+',
    condition: 'Elective surgery',
    admittedDate: new Date('2024-01-14T14:00:00'),
    assignedDoctor: 'Dr. Brown',
    emergencyContact: '+1-555-0102',
    status: 'Active'
  }
];

export const mockBloodInventory: BloodInventory[] = [
  { bloodType: 'O+', unitsAvailable: 45, minThreshold: 20, expirationDates: [new Date('2024-02-01'), new Date('2024-02-15')] },
  { bloodType: 'O-', unitsAvailable: 8, minThreshold: 15, expirationDates: [new Date('2024-01-28')] },
  { bloodType: 'A+', unitsAvailable: 32, minThreshold: 25, expirationDates: [new Date('2024-02-10')] },
  { bloodType: 'A-', unitsAvailable: 18, minThreshold: 15, expirationDates: [new Date('2024-02-05')] },
  { bloodType: 'B+', unitsAvailable: 28, minThreshold: 20, expirationDates: [new Date('2024-02-12')] },
  { bloodType: 'B-', unitsAvailable: 12, minThreshold: 10, expirationDates: [new Date('2024-01-30')] },
  { bloodType: 'AB+', unitsAvailable: 15, minThreshold: 10, expirationDates: [new Date('2024-02-08')] },
  { bloodType: 'AB-', unitsAvailable: 6, minThreshold: 8, expirationDates: [new Date('2024-01-25')] }
];

export const mockOrganInventory: OrganInventory[] = [
  { organType: 'Kidney', available: 3, pending: 8, compatibility: ['O+', 'A+', 'B+'] },
  { organType: 'Liver', available: 1, pending: 5, compatibility: ['O-', 'A-'] },
  { organType: 'Heart', available: 0, pending: 3, compatibility: ['AB+'] },
  { organType: 'Lungs', available: 2, pending: 4, compatibility: ['O+', 'O-'] }
];

export const mockEmergencyRequests: EmergencyRequest[] = [
  {
    id: 'E001',
    type: 'Blood',
    bloodType: 'O-',
    urgency: 'Critical',
    patientName: 'Emergency Patient',
    location: 'ER Bay 3',
    requestedAt: new Date('2024-01-15T11:45:00'),
    status: 'Active',
    responses: 12
  },
  {
    id: 'E002',
    type: 'Organ',
    organType: 'Kidney',
    urgency: 'Emergency',
    patientName: 'Sarah Wilson',
    location: 'ICU Room 205',
    requestedAt: new Date('2024-01-15T09:20:00'),
    status: 'Active',
    responses: 5
  }
];

export const mockMatchedDonors: MatchedDonor[] = [
  {
    id: 'D001',
    name: 'Alex Thompson',
    bloodType: 'O-',
    compatibility: 98,
    distance: 2.5,
    lastDonation: new Date('2023-11-15'),
    availability: 'Available',
    contactInfo: '+1-555-0201'
  },
  {
    id: 'D002',
    name: 'Jennifer Lee',
    bloodType: 'O-',
    compatibility: 95,
    distance: 4.2,
    lastDonation: new Date('2023-12-20'),
    availability: 'Available',
    contactInfo: '+1-555-0202'
  }
];

export const mockStaff: StaffMember[] = [
  {
    id: 'S001',
    name: 'Dr. Emily Johnson',
    role: 'Doctor',
    department: 'Emergency',
    email: 'e.johnson@hospital.com',
    phone: '+1-555-0301',
    status: 'Active',
    lastLogin: new Date('2024-01-15T08:00:00')
  },
  {
    id: 'S002',
    name: 'Michael Brown',
    role: 'Coordinator',
    department: 'Blood Bank',
    email: 'm.brown@hospital.com',
    phone: '+1-555-0302',
    status: 'Active',
    lastLogin: new Date('2024-01-15T07:30:00')
  }
];

export const mockAnalytics: AnalyticsData = {
  totalDonations: 1247,
  totalRequests: 892,
  averageResponseTime: 45,
  criticalShortages: 3,
  monthlyTrends: [
    { month: 'Sep', donations: 98, requests: 85 },
    { month: 'Oct', donations: 112, requests: 92 },
    { month: 'Nov', donations: 87, requests: 98 },
    { month: 'Dec', donations: 125, requests: 89 },
    { month: 'Jan', donations: 95, requests: 78 }
  ]
};