import { Field, InputType, Int } from 'type-graphql'

import { ID, TaskStatus } from '../types'

@InputType()
export class CreateSubTaskInput {
  @Field()
  title!: string

  @Field()
  taskId!: number
}

@InputType()
export class OrderSubTaskInput {
  @Field(() => [Int])
  subTaskIds!: ReadonlyArray<ID>
}

@InputType()
export class UpdateSubTaskInput {
  @Field()
  id!: number

  @Field({ nullable: true })
  title?: string

  @Field()
  taskId!: number

  @Field(() => TaskStatus)
  status!: TaskStatus
}
