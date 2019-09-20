interface EnumObject {
  [key: string]: string | number
}

export enum TipoCadastro {
  PRE_CADASTRO = 0,
  TIPO_CADASTRADO = 1,
  TIPO_CANCELADO = 2
}

export const TipoCadastroLabels: EnumObject = {
  [ TipoCadastro.PRE_CADASTRO ]: 'Pré-Cadastro',
  [ TipoCadastro.TIPO_CADASTRADO ]: 'Aluno',
  [ TipoCadastro.TIPO_CANCELADO ]: 'Cancelado'
}

export enum CelularOperadora {
  TIM = 'TIM',
  VIVO = 'VIVO',
  CLARO = 'CLARO',
  OI= 'OI',
  NEXTEL = 'NEXTEL',
  CORREIOS = 'CORREIOS',
  OUTROS = 'OUTROS',
  DESCONHECIDO = 'DESCONHECIDO'
}
