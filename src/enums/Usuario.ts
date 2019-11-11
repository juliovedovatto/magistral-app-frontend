export enum Status {
  ATIVO = 1,
  INATIVO = 0
}

export enum Nivel {
  ADMIN = 1,
  USUARIO = 0
}

export const StatusLabels: EnumObject = {
  [Status.ATIVO]: 'Ativo',
  [Status.INATIVO]: 'Inativo'
}

export const NivelLabels: EnumObject = {
  [Nivel.ADMIN]:  'Admin',
  [Nivel.USUARIO]: 'Usuário'
}
