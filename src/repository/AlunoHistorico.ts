import { AlunoHistorico as AlunoHistoricoRepositoryType, Usuario } from '@/types/Repository'

import Aluno from '@/models/Aluno'
import AlunoHistorico from '@/models/AlunoHistorico'
import Repository from './Repository'
import User from '@/models/User'

export default class AlunoHistoricoRepository {
  private resource = '/alunos/:id/historicos'

  constructor (aluno: Aluno) {
    this.resource = this.resource.replace(':id', `${aluno.id}`)
  }

  async getAll (): Promise<AlunoHistorico[]> {
    const { data } = await Repository.get(this.resource)

    const result = data.map((item: AlunoHistoricoRepositoryType) => this.createModel(item))

    return result
  }

  async create (AlunoHistorico: AlunoHistorico): Promise<AlunoHistorico> {
    const { data } = await Repository.post(this.resource, AlunoHistorico)

    const result = this.createModel(data)

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

  private createModel (item: AlunoHistoricoRepositoryType): AlunoHistorico {
    const model = new AlunoHistorico()

    const usuarioCadastro = item.usuario_cadastro as Usuario
    const user = new User()

    user.createIntanceFromRepository(usuarioCadastro)

    model.id = item.id
    model.aluno = item.aluno
    model.texto = item.texto
    model.dt_cadastro = item.dt_cadastro
    model.usuario_cadastro = user

    return model
  }
}
