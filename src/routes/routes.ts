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
    component: () => import(/* webpackChunkName: "login" */ '@/views/Login.vue')
  }// ,
  // {
  //   path: '/details/:number',
  //   name: 'details',
  //   meta: {
  //     title: 'Cia. Magistral Admin',
  //   },
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "details" */ './views/Details.vue'),
  // }
]

export default Routes
