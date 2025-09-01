export interface Donor {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  bloodGroup: BloodGroup;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  address: string;
  city: string;
  eligibilityStatus: 'eligible' | 'ineligible' | 'temporarily_ineligible';
  lastDonationDate?: string;
  totalDonations: number;
  medicalHistory: string[];
  registrationDate: string;
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
}

export interface BloodInventory {
  id: string;
  bloodGroup: BloodGroup;
  quantity: number;
  expiryDate: string;
  collectionDate: string;
  status: 'available' | 'reserved' | 'expired' | 'used';
  donorId: string;
  location: string;
  testResults: {
    hiv: boolean;
    hepatitisB: boolean;
    hepatitisC: boolean;
    syphilis: boolean;
  };
}

export interface HospitalRequest {
  id: string;
  hospitalName: string;
  doctorName: string;
  contactEmail: string;
  contactPhone: string;
  bloodGroup: BloodGroup;
  unitsRequired: number;
  urgency: 'low' | 'medium' | 'high' | 'emergency';
  patientInfo: {
    name: string;
    age: number;
    gender: 'male' | 'female' | 'other';
    condition: string;
  };
  requestDate: string;
  requiredBy: string;
  status: 'pending' | 'approved' | 'fulfilled' | 'rejected';
  notes?: string;
  approvedBy?: string;
  approvalDate?: string;
}

export interface CompatibilityMatch {
  donorId: string;
  recipientBloodGroup: BloodGroup;
  compatible: boolean;
  matchType: 'exact' | 'compatible';
  availableUnits: number;
}

export type BloodGroup = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';

export interface DashboardStats {
  totalDonors: number;
  totalBloodUnits: number;
  pendingRequests: number;
  expiringUnits: number;
  bloodGroupDistribution: Record<BloodGroup, number>;
  monthlyDonations: Array<{
    month: string;
    donations: number;
  }>;
}