import bcrypt from "bcrypt";
import { sign } from "../auth/auth.js";

function requiredRole(ctx, roles) {
  if (!ctx.user || !roles.includes(ctx.user.role)) {
    throw new Error("Not authorized!");
  }
}
export const resolvers = {
  Query: {
    users: (parent, agrs, ctx) => {
      return ctx.prisma.user.findMany();
    },
    user: async (parent, { id }, ctx) => {
      const userId = parseInt(id);
      return ctx.prisma.user.findUnique({
        where: { id: userId },
      });
    },
  },
  Mutation: {
    signup: async (parent, { input }, ctx) => {
      const existUser = await ctx.prisma.user.findFirst({
        where: {
          email: input.email,
        },
      });
      if (existUser) {
        throw new Error("Email is already exist..!");
      }
      const hashed = await bcrypt.hash(input.password, 10);
      const user = await ctx.prisma.user.create({
        data: {
          ...input,
          password: hashed,
        },
      });
      return { token: sign({ id: user.id, role: user.role }), user };
    },

    login: async (parent, { input }, ctx) => {
      const user = await ctx.prisma.user.findUnique({
        where: { email: input.email },
      });
      if (!user) {
        throw new Error("Email does not exist.!");
      }
      const matchedPassword = await bcrypt.compare(
        input.password,
        user.password
      );
      if (!matchedPassword) {
        throw new Error("Invalid credentials!");
      }
      return { token: sign({ id: user.id, role: user.role }), user };
    },

    createProgram: (parent, { input }, ctx) => {
      requiredRole(ctx, ["ADMIN"]);
      return ctx.prisma.program.create({
        data: { ...input },
      });
    },
  },
};

