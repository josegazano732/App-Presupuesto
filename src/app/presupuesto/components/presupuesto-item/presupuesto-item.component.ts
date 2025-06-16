import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Item } from '../../models/item.model';

@Component({
  selector: 'app-presupuesto-item',
  templateUrl: './presupuesto-item.component.html'
})
export class PresupuestoItemComponent {
  @Input() item!: Item;
  @Output() actualizar = new EventEmitter<void>();
  @Output() eliminar = new EventEmitter<void>();
  unidadesMedida: string[] = ['Unidad', 'Metro', 'Metro²', 'Metro³', 'Kg', 'Litro'];
}