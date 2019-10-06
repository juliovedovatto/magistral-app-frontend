import User from "@/models/User"

declare namespace Repository {
  export interface Usuario {
    id: number
    login: string
    senha: string
    email: string
    nome: string
    status: number
    nivel: number
    // tslint:disable-next-line: variable-name
    dt_cadastro: string
    // tslint:disable-next-line: variable-name
    dt_alteracao: string
    // tslint:disable-next-line: variable-name
    usuario_alteracao: number | UsuarioInfo
  }

  export interface Aluno {
    id: number
    // tslint:disable-next-line: variable-name
    tipo_cadastro: number
    nome: string
    cpf: string
    email: string
    telefone: string
    celular: string
    // tslint:disable-next-line: variable-name
    celular_operadora: string
    whatsapp: string
    endereco: string
    complemento: string
    cidade: string
    uf: string
    cep: string
    // tslint:disable-next-line: variable-name
    dt_cadastro: string
    // tslint:disable-next-line: variable-name
    dt_alteracao: string
    // tslint:disable-next-line: variable-name
    usuario_cadastro: number | UsuarioInfo
    // tslint:disable-next-line: variable-name
    usuario_alteracao: number | UsuarioInfo
  }

  export interface AlunoHistorico {
    id: number
    aluno: number
    texto: string
    // tslint:disable-next-line: variable-name
    dt_cadastro: string
    // tslint:disable-next-line: variable-name
    usuario_cadastro: number | UsuarioInfo
  }

  export interface AlunoAvaliacao {
    id: number
    aluno: number
    status: number
    texto: string
    video: string
    // tslint:disable-next-line: variable-name
    data_cadastro: string
    // tslint:disable-next-line: variable-name
    data_alteracao: string
    // tslint:disable-next-line: variable-name
    usuario_cadastro: number | UsuarioInfo
    // tslint:disable-next-line: variable-name
    usuario_alteracao: number | UsuarioInfo
  }

  export interface Usuario {
    id: number
    login: string
    senha: string
    email: string
    nome: string
    status: number
    nivel: number
    dt_cadastro: string
    dt_alteracao: string
    usuario_alteracao: number | UsuarioInfo
  }

  export interface UsuarioInfo {
    id: number
    login: string
    nome: string
    nivel: number
  }
}

export = Repository
