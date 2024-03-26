import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { getServerSession } from "../getServerSession";
import { Holding } from "types/holding.types";

type ResponseData = {
  holdings: Holding[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData | void>
) {
  if (req.method === "POST" && req.body.symbol) {
    const session = await getServerSession(req, res);
    if (session?.user?.email) {
      await prisma.holding.create({
        data: {
          symbol: req.body.symbol,
          quantity: req.body.quantity,
          user: { connect: { email: session?.user?.email } },
        },
      });
    }
    res.status(200);
  } else if (req.method === "GET") {
    const id = req.query.id;
    if (!id) {
      const session = await getServerSession(req, res);
      const holdings = await prisma.holding.findMany({
        where: { userId: session.user.id },
      });
      res.status(200).json({ holdings: holdings as any });
    }
  } else {
    res.status(405);
  }
  res.status(500);
}
