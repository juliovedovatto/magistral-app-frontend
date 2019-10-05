interface PayloadUserData {
  id: number,
  email: string,
  login: string,
  nivel: number,
  nome: string,
  status: number
}

export default interface JWTPayload {
  data: PayloadUserData,
  exp: number,
  iat: number,
  sub: number,
  nbf?: number
}
