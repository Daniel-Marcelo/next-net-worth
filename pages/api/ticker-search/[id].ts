import { NextApiRequest, NextApiResponse } from "next";
import yahooFinance from "yahoo-finance2";

type ResponseData = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === "GET" && req.query.id) {
    const response = await yahooFinance.search(req.query.id as string);
    res.status(200).json(JSON.parse(JSON.stringify(response)));
  } else {
    res.status(405);
  }
}
