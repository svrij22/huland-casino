/* eslint-disable */

import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import router from './routes.js'
import * as raining from "./assets/raining";

import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

Vue.use(VueMaterial)
Vue.use(VueRouter);

Vue.config.productionTip = false
Vue.prototype.$restip = 'http://localhost:8070'
Vue.prototype.$raining = raining

new Vue({
  render: h => h(App),
  router
}).$mount('#app')