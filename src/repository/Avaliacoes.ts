import Aluno from '@/models/Aluno'
import AlunoAvaliacao from '@/models/AlunoAvaliacao'
import { AlunoAvaliacao as AlunoAvaliacaoRepositoryType } from '@/types/Repository'
import Repository from './Repository'
import UsuarioInfo from '@/models/UsuarioInfo'

const resource = '/avaliacoes'

export default class AvaliacoesRepository {


  static async find (id: number): Promise<AlunoAvaliacao> {
    const { data } = await Repository.get(`${resource}/${id}`)

    return this.createModel(data)
  }

  static async getAll (): Promise<AlunoAvaliacao[]> {
    const { data } = await Repository.get(resource)

    const result = data.map((item: AlunoAvaliacaoRepositoryType) => this.createModel(item))

    return result
  }

  static async create (AlunoAvaliacao: AlunoAvaliacao): Promise<AlunoAvaliacao> {
    const { data } = await Repository.post(resource, AlunoAvaliacao)

    const result = this.createModel(data)

    return result
  }

  static async createEntries (entries: AlunoAvaliacao[]): Promise<boolean> {
    const { data } = await Repository.post(`${resource}/entries`, entries)

    return true
  }

  static async update (AlunoAvaliacao: AlunoAvaliacao, id: number | null): Promise<boolean> {
    let result = true

    try {
      if (!id) {
        throw new Error('invalid id to update')
      }

      await Repository.put(`${resource}/${id}`, AlunoAvaliacao)
    } catch (err) {
      result = false
    }

    return result
  }

  static async delete (id: number): Promise<boolean> {
    let result = true

    try {
      const response = await Repository.delete(`${resource}/${id}`, { id })
    } catch (err) {
      result = false
    }

    return result
  }

  private static createModel (item: AlunoAvaliacaoRepositoryType): AlunoAvaliacao {
    const model = new AlunoAvaliacao()

    model.id = item.id
    model.aluno = Aluno.createFromRepository(item.aluno)
    model.status = item.status
    model.texto = item.texto
    model.video = item.video
    model.data_cadastro = item.data_cadastro
    model.data_alteracao = item.data_alteracao
    model.usuario_cadastro = UsuarioInfo.createFromRepository(item.usuario_cadastro)
    model.usuario_alteracao = UsuarioInfo.createFromRepository(item.usuario_alteracao)

    return model
  }
}
