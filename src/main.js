import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/utils/register-vant'
// import '@/iconfont/iconfont.js'// <--------------------
import 'amfe-flexible'
import '@/styles/bass.less'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
