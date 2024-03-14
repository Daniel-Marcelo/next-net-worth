import {
  DefaultSession,
  getServerSession as getNextAuthServerSession,
} from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import { NextApiRequest, NextApiResponse } from "next";

export const getServerSession = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const session = await getNextAuthServerSession(req, res, authOptions);
  let updatedSession = session as unknown as DefaultSession & {
    user: { id: string };
  };
  if (!updatedSession.user.id) throw new Error("No user found");
  return updatedSession;
};
