import { Field, ID as GraphqlId, ObjectType } from 'type-graphql'

import { ID } from '../types'
import { SubTask } from './subtask'

@ObjectType()
export class Task {
  constructor(id: ID, title: string, subTasks: ReadonlyArray<SubTask>) {
    this.id = id
    this.title = title
    this.subTasks = subTasks
  }

  @Field(() => GraphqlId)
  id: ID

  @Field()
  title: string

  @Field(() => [SubTask])
  subTasks: ReadonlyArray<SubTask>
}

@ObjectType()
export class TaskConnection {
  constructor(results: ReadonlyArray<Task>, total: number) {
    this.results = results
    this.total = total
  }

  @Field()
  total: number

  @Field(() => [Task])
  results: ReadonlyArray<Task>
}
