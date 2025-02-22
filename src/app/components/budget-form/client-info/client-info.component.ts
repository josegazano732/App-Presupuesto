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

  email: string = '';
  showError: boolean = false;

  // Validar solo números y guiones y longitud máxima de 11 caracteres
  validarNumerosYGuiones(event: any) {
    let inputValue = event.target.value;
    inputValue = inputValue.replace(/[^0-9-]/g, ''); // Asegurar solo números y guiones
    if (inputValue.length > 11) {
      inputValue = inputValue.slice(0, 11); // Limitar a 11 caracteres
    }
    event.target.value = inputValue;
  }


  validarCorreo() {
    const patronCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    this.error = !patronCorreo.test(this.client.email);
  }

  validateEmail() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    this.showError = !emailRegex.test(this.email) && this.email.trim() !== "";
  }

  allowOnlyText(event: KeyboardEvent): void {
    const inputChar = String.fromCharCode(event.charCode);
    if (!/^[a-zA-Z]*$/.test(inputChar)) {
      event.preventDefault();
    }
  }

}