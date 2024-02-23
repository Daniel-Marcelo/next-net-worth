import { NextApiRequest, NextApiResponse } from "next";

import { portfolioService } from "../../../api-utils/portfolio-service";

type ResponseData = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === "GET" && req.query.id) {
    const response = await portfolioService.getList();
    res.status(200).json(JSON.parse(JSON.stringify(response)));
  } else {
    res.status(405);
  }
}
