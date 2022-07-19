import { Field, InputType } from 'type-graphql'

import { TaskStatus } from '../types'

@InputType()
export class CreateSubTaskInput {
  @Field()
  title!: string

  @Field()
  taskId!: number

  @Field(() => TaskStatus)
  status!: TaskStatus

  @Field()
  priority!: number
}

@InputType()
export class PrioritySubTaskInput {
  @Field()
  id!: number

  @Field()
  priority!: number
}

@InputType()
export class OrderSubTaskInput {
  @Field(() => [PrioritySubTaskInput])
  orderSubTask!: ReadonlyArray<PrioritySubTaskInput>
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

  @Field()
  priority!: number
}
