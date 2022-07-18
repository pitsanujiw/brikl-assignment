import { Field, ID as GraphqlId, ObjectType } from 'type-graphql'

import { ID, TaskStatus } from '../types'
@ObjectType()
export class SubTask {
  constructor(id: ID, title: string, status: TaskStatus) {
    this.id = id
    this.title = title
    this.status = status
  }

  @Field(() => GraphqlId)
  id: ID

  @Field()
  title: string

  @Field(() => TaskStatus)
  status: TaskStatus
}
