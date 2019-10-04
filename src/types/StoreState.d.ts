import User from '@/models/User'

export default interface StoreState {
  status: string,
  user: User | null,
  token: string
}
