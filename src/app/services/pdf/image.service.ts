import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PdfImageService {
  async loadImage(url: string): Promise<string> {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.warn('Failed to load image:', url);
      return ''; // Return empty string to continue PDF generation without logo
    }
  }
}