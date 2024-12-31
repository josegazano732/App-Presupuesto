import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PresupuestoFormComponent } from './components/presupuesto-form/presupuesto-form.component';
import { PresupuestoItemComponent } from './components/presupuesto-item/presupuesto-item.component';
import { PresupuestoService } from './services/presupuesto.service';

@NgModule({
  declarations: [
    PresupuestoFormComponent,
    PresupuestoItemComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    PresupuestoFormComponent,
    PresupuestoItemComponent
  ],
  providers: [PresupuestoService]
})
export class PresupuestoModule { }