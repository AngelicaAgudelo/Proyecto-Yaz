import Vue from 'vue'
import VueRouter from 'vue-router'
import Calendar from '../components/Calendar'
import Shop from '../components/Shop'
import Register from '../components/Register'
import Login    from '../components/Login'
import Menu from '../components/Menu'
Vue.use(VueRouter)

const routes = [
  {
    path: '/shop',
    name: 'shop',
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
  {
    path: '/menu',
    name: 'menu',
    component: Menu
  },
]

const router = new VueRouter({
  routes
})
export default router
