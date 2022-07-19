import { Field, InputType, Int } from 'type-graphql'

import { ID } from '../types'

@InputType()
export class TaskInput {
  @Field()
  title!: string
}

@InputType()
export class UpdateTaskInput {
  @Field()
  id!: number

  @Field()
  title!: string
}

@InputType()
export class OrderTaskInput {
  @Field(() => [Int])
  taskIds!: ReadonlyArray<ID>
}
