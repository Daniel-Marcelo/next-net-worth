import { signOut } from "firebase/auth";
import type { NextApiRequest, NextApiResponse } from "next";
import { auth } from "../../../utils/firebase";

type ResponseData = {
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === "POST") {
    signOut(auth);
    res.status(200).json({ message: "Hello post from Next.js!" });
  } else {
    res.status(200).json({ message: "Hello get from Next.js!" });
  }
}
