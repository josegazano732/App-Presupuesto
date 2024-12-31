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
    laborCosts: [
      { task: 'Rastreado', days: 35, ratePerDay: 25000, total: 875000 },
      { task: 'Nivelado, rastrillado', days: 20, ratePerDay: 25000, total: 500000 },
      { task: 'Plantación/tractorista', days: 20, ratePerDay: 25000, total: 500000 },
      { task: 'Plantación/plantadora', days: 60, ratePerDay: 17083.33, total: 1024999.80 },
      { task: 'Otros', days: 20, ratePerDay: 17000, total: 340000 }
    ],
    machineryWorks: [
      { task: 'Rastreado', hours: 280, ratePerHour: 72000, total: 20160000 },
      { task: 'Nivelado, rastrillado', hours: 160, ratePerHour: 70000, total: 11200000 },
      { task: 'Plantación', hours: 160, ratePerHour: 65000, total: 10400000 }
    ],
    seedlings: [
      { type: 'Tangola', plantsPerHectare: 10000, quantity: 1000000, pricePerUnit: 15, total: 15000000 }
    ],
    comments: '',
    observations: '',
    totalLaborCost: 3239999.80,
    totalMachineryCost: 41760000,
    totalSeedlingsCost: 15000000,
    totalCostPerHectare: 600000,
    grandTotal: 44999999.80
  };
}