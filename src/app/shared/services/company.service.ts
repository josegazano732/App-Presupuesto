import { Injectable } from '@angular/core';
import { CompanyInfo } from '../models/company.model';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  getCompanyInfo(): CompanyInfo {
    return {
      name: '',
      address: 'Apostoles Misiones',
      phone: '3758-112233',
      email: 'delcampo@prueba.com',
      logoUrl: 'assets/images/logo.png'
    };
  }
}