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
    let currentY = startY + 7; // Add space before totals

    // Add observations first if they exist
    if (budget.observations) {
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'bold');
      pdf.text('OBSERVACIONES', this.MARGIN, currentY);
      
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      const lines = pdf.splitTextToSize(budget.observations, pdf.internal.pageSize.width - (this.MARGIN * 2));
      pdf.text(lines, this.MARGIN, currentY + 7);
      
      currentY += (lines.length * 7) + 15; // Add space after observations
    }

    // Add cost summaries
    pdf.setFontSize(8);
    pdf.setFont('helvetica', 'bold');
    pdf.text('RESUMEN DE COSTOS', this.MARGIN, currentY);
    
    pdf.setFontSize(8);
    pdf.setFont('helvetica', 'normal');
    
    currentY += 5;
    pdf.text(`Mano de Obra: ${formatCurrency(budget.totalLaborCost)}`, this.MARGIN, currentY);
    currentY += 5;
    pdf.text(`Maquinarias y Lubricantes: ${formatCurrency(budget.totalMachineryCost)}`, this.MARGIN, currentY);
    currentY += 5;
    pdf.text(`Total Plantines: ${formatCurrency(budget.totalSeedlingsCost)}`, this.MARGIN, currentY);
    currentY += 5;
    pdf.text(`Costo por Hectárea: ${formatCurrency(budget.totalCostPerHectare)}`, this.MARGIN, currentY);
    currentY += 7;
    pdf.text(`TOTAL GENERAL: ${formatCurrency(budget.grandTotal)}`, this.MARGIN, currentY);
  }
}