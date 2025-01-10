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
  private readonly SECTION_SPACING = 8;

  async addSeedlingsTable(pdf: jsPDF, budget: Budget, startY: number, tableConfig: PdfTableConfig): Promise<number> {
    pdf.setFontSize(12); // Tamaño de fuente
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(41, 128, 185);
    pdf.text('PLANTINES', this.MARGIN, startY);

    const headers = [['TIPO', 'PLANTAS/HA', 'CANTIDAD', '$/UNIDAD', 'TOTAL']];
    const data = budget.seedlings.map(item => [
      item.type,
      item.plantsPerHectare.toString(),
      item.quantity.toString(),
      formatCurrency(item.pricePerUnit),
      formatCurrency(item.total)
    ]);

    data.push([
      'TOTAL PLANTINES',
      '',
      '',
      '',
      formatCurrency(budget.totalSeedlingsCost)
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
      startY: startY + 5
    });

    return (pdf as any).lastAutoTable.finalY + this.SECTION_SPACING;
  }
}