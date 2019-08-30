import UserModel from '@/models/UserModel'

export default interface StoreState {
  status: string,
  user: UserModel | null,
  token: string
}
