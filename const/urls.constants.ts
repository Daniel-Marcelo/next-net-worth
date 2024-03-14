export const Url = {
  TickerSearch: (ticker: string) => `/api/ticker-search/${ticker}`,
  GetHoldings: () => `/api/holdings`,
} as const;
