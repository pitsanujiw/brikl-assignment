import 'reflect-metadata'

import { TaskResolver } from './resolver'
import * as taskService from '../../domain/task'

jest.mock('../../domain/task', () => ({
  getTasksPagination: jest.fn().mockImplementation(() =>
    Promise.resolve({
      total: 1,
      results: [
        {
          id: 1,
        },
      ],
    }),
  ),
  createTask: jest.fn().mockImplementation(() =>
    Promise.resolve({
      id: 1,
    }),
  ),
  updateTask: jest.fn().mockImplementation(() =>
    Promise.resolve({
      id: 1,
    }),
  ),
  deleteTask: jest.fn().mockImplementation(() =>
    Promise.resolve({
      id: 1,
    }),
  ),
}))

describe('TaskResolver()', () => {
  let taskResolver: TaskResolver

  beforeEach(() => {
    jest.clearAllMocks()

    taskResolver = new TaskResolver()
  })

  describe('task()', () => {
    it('should return tasks connection', async () => {
      const expected = {
        total: 1,
        results: [
          {
            id: 1,
          },
        ],
      }

      const actual = await taskResolver.tasks(0, 10)
      expect(actual).toEqual(expected)
      expect(taskService.getTasksPagination).toHaveBeenCalledWith(0, 10)
    })
  })

  describe('createTask()', () => {
    it('should return task when created', async () => {
      const expected = {
        id: 1,
      }

      const actual = await taskResolver.createTask({ title: '__TITLE__' })
      expect(actual).toEqual(expected)
      expect(taskService.createTask).toHaveBeenCalledWith({ title: '__TITLE__' })
    })
  })

  describe('updateTask()', () => {
    it('should return task when updated', async () => {
      const expected = {
        id: 1,
      }

      const actual = await taskResolver.updateTask({ title: '__TITLE__', id: 1 })
      expect(actual).toEqual(expected)
      expect(taskService.updateTask).toHaveBeenCalledWith({ title: '__TITLE__', id: 1 })
    })
  })

  describe('deleteTask()', () => {
    it('should return task when deleted', async () => {
      const expected = {
        id: 1,
      }

      const actual = await taskResolver.deleteTask(1)
      expect(actual).toEqual(expected)
      expect(taskService.deleteTask).toHaveBeenCalledWith(1)
    })
  })
})
