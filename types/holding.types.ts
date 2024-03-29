export type DividendData = {
  rate?: number;
  yield?: number;
  exDividendDate?: string;
  dividendDate?: string;
  fiveYearAvgDividendYield?: number;
  trailingAnnualRate?: number;
  trailingAnnualYield?: number;
  lastDividendValue?: number;
  lastDividendDate?: string;
};

export type Holding = {
  id: string;
  name: string;
  symbol: string;
  quantity: number;
  price?: number;
  site: string;
  dividendData: DividendData;
};
