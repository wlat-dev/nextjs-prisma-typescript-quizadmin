/*
  Warnings:

  - You are about to drop the column `lesson_module` on the `Lesson` table. All the data in the column will be lost.
  - You are about to drop the column `moduleId` on the `Module` table. All the data in the column will be lost.
  - You are about to drop the `QuestionsOnQuizzes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StudentsOnModules` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TopicsOnQuestions` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `created_at` on table `Course` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `Enrollment` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `Instructor` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `Lesson` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `Module` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `Question` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `Quiz` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `QuizAttempt` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `Student` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `Subject` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `Topic` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Lesson" DROP CONSTRAINT "Lesson_lesson_module_fkey";

-- DropForeignKey
ALTER TABLE "Module" DROP CONSTRAINT "Module_moduleId_fkey";

-- DropForeignKey
ALTER TABLE "Module" DROP CONSTRAINT "Module_module_subject_id_fkey";

-- DropForeignKey
ALTER TABLE "QuestionsOnQuizzes" DROP CONSTRAINT "QuestionsOnQuizzes_questionId_fkey";

-- DropForeignKey
ALTER TABLE "QuestionsOnQuizzes" DROP CONSTRAINT "QuestionsOnQuizzes_quiz_id_fkey";

-- DropForeignKey
ALTER TABLE "StudentsOnModules" DROP CONSTRAINT "StudentsOnModules_module_id_fkey";

-- DropForeignKey
ALTER TABLE "StudentsOnModules" DROP CONSTRAINT "StudentsOnModules_student_id_fkey";

-- DropForeignKey
ALTER TABLE "TopicsOnQuestions" DROP CONSTRAINT "TopicsOnQuestions_question_id_fkey";

-- DropForeignKey
ALTER TABLE "TopicsOnQuestions" DROP CONSTRAINT "TopicsOnQuestions_topic_id_fkey";

-- AlterTable
ALTER TABLE "Course" ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "course_title" SET DATA TYPE TEXT,
ALTER COLUMN "updated_at" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Enrollment" ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Instructor" ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Lesson" DROP COLUMN "lesson_module",
ADD COLUMN     "module_id" TEXT,
ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "updated_at" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Module" DROP COLUMN "moduleId",
ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "updated_at" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "module_name" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Question" ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "image_url" SET DATA TYPE TEXT,
ALTER COLUMN "equation" SET DATA TYPE TEXT,
ALTER COLUMN "question_text" SET DATA TYPE TEXT,
ALTER COLUMN "answer_formula" SET DATA TYPE TEXT,
ALTER COLUMN "updated_at" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "author" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Quiz" ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "updated_at" DROP DEFAULT,
ALTER COLUMN "updated_at" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "QuizAttempt" ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Student" ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Subject" ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Topic" ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "updated_at" SET DATA TYPE TIMESTAMP(3);

-- DropTable
DROP TABLE "QuestionsOnQuizzes";

-- DropTable
DROP TABLE "StudentsOnModules";

-- DropTable
DROP TABLE "TopicsOnQuestions";

-- CreateTable
CREATE TABLE "_ModuleToQuiz" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_QuestionToTopic" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_QuestionToQuiz" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ModuleToQuiz_AB_unique" ON "_ModuleToQuiz"("A", "B");

-- CreateIndex
CREATE INDEX "_ModuleToQuiz_B_index" ON "_ModuleToQuiz"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_QuestionToTopic_AB_unique" ON "_QuestionToTopic"("A", "B");

-- CreateIndex
CREATE INDEX "_QuestionToTopic_B_index" ON "_QuestionToTopic"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_QuestionToQuiz_AB_unique" ON "_QuestionToQuiz"("A", "B");

-- CreateIndex
CREATE INDEX "_QuestionToQuiz_B_index" ON "_QuestionToQuiz"("B");

-- AddForeignKey
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_module_id_fkey" FOREIGN KEY ("module_id") REFERENCES "Module"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Module" ADD CONSTRAINT "Module_module_subject_id_fkey" FOREIGN KEY ("module_subject_id") REFERENCES "Subject"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ModuleToQuiz" ADD FOREIGN KEY ("A") REFERENCES "Module"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ModuleToQuiz" ADD FOREIGN KEY ("B") REFERENCES "Quiz"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_QuestionToTopic" ADD FOREIGN KEY ("A") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_QuestionToTopic" ADD FOREIGN KEY ("B") REFERENCES "Topic"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_QuestionToQuiz" ADD FOREIGN KEY ("A") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_QuestionToQuiz" ADD FOREIGN KEY ("B") REFERENCES "Quiz"("id") ON DELETE CASCADE ON UPDATE CASCADE;
