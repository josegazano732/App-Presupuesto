export interface Client {
  name: string;
  address: string;
  phone: string;
  email: string;
  dni?: string; // Nuevo campo para DNI
}

export interface LaborCost {
  descripcion: string;
  cantidad: number;
  unidadMedida: string;
  precioUnitario: number;
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