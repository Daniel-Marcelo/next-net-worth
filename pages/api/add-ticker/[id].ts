import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "../getServerSession";
import { getWebsiteFromSummaryProfile } from "utils/website.util";
import { financeApi } from "utils/finance.util";
import { GetAddTickerResponse } from "types/api/add-ticker.types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GetAddTickerResponse>
) {
  if (req.method === "GET") {
    const symbol = req.query.id as string;
    if (symbol) {
      await getServerSession(req, res);

      const quote = await financeApi.getQuote(symbol);

      res.status(200).json({
        symbol: symbol,
        name: quote.displayName ?? "",
        price: quote.regularMarketPrice,
      });
    }
  }

  res.status(500);
}
