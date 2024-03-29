import yahooFinance from "yahoo-finance2";
import { QuoteSummaryResult } from "yahoo-finance2/dist/esm/src/modules/quoteSummary-iface";

export const financeApi = {
  getSummaryProfile: async (symbol: string) => {
    const response = await yahooFinance.quoteSummary(symbol, {
      modules: ["summaryProfile"],
    });
    return response.summaryProfile;
  },
  getAllModules: async (symbol: string) => {
    const response: QuoteSummaryResult = await yahooFinance.quoteSummary(
      symbol,
      { modules: "all" },
      { validateResult: false }
    );
    return response;
  },
  getQuote: async (symbol: string) => yahooFinance.quote(symbol),
} as const;
