import { Item } from './item.model';

export interface Presupuesto {
  numero: string;
  fecha: Date;
  cliente: string;
  items: Item[];
  total: number;
}