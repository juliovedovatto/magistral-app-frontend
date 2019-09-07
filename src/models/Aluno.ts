export default class Aluno {

  public id: Number
  // tslint:disable-next-line: variable-name
  public tipo_cadastro: Number
  public nome: String
  public cpf: String
  public email: String
  public telefone: String
  public celular: String
  // tslint:disable-next-line: variable-name
  public celular_operadora: String
  public whatsapp: String
  public endereco: String
  public complemento: String
  public cidade: String
  public uf: String
  public cep: String
  // tslint:disable-next-line: variable-name
  public dt_cadastro: String
  // tslint:disable-next-line: variable-name
  public dt_alteracao: String
  // tslint:disable-next-line: variable-name
  public usuario_cadastro: Number | null
  // tslint:disable-next-line: variable-name
  public usuario_alteracao: Number | null

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
