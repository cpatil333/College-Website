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
        programs: (parent: any, args: any, ctx: Context) => Promise<{
            id: number;
            name: string;
            description: string;
            durationYears: number;
        }[]>;
        program: (parent: any, { id }: any, ctx: Context) => Promise<{
            id: number;
            name: string;
            description: string;
            durationYears: number;
        } | null>;
        eduCourses: (parent: any, args: any, ctx: Context) => Promise<{
            id: number;
            teacherId: number;
            description: string;
            code: string;
            title: string;
            programId: number;
        }[]>;
        course: (parent: any, { id }: any, ctx: Context) => Promise<{
            id: number;
            teacherId: number;
            description: string;
            code: string;
            title: string;
            programId: number;
        } | null>;
        notices: (parent: any, args: any, ctx: Context) => Promise<({
            course: ({
                enrollments: ({
                    user: {
                        imageUrl: string;
                        id: number;
                        fullName: string;
                        email: string;
                        password: string;
                        role: import("@prisma/client").$Enums.Role;
                        dateJoined: Date;
                    };
                } & {
                    id: number;
                    courseId: number;
                    createdAt: Date;
                    isCompleted: boolean;
                    userId: number;
                })[];
            } & {
                id: number;
                teacherId: number;
                description: string;
                code: string;
                title: string;
                programId: number;
            }) | null;
        } & {
            id: number;
            courseId: number | null;
            title: string;
            body: string;
            visible: boolean;
            authorId: number;
            targetRole: import("@prisma/client").$Enums.Role | null;
            createdAt: Date;
        })[]>;
        programOptions: (parent: any, args: any, ctx: Context) => Promise<{
            id: number;
            name: string;
            description: string;
            durationYears: number;
        }[]>;
        teacherOptions: (parent: any, args: any, ctx: Context) => Promise<{
            imageUrl: string;
            id: number;
            fullName: string;
            email: string;
            password: string;
            role: import("@prisma/client").$Enums.Role;
            dateJoined: Date;
        }[]>;
        facultyCourses: (parent: any, { teacherId }: any, ctx: Context) => Promise<({
            enrollments: ({
                user: {
                    imageUrl: string;
                    id: number;
                    fullName: string;
                    email: string;
                    password: string;
                    role: import("@prisma/client").$Enums.Role;
                    dateJoined: Date;
                };
            } & {
                id: number;
                courseId: number;
                createdAt: Date;
                isCompleted: boolean;
                userId: number;
            })[];
        } & {
            id: number;
            teacherId: number;
            description: string;
            code: string;
            title: string;
            programId: number;
        })[]>;
        events: (parent: any, args: any, ctx: Context) => Promise<({
            user: {
                imageUrl: string;
                id: number;
                fullName: string;
                email: string;
                password: string;
                role: import("@prisma/client").$Enums.Role;
                dateJoined: Date;
            };
        } & {
            id: number;
            title: string;
            authorId: number;
            targetRole: string;
            createdAt: Date;
            details: string;
            date: Date;
        })[]>;
        upcomingEvents: (parent: any, { upcomingOnly }: any, ctx: Context) => Promise<({
            user: {
                imageUrl: string;
                id: number;
                fullName: string;
                email: string;
                password: string;
                role: import("@prisma/client").$Enums.Role;
                dateJoined: Date;
            };
        } & {
            id: number;
            title: string;
            authorId: number;
            targetRole: string;
            createdAt: Date;
            details: string;
            date: Date;
        })[]>;
        userPagination: (parent: any, { options }: any, ctx: Context) => Promise<{
            items: {
                imageUrl: string;
                id: number;
                fullName: string;
                email: string;
                password: string;
                role: import("@prisma/client").$Enums.Role;
                dateJoined: Date;
            }[];
            totalItems: number;
            totalPages: number;
            currentPage: any;
            hasNextPage: boolean;
            hasPreviousPage: boolean;
        }>;
    };
    Course: {
        program: (parent: any, args: any, ctx: Context) => Promise<{
            id: number;
            name: string;
            description: string;
            durationYears: number;
        }[]>;
        teacher: (parent: any, args: any, ctx: Context) => Promise<{
            imageUrl: string;
            id: number;
            fullName: string;
            email: string;
            password: string;
            role: import("@prisma/client").$Enums.Role;
            dateJoined: Date;
        }[]>;
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
        editUser: (parent: any, { input }: any, ctx: Context) => Promise<{
            imageUrl: string;
            id: number;
            fullName: string;
            email: string;
            password: string;
            role: import("@prisma/client").$Enums.Role;
            dateJoined: Date;
        }>;
        deleteUser: (parent: any, { id }: any, ctx: Context) => Promise<{
            imageUrl: string;
            id: number;
            fullName: string;
            email: string;
            password: string;
            role: import("@prisma/client").$Enums.Role;
            dateJoined: Date;
        }>;
        createProgram: (parent: any, { input }: any, ctx: Context) => import("@prisma/client").Prisma.Prisma__ProgramClient<{
            id: number;
            name: string;
            description: string;
            durationYears: number;
        }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
        updateProgram: (parent: any, { input }: any, ctx: Context) => Promise<{
            id: number;
            name: string;
            description: string;
            durationYears: number;
        }>;
        createCourse: (parent: any, { input }: any, ctx: Context) => Promise<{
            id: number;
            teacherId: number;
            description: string;
            code: string;
            title: string;
            programId: number;
        }>;
        updateCourse: (parent: any, { input }: any, ctx: Context) => Promise<{
            id: number;
            teacherId: number;
            description: string;
            code: string;
            title: string;
            programId: number;
        }>;
        postNotice: (parent: any, { input }: any, ctx: Context) => Promise<{
            id: number;
            courseId: number | null;
            title: string;
            body: string;
            visible: boolean;
            authorId: number;
            targetRole: import("@prisma/client").$Enums.Role | null;
            createdAt: Date;
        }>;
        createEvent: (parent: any, { input }: any, ctx: Context) => Promise<{
            id: number;
            title: string;
            authorId: number;
            targetRole: string;
            createdAt: Date;
            details: string;
            date: Date;
        }>;
        enroll: (parent: any, { courseId, input }: any, ctx: Context) => Promise<{
            id: number;
            courseId: number;
            createdAt: Date;
            isCompleted: boolean;
            userId: number;
        }>;
        contact: (parent: any, { input }: any, ctx: Context) => Promise<{
            id: number;
            email: string;
            name: string;
            createdAt: Date;
            message: string;
        }>;
    };
};
//# sourceMappingURL=index.d.ts.map