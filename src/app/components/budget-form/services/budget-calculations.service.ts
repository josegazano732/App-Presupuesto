import { Injectable } from '@angular/core';
import { Budget, LaborCost, MachineryWork, Seedling } from '../../../models/budget.model';

@Injectable({
  providedIn: 'root'
})
export class BudgetCalculationsService {
  calculateLaborCost(item: LaborCost): number {
    return item.cantidad * item.precioUnitario;
  }

  calculateMachineryCost(item: MachineryWork): number {
    return item.hours * item.ratePerHour;
  }

  calculateSeedlingCost(item: Seedling): number {
    return item.quantity * item.pricePerUnit;
  }

  calculateTotals(budget: Budget): void {
    budget.totalLaborCost = budget.laborCosts
      .filter(item => item.descripcion.trim().toLowerCase() !== 'flete en destino')
      .reduce((sum, item) => sum + item.total, 0);
    budget.totalMachineryCost = budget.machineryWorks.reduce((sum, item) => sum + item.total, 0);
    budget.totalSeedlingsCost = budget.seedlings.reduce((sum, item) => sum + item.total, 0);
    budget.grandTotal = budget.totalLaborCost + budget.totalMachineryCost + budget.totalSeedlingsCost;
    budget.totalCostPerHectare = budget.grandTotal / 100; // Assuming 100 hectares
  }
}