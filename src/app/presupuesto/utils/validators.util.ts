import { Item } from '../models/item.model';

export const validateItem = (item: Item): boolean => {
  return item.descripcion.trim() !== '' && 
         item.cantidad > 0 && 
         item.precioUnitario >= 0;
};

export const validatePresupuestoItems = (items: Item[]): boolean => {
  return items.length > 0 && items.every(validateItem);
};