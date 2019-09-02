import Repository from './Repository'
import Usuario from '@/models/Usuario'
import { Usuario as UsuarioRepository } from '@/types/Repository'

const resource = '/usuarios'

export default class {
  static async getAll (): Promise<Usuario[]> {
    const { data } = await Repository.get(resource)

    const result = data.map((item: UsuarioRepository) => this.createModel(item))

    return result
  }

  static async find (id: number): Promise<Usuario> {
    const { data } = await Repository.get(`${resource}/${id}`)

    return this.createModel(data)
  }

  static async create (usuario: Usuario): Promise<boolean> {
    let result = true

    try {
      await Repository.post(resource, usuario)
    } catch (err) {
      result = false
    }

    return result
  }

  static async update (usuario: Usuario, id: number): Promise<boolean> {
    let result = true

    try {
      await Repository.put(`${resource}/${id}`, usuario)
    } catch (err) {
      result = false
    }

    return result
  }

  static async delete (id: number): Promise<boolean> {
    let result = true

    try {
      const response = await Repository.delete(`${resource}/${id}`)

    } catch (err) {
      result = false
    }

    return result
  }

  private static createModel (item: UsuarioRepository): Usuario {
    const usuario = new Usuario()

    usuario.id = item.id
    usuario.login = item.login
    usuario.senha = item.senha
    usuario.email = item.email
    usuario.nome = item.nome
    usuario.status = item.status
    usuario.nivel = item.nivel
    usuario.dt_cadastro = item.dt_alteracao
    usuario.dt_alteracao = item.dt_alteracao
    // TODO: criar objeto do
    usuario.usuario_alteracao = null

    return usuario
  }
}
