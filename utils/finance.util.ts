import yahooFinance from "yahoo-finance2";

export const financeApi = {
  getSummaryProfile: async (symbol: string) => {
    const response = await yahooFinance.quoteSummary(symbol, {
      modules: ["summaryProfile"],
    });
    return response.summaryProfile;
  },
  getQuote: async (symbol: string) => yahooFinance.quote(symbol),
} as const;
