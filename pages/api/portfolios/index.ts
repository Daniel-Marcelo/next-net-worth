import { NextApiRequest, NextApiResponse } from "next";

import { getServerSession } from "next-auth";

type ResponseData = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === "GET") {
    res.status(200).json(JSON.parse(JSON.stringify({ response: [] })));
  } else {
    res.status(405);
  }
}
