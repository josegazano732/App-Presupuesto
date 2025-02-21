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
[x: string]: any;
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

  // Labor Costs Methods¨

  


  addLaborCost(): void {
    this.budget.laborCosts.push({
      task: '',
      days: 1,
      ratePerDay: 0.00,
      total: 0.00
    });
  }

  isLaborCostValid(): boolean {
    return this.budget.laborCosts.every(cost => cost.task && cost.days > 0 && cost.ratePerDay > 0);
  }

  validateNonNegative(event: any): void {
    const inputValue = event.target.value;
    if (inputValue === '') {
      event.target.value = '0';
    } else if (!/^\d{1,3}$/.test(inputValue)) {
      event.target.value = inputValue.slice(0, 3);
    } else {
      const numericValue = parseInt(inputValue, 10);
      if (numericValue < 0) {
        event.target.value = '1';
      }
    }
  }

  updateLaborCostDays(index: number, value: number): void {
    if (value < 1) {
      value = 1;
    }
    this.budget.laborCosts[index].days = value;
    this.budget.laborCosts[index].total = this.budget.laborCosts[index].days * this.budget.laborCosts[index].ratePerDay;
    this.calculationsService.calculateTotals(this.budget);
  }

  updateLaborCostRate(index: number, value: string): void {
    const numericValue = parseFloat(value) || 0.00;
    this.budget.laborCosts[index].ratePerDay = numericValue;
    this.budget.laborCosts[index].total = this.budget.laborCosts[index].days * numericValue;
    this.calculationsService.calculateTotals(this.budget);
  }

  autoCompleteDecimal(item: any, property: string): void {
    if (item[property] && !item[property].toString().includes('.')) {
      item[property] = parseFloat(item[property]).toFixed(2);
    }
  }


  removeLaborCost(index: number): void {
    this.budget.laborCosts.splice(index, 1);
    this.calculationsService.calculateTotals(this.budget);
  }

  // Machinery Methods

  isMachineryWorkValid(): boolean {
    return this.budget.machineryWorks.every(work => work.task && work.hours > 0 && work.ratePerHour > 0);
  }

  updateMachineryHours(index: number, value: number): void {
    if (value < 1) {
      value = 1;
    }
    this.budget.machineryWorks[index].hours = value;
    this.budget.machineryWorks[index].total = this.budget.machineryWorks[index].ratePerHour * value;
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

  isSeedlingValid(): boolean {
    return this.budget.seedlings.every(seedling => seedling.type &&  seedling.quantity > 0 && seedling.pricePerUnit > 0);
  }

  allowOnlyText(event: KeyboardEvent): void {
    const inputChar = String.fromCharCode(event.charCode);
    if (!/^[a-zA-Z]*$/.test(inputChar)) {
      event.preventDefault();
    }
  }

  allowOnlyNumbers(event: KeyboardEvent): void {
    const input = event.target as HTMLInputElement;
    const charCode = event.key.charCodeAt(0);
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  }

  allowOnlyDecimal(event: KeyboardEvent): void {
    const input = event.target as HTMLInputElement;
    const charCode = event.key.charCodeAt(0);
    if ((charCode < 48 || charCode > 57) && charCode !== 46) {
      event.preventDefault();
    }
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

  selectContent(event: MouseEvent): void {
    const inputElement = event.target as HTMLInputElement;
    inputElement.select();
  }

  isFormComplete(): boolean {
    return this.isLaborCostValid() && this.isMachineryWorkValid() && this.isSeedlingValid();
  }

}