import Vue from 'vue'
import VueRouter from 'vue-router'
import MainPage from '../views/MainPage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'MainPage',
    component: MainPage
  },
  {
    path: '/reply_list/:id',
    name: 'Tweet',
    component: () => import('../views/Tweet.vue')
  },
  {
    path: '/userpage/:id',
    name: 'UserPage',
    component: () => import('../views/UserPage.vue')
  },
  {
    path: '/user/followings',
    name: 'FollowingPage',
    component: () => import('../views/FollowingPage.vue'),
  },
  {
    path: '/user/followers',
    name: 'FollowingPage',
    component: () => import('../views/FollowingPage.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/admin/login',
    name: 'AdminLogin',
    component: () => import('../views/Login.vue')
  },
  {
    path: '*',
    name: 'NotFound',
    component: () => import('../views/NotFound.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
