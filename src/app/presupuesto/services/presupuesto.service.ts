import { Injectable } from '@angular/core';
import { Presupuesto } from '../models/presupuesto.model';

@Injectable()
export class PresupuestoService {
  validarPresupuesto(presupuesto: Presupuesto): boolean {
    return presupuesto.items.length > 0 && presupuesto.total > 0;
  }

  guardarPresupuesto(presupuesto: Presupuesto): void {
    if (!this.validarPresupuesto(presupuesto)) {
      throw new Error('El presupuesto debe tener al menos un ítem y un total mayor a 0');
    }
    // Lógica para guardar el presupuesto
    console.log('Presupuesto guardado:', presupuesto);
  }
}