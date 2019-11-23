import Aluno from '@/models/Aluno'
import { Aluno as AlunoRepository } from '@/types/Repository'
import Repository from './Repository'
import UsuarioInfo from '@/models/UsuarioInfo'

const resource = '/alunos'

export default class AlunosRepository {
  static async getAll (): Promise<Aluno[]> {
    const { data } = await Repository.get(resource)

    const result = data.map((item: AlunoRepository) => this.createModel(item))

    return result
  }

  static async find (id: number): Promise<Aluno> {
    const { data } = await Repository.get(`${resource}/${id}`)

    return this.createModel(data)
  }

  static async findByCPF (cpf: string): Promise<Aluno | false> {
    const { data } = await Repository.get(`${resource}/find-by-cpf`, { params: { cpf } })

    return data && data.constructor === Object && this.createModel(data) || false
  }

  static async create (aluno: Aluno): Promise<Aluno | boolean> {
    let result: Aluno | boolean = false

    try {
      const response = await Repository.post(resource, aluno)
      result = response.data as Aluno
    } catch (err) {
      result = false
    }

    return result
  }

  static async update (aluno: Aluno, id: number): Promise<boolean> {
    let result = true

    try {
      await Repository.put(`${resource}/${id}`, aluno)
    } catch (err) {
      result = false
    }

    return result
  }

  static async restore (aluno: Aluno, id: number): Promise<boolean> {
    let result = true

    try {
      await Repository.put(`${resource}/restore/${id}`, aluno)
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

  static async batchUpdate (operation: string, value: string | number, alunos: number[]): Promise<boolean> {
    let result = true

    try {
      const response = await Repository.put(`${resource}/batch-update/${operation}`, { value, alunos })

    } catch (err) {
      result = false
    }

    return result
  }

  static async batchDelete (alunos: number[]): Promise<boolean> {
    let result = true

    try {
      const response = await Repository.delete(`${resource}/batch-delete`, { alunos })

    } catch (err) {
      result = false
    }

    return result
  }

  private static createModel (item: AlunoRepository): Aluno {
    const aluno = Aluno.createFromRepository(item) as Aluno

    aluno.usuario_cadastro = UsuarioInfo.createFromRepository(item.usuario_cadastro)
    aluno.usuario_alteracao = UsuarioInfo.createFromRepository(item.usuario_alteracao)

    return aluno
  }
}
