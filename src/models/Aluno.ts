import { Aluno as AlunosRepository } from '@/types/Repository'
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

  static createFromRepository (data: number | AlunosRepository): number | Aluno {
    if (typeof data === 'number') {
      return data
    }
    const self = new Aluno()

    self.id = data.id
    self.tipo_cadastro = data.tipo_cadastro
    self.nome = data.nome
    self.cpf = data.cpf
    self.email = data.email
    self.telefone = data.telefone
    self.celular = data.celular
    self.whatsapp = data.whatsapp
    self.endereco = data.endereco
    self.complemento = data.complemento
    self.cidade = data.cidade
    self.uf = data.uf
    self.cep = data.cep
    self.dt_cadastro = data.dt_cadastro
    self.dt_alteracao = data.dt_alteracao
    self.usuario_cadastro = data.usuario_cadastro
    self.usuario_alteracao = data.usuario_alteracao

    return self
  }
}
