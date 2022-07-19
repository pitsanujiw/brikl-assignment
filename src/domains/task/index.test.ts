import { prismaMock } from '../../mock/database'
import { Direction } from '../../types'
import * as taskService from './index'

describe('domain/task', () => {
  const offset = 0
  const limit = 10

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('getTasksPagination()', () => {
    it('should return tasks', async () => {
      prismaMock.$transaction.mockImplementationOnce(() =>
        Promise.resolve([
          1,
          [
            {
              title: '__TITLE__',
            },
          ],
        ]),
      )
      const expected = {
        total: 1,
        results: [
          {
            title: '__TITLE__',
          },
        ],
      }

      const actual = await taskService.getTasksPagination(offset, limit)

      expect(actual).toEqual(expected)
      expect(prismaMock.task.count).toHaveBeenCalledWith({ where: { deleted: false } })
      expect(prismaMock.task.findMany).toHaveBeenCalledWith({
        select: {
          createdAt: true,
          deleted: true,
          id: true,
          priority: true,
          subTasks: {
            orderBy: { priority: Direction.ASC },
            select: {
              createdAt: true,
              deleted: true,
              id: true,
              priority: true,
              status: true,
              taskId: true,
              title: true,
              updatedAt: true,
            },
            where: { deleted: false },
          },
          title: true,
          updatedAt: true,
        },
        skip: 0,
        take: 10,
        where: { deleted: false },
        orderBy: {
          priority: Direction.ASC,
        },
      })
    })
  })

  describe('createTask()', () => {
    it('should return created task', async () => {
      const expected = { title: '__TITLE__' }
      prismaMock.task.count.mockImplementationOnce(() => Promise.resolve(0) as any)
      prismaMock.task.create.mockImplementationOnce(() => Promise.resolve(expected) as any)

      const actual = await taskService.createTask({
        title: '__TITLE__',
      })

      expect(actual).toEqual(expected)
      expect(prismaMock.task.create).toHaveBeenCalledWith({
        data: {
          title: '__TITLE__',
          priority: 1,
        },
      })
      expect(prismaMock.task.count).toHaveBeenCalledWith({
        where: {
          deleted: false,
        },
      })
    })
  })

  describe('updateTask()', () => {
    it('should return task when updated', async () => {
      const expected = {
        id: 1,
        title: '__NEW_TITLE__',
      }
      prismaMock.task.update.mockImplementationOnce(() => Promise.resolve(expected) as any)

      const actual = await taskService.updateTask({
        id: 1,
        title: '__NEW_TITLE__',
      })

      expect(actual).toEqual(expected)
      expect(prismaMock.task.update).toHaveBeenCalledWith({
        where: {
          id: 1,
        },
        data: {
          title: '__NEW_TITLE__',
        },
        include: {
          subTasks: true,
        },
      })
    })
  })

  describe('deleteTask()', () => {
    it('should return task when deleted', async () => {
      const expected = {
        id: 1,
        title: '__TITLE__',
      }
      prismaMock.task.update.mockImplementationOnce(() => Promise.resolve(expected) as any)

      const actual = await taskService.deleteTask(1)

      expect(actual).toEqual(expected)
      expect(prismaMock.task.update).toHaveBeenCalledWith({
        where: {
          id: 1,
        },
        data: {
          deleted: true,
        },
      })
    })
  })

  describe('orderTaskByTaskIds()', () => {
    it('should return order task', async () => {
      const expected = [
        { id: 1, priority: 1 },
        { id: 2, priority: 2 },
      ]

      prismaMock.$transaction.mockImplementationOnce(() => Promise.resolve(expected))

      const actual = await taskService.orderTaskByTaskIds({ taskIds: [1, 2] })
      expect(actual).toEqual(expected)
      expect(prismaMock.task.update).toBeCalledTimes(2)
      expect(prismaMock.task.update).toHaveBeenNthCalledWith(1, {
        data: { priority: 0 },
        where: { id: 1 },
        include: {
          subTasks: true,
        },
      })
      expect(prismaMock.task.update).toHaveBeenNthCalledWith(2, {
        data: { priority: 1 },
        where: { id: 2 },
        include: {
          subTasks: true,
        },
      })
    })
  })
})
