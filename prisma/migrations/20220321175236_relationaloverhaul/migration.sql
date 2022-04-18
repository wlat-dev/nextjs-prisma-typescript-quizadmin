/*
  Warnings:

  - You are about to drop the `course` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `enrollment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `instructor` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `lesson` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `module` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `question` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `question_topic` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `quiz` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `quiz_attempt` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `quiz_question` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `student` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `student_module` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `subject` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `topic` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "enrollment" DROP CONSTRAINT "enrollment_course_id_fkey";

-- DropForeignKey
ALTER TABLE "enrollment" DROP CONSTRAINT "enrollment_student_id_fkey";

-- DropForeignKey
ALTER TABLE "instructor" DROP CONSTRAINT "instructor_user_id_fkey";

-- DropForeignKey
ALTER TABLE "lesson" DROP CONSTRAINT "lesson_lesson_module_fkey";

-- DropForeignKey
ALTER TABLE "module" DROP CONSTRAINT "module_module_subject_id_fkey";

-- DropForeignKey
ALTER TABLE "question_topic" DROP CONSTRAINT "question_topic_question_id_fkey";

-- DropForeignKey
ALTER TABLE "question_topic" DROP CONSTRAINT "question_topic_topic_id_fkey";

-- DropForeignKey
ALTER TABLE "quiz_attempt" DROP CONSTRAINT "quiz_attempt_enroll_id_fkey";

-- DropForeignKey
ALTER TABLE "quiz_attempt" DROP CONSTRAINT "quiz_attempt_quiz_id_fkey";

-- DropForeignKey
ALTER TABLE "quiz_attempt" DROP CONSTRAINT "quiz_attempt_student_id_fkey";

-- DropForeignKey
ALTER TABLE "quiz_question" DROP CONSTRAINT "quiz_question_quiz_id_fkey";

-- DropForeignKey
ALTER TABLE "student" DROP CONSTRAINT "student_user_id_fkey";

-- DropForeignKey
ALTER TABLE "student_module" DROP CONSTRAINT "student_module_module_id_fkey";

-- DropForeignKey
ALTER TABLE "student_module" DROP CONSTRAINT "student_module_student_id_fkey";

-- DropTable
DROP TABLE "course";

-- DropTable
DROP TABLE "enrollment";

-- DropTable
DROP TABLE "instructor";

-- DropTable
DROP TABLE "lesson";

-- DropTable
DROP TABLE "module";

-- DropTable
DROP TABLE "question";

-- DropTable
DROP TABLE "question_topic";

-- DropTable
DROP TABLE "quiz";

-- DropTable
DROP TABLE "quiz_attempt";

-- DropTable
DROP TABLE "quiz_question";

-- DropTable
DROP TABLE "student";

-- DropTable
DROP TABLE "student_module";

-- DropTable
DROP TABLE "subject";

-- DropTable
DROP TABLE "topic";

-- CreateTable
CREATE TABLE "Course" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "instructor_id" TEXT,
    "course_title" VARCHAR NOT NULL,
    "updated_at" TIMESTAMPTZ(6),
    "author" TEXT,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Enrollment" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "student_id" TEXT,
    "course_id" TEXT,
    "current_grade_level" TEXT,

    CONSTRAINT "Enrollment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Instructor" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT,

    CONSTRAINT "Instructor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lesson" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6),
    "author" TEXT,
    "lesson_module" TEXT,

    CONSTRAINT "Lesson_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Module" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6),
    "author" TEXT,
    "module_subject_id" TEXT,
    "module_name" VARCHAR NOT NULL,
    "moduleId" TEXT,

    CONSTRAINT "Module_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TopicsOnQuestions" (
    "topic_id" TEXT NOT NULL,
    "question_id" TEXT NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assignedBy" TEXT NOT NULL,

    CONSTRAINT "TopicsOnQuestions_pkey" PRIMARY KEY ("question_id","topic_id")
);

-- CreateTable
CREATE TABLE "Topic" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6),

    CONSTRAINT "Topic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Question" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "difficulty" INTEGER,
    "image_url" VARCHAR,
    "equation" VARCHAR,
    "question_text" VARCHAR,
    "answer_formula" VARCHAR,
    "updated_at" TIMESTAMPTZ(6),
    "author" VARCHAR,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuizAttempt" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "student_id" TEXT NOT NULL,
    "quiz_id" TEXT NOT NULL,
    "total_points" INTEGER,
    "points_scored" INTEGER,
    "enroll_id" TEXT,
    "answer_data" JSON,
    "question_answered_count" INTEGER,
    "question_unanswered_count" INTEGER,

    CONSTRAINT "QuizAttempt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestionsOnQuizzes" (
    "quiz_id" TEXT NOT NULL,
    "question_id" TEXT NOT NULL,
    "question_number" INTEGER,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assignedBy" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,

    CONSTRAINT "QuestionsOnQuizzes_pkey" PRIMARY KEY ("quiz_id","question_id")
);

-- CreateTable
CREATE TABLE "Quiz" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "author" TEXT,

    CONSTRAINT "Quiz_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudentsOnModules" (
    "student_id" TEXT NOT NULL,
    "module_id" TEXT NOT NULL,
    "time_started" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StudentsOnModules_pkey" PRIMARY KEY ("student_id","module_id")
);

-- CreateTable
CREATE TABLE "Student" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "grade_at_account_creation" INTEGER,
    "user_id" TEXT,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subject" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Subject_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Module_module_name_key" ON "Module"("module_name");

-- AddForeignKey
ALTER TABLE "Enrollment" ADD CONSTRAINT "Enrollment_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "Course"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Enrollment" ADD CONSTRAINT "Enrollment_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Student"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Instructor" ADD CONSTRAINT "Instructor_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_lesson_module_fkey" FOREIGN KEY ("lesson_module") REFERENCES "Module"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Module" ADD CONSTRAINT "Module_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "Module"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Module" ADD CONSTRAINT "Module_module_subject_id_fkey" FOREIGN KEY ("module_subject_id") REFERENCES "Subject"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "TopicsOnQuestions" ADD CONSTRAINT "TopicsOnQuestions_topic_id_fkey" FOREIGN KEY ("topic_id") REFERENCES "Topic"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "TopicsOnQuestions" ADD CONSTRAINT "TopicsOnQuestions_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "Question"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "QuizAttempt" ADD CONSTRAINT "QuizAttempt_enroll_id_fkey" FOREIGN KEY ("enroll_id") REFERENCES "Enrollment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "QuizAttempt" ADD CONSTRAINT "QuizAttempt_quiz_id_fkey" FOREIGN KEY ("quiz_id") REFERENCES "Quiz"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "QuizAttempt" ADD CONSTRAINT "QuizAttempt_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Student"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "QuestionsOnQuizzes" ADD CONSTRAINT "QuestionsOnQuizzes_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionsOnQuizzes" ADD CONSTRAINT "QuestionsOnQuizzes_quiz_id_fkey" FOREIGN KEY ("quiz_id") REFERENCES "Quiz"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentsOnModules" ADD CONSTRAINT "StudentsOnModules_module_id_fkey" FOREIGN KEY ("module_id") REFERENCES "Module"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "StudentsOnModules" ADD CONSTRAINT "StudentsOnModules_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Student"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
