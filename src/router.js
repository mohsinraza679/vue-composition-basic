
import { createRouter, createWebHistory } from 'vue-router'
import Login from './views/Login.vue'
import Dashboard from './components/Dashboard.vue'
import Register from './views/Register.vue'

const isAuthenticated = () => {
  return localStorage.getItem('isLoggedIn')
}
const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },

  {
    path: '/register',
    component: Register
  },
  {
    path: '/dashboard',
    component: Dashboard,
    beforeEnter: (to, from, next) => {
      console.log(isAuthenticated);
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
