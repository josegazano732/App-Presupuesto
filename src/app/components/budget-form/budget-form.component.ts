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
  unidadesMedida: string[] = ['Día', 'Hora', 'Unidad', 'Metro', 'Kg', 'Litro'];
  [x: string]: any;
  budget: Budget = getInitialBudget();
  showAddMenu = false;

  // Lista de productos sugeridos para autocompletado en mano de obra
  productosSugeridos: string[] = [
    'Tradicional Elaborada c/ palo GRUESA', 
    'Tradicional Elaborada c/ palo MEDIA',
    'Tradicional Elaborada c/ palo FINA', 
    'Despalada GRUESA', 
    'Despalada MEDIA',
    'Despalada FINA',
    'Canchada GRUESA', 
    'Canchada MEDIA', 
    'Flete en origen', 
    'Flete en destino'
    
  ];

  productoFiltrado: string[] = [];
  productoFiltradoIndex: number = -1;

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
      descripcion: '',
      cantidad: 1,
      unidadMedida: 'Kg',
      precioUnitario: 0,
      total: 0
    });
  }

  updateLaborCostCantidad(index: number, value: number): void {
    if (value < 1) {
      value = 1;
    }
    this.budget.laborCosts[index].cantidad = value;
    // Si la descripción es 'Flete en destino', el total debe ser 0
    if (this.budget.laborCosts[index].descripcion.trim().toLowerCase() === 'flete en destino') {
      this.budget.laborCosts[index].total = 0;
    } else {
      this.budget.laborCosts[index].total = this.budget.laborCosts[index].cantidad * this.budget.laborCosts[index].precioUnitario;
    }
    this.calculationsService.calculateTotals(this.budget);
  }

  updateLaborCostPrecioUnitario(index: number, value: number): void {
    const numericValue = value || 0.00;
    this.budget.laborCosts[index].precioUnitario = numericValue;
    // Si la descripción es 'Flete en destino', el total debe ser 0
    if (this.budget.laborCosts[index].descripcion.trim().toLowerCase() === 'flete en destino') {
      this.budget.laborCosts[index].total = 0;
    } else {
      this.budget.laborCosts[index].total = this.budget.laborCosts[index].cantidad * numericValue;
    }
    this.calculationsService.calculateTotals(this.budget);
  }

  isLaborCostValid(): boolean {
    return this.budget.laborCosts.every(cost => cost.descripcion && cost.cantidad > 0 && cost.precioUnitario > 0);
  }

  validateNonNegative(event: any): void {
    const inputValue = event.target.value;
    if (inputValue === '') {
      event.target.value = '';
    } else if (!/^\d{1,3}$/.test(inputValue)) {
      event.target.value = inputValue.slice(0, 3);
    } else {
      const numericValue = parseInt(inputValue, 10);
      if (numericValue < 0) {
        event.target.value = '1';
      }
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

  // Filtrar productos sugeridos según la descripción y el índice de la línea
  filtrarProductosPorIndice(index: number, descripcion: string): void {
    if (descripcion && descripcion.length > 0) {
      this.productoFiltrado = this.productosSugeridos.filter(prod =>
        prod.toLowerCase().includes(descripcion.toLowerCase())
      );
      this.productoFiltradoIndex = index;
    } else {
      this.productoFiltrado = [];
      this.productoFiltradoIndex = -1;
    }
  }

  seleccionarProducto(item: any, prod: string): void {
    item.descripcion = prod;
    // Si el producto es Flete en origen o Flete en destino, la unidad de medida será 'Unidad'
    const desc = prod.trim().toLowerCase();
    if (desc === 'flete en origen' || desc === 'flete en destino') {
      item.unidadMedida = 'Unidad';
    }
    this.productoFiltrado = [];
    this.productoFiltradoIndex = -1;
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
    // Solo requiere que haya al menos una línea válida en laborCosts y un total mayor a 0
    return this.isLaborCostValid() && this.budget.totalLaborCost > 0;
  }

  get totalLaborLines(): number {
    // Excluir 'Flete en destino' del total general mostrado
    return this.budget.laborCosts
      .filter(item => item.descripcion.trim().toLowerCase() !== 'flete en destino')
      .reduce((sum, item) => sum + (item.cantidad * item.precioUnitario), 0);
  }

}