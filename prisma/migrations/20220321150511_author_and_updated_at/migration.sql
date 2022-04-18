/*
  Warnings:

  - Added the required column `author` to the `course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `author` to the `lesson` table without a default value. This is not possible if the table is not empty.
  - Added the required column `author` to the `module` table without a default value. This is not possible if the table is not empty.
  - Added the required column `author` to the `question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `author` to the `quiz` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "course" ADD COLUMN     "author" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMPTZ(6);

-- AlterTable
ALTER TABLE "lesson" ADD COLUMN     "author" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMPTZ(6);

-- AlterTable
ALTER TABLE "module" ADD COLUMN     "author" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMPTZ(6);

-- AlterTable
ALTER TABLE "question" ADD COLUMN     "author" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "quiz" ADD COLUMN     "author" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "topic" ADD COLUMN     "updated_at" TIMESTAMPTZ(6);
