import { SubTask as SubTaskModel } from '@prisma/client'
import { Arg, Int, Mutation, Query, Resolver } from 'type-graphql'

import { CreateSubTaskInput, UpdateSubTaskInput, SubTask, OrderSubTaskInput } from '../../models'
import * as subTaskService from '../../domains/sub-task'

@Resolver(SubTask)
export class SubTaskResolver {
  @Query(() => [SubTask])
  subTasks(@Arg('taskId') taskId: number): Promise<ReadonlyArray<SubTaskModel>> {
    return subTaskService.getSubTasksByTaskId(taskId)
  }

  @Mutation(() => SubTask)
  createSubTask(@Arg('input') input: CreateSubTaskInput): Promise<SubTaskModel> {
    return subTaskService.createSubTask(input)
  }

  @Mutation(() => [SubTask])
  orderSubTask(@Arg('input') input: OrderSubTaskInput): Promise<ReadonlyArray<SubTaskModel>> {
    return subTaskService.orderSubTaskBySubTasks(input)
  }

  @Mutation(() => SubTask)
  updateSubTask(@Arg('input') input: UpdateSubTaskInput): Promise<SubTaskModel> {
    return subTaskService.updateSubTaskByPartialSubTask(input)
  }

  @Mutation(() => SubTask)
  deleteSubTask(@Arg('id', () => Int) id: number): Promise<SubTaskModel> {
    return subTaskService.deleteSubTaskBySubTaskId(id)
  }
}
