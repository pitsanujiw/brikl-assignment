import { Field, ID as GraphQLID, ObjectType } from 'type-graphql'

import { ID } from '../types'

@ObjectType()
export class BaseSchema {
  constructor(id: ID, createdAt: Date, updatedAt: Date) {
    this.id = id
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }

  @Field(() => GraphQLID)
  id: ID

  @Field(() => Date)
  createdAt: Date

  @Field(() => Date)
  updatedAt: Date
}
