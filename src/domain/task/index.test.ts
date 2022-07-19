import { prismaMock } from '../../mock/database'
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
          subTasks: {
            orderBy: { priority: 'asc' },
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
      })
    })
  })
})
