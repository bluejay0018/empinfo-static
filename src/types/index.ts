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
