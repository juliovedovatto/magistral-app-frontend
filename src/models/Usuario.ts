export default class Usuario {
  public id: number
  public login: string
  public senha: string
  public email: string
  public nome: string
  public status: number
  public nivel: number
  // tslint:disable-next-line: variable-name
  public dt_cadastro: string
  // tslint:disable-next-line: variable-name
  public dt_alteracao: string
  // tslint:disable-next-line: variable-name
  public usuario_alteracao: Usuario | null

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

  public getUsuarioAlteracao (): Usuario | null {
    return this.usuario_alteracao
  }
}
