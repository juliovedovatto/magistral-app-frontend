import Repository from './Repository'

const resource = '/auth'

export default {
  async login (login: string, senha: string) {
    const { data } = await Repository.post(`${resource}/login`, { login, senha })

    return data
  }
}
