/*
  Warnings:

  - You are about to drop the column `title` on the `Topic` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `TopicCategory` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[topic_title]` on the table `Topic` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[topic_category_title]` on the table `TopicCategory` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `topic_title` to the `Topic` table without a default value. This is not possible if the table is not empty.
  - Added the required column `topic_category_title` to the `TopicCategory` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Topic_title_key";

-- DropIndex
DROP INDEX "TopicCategory_title_key";

-- AlterTable
ALTER TABLE "Topic" DROP COLUMN "title",
ADD COLUMN     "topic_title" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "TopicCategory" DROP COLUMN "title",
ADD COLUMN     "topic_category_title" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Topic_topic_title_key" ON "Topic"("topic_title");

-- CreateIndex
CREATE UNIQUE INDEX "TopicCategory_topic_category_title_key" ON "TopicCategory"("topic_category_title");
