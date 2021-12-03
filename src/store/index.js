import Vue from 'vue'
import Vuex from 'vuex'
import usersAPI from '../apis/users.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: {
      id: -1,
      name: '',
      account: '',
      email: '',
      image: '',
      cover: '',
      isAdmin: false
    },
    isAuthenticated: false
  },
  mutations: {
    setCurrentUser(state, currentUser) {
      state.currentUser = {
        ...state.currentUser,
        ...currentUser
      }
      state.isAuthenticated = true
    }
  },
  actions: {
    async fetchCurrentUser({ commit }) {
      try {
        const { data } = await usersAPI.getCurrentUser()
        const { id, name, email, avatar: image, role, account, cover } = data
        commit('setCurrentUser', {
          id, name, email, image, account, cover, isAdmin: role === 'user' ? false : true
        })
      } catch (error) {
        console.log(error)
        console.error('cannot fetch user info')
      }
    }
  },
  modules: {
  }
})
