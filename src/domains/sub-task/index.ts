import { TaskStatus } from './../../types/task'
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

export async function updateSubTaskByPartialSubTask(subTask: UpdateSubTaskInput): Promise<SubTask> {
  const result = await prisma.subTask.update({
    where: {
      id: subTask.id,
    },
    data: {
      ...subTask,
    },
  })

  const subTasks = await prisma.subTask.findMany({
    where: {
      taskId: subTask.taskId,
      deleted: false
    },
    select: {
      status: true,
    },
  })

  if (!subTasks?.length) {
    return result
  }

  const isTaskDone = subTasks?.every((subTask) => subTask.status === TaskStatus.DONE)
  if (isTaskDone) {
    await prisma.task.update({
      where: {
        id: subTask.taskId,
      },
      data: {
        status: TaskStatus.DONE,
      },
    })
  }

  return result
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
