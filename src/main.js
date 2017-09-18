// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// import store from './store'
import 'common/stylus/index.styl'
import {Alert, Confirm, Toast} from 'vue-better-messagebox'
Vue.use(Alert)
Vue.use(Confirm)
Vue.use(Toast)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  // store,
  render: h => h(App)
})
