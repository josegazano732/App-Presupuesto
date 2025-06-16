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
    pdf.text('Detalle de presupuesto', this.MARGIN, startY+4);

    const headers = [['DESCRIPCIÓN', 'CANTIDAD', 'UNIDAD DE MEDIDA', 'PRECIO UNITARIO', 'TOTAL']];
    const data = budget.laborCosts.map(item => [
      item.descripcion,
      item.cantidad.toString(),
      item.unidadMedida,
      formatCurrency(item.precioUnitario),
      formatCurrency(item.total)
    ]);
    
    data.push([
      'TOTALES',
      budget.laborCosts.reduce((sum, item) => sum + item.cantidad, 0).toString(),
      '',
      '',
      formatCurrency(budget.totalLaborCost)
    ]);

    (pdf as any).autoTable({
      ...tableConfig,
      head: headers,
      body: data,
      startY: startY + 5,
      headStyles: { halign: 'center', fillColor: [10, 182, 3], textColor: 255, fontStyle: 'bold', fontSize: 8, cellPadding: 1 },
      columnStyles: {
        1: { cellWidth: 18, halign: 'center', valign: 'middle' }, // Cantidad
        2: { cellWidth: 28, halign: 'center', valign: 'middle' }, // Unidad de Medida
        3: { halign: 'center', valign: 'middle' }, // Precio Unitario
        4: { halign: 'center', valign: 'middle' }  // Total
      }
    });

    // Eliminar la palabra 'RESUMEN', solo mostrar el total general
    const resumenY = (pdf as any).lastAutoTable.finalY + 16;
    const pageWidth = pdf.internal.pageSize.getWidth();
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    const totalGeneral = budget.laborCosts.reduce((sum, item) => sum + (item.cantidad * item.precioUnitario), 0);
    const totalText = `TOTAL GENERAL: ${formatCurrency(totalGeneral)}`;
    pdf.text(totalText, pageWidth - this.MARGIN, resumenY + 4, { align: 'right' });

    return resumenY + 12;
  }
}