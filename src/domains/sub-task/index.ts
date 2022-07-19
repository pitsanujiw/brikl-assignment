import { SubTask } from '@prisma/client'

import { ID } from '../../types'
import { prisma } from '../../database'
import { CreateSubTaskInput, OrderSubTaskInput, UpdateSubTaskInput } from '../../models'

export function getSubTasksByTaskId(taskId: ID): Promise<ReadonlyArray<SubTask>> {
  return prisma.subTask.findMany({
    where: {
      taskId,
      deleted: false,
    },
  })
}

export async function createSubTask(subTask: CreateSubTaskInput): Promise<SubTask> {
  const latest = await prisma.subTask.count({
    where: {
      taskId: subTask.taskId,
      deleted: false,
    },
  })

  return prisma.subTask.create({
    data: {
      ...subTask,
      priority: latest + 1,
    },
  })
}

export function orderSubTaskBySubTasks(subTasks: OrderSubTaskInput): Promise<ReadonlyArray<SubTask>> {
  return prisma.$transaction(
    subTasks.subTaskIds.map((subTaskId, index) =>
      prisma.subTask.update({
        where: {
          id: subTaskId,
        },
        data: {
          priority: index,
        },
      }),
    ),
  )
}

export function updateSubTaskByPartialSubTask(subTask: UpdateSubTaskInput): Promise<SubTask> {
  return prisma.subTask.update({
    where: {
      id: subTask.id,
    },
    data: {
      ...subTask,
    },
  })
}

export function deleteSubTaskBySubTaskId(subTaskId: ID): Promise<SubTask> {
  return prisma.subTask.update({
    where: {
      id: subTaskId,
    },
    data: {
      deleted: true,
    },
  })
}
