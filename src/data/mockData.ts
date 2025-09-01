import { Donor, BloodInventory, HospitalRequest, DashboardStats, BloodGroup } from '../types';

export const mockDonors: Donor[] = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Smith',
    email: 'john.smith@email.com',
    phone: '+1-555-0123',
    bloodGroup: 'O+',
    dateOfBirth: '1985-03-15',
    gender: 'male',
    address: '123 Main St',
    city: 'New York',
    eligibilityStatus: 'eligible',
    lastDonationDate: '2024-11-15',
    totalDonations: 15,
    medicalHistory: [],
    registrationDate: '2020-01-15',
    emergencyContact: {
      name: 'Jane Smith',
      phone: '+1-555-0124',
      relationship: 'spouse'
    }
  },
  {
    id: '2',
    firstName: 'Maria',
    lastName: 'Garcia',
    email: 'maria.garcia@email.com',
    phone: '+1-555-0125',
    bloodGroup: 'A+',
    dateOfBirth: '1992-07-22',
    gender: 'female',
    address: '456 Oak Ave',
    city: 'Los Angeles',
    eligibilityStatus: 'eligible',
    lastDonationDate: '2024-12-01',
    totalDonations: 8,
    medicalHistory: [],
    registrationDate: '2021-05-10',
    emergencyContact: {
      name: 'Carlos Garcia',
      phone: '+1-555-0126',
      relationship: 'brother'
    }
  },
  {
    id: '3',
    firstName: 'David',
    lastName: 'Johnson',
    email: 'david.johnson@email.com',
    phone: '+1-555-0127',
    bloodGroup: 'B-',
    dateOfBirth: '1978-11-03',
    gender: 'male',
    address: '789 Pine St',
    city: 'Chicago',
    eligibilityStatus: 'temporarily_ineligible',
    lastDonationDate: '2024-12-20',
    totalDonations: 22,
    medicalHistory: ['recent_travel'],
    registrationDate: '2019-08-20',
    emergencyContact: {
      name: 'Sarah Johnson',
      phone: '+1-555-0128',
      relationship: 'wife'
    }
  }
];

export const mockBloodInventory: BloodInventory[] = [
  {
    id: 'inv-1',
    bloodGroup: 'O+',
    quantity: 25,
    expiryDate: '2025-02-15',
    collectionDate: '2024-12-15',
    status: 'available',
    donorId: '1',
    location: 'Storage Unit A-1',
    testResults: {
      hiv: false,
      hepatitisB: false,
      hepatitisC: false,
      syphilis: false
    }
  },
  {
    id: 'inv-2',
    bloodGroup: 'A+',
    quantity: 18,
    expiryDate: '2025-01-20',
    collectionDate: '2024-12-01',
    status: 'available',
    donorId: '2',
    location: 'Storage Unit A-2',
    testResults: {
      hiv: false,
      hepatitisB: false,
      hepatitisC: false,
      syphilis: false
    }
  },
  {
    id: 'inv-3',
    bloodGroup: 'B-',
    quantity: 8,
    expiryDate: '2025-01-10',
    collectionDate: '2024-11-20',
    status: 'available',
    donorId: '3',
    location: 'Storage Unit B-1',
    testResults: {
      hiv: false,
      hepatitisB: false,
      hepatitisC: false,
      syphilis: false
    }
  },
  {
    id: 'inv-4',
    bloodGroup: 'AB+',
    quantity: 12,
    expiryDate: '2025-03-01',
    collectionDate: '2024-12-25',
    status: 'available',
    donorId: '1',
    location: 'Storage Unit C-1',
    testResults: {
      hiv: false,
      hepatitisB: false,
      hepatitisC: false,
      syphilis: false
    }
  }
];

export const mockHospitalRequests: HospitalRequest[] = [
  {
    id: 'req-1',
    hospitalName: 'General Hospital',
    doctorName: 'Dr. Sarah Wilson',
    contactEmail: 'sarah.wilson@generalhospital.com',
    contactPhone: '+1-555-1000',
    bloodGroup: 'O+',
    unitsRequired: 4,
    urgency: 'high',
    patientInfo: {
      name: 'Anonymous Patient',
      age: 45,
      gender: 'male',
      condition: 'Surgery - Emergency'
    },
    requestDate: '2024-12-28',
    requiredBy: '2024-12-29',
    status: 'pending',
    notes: 'Patient scheduled for emergency surgery'
  },
  {
    id: 'req-2',
    hospitalName: 'City Medical Center',
    doctorName: 'Dr. Michael Chen',
    contactEmail: 'michael.chen@citymedical.com',
    contactPhone: '+1-555-2000',
    bloodGroup: 'A+',
    unitsRequired: 2,
    urgency: 'medium',
    patientInfo: {
      name: 'Anonymous Patient',
      age: 32,
      gender: 'female',
      condition: 'Anemia Treatment'
    },
    requestDate: '2024-12-27',
    requiredBy: '2024-12-30',
    status: 'approved',
    notes: 'Regular treatment patient',
    approvedBy: 'Admin',
    approvalDate: '2024-12-27'
  }
];

export const mockDashboardStats: DashboardStats = {
  totalDonors: 156,
  totalBloodUnits: 284,
  pendingRequests: 8,
  expiringUnits: 12,
  bloodGroupDistribution: {
    'O+': 45,
    'O-': 23,
    'A+': 38,
    'A-': 19,
    'B+': 31,
    'B-': 15,
    'AB+': 18,
    'AB-': 8
  },
  monthlyDonations: [
    { month: 'Jul', donations: 42 },
    { month: 'Aug', donations: 38 },
    { month: 'Sep', donations: 45 },
    { month: 'Oct', donations: 52 },
    { month: 'Nov', donations: 48 },
    { month: 'Dec', donations: 41 }
  ]
};

export const bloodGroupCompatibility: Record<BloodGroup, BloodGroup[]> = {
  'O-': ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'], // Universal donor
  'O+': ['O+', 'A+', 'B+', 'AB+'],
  'A-': ['A-', 'A+', 'AB-', 'AB+'],
  'A+': ['A+', 'AB+'],
  'B-': ['B-', 'B+', 'AB-', 'AB+'],
  'B+': ['B+', 'AB+'],
  'AB-': ['AB-', 'AB+'],
  'AB+': ['AB+'] // Universal recipient
};