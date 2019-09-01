import Repository from './Repository'

const resource = '/usuarios'

export default {
  async getAll () {
    const { data } = await Repository.get(resource)

    return data
  },
  async find (id: number) {
    const response = await Repository.get(`${resource}/${id}`)

    return response
  },
  async create () {

  },
  async update () {

  },
  async delete (id: number) {
    const response = await Repository.delete(`${resource}/${id}`)

    return response
  }
}
