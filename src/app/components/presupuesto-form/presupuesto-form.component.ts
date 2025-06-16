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

  // Lista de productos sugeridos
  productosSugeridos: string[] = [
    'Pala', 'Azada', 'Fertilizante', 'Semilla', 'Tractor',
    'Rastrillo', 'Balde', 'Manguera', 'Guantes', 'Carretilla'
  ];

  // Para autocompletado
  productoFiltrado: string[] = [];
  productoFiltradoIndex: number = -1;

  agregarItem(): void {
    this.presupuesto.items.push({
      descripcion: '',
      cantidad: 1,
      precioUnitario: 0,
      total: 0
    });
    // Limpiar autocompletado al agregar línea
    this.productoFiltrado = [];
    this.productoFiltradoIndex = -1;
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
    this.productoFiltrado = [];
    this.productoFiltradoIndex = -1;
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