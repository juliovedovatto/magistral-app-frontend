import UserModel from '@/models/User'

export default interface StoreState {
  status: string,
  user: UserModel | null,
  token: string
}
