import { Component } from '@angular/core';
import { Presupuesto } from '../../models/presupuesto.model';
import { PresupuestoService } from '../../services/presupuesto.service';

@Component({
  selector: 'app-presupuesto-form',
  templateUrl: './presupuesto-form.component.html',
  styleUrls: ['./presupuesto-form.component.css']
})
export class PresupuestoFormComponent {
  presupuesto: Presupuesto = {
    numero: new Date().getTime().toString(),
    fecha: new Date(),
    cliente: '',
    items: [],
    total: 0
  };

  constructor(private presupuestoService: PresupuestoService) {}

  agregarItem(): void {
    this.presupuesto.items.push({
      descripcion: '',
      cantidad: 1,
      precioUnitario: 0,
      total: 0
    });
  }

  eliminarItem(index: number): void {
    this.presupuesto.items.splice(index, 1);
    this.actualizarTotal();
  }

  calcularTotal(index: number): void {
    const item = this.presupuesto.items[index];
    item.total = this.presupuestoService.calcularTotalItem(item);
    this.actualizarTotal();
  }

  private actualizarTotal(): void {
    this.presupuesto.total = this.presupuestoService.calcularTotalPresupuesto(this.presupuesto.items);
  }

  guardarPresupuesto(): void {
    if (this.presupuestoService.validarPresupuesto(this.presupuesto)) {
      this.presupuestoService.guardarPresupuesto(this.presupuesto);
    }
  }
}