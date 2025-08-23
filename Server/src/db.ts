import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export const db = {
  user: prisma.user,
  program: prisma.program,
  course: prisma.course,
  enrollment: prisma.enrollment,
  notice: prisma.notice,
  event: prisma.event,
  contactMessage: prisma.contactMessage,
};
