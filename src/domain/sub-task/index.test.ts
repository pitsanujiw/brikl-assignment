import { prismaMock } from '../../mock/database'
import * as subTaskService from './index'
import { TaskStatus } from '../../types'

describe('domain/sub-task', () => {
  describe('getSubTasksByTaskId()', () => {
    it('should return sub tasks', async () => {
      const expected = [
        {
          title: '__TITLE__',
        },
      ]

      prismaMock.subTask.findMany.mockImplementationOnce(() => Promise.resolve(expected) as any)

      const actual = await subTaskService.getSubTasksByTaskId(1)
      expect(actual).toEqual(expected)
      expect(prismaMock.subTask.findMany).toHaveBeenCalledWith({
        where: {
          taskId: 1,
          deleted: false,
        },
      })
    })
  })

  describe('createSubTask()', () => {
    it('should return subtask if created', async () => {
      const expected = {
        id: 1,
        title: '__TITLE__',
      }

      prismaMock.subTask.count.mockImplementationOnce(() => Promise.resolve(0) as any)
      prismaMock.subTask.create.mockImplementationOnce(() => Promise.resolve(expected) as any)

      const actual = await subTaskService.createSubTask({
        title: '__TITLE__',
        taskId: 1,
        status: TaskStatus.IN_PROGRESS,
      })

      expect(actual).toEqual(expected)
      expect(prismaMock.subTask.count).toHaveBeenCalledWith({
        where: {
          deleted: false,
          taskId: 1,
        },
      })
      expect(prismaMock.subTask.create).toHaveBeenCalledWith({
        data: { priority: 1, status: 'IN_PROGRESS', taskId: 1, title: '__TITLE__' },
      })
    })
  })

  describe('orderSubTaskBySubTasks()', () => {
    it('should return order sub task', async () => {
      const expected = [
        { id: 1, priority: 1 },
        { id: 2, priority: 2 },
      ]

      prismaMock.$transaction.mockImplementationOnce(() => Promise.resolve(expected))

      const actual = await subTaskService.orderSubTaskBySubTasks({ subTaskIds: [1, 2] })
      expect(actual).toEqual(expected)
      expect(prismaMock.subTask.update).toBeCalledTimes(2)
      expect(prismaMock.subTask.update).toHaveBeenNthCalledWith(1, { data: { priority: 0 }, where: { id: 1 } })
      expect(prismaMock.subTask.update).toHaveBeenNthCalledWith(2, { data: { priority: 1 }, where: { id: 2 } })
    })
  })

  describe('updateSubTaskByPartialSubTask()', () => {
    it('should return update sub task', async () => {
      const expected = {
        id: 1,
        title: '__TITLE__',
        taskId: 1,
        status: TaskStatus.DONE,
      }

      prismaMock.subTask.update.mockImplementationOnce(() => Promise.resolve(expected) as any)

      const actual = await subTaskService.updateSubTaskByPartialSubTask({
        id: 1,
        title: '__TITLE__',
        taskId: 1,
        status: TaskStatus.DONE,
      })

      expect(actual).toEqual(expected)
      expect(prismaMock.subTask.update).toHaveBeenCalledWith({
        data: { id: 1, status: 'DONE', taskId: 1, title: '__TITLE__' },
        where: { id: 1 },
      })
    })
  })

  describe('deleteSubTaskBySubTaskId()', () => {
    it('should return sub task when deleted', async () => {
      const expected = {
        id: 1,
      }

      prismaMock.subTask.update.mockImplementationOnce(() => Promise.resolve(expected) as any)

      const actual = await subTaskService.deleteSubTaskBySubTaskId(1)
      expect(actual).toEqual(expected)
      expect(prismaMock.subTask.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: {
          deleted: true,
        },
      })
    })
  })
})
