import { Task } from '@prisma/client'

export enum TaskStatus {
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

export interface TaskConnection {
  readonly total: number
  readonly results: ReadonlyArray<Task>
}
