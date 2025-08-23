import bcrypt from "bcrypt";
import { sign } from "../auth/auth.js";

export const Mutation = {
  signup: async (parent: any, { input }: any, context: any) => {
    const { db } = context;
    const existUser = await db.prisma.user.findFirst({
      where: {
        email: input.email,
      },
    });
    if (existUser) {
      throw new Error("Email is already exist..!");
    }
    const hashed = await bcrypt.hash(input.password, 10);
    const user = await db.prisma.user.create({
      data: {
        ...input,
        password: hashed,
      },
    });
    return { token: sign({ id: user.id, role: user.role }), user };
  },

  login: async (parent: any, { input }: any, context: any) => {
    const { db } = context;
    const user = await db.prisma.user.findUnique({
      where: { email: input.email },
    });
    if (!user) {
      throw new Error("Email does not exist.!");
    }
    const matchedPassword = await bcrypt.compare(input.password, user.password);
    if (!matchedPassword) {
      throw new Error("Invalid credentials!");
    }
    return { token: sign({ id: user.id, role: user.role }), user };
  },
};
