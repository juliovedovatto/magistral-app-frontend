import { EnumObject } from '@/types/GenericObject'

export enum TipoCadastro {
  PRE_CADASTRO = 0,
  TIPO_CADASTRADO = 1,
  TIPO_CANCELADO = 2
}

export enum AvaliacaoStatus {
  STATUS_NAO_AVALIADO = 0,
  STATUS_APROVADO = 1,
  STATUS_REPROVADO = 2
}

export const TipoCadastroLabels: EnumObject = {
  [ TipoCadastro.PRE_CADASTRO ]: 'Pré-Cadastro',
  [ TipoCadastro.TIPO_CADASTRADO ]: 'Aluno',
  [ TipoCadastro.TIPO_CANCELADO ]: 'Cancelado'
}

export const AvaliacaoStatusLabels: EnumObject = {
  [ AvaliacaoStatus.STATUS_NAO_AVALIADO ]: 'Não avaliado',
  [ AvaliacaoStatus.STATUS_APROVADO ]: 'Aprovado',
  [ AvaliacaoStatus.STATUS_REPROVADO ]: 'Reprovado'
}
