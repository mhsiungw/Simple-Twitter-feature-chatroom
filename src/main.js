import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCog, faUser, faHome, faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons'
import { faComment, faHeart } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import store from './store'
import io from "socket.io-client";

library.add(faCog, faUser, faHome, faComment, faHeart, fasHeart)

Vue.component('font-awesome-icon', FontAwesomeIcon)

//socket.io-----
// const socket = require('socket.io-client')('http://localhost:3000');
const socket = io('http://localhost:3000')
Vue.prototype.$socket = socket
// 發送一個 "sendMessage" 事件
socket.emit("sendMessage", {
  name: "msg====>",
  message: "client connect to backend"
})
// 監聽來自 server 的 "allMessage" 事件
socket.on("allMessage", function (message) {
  console.log(message)
})
//---------------------

Vue.config.productionTip = false

// event bus
Vue.prototype.$bus = new Vue();

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')