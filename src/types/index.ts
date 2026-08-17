export interface Contact {
  name: string;
  title: string;
  email: string;
  phone: string;
  preferredMethod: string;
}

export interface Location {
  name?: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  employeeCount: number;
}

export type ReportStatus = 'new' | 'pending' | 'filled' | 'third-party-filled';

export type ReportType = 'Employment Verification' | 'Education Verification' | 'Background Check' | 'Reference Check';

export interface Report {
  id: string;
  reportNumber: string;
  referenceNumber: string;
  applicant: string;
  employer: string;
  type: ReportType;
  status: ReportStatus;
  filledBy: string;
  user: string;
  createdAt: string;
  updatedAt: string;
}
