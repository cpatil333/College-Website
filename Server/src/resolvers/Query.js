import { db } from "../db.js";
export const Query = {
    users: async (parent, args, context) => {
        const { db, user } = context;
        return db.prisma.user.findMany();
    },
    user: async (parent, { id }, context) => {
        const { db, user } = context;
        const userId = parseInt(id);
        return db.prisma.user.findUnique({
            where: { id: userId },
        });
    },
};
//# sourceMappingURL=Query.js.map