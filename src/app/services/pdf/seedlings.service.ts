import { Injectable } from '@angular/core';
import { jsPDF } from 'jspdf';
import { Budget } from '../../models/budget.model';
import { PdfTableConfig } from '../../models/pdf.model';
import { formatCurrency } from '../../shared/utils/formatters.util';

@Injectable({
  providedIn: 'root'
})
export class PdfSeedlingsService {
  private readonly MARGIN = 15;
  private readonly SECTION_SPACING = 5;
//
  async addSeedlingsTable(pdf: jsPDF, budget: Budget, startY: number, tableConfig: PdfTableConfig): Promise<number> {
    pdf.setFontSize(12); // Tamaño de fuente
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(120); // Color de texto

    const headers = [['TIPO', 'PLANTAS/HA', 'CANTIDAD', '$ / UNIDAD', 'TOTAL']];
    const data = budget.seedlings.map(item => [
      item.type,
      item.plantsPerHectare.toString(),
      item.quantity.toString(),
      formatCurrency(item.pricePerUnit),
      formatCurrency(item.total)
    ]);

    const seedlingsConfig = {
      ...tableConfig,
      columnStyles: {
        0: { cellWidth: 40 },
        1: { cellWidth: 35, halign: 'center' },
        2: { cellWidth: 30, halign: 'center' },
        3: { cellWidth: 30, halign: 'center' },
        4: { cellWidth: 40, halign: 'center' }
      }
    };

    (pdf as any).autoTable({
      ...seedlingsConfig,
      head: headers,
      body: data,
      startY: startY + 5,
      headStyles: { halign: 'center', fillColor: [10, 182, 3], textColor: 255, fontStyle: 'bold', fontSize: 8, cellPadding: 1 },
    });

    return (pdf as any).lastAutoTable.finalY + this.SECTION_SPACING;
  }
}