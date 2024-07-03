import yahooFinance from "yahoo-finance2";
import { QuoteSummaryModules } from "yahoo-finance2/dist/esm/src/modules/quoteSummary";
import { QuoteSummaryResult } from "yahoo-finance2/dist/esm/src/modules/quoteSummary-iface";

export const financeApi = {
  getModules: async (symbol: string, ...modules: QuoteSummaryModules[]) => {
    const response = await yahooFinance.quoteSummary(symbol, {
      modules,
    });
    return response;
  },
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
