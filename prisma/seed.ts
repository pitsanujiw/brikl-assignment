import 'reflect-metadata'
import { PrismaClient, TaskStatus } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.task.createMany({
    data: [
      {
        title: 'brikl',
      },
    ],
  })
  await prisma.subTask.createMany({
    data: [
      {
        taskId: 1,
        title: 'Create GraphQL Server',
        status: TaskStatus.DONE,
        priority: 0,
      },
      {
        taskId: 1,
        title: 'Design mock APIs',
        status: TaskStatus.DONE,
        priority: 1,
      },
      {
        taskId: 1,
        title: 'Connect to DB',
        status: TaskStatus.DONE,
        priority: 2,
      },
      {
        taskId: 1,
        title: 'Design mutation APIs',
        status: TaskStatus.IN_PROGRESS,
        priority: 3,
      },
      {
        taskId: 1,
        title: 'Fine tuning',
        status: TaskStatus.IN_PROGRESS,
        priority: 3,
      },
    ],
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
