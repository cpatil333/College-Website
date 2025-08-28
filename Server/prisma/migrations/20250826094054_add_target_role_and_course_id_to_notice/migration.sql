-- AlterTable
ALTER TABLE "public"."Notice" ADD COLUMN     "courseId" INTEGER,
ADD COLUMN     "targetRole" "public"."Role";

-- AddForeignKey
ALTER TABLE "public"."Notice" ADD CONSTRAINT "Notice_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "public"."Course"("id") ON DELETE SET NULL ON UPDATE CASCADE;
