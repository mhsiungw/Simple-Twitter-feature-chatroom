import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
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
    path: '/users/:id/followings',
    name: 'FollowingPage',
    component: () => import('../views/FollowingPage.vue'),
  },
  {
    path: '/users/:id/followers',
    name: 'FollowerPage',
    component: () => import('../views/FollowingPage.vue'),
  },
  {
    path: '/users/:id',
    name: 'UserPage',
    component: () => import('../views/UserPage.vue')
  },
  {
    path: '/setting',
    name: 'SettingPage',
    component: () => import('../views/SettingPage.vue')
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
    path: '/admin/users',
    name: 'AdminUserPage',
    component: () => import('../views/admin/AdminUserPage.vue')
  },
  {
    path: '/admin/tweets',
    name: 'AdminTweetPage',
    component: () => import('../views/admin/AdminTweetPage.vue')
  },
  {
    path: '*',
    name: 'NotFound',
    component: () => import('../views/NotFound.vue')
  }
]

const router = new VueRouter({
  linkExactActiveClass: 'active',
  routes
})

router.beforeEach((to, from, next) => {
  // 如果路由是 admin/... 就執行 fetchCurrentAdmin，否則就執行 fetchCurrentUser
  if (to.path === '/admin/users' || to.path === "/admin/tweets") {
    store.dispatch('fetchCurrentAdmin')
  } else {
    store.dispatch('fetchCurrentUser')
  }
  next()
})

export default router
