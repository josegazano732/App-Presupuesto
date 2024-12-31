import { Injectable } from '@angular/core';
import { jsPDF } from 'jspdf';
import { Budget } from '../models/budget.model';
import { PdfTableConfig } from '../models/pdf.model';
import { PdfHeaderService } from './pdf/header.service';
import { PdfClientInfoService } from './pdf/client-info.service';
import { PdfLaborCostsService } from './pdf/labor-costs.service';
import { PdfMachineryCostsService } from './pdf/machinery-costs.service';
import { PdfSeedlingsService } from './pdf/seedlings.service';
import { PdfTotalsService } from './pdf/totals.service';
import { PdfFooterService } from './pdf/footer.service';
import 'jspdf-autotable';

@Injectable({
  providedIn: 'root'
})
export class PdfService {
  // Convert RGB to array format for jsPDF
  private readonly PRIMARY_COLOR = [97, 185, 3];
  private readonly MARGIN_TOP = 15;
  private readonly TABLE_CONFIG: PdfTableConfig = {
    headStyles: {
      fillColor: this.PRIMARY_COLOR,
      textColor: 255,
      fontSize: 10,
      fontStyle: 'bold',
      cellPadding: 5
    },
    bodyStyles: {
      fontSize: 9,
      cellPadding: 5
    },
    alternateRowStyles: {
      fillColor: [245, 247, 250]
    },
    footStyles: {
      fillColor: [240, 248, 235], // Lighter shade of primary color
      fontStyle: 'bold',
      fontSize: 10
    },
    margin: {
      left: 15,
      right: 15
    },
    tableWidth: 180,
    columnStyles: {
      0: { cellWidth: 60 },
      1: { cellWidth: 30, halign: 'right' },
      2: { cellWidth: 40, halign: 'right' },
      3: { cellWidth: 40, halign: 'right' }
    }
  };

  constructor(
    private headerService: PdfHeaderService,
    private clientInfoService: PdfClientInfoService,
    private laborCostsService: PdfLaborCostsService,
    private machineryCostsService: PdfMachineryCostsService,
    private seedlingsService: PdfSeedlingsService,
    private totalsService: PdfTotalsService,
    private footerService: PdfFooterService
  ) {}

  async generatePDF(budget: Budget, fileName: string): Promise<void> {
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true
    });

    // Set text color for headers to match theme
    pdf.setTextColor(this.PRIMARY_COLOR[0], this.PRIMARY_COLOR[1], this.PRIMARY_COLOR[2]);

    let yPosition = this.MARGIN_TOP;

    // Add content with proper spacing
    yPosition = await this.headerService.addHeader(pdf);
    yPosition = this.clientInfoService.addClientInfo(pdf, budget.client, yPosition);
    yPosition = await this.laborCostsService.addLaborCostsTable(pdf, budget, yPosition, this.TABLE_CONFIG);
    yPosition = await this.machineryCostsService.addMachineryCostsTable(pdf, budget, yPosition, this.TABLE_CONFIG);
    yPosition = await this.seedlingsService.addSeedlingsTable(pdf, budget, yPosition, this.TABLE_CONFIG);
    
    this.totalsService.addTotals(pdf, budget, yPosition);
    this.footerService.addFooter(pdf);

    // Save the PDF
    pdf.save(`${fileName}.pdf`);
  }
}