import 'reflect-metadata'

import { SubTaskResolver } from './resolver'
import * as subTaskService from '../../domains/sub-task'
import { TaskStatus } from '../../types'

jest.mock('../../domains/sub-task', () => ({
  createSubTask: jest.fn().mockImplementation(() => Promise.resolve({ id: 1 })),
  deleteSubTaskBySubTaskId: jest.fn().mockImplementation(() => Promise.resolve({ id: 1 })),
  getSubTasksByTaskId: jest.fn().mockImplementation(() => Promise.resolve([{ id: 1 }])),
  orderSubTaskBySubTasks: jest.fn().mockImplementation(() =>
    Promise.resolve([
      { id: 1, priority: 0 },
      {
        id: 2,
        priority: 1,
      },
    ]),
  ),
  updateSubTaskByPartialSubTask: jest.fn().mockImplementation(() => Promise.resolve({ id: 1 })),
}))

describe('SubTaskResolver()', () => {
  let subTaskResolver: SubTaskResolver

  beforeEach(() => {
    jest.clearAllMocks()

    subTaskResolver = new SubTaskResolver()
  })

  describe('subTasks()', () => {
    it('should return sub tasks', async () => {
      const expected = [{ id: 1 }]
      const actual = await subTaskResolver.subTasks(1)

      expect(actual).toEqual(expected)
      expect(subTaskService.getSubTasksByTaskId).toHaveBeenCalledWith(1)
    })
  })

  describe('createSubTask()', () => {
    it('should return sub task when created', async () => {
      const expected = { id: 1 }

      const actual = await subTaskResolver.createSubTask({
        title: '__TITLE__',
        taskId: 1,
      })
      expect(actual).toEqual(expected)
      expect(subTaskService.createSubTask).toHaveBeenCalledWith({
        title: '__TITLE__',
        taskId: 1,
      })
    })
  })

  describe('orderSubTask()', () => {
    it('should return sub task when ordered', async () => {
      const expected = [
        {
          id: 1,
          priority: 0,
        },
        {
          id: 2,
          priority: 1,
        },
      ]

      const actual = await subTaskResolver.orderSubTask({
        subTaskIds: [1, 2],
      })

      expect(actual).toEqual(expected)
      expect(subTaskService.orderSubTaskBySubTasks).toHaveBeenCalledWith({
        subTaskIds: [1, 2],
      })
    })
  })

  describe('updateSubTask()', () => {
    it('should return sub task when updated', async () => {
      const expected = { id: 1 }

      const actual = await subTaskResolver.updateSubTask({
        id: 1,
        title: '__TITLE__',
        taskId: 1,
        status: TaskStatus.IN_PROGRESS,
      })
      expect(actual).toEqual(expected)
      expect(subTaskService.updateSubTaskByPartialSubTask).toHaveBeenCalledWith({
        title: '__TITLE__',
        taskId: 1,
        id: 1,
        status: TaskStatus.IN_PROGRESS,
      })
    })
  })

  describe('deleteSubTask()', () => {
    it('should return sub task when deleted', async () => {
      const expected = { id: 1 }

      const actual = await subTaskResolver.deleteSubTask(1)
      expect(actual).toEqual(expected)
      expect(subTaskService.deleteSubTaskBySubTaskId).toHaveBeenCalledWith(1)
    })
  })
})
