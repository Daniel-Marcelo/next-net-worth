import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { getServerSession } from "../getServerSession";

type ResponseData = {
  holdings: string[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === "POST" && req.body.symbol) {
    const session = await getServerSession(req, res);
    const result = await prisma.holding.create({
      data: {
        symbol: req.body.symbol,
        user: { connect: { email: session?.user?.email } },
      },
    });
    res.status(200).json(JSON.parse(JSON.stringify({ result })));
  } else if (req.method === "GET") {
    const id = req.query.id;
    if (!id) {
      const session = await getServerSession(req, res);
      const holdings = await prisma.holding.findMany({
        where: { userId: session.user.id },
      });
      res
        .status(200)
        .json({ holdings: holdings.map((holding) => holding.symbol) });
    }
  } else {
    res.status(405);
  }
  res.status(500);
}
