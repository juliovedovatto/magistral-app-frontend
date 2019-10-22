import { EnumObject } from '@/types/GenericObject'

export enum Status {
  NAO_AVALIADO = 0,
  APROVADO = 1,
  REPROVADO = 2
}

export const StatusLabels: EnumObject = {
  [ Status.NAO_AVALIADO ]: 'Não Avaliado',
  [ Status.APROVADO ]: 'Aprovado',
  [ Status.REPROVADO ]: 'Reprovado'
}
