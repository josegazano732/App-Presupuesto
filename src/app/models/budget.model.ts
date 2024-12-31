export interface Client {
  name: string;
  address: string;
  phone: string;
  email: string;
}

export interface LaborCost {
  task: string;
  days: number;
  ratePerDay: number;
  total: number;
}

export interface MachineryWork {
  task: string;
  hours: number;
  ratePerHour: number;
  total: number;
}

export interface Seedling {
  type: string;
  plantsPerHectare: number;
  quantity: number;
  pricePerUnit: number;
  total: number;
}

export interface Budget {
  date: Date;
  client: Client;
  laborCosts: LaborCost[];
  machineryWorks: MachineryWork[];
  seedlings: Seedling[];
  comments: string;
  observations: string; // New field
  totalLaborCost: number;
  totalMachineryCost: number;
  totalSeedlingsCost: number;
  totalCostPerHectare: number;
  grandTotal: number;
}