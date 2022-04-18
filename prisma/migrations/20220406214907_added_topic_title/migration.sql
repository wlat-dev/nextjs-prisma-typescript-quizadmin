/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `Topic` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `title` to the `Topic` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Topic" ADD COLUMN     "title" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Topic_title_key" ON "Topic"("title");
