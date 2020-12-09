import Vue from 'vue'
import VueRouter from 'vue-router'
import Calendar from '../components/Calendar'
import Shop from '../components/Shop'
import Register from '../components/Register'
import Login from '../components/Login'
import Menu from '../components/Menu'
import Payment from '../components/Payment'
import EditUser from '../components/EditUser'
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
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    name: 'menu',
    component: Menu
  },
  {
    path: '/payment',
    name: 'payment',
    component: Payment
  },
  {
    path: '/editUser',
    name: 'editUser',
    component: EditUser
  }
]

const router = new VueRouter({
  routes
})
export default router
