import { UsuarioInfo as UsuarioInfoRepository } from '@/types/Repository'

export default class UsuarioInfo {
  public id: number
  public login: string
  public nome: string
  public nivel: number

  constructor () {
    this.id = 0
    this.login = ''
    this.nome = ''
    this.nivel = 0
  }

  static createFromRepository (data: number | UsuarioInfoRepository): number | UsuarioInfo {
    if (typeof data === 'number') {
      return data
    }
    const self = new UsuarioInfo()

    self.id = data.id
    self.login = data.login
    self.nome = data.nome
    self.nivel = data.nivel

    return self
  }
}
