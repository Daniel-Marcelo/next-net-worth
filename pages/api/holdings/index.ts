import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../pages/api/auth/[...nextauth]";

type ResponseData = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === "POST" && req.body.symbol) {
    const session = await getServerSession(req, res, authOptions);
    const result = await prisma.holding.create({
      data: {
        symbol: req.body.symbol,
        user: { connect: { email: session?.user?.email } },
      },
    });
    res.status(200).json(JSON.parse(JSON.stringify({ result })));
  } else {
    res.status(405);
  }
  res.status(500);
}
