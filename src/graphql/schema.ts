import { buildSchema, registerEnumType } from 'type-graphql'

import { Direction, TaskStatus } from '../types'
import { TaskResolver } from '../controllers/task'
import { SubTaskResolver } from '../controllers/sub-task'

function registerAllEnumTypes() {
  registerEnumType(TaskStatus, {
    name: 'TaskStatus',
  })
  registerEnumType(Direction, {
    name: 'Direction',
  })
}

export function buildSchemaApp() {
  registerAllEnumTypes()

  return buildSchema({
    resolvers: [TaskResolver, SubTaskResolver],
  })
}
