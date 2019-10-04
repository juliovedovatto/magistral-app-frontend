import User from './User'

export default class AlunoHistorico {

  public id: number | null
  public aluno: number | null
  public texto: string
  // tslint:disable-next-line: variable-name
  public dt_cadastro: string
  // tslint:disable-next-line: variable-name
  public usuario_cadastro: User | number | null

  constructor () {
    this.id = null
    this.aluno = null
    this.texto = ''
    this.dt_cadastro = ''
    this.usuario_cadastro = null
  }
}
