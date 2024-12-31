import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { BudgetFormComponent } from './components/budget-form/budget-form.component';
import { ClientInfoComponent } from './components/budget-form/client-info/client-info.component';
import { PresupuestoFormComponent } from './components/presupuesto-form/presupuesto-form.component';
import { SumPipe } from './pipes/sum.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BudgetFormComponent,
    ClientInfoComponent,
    PresupuestoFormComponent,
    SumPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }