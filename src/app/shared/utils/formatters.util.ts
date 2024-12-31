export const formatCurrency = (value: number): string => {
  return `$ ${value.toLocaleString('es-ES', { 
    minimumFractionDigits: 2,
    maximumFractionDigits: 2 
  })}`;
};

export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
};