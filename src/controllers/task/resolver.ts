import { Task as TaskModel } from '@prisma/client'
import { Arg, Int, Mutation, Query, Resolver } from 'type-graphql'

import { TaskInput, Task, TaskConnection, OrderTaskInput, UpdateTaskInput } from '../../models'
import * as taskService from '../../domains/task'

@Resolver(Task)
export class TaskResolver {
  @Query(() => TaskConnection)
  tasks(
    @Arg('offset', { defaultValue: 0, nullable: true }) offset: number,
    @Arg('limit', { defaultValue: 10, nullable: true }) limit: number,
  ) {
    return taskService.getTasksPagination(offset, limit)
  }

  @Mutation(() => [Task])
  orderTask(@Arg('input') input: OrderTaskInput): Promise<ReadonlyArray<TaskModel>> {
    return taskService.orderTaskByTaskIds(input)
  }

  @Mutation(() => Task)
  createTask(@Arg('input') input: TaskInput): Promise<TaskModel> {
    return taskService.createTask(input)
  }

  @Mutation(() => Task)
  updateTask(@Arg('input') input: UpdateTaskInput): Promise<TaskModel> {
    return taskService.updateTask(input)
  }

  @Mutation(() => Task)
  deleteTask(@Arg('id', () => Int) id: number): Promise<TaskModel> {
    return taskService.deleteTask(id)
  }
}
