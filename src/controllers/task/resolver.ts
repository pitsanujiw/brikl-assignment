import { Arg, Query, Resolver } from 'type-graphql'

import * as taskService from '../../domain/task'
import { Task, TaskConnection } from '../../models/task'

@Resolver(Task)
export class TaskResolver {
  @Query(() => TaskConnection)
  tasks(
    @Arg('offset', { defaultValue: 0, nullable: true }) offset: number,
    @Arg('limit', { defaultValue: 10, nullable: true }) limit: number,
  ) {
    return taskService.getTasks(offset, limit)
  }
}
