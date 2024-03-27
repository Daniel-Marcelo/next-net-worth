import { Prisma } from "@prisma/client";

export type DBHolding = {
  id: string;
  symbol: string;
  quantity: Prisma.Decimal;
  userId: string;
};
