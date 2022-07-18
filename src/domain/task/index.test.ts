import { prismaMock } from '../../mock/database'
import { getTasks } from './index'

describe('domain/task', () => {
  const offset = 0
  const limit = 10

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('getTasks()', () => {
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

      const actual = await getTasks(offset, limit)

      expect(actual).toEqual(expected)
      expect(prismaMock.task.count).toHaveBeenCalled()
      expect(prismaMock.task.findMany).toHaveBeenCalled()
    })
  })
})
