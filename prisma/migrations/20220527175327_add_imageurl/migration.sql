-- CreateTable
CREATE TABLE "ImageUrl" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "ImageUrl_pkey" PRIMARY KEY ("id")
);
