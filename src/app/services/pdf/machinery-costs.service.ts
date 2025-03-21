import { Injectable } from '@angular/core';
import { jsPDF } from 'jspdf';
import { Budget } from '../../models/budget.model';
import { PdfTableConfig } from '../../models/pdf.model';
import { formatCurrency } from '../../shared/utils/formatters.util';

@Injectable({
  providedIn: 'root'
})
export class PdfMachineryCostsService {
  private readonly MARGIN = 15;
  private readonly SECTION_SPACING = 3;

  async addMachineryCostsTable(pdf: jsPDF, budget: Budget, startY: number, tableConfig: PdfTableConfig): Promise<number> {
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(120);
    pdf.text('MAQUINARIAS Y LUBRICANTES TRABAJOS', this.MARGIN, startY+3);

    const headers = [['TRABAJOS', 'HORAS', '$/HORA', 'TOTAL']];
    const data = budget.machineryWorks.map(item => [
      item.task,
      item.hours.toString(),
      formatCurrency(item.ratePerHour),
      formatCurrency(item.total)
    ]);

    data.push([
      'TOTALES',
      budget.machineryWorks.reduce((sum, item) => sum + item.hours, 0).toString(),
      '',
      formatCurrency(budget.totalMachineryCost)
    ]);

    (pdf as any).autoTable({
      ...tableConfig,
      head: headers, 
      body: data,
      startY: startY + 4,
      headStyles: { halign: 'center', fillColor: [10, 182, 3], textColor: 255, fontStyle: 'bold', fontSize: 8, cellPadding: 1 },
    });

    return (pdf as any).lastAutoTable.finalY + this.SECTION_SPACING;
  }
}