const {
  VUE_APP_API_ENDPOINT
} = process.env

export const APP_API_ENDPOINT = Object.freeze(VUE_APP_API_ENDPOINT || '')

export const DUMMY_CPF = Object.freeze('000.000.000-00')

export const UPLOAD_ALLOWED_MIME_TYPES = Object.freeze([
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/msword',
  'application/excel',
  'application/pdf',
  'image/jpeg',
  'image/png',
  'text/csv',
  'application/vnd.ms-excel',
  'text/rtf',
  'text/plain'
].join(','))

