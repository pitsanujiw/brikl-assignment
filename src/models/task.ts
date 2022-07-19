import { Field, ObjectType } from 'type-graphql'

import { ID } from '../types'
import { BaseSchema } from './base-schema'
import { SubTask } from './subtask'

@ObjectType()
export class Task extends BaseSchema {
  constructor(
    id: ID,
    title: string,
    subTasks: ReadonlyArray<SubTask>,
    createdAt: Date,
    updatedAt: Date,
    deleted: boolean,
  ) {
    super(id, createdAt, updatedAt)
    this.title = title
    this.subTasks = subTasks
    this.deleted = deleted
  }

  @Field()
  title: string

  @Field(() => Boolean)
  deleted: boolean

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
