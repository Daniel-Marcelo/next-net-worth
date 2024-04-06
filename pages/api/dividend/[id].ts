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
  if (req.method === "GET") {
    const id = req.query.id;
    const allModules = await financeApi.getAllModules(id as string);
    const data = allModules.summaryDetail?.dividendYield;

    res.status(200).json(data as any);
  }
}
