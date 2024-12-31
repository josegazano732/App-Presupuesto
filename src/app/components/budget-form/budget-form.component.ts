import { Component, OnInit } from '@angular/core';
import { Budget } from '../../models/budget.model';
import { PdfService } from '../../services/pdf.service';
import { BudgetCalculationsService } from './services/budget-calculations.service';
import { getInitialBudget } from '../../shared/utils';
import { formatCurrency } from '../../shared/utils/formatters.util';

@Component({
  selector: 'app-budget-form',
  templateUrl: './budget-form.component.html',
  styleUrls: ['./budget-form.component.css']
})
export class BudgetFormComponent implements OnInit {
  budget: Budget = getInitialBudget();
  showAddMenu = false;

  constructor(
    private pdfService: PdfService,
    private calculationsService: BudgetCalculationsService
  ) {}

  ngOnInit(): void {
    if (this.budget.laborCosts.length === 0) {
      this.addLaborCost();
    }
    if (this.budget.machineryWorks.length === 0) {
      this.addMachineryWork();
    }
    if (this.budget.seedlings.length === 0) {
      this.addSeedling();
    }
    this.calculationsService.calculateTotals(this.budget);
  }

  // Labor Costs Methods
  updateLaborCostDays(index: number, value: number): void {
    this.budget.laborCosts[index].days = value;
    this.budget.laborCosts[index].total = this.calculationsService.calculateLaborCost(this.budget.laborCosts[index]);
    this.calculationsService.calculateTotals(this.budget);
  }

  updateLaborCostRate(index: number, value: number): void {
    this.budget.laborCosts[index].ratePerDay = value;
    this.budget.laborCosts[index].total = this.calculationsService.calculateLaborCost(this.budget.laborCosts[index]);
    this.calculationsService.calculateTotals(this.budget);
  }

  addLaborCost(): void {
    this.budget.laborCosts.push({
      task: '',
      days: 0,
      ratePerDay: 0,
      total: 0
    });
  }

  removeLaborCost(index: number): void {
    this.budget.laborCosts.splice(index, 1);
    this.calculationsService.calculateTotals(this.budget);
  }

  // Machinery Methods
  updateMachineryHours(index: number, value: number): void {
    this.budget.machineryWorks[index].hours = value;
    this.budget.machineryWorks[index].total = this.calculationsService.calculateMachineryCost(this.budget.machineryWorks[index]);
    this.calculationsService.calculateTotals(this.budget);
  }

  updateMachineryRate(index: number, value: number): void {
    this.budget.machineryWorks[index].ratePerHour = value;
    this.budget.machineryWorks[index].total = this.calculationsService.calculateMachineryCost(this.budget.machineryWorks[index]);
    this.calculationsService.calculateTotals(this.budget);
  }

  addMachineryWork(): void {
    this.budget.machineryWorks.push({
      task: '',
      hours: 0,
      ratePerHour: 0,
      total: 0
    });
  }

  removeMachineryWork(index: number): void {
    this.budget.machineryWorks.splice(index, 1);
    this.calculationsService.calculateTotals(this.budget);
  }

  // Seedlings Methods
  updateSeedling(index: number): void {
    this.budget.seedlings[index].total = this.calculationsService.calculateSeedlingCost(this.budget.seedlings[index]);
    this.calculationsService.calculateTotals(this.budget);
  }

  addSeedling(): void {
    this.budget.seedlings.push({
      type: '',
      plantsPerHectare: 0,
      quantity: 0,
      pricePerUnit: 0,
      total: 0
    });
  }

  removeSeedling(index: number): void {
    this.budget.seedlings.splice(index, 1);
    this.calculationsService.calculateTotals(this.budget);
  }

  // Utility Methods
  formatCurrency(value: number): string {
    return formatCurrency(value);
  }

  // PDF Generation
  async downloadPDF(): Promise<void> {
    const fileName = `presupuesto_${this.budget.client.name}_${new Date().toISOString().split('T')[0]}`;
    await this.pdfService.generatePDF(this.budget, fileName);
  }
}