/*
  Warnings:

  - A unique constraint covering the columns `[course_title]` on the table `Course` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Course_course_title_key" ON "Course"("course_title");
