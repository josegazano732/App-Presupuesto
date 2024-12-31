import { Injectable } from '@angular/core';
import { jsPDF } from 'jspdf';
import { Client } from '../../models/budget.model';

@Injectable({
  providedIn: 'root'
})
export class PdfClientInfoService {
  private readonly MARGIN = 15;
  private readonly SECTION_SPACING = 15;

  addClientInfo(pdf: jsPDF, client: Client, startY: number): number {
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    pdf.text('INFORMACIÓN DEL CLIENTE', this.MARGIN, startY);

    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    
    const yStart = startY + 7;
    pdf.text(`Nombre: ${client.name}`, this.MARGIN, yStart);
    pdf.text(`Dirección: ${client.address}`, this.MARGIN, yStart + 5);
    pdf.text(`Teléfono: ${client.phone}`, this.MARGIN, yStart + 10);
    pdf.text(`Email: ${client.email}`, this.MARGIN, yStart + 15);

    return yStart + 25;
  }
}