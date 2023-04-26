const currencySign = "$"; // $, £, ¥, ₩...
const decimalPlaces = 0;

export const priceFormat = (val: number) =>
  currencySign +
  (val / 10 ** decimalPlaces).toLocaleString("en-US", {
    minimumFractionDigits: decimalPlaces,
  });
