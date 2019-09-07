import Repository from './Repository'

const resource = '/auth'

export default class {
  static async login (login: string, senha: string) {
    const { data } = await Repository.post(`${resource}/login`, { login, senha })

    return data
  }

  static async isLogged () {
    await Repository.get(`${resource}/is-logged`)
  }
}
