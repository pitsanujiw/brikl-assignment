import { prisma } from '../../database'

export async function getTasks(offset: number, limit: number) {
  const [total, results] = await prisma.$transaction([
    prisma.task.count(),
    prisma.task.findMany({
      take: limit,
      skip: offset,
      include: {
        subTasks: true,
      },
    }),
  ])

  return {
    total,
    results,
  }
}
