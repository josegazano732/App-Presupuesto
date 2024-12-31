import { Item } from '../models/item.model';

export const createEmptyItem = (): Item => ({
  descripcion: '',
  cantidad: 1,
  precioUnitario: 0,
  total: 0
});