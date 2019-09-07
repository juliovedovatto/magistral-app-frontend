declare namespace Repository {
  export interface Usuario {
    id: Number
    login: String
    senha: String
    email: String
    nome: String
    status: Number
    nivel: Number
    // tslint:disable-next-line: variable-name
    dt_cadastro: String
    // tslint:disable-next-line: variable-name
    dt_alteracao: String
    // tslint:disable-next-line: variable-name
    usuario_alteracao: Number
  }

  export interface Aluno {
    id: Number
    // tslint:disable-next-line: variable-name
    tipo_cadastro: Number
    nome: String
    cpf: String
    email: String
    telefone: String
    celular: String
    // tslint:disable-next-line: variable-name
    celular_operadora: String
    whatsapp: String
    endereco: String
    complemento: String
    cidade: String
    uf: String
    cep: String
    // tslint:disable-next-line: variable-name
    dt_cadastro: String
    // tslint:disable-next-line: variable-name
    dt_alteracao: String
    // tslint:disable-next-line: variable-name
    usuario_cadastro: Number
    // tslint:disable-next-line: variable-name
    usuario_alteracao: Number
  }

  export interface AlunoHistorico {
    id: Number
    aluno: Number
    texto: String
    // tslint:disable-next-line: variable-name
    dt_cadastro: String
    // tslint:disable-next-line: variable-name
    usuario_cadastro: Number
  }
}

export = Repository
