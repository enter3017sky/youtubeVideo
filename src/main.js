import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/scss/style.scss'
import axios from "axios";

Vue.prototype.$http = axios.create({
  // baseURL: process.env.VUE_APP_API_URL || '/web/api'
  baseURL: 'https://www.googleapis.com/youtube/v3'
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
