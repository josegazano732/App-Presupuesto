import { Injectable } from '@angular/core';
import { jsPDF } from 'jspdf';
import { CompanyService } from '../../shared/services/company.service';
import { PdfImageService } from './image.service';
import { formatDate } from '../../shared/utils/formatters.util';

@Injectable({
  providedIn: 'root'
})
export class PdfHeaderService {
  private readonly MARGIN = 15;
  private readonly LOGO_WIDTH = 45;
  private readonly LOGO_HEIGHT = 30;
  private readonly TEXT_START_X = 70;

  constructor(
    private companyService: CompanyService,
    private imageService: PdfImageService
  ) {}

  async addHeader(pdf: jsPDF): Promise<number> {
    const companyInfo = this.companyService.getCompanyInfo();
    const startY = this.MARGIN;

    try {
      const logoData = await this.imageService.loadImage(companyInfo.logoUrl);
      if (logoData) {
        pdf.addImage(
          logoData,
          'PNG',
          this.MARGIN,
          startY,
          this.LOGO_WIDTH,
          this.LOGO_HEIGHT
        );
      }
    } catch (error) {
      console.warn('Logo not loaded, continuing without it');
    }

    // Company info - positioned to the right of the logo
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    pdf.text(companyInfo.name, this.TEXT_START_X, startY + 10);

    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    pdf.text(companyInfo.address, this.TEXT_START_X + 10, startY + 17);
    pdf.text(companyInfo.phone, this.TEXT_START_X + 10, startY + 22);
    pdf.text(companyInfo.email, this.TEXT_START_X + 10, startY + 27);

    // Date - aligned to the right
    pdf.setFont('helvetica', 'italic');
    const dateText = formatDate(new Date());
    const dateWidth = pdf.getTextWidth(dateText);
    pdf.text(
      dateText,
      pdf.internal.pageSize.width - this.MARGIN - dateWidth,
      startY + 10
    );

    return startY + this.LOGO_HEIGHT + 10;
  }
}