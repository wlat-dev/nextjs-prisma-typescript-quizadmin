/*
  Warnings:

  - A unique constraint covering the columns `[quiz_title]` on the table `Quiz` will be added. If there are existing duplicate values, this will fail.
  - Made the column `quiz_title` on table `Quiz` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Quiz" ALTER COLUMN "quiz_title" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Quiz_quiz_title_key" ON "Quiz"("quiz_title");
