import { Component } from '@angular/core';
import { Presupuesto } from '../../models/presupuesto.model';
import { Item } from '../../models/item.model';
import { PresupuestoService } from '../../services/presupuesto.service';

@Component({
  selector: 'app-presupuesto-form',
  templateUrl: './presupuesto-form.component.html',
  styleUrls: ['./presupuesto-form.component.css']
})
export class PresupuestoFormComponent {
  presupuesto: Presupuesto = {
    numero: new Date().getTime().toString(), // Generamos un número basado en timestamp
    fecha: new Date(),
    cliente: '',
    items: [],
    total: 0
  };

  unidadesMedida: string[] = ['Unidad', 'Metro', 'Metro²', 'Metro³', 'Kg', 'Litro'];

  constructor(private presupuestoService: PresupuestoService) {}

  agregarItem(): void {
    const nuevoItem: Item = {
      detalleProducto: '',
      cantidad: 1,
      unidadMedida: 'Unidad',
      precioUnitario: 0,
      total: 0
    };
    this.presupuesto.items.push(nuevoItem);
  }

  eliminarItem(index: number): void {
    this.presupuesto.items.splice(index, 1);
    this.calcularTotal();
  }

  calcularTotal(): void {
    this.presupuesto.items.forEach(item => {
      item.total = item.cantidad * item.precioUnitario;
    });
    this.presupuesto.total = this.presupuesto.items.reduce((sum, item) => sum + item.total, 0);
  }

  guardarPresupuesto(): void {
    if (this.presupuesto.items.length > 0 && this.presupuesto.cliente.trim()) {
      this.presupuestoService.guardarPresupuesto(this.presupuesto);
    }
  }
}