import UsuarioInfo from './UsuarioInfo'

export default class AlunoAvaliacao {

  public id: number | null
  public aluno: number | null
  public status: number | null
  public texto: string
  public video: string
  // tslint:disable-next-line: variable-name
  public data_cadastro: string
  // tslint:disable-next-line: variable-name
  public data_alteracao: string
  // tslint:disable-next-line: variable-name
  public usuario_cadastro: number | UsuarioInfo | null
  // tslint:disable-next-line: variable-name
  public usuario_alteracao: number | UsuarioInfo | null

  constructor () {
    this.id = null
    this.aluno = null
    this.status = null
    this.texto = ''
    this.video = ''
    this.data_cadastro = ''
    this.data_alteracao = ''
    this.usuario_cadastro = null
    this.usuario_alteracao = null
  }
}
