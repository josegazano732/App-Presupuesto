import { Component, OnInit } from '@angular/core';
import { CompanyInfo } from '../../shared/models/company.model';
import { CompanyService } from '../../shared/services/company.service';
import { getCurrentFormattedDate } from '../../shared/utils/date.utils';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  companyInfo!: CompanyInfo;
  currentDate: string = '';

  constructor(private companyService: CompanyService) {}

  ngOnInit(): void {
    this.companyInfo = this.companyService.getCompanyInfo();
    this.currentDate = getCurrentFormattedDate();
  }
}