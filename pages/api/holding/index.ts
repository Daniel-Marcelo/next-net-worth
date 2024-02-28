import { NextApiRequest, NextApiResponse } from "next";
import { holdingService } from "../../../api-utils/holding-service";

type ResponseData = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === "POST") {
    const response = await holdingService.create(req.body);
    res.status(200).json(JSON.parse(JSON.stringify(response)));
  } else {
    res.status(405);
  }
}
