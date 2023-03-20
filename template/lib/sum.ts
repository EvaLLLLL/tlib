import { IParams } from '@lib/types'
import { sum as lodashSum } from 'lodash'

export const sum = ({ a, b }: IParams) => lodashSum([a, b])
