import { PrismaClient } from "@prisma/client";
import type { JwtUser } from "./auth/auth.js";
export type Context = {
    prisma: PrismaClient;
    user: JwtUser | null;
};
export declare const createContext: ({ req }: any) => Context;
//# sourceMappingURL=context.d.ts.map