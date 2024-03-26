import { NextApiRequest, NextApiResponse } from "next";
import yahooFinance from "yahoo-finance2";
import { SearchResult } from "yahoo-finance2/dist/esm/src/modules/search";
import {
  cryptoWebsites,
  specialIndexFundSites,
} from "../../../const/specialSites.constants";
import { Quote, QuoteType } from "types/api/ticker-search.types";
import orderBy from "lodash/orderBy";
import { Unpacked } from "types/util.types";
import prisma from "../../../lib/prisma";

type ResponseData = {
  message: string;
};

const addWebsiteOverride = (longname: string) => {
  for (const sites of [specialIndexFundSites, cryptoWebsites]) {
    for (const site of sites) {
      if (site.searchText.includes(longname)) return site.site;
    }
  }
};

const getWebsite = async (symbol: string) => {
  try {
    const innerResponse = await yahooFinance.quoteSummary(symbol, {
      modules: ["summaryProfile"],
    });

    let website = innerResponse.summaryProfile?.website;
    if (website) {
      website = innerResponse.summaryProfile?.website
        ?.replaceAll("https://", "")
        .replaceAll("http://", "")
        .replaceAll("www.", "");
      return website;
    }
  } catch {
    console.error("Error getting data for " + symbol);
  }
  return "";
};

const desiredQuoteTypes = [
  QuoteType.Equity,
  QuoteType.Etf,
  QuoteType.Cryptocurrency,
  QuoteType.Currency,
];

async function mapOriginalToStockQuote(
  original: Unpacked<SearchResult["quotes"]>
): Promise<Quote> {
  let site: string =
    addWebsiteOverride(original.longname?.toLowerCase() || "") ?? "";
  return {
    sectorVisibility: original.dispSecIndFlag,
    exchangeDisplayName: original.exchDisp,
    exchangeCode: original.exchange,
    quoteCollection: original.index,
    productIndustry: original.industry,
    industryDisplay: original.industryDisp,
    financeDataSource: original.isYahooFinance,
    companyFullName: original.longname,
    equityType: original.quoteType,
    relevanceScore: original.score,
    businessSector: original.sector,
    sectorDisplay: original.sectorDisp,
    companyShortName: original.shortname,
    tickerSymbol: original.symbol,
    displayType: original.typeDisp,
    companyWebsite: site ? site : (await getWebsite(original.symbol)) ?? "",
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === "GET" && req.query.id) {
    const response = await yahooFinance.search(req.query.id as string);
    const quotes = orderBy(
      response.quotes.filter((option) =>
        desiredQuoteTypes.includes(option.quoteType)
      ),
      "score",
      "desc"
    );

    let stockQuotes: Quote[] = [];
    for await (const quote of quotes) {
      stockQuotes.push(await mapOriginalToStockQuote(quote));
    }

    res.status(200).json(JSON.parse(JSON.stringify(stockQuotes)));
  } else {
    res.status(405);
  }
}
