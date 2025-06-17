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
      phone: '3765-374234',
      email: 'delcampoprodctosnaturales5@gmail.com',
      logoUrl: 'assets/images/logo.png'
    };
  }
}