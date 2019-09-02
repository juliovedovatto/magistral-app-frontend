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
    usuario_alteracao: Usuario | null
  }
}

export = Repository
