export default class Usuario {
  public id: Number
  public login: String
  public senha: String
  public email: String
  public nome: String
  public status: Number
  public nivel: Number
  // tslint:disable-next-line: variable-name
  public dt_cadastro: String
  // tslint:disable-next-line: variable-name
  public dt_alteracao: String
  // tslint:disable-next-line: variable-name
  public usuario_alteracao: Number | null

  constructor () {
    this.id = 0
    this.login = ''
    this.senha = ''
    this.email = ''
    this.nome = ''
    this.status = 0
    this.nivel = 0
    this.dt_cadastro = ''
    this.dt_alteracao = ''
    this.usuario_alteracao = null
  }
}
