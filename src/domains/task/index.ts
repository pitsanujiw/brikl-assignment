import { Task } from '@prisma/client'

import { Direction, ID, TaskConnection } from '../../types'
import { prisma } from '../../database'
import { OrderTaskInput, TaskInput, UpdateTaskInput } from '../../models'

export async function getTasksPagination(offset: number, limit: number): Promise<TaskConnection> {
  const [total, results] = await prisma.$transaction([
    prisma.task.count({
      where: {
        deleted: false,
      },
    }),
    prisma.task.findMany({
      where: {
        deleted: false,
      },
      take: limit,
      skip: offset,
      select: {
        id: true,
        title: true,
        createdAt: true,
        updatedAt: true,
        deleted: true,
        priority: true,
        subTasks: {
          where: {
            deleted: false,
          },
          orderBy: {
            priority: Direction.ASC,
          },
          select: {
            id: true,
            taskId: true,
            title: true,
            priority: true,
            status: true,
            createdAt: true,
            updatedAt: true,
            deleted: true,
          },
        },
      },
    }),
  ])

  return {
    total,
    results,
  }
}

export async function createTask(input: TaskInput): Promise<Task> {
  const latest = await prisma.task.count({
    where: {
      deleted: false,
    },
  })

  return prisma.task.create({
    data: {
      title: input.title,
      priority: latest + 1,
    },
  })
}

export function orderTaskByTaskIds(subTasks: OrderTaskInput): Promise<ReadonlyArray<Task>> {
  return prisma.$transaction(
    subTasks.taskIds.map((taskId, index) =>
      prisma.task.update({
        where: {
          id: taskId,
        },
        data: {
          priority: index,
        },
        include: {
          subTasks: true,
        },
      }),
    ),
  )
}

export function updateTask(input: UpdateTaskInput): Promise<Task> {
  return prisma.task.update({
    where: {
      id: input.id,
    },
    data: {
      title: input.title,
    },
    include: {
      subTasks: true,
    },
  })
}

export function deleteTask(id: ID): Promise<Task> {
  return prisma.task.update({
    where: {
      id,
    },
    data: {
      deleted: true,
    },
  })
}
