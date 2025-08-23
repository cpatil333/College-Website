import type { GraphQLResolveInfo } from "graphql";
import type { Context } from "../context.js";
import bcrypt from "bcrypt";
import { sign } from "../auth/auth.js";

function requiredRole(ctx: Context, roles: String[]) {
  if (!ctx.user || !roles.includes(ctx.user.role)) {
    throw new Error("Not authorized!");
  }
}

export const resolvers = {
  Query: {
    users: (parent: any, agrs: any, ctx: Context) => {
      return ctx.prisma.user.findMany();
    },

    user: async (parent: any, { id }: any, ctx: Context) => {
      const userId = parseInt(id);
      return ctx.prisma.user.findUnique({
        where: { id: userId },
      });
    },
  },

  Mutation: {
    signup: async (parent: any, { input }: any, ctx: Context) => {
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

    login: async (parent: any, { input }: any, ctx: Context) => {
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

    createProgram: (parent: any, { input }: any, ctx: Context) => {
      requiredRole(ctx, ["ADMIN"]);
      return ctx.prisma.program.create({
        data: { ...input },
      });
    },
  },
};
