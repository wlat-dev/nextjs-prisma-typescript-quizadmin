/*
  Warnings:

  - You are about to drop the column `course_title` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `lesson_title` on the `Lesson` table. All the data in the column will be lost.
  - You are about to drop the column `quiz_title` on the `Quiz` table. All the data in the column will be lost.
  - You are about to drop the column `topic_title` on the `Topic` table. All the data in the column will be lost.
  - You are about to drop the column `topic_category_title` on the `TopicCategory` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[title]` on the table `Course` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[title]` on the table `Quiz` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[title]` on the table `Topic` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[title]` on the table `TopicCategory` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `title` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Quiz` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Topic` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `TopicCategory` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Course_course_title_key";

-- DropIndex
DROP INDEX "Quiz_quiz_title_key";

-- DropIndex
DROP INDEX "Topic_topic_title_key";

-- DropIndex
DROP INDEX "TopicCategory_topic_category_title_key";

-- AlterTable
ALTER TABLE "Course" DROP COLUMN "course_title",
ADD COLUMN     "title" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Lesson" DROP COLUMN "lesson_title",
ADD COLUMN     "title" TEXT;

-- AlterTable
ALTER TABLE "Quiz" DROP COLUMN "quiz_title",
ADD COLUMN     "title" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Topic" DROP COLUMN "topic_title",
ADD COLUMN     "title" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "TopicCategory" DROP COLUMN "topic_category_title",
ADD COLUMN     "title" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Course_title_key" ON "Course"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Quiz_title_key" ON "Quiz"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Topic_title_key" ON "Topic"("title");

-- CreateIndex
CREATE UNIQUE INDEX "TopicCategory_title_key" ON "TopicCategory"("title");
