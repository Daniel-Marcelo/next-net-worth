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
  console.log("in here");
  console.log(req.method);
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
        console.log("Getting all modules for ", holding.symbol);
        const allModules = await financeApi.getAllModules(holding.symbol);
        const quote = await financeApi.getQuote(holding.symbol);
        const site = await getWebsiteFromSummaryProfile(
          allModules.summaryProfile
        );
        updatedHoldings.push({
          id: holding.id,
          symbol: holding.symbol,
          name: holding.name ?? "",
          quantity: +holding.quantity,
          price: quote.regularMarketPrice,
          site: site ?? "",
          dividendData: {
            rate: allModules.summaryDetail?.dividendRate,
            yield: allModules.summaryDetail?.dividendYield,
            exDividendDate:
              allModules.summaryDetail?.exDividendDate?.toISOString(),
            dividendDate: allModules.summaryDetail?.dividendDate?.toISOString(),
            fiveYearAvgDividendYield:
              allModules.summaryDetail?.fiveYearAvgDividendYield,
            trailingAnnualRate:
              allModules.summaryDetail?.trailingAnnualDividendRate,
            trailingAnnualYield:
              allModules.summaryDetail?.trailingAnnualDividendYield,
            lastDividendValue: allModules.summaryDetail?.lastDividendValue,
            lastDividendDate: allModules.summaryDetail?.lastDividendDate,
          },
        });
      }
      res.status(200).json(updatedHoldings);
    }
  } else if (req.method === "DELETE") {
    console.log(req.body);
    const id = req.body.id as string;
    if (id) {
      await prisma.holding.delete({ where: { id } });
      res.status(200).json();
    }
  } else {
    res.status(405);
  }
  res.status(500);
}
