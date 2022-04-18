-- AlterTable
ALTER TABLE "Enrollment" ADD COLUMN     "updated_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Instructor" ADD COLUMN     "updated_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "updated_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Subject" ADD COLUMN     "updated_at" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "TopicCategory" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "title" TEXT NOT NULL,

    CONSTRAINT "TopicCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_TopicToTopicCategory" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "TopicCategory_title_key" ON "TopicCategory"("title");

-- CreateIndex
CREATE UNIQUE INDEX "_TopicToTopicCategory_AB_unique" ON "_TopicToTopicCategory"("A", "B");

-- CreateIndex
CREATE INDEX "_TopicToTopicCategory_B_index" ON "_TopicToTopicCategory"("B");

-- AddForeignKey
ALTER TABLE "_TopicToTopicCategory" ADD FOREIGN KEY ("A") REFERENCES "Topic"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TopicToTopicCategory" ADD FOREIGN KEY ("B") REFERENCES "TopicCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;
