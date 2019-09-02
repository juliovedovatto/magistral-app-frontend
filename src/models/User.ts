export default class User {
  Id: number
  Nome: string
  Login: string
  Email: string
  Status: number
  Nivel: number

  constructor () {
    this.Id = 0
    this.Nome = ''
    this.Login = ''
    this.Email = ''
    this.Status = 0
    this.Nivel = 0
  }
}
