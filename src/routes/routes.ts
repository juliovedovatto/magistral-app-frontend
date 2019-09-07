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
    component: () => import(/* webpackChunkName: "login" */ '@/views/auth/Logout.vue')
  },
  {
    path: '/usuarios',
    name: 'usuarios',
    meta: {
      title: 'Usuários'
    },
    component: () => import(/* webpackChunkName: "login" */ '@/views/usuarios/List.vue')
  },
  {
    path: '/usuarios/add',
    name: 'usuarios.add',
    meta: {
      title: 'Novo Usuário'
    },
    component: () => import(/* webpackChunkName: "login" */ '@/views/usuarios/Add.vue')
  },
  {
    path: '/usuarios/edit/:id',
    name: 'usuarios.edit',
    meta: {
      title: 'Editar Usuário'
    },
    component: () => import(/* webpackChunkName: "login" */ '@/views/usuarios/Update.vue')
  },
  {
    path: '/alunos',
    name: 'alunos',
    meta: {
      title: 'Usuários'
    },
    component: () => import(/* webpackChunkName: "login" */ '@/views/alunos/List.vue')
  },
  // {
  //   path: '/alunos/view/:id',
  //   name: 'alunos.view',
  //   meta: {
  //     title: 'Detalhes do Usuário'
  //   },
  //   component: () => import(/* webpackChunkName: "login" */ '@/views/alunos/View.vue')
  // },
  {
    path: '/alunos/add',
    name: 'alunos.add',
    meta: {
      title: 'Novo Usuário'
    },
    component: () => import(/* webpackChunkName: "login" */ '@/views/alunos/Add.vue')
  },
  {
    path: '/alunos/edit/:id',
    name: 'alunos.edit',
    meta: {
      title: 'Editar Usuário'
    },
    component: () => import(/* webpackChunkName: "login" */ '@/views/alunos/Update.vue')
  }// ,
  // {
  //   path: '/path/:param',
  //   name: 'path',
  //   meta: {
  //     title: 'Path',
  //   },
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "details" */ './views/View.vue'),
  // }
]

export default Routes
