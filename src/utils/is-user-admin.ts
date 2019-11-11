import { Nivel } from '@/enums/Usuario'
import User from '@/models/User'

export default function isUserAdmin (user: Maybe<User>): boolean {
  return user && (user.Nivel === Nivel.ADMIN || user.isAdmin) || false
}
