import { Component, Input } from '@angular/core';
import { Client } from '../../../models/budget.model';

@Component({
  selector: 'app-client-info',
  templateUrl: './client-info.component.html',
  styleUrls: ['./client-info.component.css']
})
export class ClientInfoComponent {
  @Input() client!: Client;

  error: boolean = false;

  // Validar solo números
  validarNumeros(event: any) {
    const inputValue = event.target.value;
    event.target.value = inputValue.replace(/[^0-9]/g, ''); // Asegurar solo números
  }

  validarCorreo() {
    const patronCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    this.error = !patronCorreo.test(this.client.email);
  }

}