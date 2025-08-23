import type { Request } from "express";
export type JwtUser = {
    id: number;
    role: "STUDENT" | "FACULTY" | "ADMIN" | "ALUMNI";
};
export declare function sign(user: JwtUser): string;
export declare function getUserFromReq(req: Request): JwtUser | null;
//# sourceMappingURL=auth.d.ts.map