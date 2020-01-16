import { v4 as uuid } from 'uuid'

export const randomId = (): string => {
  return uuid()
}

export default randomId
