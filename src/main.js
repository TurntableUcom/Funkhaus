import './firebase'
import Vue from 'vue'
import App from './App.vue'
import VueFire from 'vuefire'
import Vuelidate from 'vuelidate'
import axios from 'axios'

import router from './router'
import store from './store'

import '../index.html'
import './assets/css/reset.css'
import './assets/css/fonts.css'
import './assets/css/main.scss'

Vue.use(VueFire)
Vue.use(Vuelidate)

axios.defaults.baseURL = 'https://funkhaus-eb6db.firebaseio.com/';

let vm = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})