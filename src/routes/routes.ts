import HomeView from '@/views/Home.vue'
import { RouteConfig } from 'vue-router'

const Routes: RouteConfig[] = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      title: 'Home',
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login'
    },
    component: () => import(/* webpackChunkName: "login" */ '@/views/auth/Login.vue')
  },
  {
    path: '/logout',
    name: 'logout',
    meta: {
      title: 'Logout'
    },
    component: () => import(/* webpackChunkName: "logout" */ '@/views/auth/Logout.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    meta: {
      title: 'Meus Dados',
      requiresAuth: true
    },
    component: () => import(/* webpackChunkName: "profile" */ '@/views/auth/Profile.vue')
  },
  {
    path: '/usuarios',
    name: 'usuarios',
    meta: {
      title: 'Usuários',
      requiresAuth: true
    },
    component: () => import(/* webpackChunkName: "usuarios" */ '@/views/usuarios/List.vue')
  },
  {
    path: '/usuarios/add',
    name: 'usuarios.add',
    meta: {
      title: 'Novo Usuário',
      requiresAuth: true
    },
    component: () => import(/* webpackChunkName: "usuarios.add" */ '@/views/usuarios/Add.vue')
  },
  {
    path: '/usuarios/edit/:id',
    name: 'usuarios.edit',
    meta: {
      title: 'Editar Usuário',
      requiresAuth: true
    },
    component: () => import(/* webpackChunkName: "usuarios.edit" */ '@/views/usuarios/Update.vue')
  },
  {
    path: '/alunos',
    name: 'alunos',
    meta: {
      title: 'Alunos',
      requiresAuth: true
    },
    component: () => import(/* webpackChunkName: "alunos" */ '@/views/alunos/List.vue')
  },
  // {
  //   path: '/alunos/view/:id',
  //   name: 'alunos.view',
  //   meta: {
  //     title: 'Detalhes do Usuário',
  //     requiresAuth: true
  //   },
  //   component: () => import(/* webpackChunkName: "alunos.view" */ '@/views/alunos/View.vue')
  // },
  {
    path: '/alunos/add',
    name: 'alunos.add',
    meta: {
      title: 'Novo Aluno',
      requiresAuth: true
    },
    component: () => import(/* webpackChunkName: "alunos.add" */ '@/views/alunos/Add.vue')
  },
  {
    path: '/alunos/edit/:id',
    name: 'alunos.edit',
    meta: {
      title: 'Detalhes do Aluno',
      requiresAuth: true
    },
    component: () => import(/* webpackChunkName: "alunos.edit" */ '@/views/alunos/Update.vue')
  },
  {
    path: '/alunos/import/',
    name: 'alunos.import',
    meta: {
      title: 'Importar Alunos',
      requiresAuth: true
    },
    component: () => import(/* webpackChunkName: "alunos.edit" */ '@/views/alunos/Import.vue')
  },
  {
    path: '/avaliacoes/',
    name: 'avaliacoes',
    meta: {
      title: 'Avaliações',
      requiresAuth: true
    },
    component: () => import(/* webpackChunkName: "avaliacoes" */ '@/views/avaliacoes/List.vue')
  },
  {
    path: '/avaliacoes/add',
    name: 'avaliacoes.add',
    meta: {
      title: 'Adicionar Avaliação',
      requiresAuth: true
    },
    component: () => import(/* webpackChunkName: "avaliacoes" */ '@/views/avaliacoes/Add.vue')
  },
  {
    path: '/avaliacoes/add-entry',
    name: 'avaliacoes.add:entry',
    meta: {
      title: 'Adicionar Entrada de Amostra',
      requiresAuth: true
    },
    component: () => import(/* webpackChunkName: "avaliacoes" */ '@/views/avaliacoes/AddEntry.vue')
  },
  {
    path: '/avaliacoes/edit/:id',
    name: 'avaliacoes.edit',
    meta: {
      title: 'Editar Avaliação',
      requiresAuth: true
    },
    component: () => import(/* webpackChunkName: "avaliacoes" */ '@/views/avaliacoes/Update.vue')
  }
  // ,
  // {
  //   path: '/path/:param',
  //   name: 'path',
  //   meta: {
  //     title: 'Path',,
  //     requiresAuth: true
  //   },
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "details" */ '@/views/View.vue')
  // }
]

export default Routes
