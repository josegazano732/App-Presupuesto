import { Component } from '@angular/core';
import { Presupuesto } from '../../models/presupuesto.model';

@Component({
  selector: 'app-presupuesto-form',
  templateUrl: './presupuesto-form.component.html',
  styles: [`
    .form-control {
      margin-bottom: 1rem;
    }
  `]
})
export class PresupuestoFormComponent {
  presupuesto: Presupuesto = {
    numero: new Date().getTime().toString(),
    fecha: new Date(),
    cliente: '',
    items: [],
    total: 0
  };

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
    item.total = item.cantidad * item.precioUnitario;
    this.actualizarTotal();
  }

  private actualizarTotal(): void {
    this.presupuesto.total = this.presupuesto.items.reduce(
      (sum, item) => sum + item.total, 
      0
    );
  }

  guardarPresupuesto(): void {
    console.log('Presupuesto guardado:', this.presupuesto);
  }
}