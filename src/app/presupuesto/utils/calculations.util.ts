import { Item } from '../models/item.model';

export const calculateItemTotal = (item: Item): number => {
  return item.total;
};

export const calculatePresupuestoTotal = (items: Item[]): number => {
  return items.reduce((sum, item) => sum + item.total, 0);
};