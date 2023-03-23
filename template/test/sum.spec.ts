import { sum } from '../lib'

describe('sum-ES5', () => {
  it('works', () => {
    const result = sum({ a: 1, b: 2 })
    expect(result).toBe(3)
  })
})
