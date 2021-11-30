import Vue from 'vue'
import App from './App.vue'
import router from './router'
import moment from 'moment'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCog, faUser, faHome } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faCog, faUser, faHome)

Vue.filter('fromNow', function (datetime) {
  if (!datetime) {
    return '-'
  }
  return moment(datetime).fromNow()
})

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
