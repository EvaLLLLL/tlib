import { sum } from '../lib'

describe('sum-UMD', () => {
  it('works', () => {
    const result = sum({ a: 1, b: 2 })
    expect(result).toBe(3)
  })
})
