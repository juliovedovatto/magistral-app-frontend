import { Nivel } from '@/enums/Usuario'
import { Usuario } from '@/types/Repository'

export default class User {
  Id: number
  Nome: string
  Login: string
  Email: string
  Status: number
  Nivel: number
  isAdmin?: boolean

  constructor () {
    this.Id = 0
    this.Nome = ''
    this.Login = ''
    this.Email = ''
    this.Status = 0
    this.Nivel = 0
  }

  createIntanceFromRepository (instance: Usuario) {
    this.Id = 0
    this.Nome = instance.nome
    this.Login = instance.login
    this.Email = instance.email
    this.Status = instance.status
    this.Nivel = instance.nivel
    this.isAdmin = this.Nivel === Nivel.ADMIN
  }
}
