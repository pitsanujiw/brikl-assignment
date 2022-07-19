import { Field, InputType } from 'type-graphql'

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
