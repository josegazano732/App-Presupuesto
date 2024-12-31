export interface Item {
  descripcion: string;
  cantidad: number;
  precioUnitario: number;
  total: number;
}

export interface Presupuesto {
  numero: string;
  fecha: Date;
  cliente: string;
  items: Item[];
  total: number;
}