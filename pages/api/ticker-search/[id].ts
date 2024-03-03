import { NextApiRequest, NextApiResponse } from "next";
import yahooFinance from "yahoo-finance2";
import {
  SearchQuoteNonYahoo,
  SearchQuoteYahooCryptocurrency,
  SearchQuoteYahooCurrency,
  SearchQuoteYahooETF,
  SearchQuoteYahooEquity,
  SearchQuoteYahooFund,
  SearchQuoteYahooFuture,
  SearchQuoteYahooIndex,
  SearchQuoteYahooOption,
} from "yahoo-finance2/dist/esm/src/modules/search";
import {
  specialCryptoSites,
  specialIndexFundSites,
} from "../../../const/specialSites.constants";
import { QuoteType } from "../../../types/api/ticker-search.types";

type ResponseData = {
  message: string;
};

type QuoteResult =
  | SearchQuoteYahooEquity
  | SearchQuoteYahooOption
  | SearchQuoteYahooETF
  | SearchQuoteYahooFund
  | SearchQuoteYahooIndex
  | SearchQuoteYahooCurrency
  | SearchQuoteYahooCryptocurrency
  | SearchQuoteNonYahoo
  | SearchQuoteYahooFuture;

const AddSpecialSite = (quote: QuoteResult) => {
  if (quote.longname) {
    for (const site of specialIndexFundSites) {
      if (quote.longname.toLowerCase().includes(site.text.toLowerCase())) {
        return site.site;
      }
    }
    for (const site of specialCryptoSites) {
      if (
        quote.longname.toLowerCase().includes(site.text.toLowerCase()) ||
        quote.longname.toLowerCase().includes(site.ticker.toLowerCase())
      ) {
        return site.site;
      }
    }
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === "GET" && req.query.id) {
    const response = await yahooFinance.search(req.query.id as string);
    response.quotes = response.quotes.filter((option) =>
      [
        QuoteType.Equity,
        QuoteType.Etf,
        QuoteType.Cryptocurrency,
        QuoteType.Currency,
      ].includes(option.quoteType) || option.name
    );
    const getWebsites = async () => {
      for await (const num of response.quotes) {
        if (num.symbol) {
          try {
            const innerResponse = await yahooFinance.quoteSummary(num.symbol, {
              modules: ["summaryProfile"],
            });

            let website = innerResponse.summaryProfile.website;
            if (website) {
              num.website = innerResponse.summaryProfile.website
                .replaceAll("https://", "")
                .replaceAll("http://", "")
                .replaceAll("www.", "");
            }
          } catch {
            console.log("error getting data for " + num.symbol);
            continue;
          }
          if (!num.website) {
            num.website = AddSpecialSite(num);
          }
        }
      }
    };
    await getWebsites();
    res.status(200).json(JSON.parse(JSON.stringify(response)));
  } else {
    res.status(405);
  }
}
