import yahooFinance from "yahoo-finance2";
import { financeApi } from "./finance.util";
import { SummaryProfile } from "yahoo-finance2/dist/esm/src/modules/quoteSummary-iface";

export const getWebsite = async (symbol: string) => {
  try {
    const summaryProfile = await financeApi.getSummaryProfile(symbol);

    let website = summaryProfile?.website ?? "";
    if (website) {
      website = website
        .replaceAll("https://", "")
        .replaceAll("http://", "")
        .replaceAll("www.", "");
      return website;
    }
  } catch {
    console.error("Error getting data for " + symbol);
  }
  return "";
};

export const getWebsiteFromSummaryProfile = async (
  summaryProfile?: SummaryProfile
) => {
  let website = summaryProfile?.website ?? "";
  if (website) {
    website = website
      .replaceAll("https://", "")
      .replaceAll("http://", "")
      .replaceAll("www.", "");
    return website;
  }
  return "";
};
