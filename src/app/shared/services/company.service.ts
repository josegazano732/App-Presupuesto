import { Injectable } from '@angular/core';
import { CompanyInfo } from '../models/company.model';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  getCompanyInfo(): CompanyInfo {
    return {
      name: '',
      address: 'Concepcion de la Sierra',
      phone: '3758-111111',
      email: 'pernigotti@miempresa.com',
      logoUrl: 'assets/images/logo.png'
    };
  }
}