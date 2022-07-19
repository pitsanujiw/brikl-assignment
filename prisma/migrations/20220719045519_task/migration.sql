/*
  Warnings:

  - You are about to drop the column `is_deleted` on the `sub_task` table. All the data in the column will be lost.
  - You are about to drop the column `is_deleted` on the `task` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "sub_task" DROP COLUMN "is_deleted",
ADD COLUMN     "deleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "task" DROP COLUMN "is_deleted",
ADD COLUMN     "deleted" BOOLEAN NOT NULL DEFAULT false;
