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
      return ctx.prisma.user.findMany({
        take: 4,
        orderBy: { id: "asc" },
      });
    },

    user: async (parent: any, { id }: any, ctx: Context) => {
      const userId = parseInt(id);
      return ctx.prisma.user.findUnique({
        where: { id: userId },
      });
    },

    programs: async (parent: any, args: any, ctx: Context) => {
      return ctx.prisma.program.findMany();
    },

    program: async (parent: any, { id }: any, ctx: Context) => {
      const programId = parseInt(id);
      return ctx.prisma.program.findUnique({
        where: { id: programId },
      });
    },

    eduCourses: async (parent: any, args: any, ctx: Context) => {
      return ctx.prisma.course.findMany();
    },

    course: async (parent: any, { id }: any, ctx: Context) => {
      const courseId = parseInt(id);
      return ctx.prisma.course.findUnique({
        where: { id: courseId },
      });
    },

    notices: async (parent: any, args: any, ctx: Context) => {
      requiredRole(ctx, ["STUDENT", "ADMIN", "FACULTY"]); // ✅ check multiple roles

      let role = ctx.user?.role;
      const userId = ctx.user?.id;

      let whereClause: any = { targetRole: "ALL" };

      if (role === "STUDENT") {
        whereClause = {
          OR: [
            { targetRole: "STUDENT" },
            { targetRole: "ALL" },
            {
              AND: [{ course: { enrollments: { some: { userId } } } }],
            },
          ],
        };
      } else if (role === "FACULTY") {
        whereClause = {
          OR: [
            { targetRole: "FACULTY" },
            { targetRole: "ALL" },
            {
              AND: [{ course: { teacherId: userId } }],
            },
          ],
        };
      } else if (role === "ADMIN") {
        // maybe admin sees all
        whereClause = {};
      }

      return ctx.prisma.notice.findMany({
        where: whereClause,
        include: {
          course: {
            include: {
              enrollments: {
                include: { user: true },
              },
            },
          },
        },
      });
    },

    programOptions: async (parent: any, args: any, ctx: Context) => {
      return ctx.prisma.program.findMany();
    },

    teacherOptions: async (parent: any, args: any, ctx: Context) => {
      return ctx.prisma.user.findMany();
    },

    facultyCourses: async (parent: any, { teacherId }: any, ctx: Context) => {
      return ctx.prisma.course.findMany({
        where: { teacherId: parseInt(teacherId) },
        include: {
          enrollments: {
            include: {
              user: true,
            },
          },
        },
      });
    },

    events: async (parent: any, args: any, ctx: Context) => {
      requiredRole(ctx, ["STUDENT", "ADMIN", "FACULTY"]);

      const role = ctx.user?.role;

      let whereClause: any = { targetRole: "ALL" };

      if (role === "STUDENT") {
        whereClause = {
          OR: [{ targetRole: "STUDENT" }, { targetRole: "ALL" }],
        };
      } else if (role === "FACULTY") {
        // Faculty can see their own + ALL
        whereClause = {
          OR: [
            { targetRole: "FACULTY" },
            { targetRole: "ALL" },
            { authorId: ctx.user?.id },
          ],
        };
      } else if (role === "ADMIN") {
        whereClause = {};
      }

      return ctx.prisma.event.findMany({
        where: whereClause,
        include: { user: true },
        orderBy: { date: "desc" },
      });
    },

    upcomingEvents: async (
      parent: any,
      { upcomingOnly }: any,
      ctx: Context
    ) => {
      const role = ctx.user?.role; // "ADMIN", "STUDENT", "FACULTY"

      if (!role) throw new Error("Unauthorized");

      // base filter
      let where: any = {};

      if (upcomingOnly) {
        where.date = { gte: new Date() }; // only future events
      }

      if (role === "ADMIN") {
        where.targetRole = { in: ["ADMIN", "STUDENT", "ALL"] };
      } else if (role === "STUDENT") {
        where.targetRole = { in: ["STUDENT", "ALL"] };
      } else if (role === "FACULTY") {
        // faculty can see their own created events
        where.authorId = ctx.user?.id;
      }

      return ctx.prisma.event.findMany({
        where,
        include: {
          user: true,
        },
        orderBy: { date: "asc" },
      });
    },

    userPagination: async (parent: any, { options }: any, ctx: Context) => {
      requiredRole(ctx, ["STUDENT", "ADMIN", "FACULTY"]);
      const { page, limit } = options;

      const skip = (page - 1) * limit;

      //count total users
      const totalItems = await ctx.prisma.user.count();

      //fetch user for current page
      const items = await ctx.prisma.user.findMany({
        skip,
        take: limit,
      });

      //count for number of pages
      const totalPages = Math.ceil(totalItems / limit);

      return {
        items,
        totalItems,
        totalPages,
        currentPage: page,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      };
    },
  },

  Course: {
    program: async (parent: any, args: any, ctx: Context) => {
      return ctx.prisma.program.findMany({
        where: { id: parent.programId },
      });
    },
    teacher: async (parent: any, args: any, ctx: Context) => {
      return ctx.prisma.user.findMany({
        where: { id: parent.teacherId },
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
      return {
        token: sign({ id: user.id, fullName: user.fullName, role: user.role }),
        user,
      };
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
      return {
        token: sign({ id: user.id, fullName: user.fullName, role: user.role }),
        user,
      };
    },

    editUser: async (parent: any, { input }: any, ctx: Context) => {
      requiredRole(ctx, ["ADMIN"]);
      const userId = parseInt(input.id);
      const user = await ctx.prisma.user.findUnique({
        where: { id: userId },
      });
      if (!user) {
        throw new Error("User does not exist!");
      }
      const hassed = await bcrypt.hash(input.password, 10);

      return await ctx.prisma.user.update({
        where: { id: userId },
        data: {
          fullName: input.fullName,
          email: input.email,
          password: hassed,
          role: input.role,
        },
      });
    },

    deleteUser: async (parent: any, { id }: any, ctx: Context) => {
      requiredRole(ctx, ["ADMIN"]);
      const userId = parseInt(id);
      const user = await ctx.prisma.user.findUnique({
        where: { id: userId },
      });
      if (!user) {
        throw new Error("User does not exist!");
      }
      return await ctx.prisma.user.delete({
        where: { id: userId },
      });
    },

    createProgram: (parent: any, { input }: any, ctx: Context) => {
      requiredRole(ctx, ["ADMIN"]);
      return ctx.prisma.program.create({
        data: { ...input },
      });
    },

    updateProgram: async (parent: any, { input }: any, ctx: Context) => {
      requiredRole(ctx, ["ADMIN"]);
      const programId = parseInt(input.id);

      const program = await ctx.prisma.program.findUnique({
        where: { id: programId },
      });

      if (!program) {
        throw new Error("Program does not exist!");
      }
      return ctx.prisma.program.update({
        where: { id: programId },
        data: {
          name: input.name,
          description: input.description,
          durationYears: input.durationYears,
        },
      });
    },

    createCourse: async (parent: any, { input }: any, ctx: Context) => {
      requiredRole(ctx, ["ADMIN"]);
      return ctx.prisma.course.create({
        data: {
          code: input.code,
          title: input.title,
          description: input.description,
          programId: parseInt(input.programId),
          teacherId: parseInt(input.teacherId),
        },
      });
    },

    updateCourse: async (parent: any, { input }: any, ctx: Context) => {
      requiredRole(ctx, ["ADMIN"]);
      return ctx.prisma.course.update({
        where: { id: parseInt(input.id) },
        data: {
          code: input.code,
          title: input.title,
          description: input.description,
          programId: parseInt(input.programId),
          teacherId: parseInt(input.teacherId),
        },
      });
    },

    postNotice: async (parent: any, { input }: any, ctx: Context) => {
      requiredRole(ctx, ["FACULTY"]);
      return ctx.prisma.notice.create({
        data: {
          ...input,
        },
      });
    },

    createEvent: async (parent: any, { input }: any, ctx: Context) => {
      requiredRole(ctx, ["FACULTY"]);
      return ctx.prisma.event.create({
        data: {
          ...input,
        },
      });
    },

    enroll: async (parent: any, { courseId, input }: any, ctx: Context) => {
      requiredRole(ctx, ["STUDENT"]);
      return ctx.prisma.enrollment.create({
        data: {
          courseId: parseInt(courseId),
          userId: parseInt(input.userId),
          isCompleted: input.isCompleted,
        },
      });
    },

    contact: async (parent: any, { input }: any, ctx: Context) => {
      return ctx.prisma.contactMessage.create({
        data: {
          name: input.name,
          email: input.email,
          message: input.message,
        },
      });
    },
  },
};
