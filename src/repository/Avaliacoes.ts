import Aluno from '@/models/Aluno'
import AlunoAvaliacao from '@/models/AlunoAvaliacao'
import { AlunoAvaliacao as AlunoAvaliacaoRepositoryType } from '@/types/Repository'
import Repository from './Repository'
import UsuarioInfo from '@/models/UsuarioInfo'

export default class AvaliacoesRepository {
  private resource = '/avaliacoes'

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

  async delete (id: number, aluno: number): Promise<boolean> {
    let result = true

    try {
      const response = await Repository.delete(`${this.resource}/${id}`, { id, aluno })
    } catch (err) {
      result = false
    }

    return result
  }

  private createModel (item: AlunoAvaliacaoRepositoryType): AlunoAvaliacao {
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
