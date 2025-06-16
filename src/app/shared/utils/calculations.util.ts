export const calculateMachineryTotal = (hours: number, rate: number): number => {
  return hours * rate;
};

export const calculateSeedlingTotal = (quantity: number, price: number): number => {
  return quantity * price;
};