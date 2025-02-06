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
      phone: '3758-1515115',
      email: 'pernigotti@prueba.com',
      logoUrl: 'assets/images/logo.png'
    };
  }
}