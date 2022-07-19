import { Field, ID as GraphqlId, ObjectType } from 'type-graphql'

import { BaseSchema } from './base-schema'
import { ID, TaskStatus } from '../types'
@ObjectType()
export class SubTask extends BaseSchema {
  constructor(
    id: ID,
    title: string,
    taskId: ID,
    status: TaskStatus,
    priority: number,
    deleted: boolean,
    createdAt: Date,
    updatedAt: Date,
  ) {
    super(id, createdAt, updatedAt)
    this.title = title
    this.status = status
    this.priority = priority
    this.deleted = deleted
    this.taskId = taskId
  }

  @Field()
  title: string

  @Field(() => GraphqlId)
  taskId: ID

  @Field(() => TaskStatus)
  status: TaskStatus

  @Field()
  priority: number

  @Field(() => Boolean)
  deleted: boolean
}
