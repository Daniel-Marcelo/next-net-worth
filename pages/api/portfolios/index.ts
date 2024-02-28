import { NextApiRequest, NextApiResponse } from "next";

import { portfolioService } from "../../../api-utils/portfolio-service";
import prisma from "../../../lib/prisma";
import { getSession } from "next-auth/react";

type ResponseData = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === "GET") {
    const session = await getSession({ req });
    const post = await prisma.post.findFirst({
      where: {
        authorId: String(1),
      },
      include: {
        author: {
          select: { name: true },
        },
      },
    });
    const response = await portfolioService.getList();
    res.status(200).json(JSON.parse(JSON.stringify({ post })));
  } else {
    res.status(405);
  }
}
