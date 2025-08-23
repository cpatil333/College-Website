import { PrismaClient } from "@prisma/client";
import type { JwtUser } from "./auth/auth.js";
import { getUserFromReq } from "./auth/auth.js";

const prisma = new PrismaClient();

export type Context = {
  prisma: PrismaClient;
  user: JwtUser | null;
};

export const createContext = ({ req }: any): Context => ({
  prisma,
  user: getUserFromReq(req),
});
