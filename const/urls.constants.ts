export const Url = {
  TickerSearch: (ticker: string) => `/api/ticker-search/${ticker}`,
  GetHoldings: () => `/api/holdings`,
  GetAddTicker: (ticker: string) => `/api/add-ticker/${ticker}`,
} as const;
