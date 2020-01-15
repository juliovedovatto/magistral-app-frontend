const {
  VUE_APP_API_ENDPOINT
} = process.env

export const APP_API_ENDPOINT = Object.freeze(VUE_APP_API_ENDPOINT || '')

export const DUMMY_CPF = Object.freeze('000.000.000-00')

