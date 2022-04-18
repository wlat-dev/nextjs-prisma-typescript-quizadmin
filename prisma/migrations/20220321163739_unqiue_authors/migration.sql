-- AlterTable
ALTER TABLE "course" ALTER COLUMN "author" DROP NOT NULL;

-- AlterTable
ALTER TABLE "lesson" ALTER COLUMN "author" DROP NOT NULL;

-- AlterTable
ALTER TABLE "module" ALTER COLUMN "author" DROP NOT NULL;

-- AlterTable
ALTER TABLE "question" ALTER COLUMN "author" DROP NOT NULL;

-- AlterTable
ALTER TABLE "quiz" ALTER COLUMN "author" DROP NOT NULL;
