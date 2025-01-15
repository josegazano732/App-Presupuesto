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
  private readonly PRIMARY_COLOR = [10, 182, 3];
  private readonly MARGIN_TOP = 15;
  private readonly TABLE_CONFIG: PdfTableConfig = {
    headStyles: {
      fillColor: this.PRIMARY_COLOR, // Color de fondo del encabezado de cada tabla
      textColor: 255, // color del texto encabezado de cada tabla
      fontSize: 8, // Tamaño de fuente
      fontStyle: 'bold',
      cellPadding: 1
    },
    bodyStyles: { // Estilos para el cuerpo de la tabla
      fontSize: 9,
      cellPadding: 0.5
    },
    alternateRowStyles: { //  Estilos para las filas alternas
      fillColor: [245, 247, 250]
    },
    footStyles: { // Estilos para el pie de la tabla
      fillColor: [240, 248, 235], // Lighter shade of primary color
      fontStyle: 'bold',
      fontSize: 8
    },
    margin: {
      left: 15,
      right: 15
    },
    tableWidth: 180,
    columnStyles: {
      0: { cellWidth: 60 },
      1: { cellWidth: 30, halign: 'center' },
      2: { cellWidth: 40, halign: 'center' },
      3: { cellWidth: 40, halign: 'center' }
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

    // Constantes para márgenes y dimensiones
  const PAGE_HEIGHT = pdf.internal.pageSize.height;
  const PAGE_WIDTH = pdf.internal.pageSize.width;
  const MARGIN_TOP = 5;
  const MARGIN_BOTTOM = 20;
  const CONTENT_HEIGHT = PAGE_HEIGHT - MARGIN_TOP - MARGIN_BOTTOM;

    // Set text color for headers to match theme
    pdf.setTextColor(this.PRIMARY_COLOR[0], this.PRIMARY_COLOR[1], this.PRIMARY_COLOR[2]);

    let yPosition = this.MARGIN_TOP;

     // Helper para manejar saltos de página
  const checkPageOverflow = (height: number) => {
    if (yPosition + height > CONTENT_HEIGHT) {
      pdf.addPage();
      yPosition = MARGIN_TOP;
    }
  };

   // Añadir encabezado
  yPosition = await this.headerService.addHeader(pdf);

  // Información del cliente
  const clientInfoHeight = 1; // Aproximación del espacio utilizado
  checkPageOverflow(clientInfoHeight);
  yPosition = this.clientInfoService.addClientInfo(pdf, budget.client, yPosition);

  // Tabla de costos laborales
  const laborCostsHeight = 15; // Aproximar el alto de la tabla
  checkPageOverflow(laborCostsHeight);
  yPosition = await this.laborCostsService.addLaborCostsTable(pdf, budget, yPosition, this.TABLE_CONFIG);

  // Tabla de costos de maquinaria
  const machineryCostsHeight = 15;
  checkPageOverflow(machineryCostsHeight);
  yPosition = await this.machineryCostsService.addMachineryCostsTable(pdf, budget, yPosition, this.TABLE_CONFIG);

  // Tabla de plántulas
  const seedlingsHeight = 10;
  checkPageOverflow(seedlingsHeight);
  yPosition = await this.seedlingsService.addSeedlingsTable(pdf, budget, yPosition, this.TABLE_CONFIG);

  // Totales
  const totalsHeight = 10; // Aproximación del espacio utilizado
  checkPageOverflow(totalsHeight);
  this.totalsService.addTotals(pdf, budget, yPosition);

  // Pie de página
  checkPageOverflow(10); // Espacio para el pie de página
  this.footerService.addFooter(pdf);

  // Guardar el PDF
  pdf.save(`${fileName}.pdf`);
}
}