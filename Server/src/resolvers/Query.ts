import { db } from "../db.js";

export const Query = {
  users: async (parent: any, args: any, context: any) => {
    const { db, user } = context;
    return db.prisma.user.findMany();
  },

  user: async (parent: any, { id }: any, context: any) => {
    const { db, user } = context;
    const userId = parseInt(id);
    return db.prisma.user.findUnique({
      where: { id: userId },
    });
  },
};
