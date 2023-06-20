
import { createRouter, createWebHistory } from 'vue-router'
import Login from './views/Login.vue'
import Register from './views/Register.vue'
const isAuthenticated = () => {
  return localStorage.getItem('isLoggedIn')
}
const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('./views/Home.vue'),
  },
  {
    path: '/login',
    component: Login,
    beforeEnter: (to, from, next) => {

      if (!isAuthenticated()) {
        next()
      } else {
        next('/dashboard')
      }
    }
  },

  {
    path: '/register',
    component: Register
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('./components/Dashboard.vue'),
    children: [
      {
        path: '',
        name: 'Index',
        component: () => import('./components/product/index.vue'),
      },
      {
        path: '/view-detail/:id',
        name: "View-detail",
        component: () => import('./components/product/ProductDetail.vue'),
      },
      {
        path: '/myaccount',
        name: "Myaccount",
        component: () => import('./components/MyAccount.vue'),
      },
      {
        path: '/users',
        name: "Users",
        component: () => import('./components/Users.vue'),
      },
    ],
    beforeEnter: (to, from, next) => {

      if (isAuthenticated()) {
        next()
      } else {
        next('/login')
      }
    }
  },

]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
