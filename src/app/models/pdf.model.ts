export interface PdfTableConfig {
  headStyles: {
    fillColor: number[];
    textColor: number;
    fontSize: number;
    fontStyle: string;
    cellPadding: number;
  };
  bodyStyles: {
    fontSize: number;
    cellPadding: number;
  };
  alternateRowStyles: {
    fillColor: number[];
  };
  footStyles: {
    fillColor: number[];
    fontStyle: string;
    fontSize: number;
  };
  margin: {
    left: number;
    right: number;
  };
  tableWidth: number;
  columnStyles: {
    [key: number]: {
      cellWidth: number;
      halign?: string;
    };
  };
}