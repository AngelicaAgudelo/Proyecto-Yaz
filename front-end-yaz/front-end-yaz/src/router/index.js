import Vue from 'vue'
import VueRouter from 'vue-router'
import Calendar from '../components/Calendar'
import Shop from '../components/Shop'
import Register from '../components/Register'
import Login    from '../components/Login'

Vue.use(VueRouter)

const routes = [
  {
    path: '/shop',
    name: 'Shop',
    component: Shop
  },
  {
    path: '/calendar',
    name: 'calendar',
    component: Calendar
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/',
    name: 'login',
    component: Login
  },
]

const router = new VueRouter({
  routes
})

export default router
