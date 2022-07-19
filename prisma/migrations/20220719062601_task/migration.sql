-- CreateEnum
CREATE TYPE "TaskStatus" AS ENUM ('IN_PROGRESS', 'DONE');

-- CreateTable
CREATE TABLE "task" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sub_task" (
    "id" SERIAL NOT NULL,
    "task_id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "status" "TaskStatus" NOT NULL,
    "priority" INTEGER NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sub_task_pkey" PRIMARY KEY ("id")
);
