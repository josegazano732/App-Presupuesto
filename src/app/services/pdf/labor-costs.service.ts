import { Injectable } from '@angular/core';
import { jsPDF } from 'jspdf';
import { Budget } from '../../models/budget.model';
import { PdfTableConfig } from '../../models/pdf.model';
import { formatCurrency } from '../../shared/utils/formatters.util';

@Injectable({
  providedIn: 'root'
})
export class PdfLaborCostsService {
  private readonly MARGIN = 15;
  private readonly SECTION_SPACING = 3;

  async addLaborCostsTable(pdf: jsPDF, budget: Budget, startY: number, tableConfig: PdfTableConfig): Promise<number> {
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(120);
    pdf.text('COSTOS DE IMPLANTACIÓN - MANO DE OBRA TRABAJOS', this.MARGIN, startY+4);

    const headers = [['TRABAJOS', 'DÍAS', '$/DÍA', 'TOTAL']];
    const data = budget.laborCosts.map(item => [
      item.task,
      item.days.toString(),
      formatCurrency(item.ratePerDay),
      formatCurrency(item.total)
    ]);
    
    
    
    data.push([
      'TOTALES',
      budget.laborCosts.reduce((sum, item) => sum + item.days, 0).toString(),
      '',
      formatCurrency(budget.totalLaborCost)
    ]);

    (pdf as any).autoTable({
      ...tableConfig,
      head: headers,
      body: data,
      startY: startY + 5,
      headStyles: { halign: 'center', fillColor: [10, 182, 3], textColor: 255, fontStyle: 'bold', fontSize: 8, cellPadding: 1 },
    });
    
    return (pdf as any).lastAutoTable.finalY + this.SECTION_SPACING;
  }
}