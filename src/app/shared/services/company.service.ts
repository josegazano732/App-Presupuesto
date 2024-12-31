import { Injectable } from '@angular/core';
import { CompanyInfo } from '../models/company.model';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  getCompanyInfo(): CompanyInfo {
    return {
      name: 'Mi Empresa',
      address: 'Concepcion de la Sierrar',
      phone: '3758-5455565',
      email: 'pernigotti@miempresa.com',
      logoUrl: 'assets/images/logo.png'
    };
  }
}