import { Item } from '../models/item.model';

export const createEmptyItem = (): Item => ({
  detalleProducto: '',
  cantidad: 1,
  unidadMedida: 'Unidad',
  precioUnitario: 0,
  total: 0
});