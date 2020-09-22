/* eslint-disable */

import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import router from './routes.js'

import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

Vue.use(VueMaterial)
Vue.use(VueRouter);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
