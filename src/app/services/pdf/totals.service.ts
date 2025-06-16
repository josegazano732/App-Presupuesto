import { Injectable } from '@angular/core';
import { jsPDF } from 'jspdf';
import { Budget } from '../../models/budget.model';
import { formatCurrency } from '../../shared/utils/formatters.util';

@Injectable({
  providedIn: 'root'
})
export class PdfTotalsService {
  private readonly MARGIN = 15; // Margen izquierdo

  addTotals(pdf: jsPDF, budget: Budget, startY: number): void {
    let currentY = startY + 1; // Add space before totals

    // Add observations first if they exist
    if (budget.observations) {
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'bold');
      pdf.text('OBSERVACIONES', this.MARGIN, currentY);
      
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(120);
      const lines = pdf.splitTextToSize(budget.observations, pdf.internal.pageSize.width - (this.MARGIN * 2));
      pdf.text(lines, this.MARGIN, currentY + 5);

  
      currentY += (lines.length * 7) + 5; // Add space after observations
    }

    // Eliminar o comentar la generación del bloque de resumen de costos y totales.
  }
}