import { Budget } from '../../models/budget.model';

export function getInitialBudget(): Budget {
  return {
    date: new Date(),
    client: {
      name: '',
      address: '',
      phone: '',
      email: ''
    },
    laborCosts: [],
    machineryWorks: [],
    seedlings: [],
    comments: '',
    observations: '',
    totalLaborCost: 0,
    totalMachineryCost: 0,
    totalSeedlingsCost: 0,
    totalCostPerHectare: 0,
    grandTotal: 0
  };
}