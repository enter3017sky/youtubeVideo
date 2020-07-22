import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/scss/style.scss'
import './assets/iconfont/iconfont.css'

import axios from "axios";
Vue.prototype.$http = axios.create({
  // baseURL: process.env.VUE_APP_API_URL || '/web/api'
  baseURL: 'https://www.googleapis.com/youtube/v3'
})

import Paginate from 'vuejs-paginate'
Vue.component('paginate', Paginate)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
