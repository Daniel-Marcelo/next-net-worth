export const Url = {
  TickerSearch: (ticker: string) => `/api/ticker-search/${ticker}`,
} as const;
