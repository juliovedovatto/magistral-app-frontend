import UsuarioInfo from './UsuarioInfo'

export default class Aluno {

  public id: number
  // tslint:disable-next-line: variable-name
  public tipo_cadastro: number
  public nome: string
  public cpf: string
  public email: string
  public telefone: string
  public celular: string
  // tslint:disable-next-line: variable-name
  public celular_operadora: string
  public whatsapp: string
  public endereco: string
  public complemento: string
  public cidade: string
  public uf: string
  public cep: string
  // tslint:disable-next-line: variable-name
  public dt_cadastro: string
  // tslint:disable-next-line: variable-name
  public dt_alteracao: string
  // tslint:disable-next-line: variable-name
  public usuario_cadastro: number | UsuarioInfo | null
  // tslint:disable-next-line: variable-name
  public usuario_alteracao: number | UsuarioInfo | null

  constructor () {
    this.id = 0
    this.tipo_cadastro = 0
    this.nome = ''
    this.cpf = ''
    this.email = ''
    this.telefone = ''
    this.celular = ''
    this.celular_operadora = ''
    this.whatsapp = ''
    this.endereco = ''
    this.complemento = ''
    this.cidade = ''
    this.uf = ''
    this.cep = ''
    this.dt_cadastro = ''
    this.dt_alteracao = ''
    this.usuario_cadastro = null
    this.usuario_alteracao = null
  }
}
