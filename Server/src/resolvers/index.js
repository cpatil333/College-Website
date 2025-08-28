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
        programs: async (parent, args, ctx) => {
            return ctx.prisma.program.findMany();
        },
        program: async (parent, { id }, ctx) => {
            const programId = parseInt(id);
            return ctx.prisma.program.findUnique({
                where: { id: programId },
            });
        },
        eduCourses: async (parent, args, ctx) => {
            return ctx.prisma.course.findMany();
        },
        course: async (parent, { id }, ctx) => {
            const courseId = parseInt(id);
            return ctx.prisma.course.findUnique({
                where: { id: courseId },
            });
        },
        notices: async (parent, args, ctx) => {
            requiredRole(ctx, ["STUDENT", "ADMIN", "FACULTY"]); // ✅ check multiple roles
            let role = ctx.user?.role;
            const userId = ctx.user?.id;
            let whereClause = { targetRole: "ALL" };
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
            }
            else if (role === "FACULTY") {
                whereClause = {
                    OR: [
                        { targetRole: "FACULTY" },
                        { targetRole: "ALL" },
                        {
                            AND: [{ course: { teacherId: userId } }],
                        },
                    ],
                };
            }
            else if (role === "ADMIN") {
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
        programOptions: async (parent, args, ctx) => {
            return ctx.prisma.program.findMany();
        },
        teacherOptions: async (parent, args, ctx) => {
            return ctx.prisma.user.findMany();
        },
        facultyCourses: async (parent, { teacherId }, ctx) => {
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
    },
    Course: {
        program: async (parent, args, ctx) => {
            return ctx.prisma.program.findMany({
                where: { id: parent.programId },
            });
        },
        teacher: async (parent, args, ctx) => {
            return ctx.prisma.user.findMany({
                where: { id: parent.teacherId },
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
            return {
                token: sign({ id: user.id, fullName: user.fullName, role: user.role }),
                user,
            };
        },
        login: async (parent, { input }, ctx) => {
            const user = await ctx.prisma.user.findUnique({
                where: { email: input.email },
            });
            if (!user) {
                throw new Error("Email does not exist.!");
            }
            const matchedPassword = await bcrypt.compare(input.password, user.password);
            if (!matchedPassword) {
                throw new Error("Invalid credentials!");
            }
            return {
                token: sign({ id: user.id, fullName: user.fullName, role: user.role }),
                user,
            };
        },
        editUser: async (parent, { input }, ctx) => {
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
        deleteUser: async (parent, { id }, ctx) => {
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
        createProgram: (parent, { input }, ctx) => {
            requiredRole(ctx, ["ADMIN"]);
            return ctx.prisma.program.create({
                data: { ...input },
            });
        },
        updateProgram: async (parent, { input }, ctx) => {
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
        createCourse: async (parent, { input }, ctx) => {
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
        updateCourse: async (parent, { input }, ctx) => {
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
        postNotice: async (parent, { input }, ctx) => {
            requiredRole(ctx, ["FACULTY"]);
            return ctx.prisma.notice.create({
                data: {
                    ...input,
                },
            });
        },
        createEvent: async (parent, { input }, ctx) => {
            requiredRole(ctx, ["FACULTY"]);
            return ctx.prisma.event.create({
                data: {
                    ...input,
                },
            });
        },
        enroll: async (parent, { courseId, input }, ctx) => {
            requiredRole(ctx, ["STUDENT"]);
            return ctx.prisma.enrollment.create({
                data: {
                    courseId: parseInt(courseId),
                    userId: parseInt(input.userId),
                    isCompleted: input.isCompleted,
                },
            });
        },
        contact: async (parent, { input }, ctx) => {
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
//# sourceMappingURL=index.js.map