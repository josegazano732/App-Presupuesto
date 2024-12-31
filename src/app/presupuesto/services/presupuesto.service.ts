import { Injectable } from '@angular/core';
import { Presupuesto } from '../models/presupuesto.model';
import { Item } from '../models/item.model';
import { calculateItemTotal, calculatePresupuestoTotal } from '../utils/calculations.util';
import { validatePresupuestoItems } from '../utils/validators.util';

@Injectable()
export class PresupuestoService {
  calcularTotalItem(item: Item): number {
    return calculateItemTotal(item);
  }

  calcularTotalPresupuesto(items: Item[]): number {
    return calculatePresupuestoTotal(items);
  }

  validarPresupuesto(presupuesto: Presupuesto): boolean {
    return presupuesto.cliente.trim() !== '' && 
           validatePresupuestoItems(presupuesto.items);
  }

  guardarPresupuesto(presupuesto: Presupuesto): void {
    if (!this.validarPresupuesto(presupuesto)) {
      throw new Error('El presupuesto no es válido');
    }
    console.log('Presupuesto guardado:', presupuesto);
    // Aquí se implementaría la lógica para guardar en una base de datos
  }
}