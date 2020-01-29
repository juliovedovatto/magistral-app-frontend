import AlunoAvaliacao from './AlunoAvaliacao'
import AlunoHistorico from './AlunoHistorico'
import Alunos from './Alunos'
import Auth from './Auth'
import Avaliacoes from './Avaliacoes'
import Repository from './Repository'
import Usuarios from './Usuarios'

export default {
  resolve (endpoint: string): string {
    return Repository.resolve(endpoint)
  },

  AlunoAvaliacao,
  AlunoHistorico,
  Alunos,
  Auth,
  Usuarios,
  Avaliacoes
}
