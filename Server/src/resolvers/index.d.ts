import type { Context } from "../context.js";
export declare const resolvers: {
    Query: {
        users: (parent: any, agrs: any, ctx: Context) => import("@prisma/client").Prisma.PrismaPromise<{
            imageUrl: string;
            id: number;
            fullName: string;
            email: string;
            password: string;
            role: import("@prisma/client").$Enums.Role;
            dateJoined: Date;
        }[]>;
        user: (parent: any, { id }: any, ctx: Context) => Promise<{
            imageUrl: string;
            id: number;
            fullName: string;
            email: string;
            password: string;
            role: import("@prisma/client").$Enums.Role;
            dateJoined: Date;
        } | null>;
    };
    Mutation: {
        signup: (parent: any, { input }: any, ctx: Context) => Promise<{
            token: string;
            user: {
                imageUrl: string;
                id: number;
                fullName: string;
                email: string;
                password: string;
                role: import("@prisma/client").$Enums.Role;
                dateJoined: Date;
            };
        }>;
        login: (parent: any, { input }: any, ctx: Context) => Promise<{
            token: string;
            user: {
                imageUrl: string;
                id: number;
                fullName: string;
                email: string;
                password: string;
                role: import("@prisma/client").$Enums.Role;
                dateJoined: Date;
            };
        }>;
        createProgram: (parent: any, { input }: any, ctx: Context) => import("@prisma/client").Prisma.Prisma__ProgramClient<{
            id: number;
            name: string;
            description: string;
            durationYears: number;
        }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    };
};
//# sourceMappingURL=index.d.ts.map