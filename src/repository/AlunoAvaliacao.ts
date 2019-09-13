import Aluno from '@/models/Aluno'
import AlunoAvaliacao from '@/models/AlunoAvaliacao'
import { AlunoAvaliacao as AlunoAvaliacaoRepositoryType } from '@/types/Repository'
import Repository from './Repository'

export default class AlunoAvaliacaoRepository {
  private resource = '/alunos/:id/avaliacoes'

  constructor (aluno: Aluno) {
    this.resource = this.resource.replace(':id', `${aluno.id}`)
  }

  async find (id: number): Promise<AlunoAvaliacao> {
    const { data } = await Repository.get(`${this.resource}/${id}`)

    return this.createModel(data)
  }

  async getAll (): Promise<AlunoAvaliacao[]> {
    const { data } = await Repository.get(this.resource)

    const result = data.map((item: AlunoAvaliacaoRepositoryType) => this.createModel(item))

    return result
  }

  async create (AlunoAvaliacao: AlunoAvaliacao): Promise<AlunoAvaliacao> {
    const { data } = await Repository.post(this.resource, AlunoAvaliacao)

    const result = this.createModel(data)

    return result
  }

  async update (AlunoAvaliacao: AlunoAvaliacao, id: number | null): Promise<boolean> {
    let result = true

    try {
      if (!id) {
        throw new Error('invalid id to update')
      }

      await Repository.put(`${this.resource}/${id}`, AlunoAvaliacao)
    } catch (err) {
      result = false
    }

    return result
  }

  async delete (id: number): Promise<boolean> {
    let result = true

    try {
      const response = await Repository.delete(`${this.resource}/${id}`)
    } catch (err) {
      result = false
    }

    return result
  }

  private createModel (item: AlunoAvaliacaoRepositoryType): AlunoAvaliacao {
    const model = new AlunoAvaliacao()

    model.id = item.id
    model.aluno = item.aluno
    model.status = item.status
    model.texto = item.texto
    model.video = item.video
    model.data_cadastro = item.data_cadastro
    model.data_alteracao = item.data_alteracao
    model.usuario_cadastro = item.usuario_cadastro
    model.usuario_alteracao = item.usuario_alteracao

    return model
  }
}
