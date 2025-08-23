import { PrismaClient } from "@prisma/client";
import { getUserFromReq } from "./auth/auth.js";
const prisma = new PrismaClient();
export const createContext = ({ req }) => ({
    prisma,
    user: getUserFromReq(req),
});
//# sourceMappingURL=context.js.map