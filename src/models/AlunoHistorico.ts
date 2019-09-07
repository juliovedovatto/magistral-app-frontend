export default class AlunoHistorico {

  public id: Number | null
  public aluno: Number | null
  public texto: String
  // tslint:disable-next-line: variable-name
  public dt_cadastro: String
  // tslint:disable-next-line: variable-name
  public usuario_cadastro: Number | null

  constructor () {
    this.id = null
    this.aluno = null
    this.texto = ''
    this.dt_cadastro = ''
    this.usuario_cadastro = null
  }
}
