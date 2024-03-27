import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { getServerSession } from "../getServerSession";
import { Holding } from "types/holding.types";
import { getWebsiteFromSummaryProfile } from "utils/website.util";
import { financeApi } from "utils/finance.util";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Holding[] | void>
) {
  if (req.method === "POST" && req.body.symbol) {
    const session = await getServerSession(req, res);
    if (session?.user?.email) {
      await prisma.holding.create({
        data: {
          name: req.body.name,
          symbol: req.body.symbol,
          quantity: req.body.quantity,
          user: { connect: { email: session?.user?.email } },
        },
      });
    }
    res.status(200).json();
  } else if (req.method === "GET") {
    const id = req.query.id;
    if (!id) {
      const session = await getServerSession(req, res);
      const holdings = await prisma.holding.findMany({
        where: { userId: session.user.id },
      });

      const updatedHoldings: Holding[] = [];

      for await (const holding of holdings) {
        const summaryProfile = await financeApi.getSummaryProfile(
          holding.symbol
        );
        const quote = await financeApi.getQuote(holding.symbol);
        const site = await getWebsiteFromSummaryProfile(summaryProfile);
        updatedHoldings.push({
          id: holding.id,
          symbol: holding.symbol,
          name: holding.name ?? "",
          quantity: +holding.quantity,
          price: quote.regularMarketPrice,
          site: site ?? "",
        });
      }
      res.status(200).json(updatedHoldings);
    }
  } else {
    res.status(405);
  }
  res.status(500);
}
