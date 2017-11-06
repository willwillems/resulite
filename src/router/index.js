import Vue from 'vue'
import Router from 'vue-router'
import MainPage from '@/components/MainPage'
import LoginPage from '@/components/LoginPage'
import RegisterPage from '@/components/RegisterPage'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'MainPage',
      component: MainPage
    },
    {
      path: '/login',
      name: 'LoginPage',
      component: LoginPage
    },
    {
      path: '/register',
      name: 'RegisterPage',
      component: RegisterPage
    }
  ]
})
