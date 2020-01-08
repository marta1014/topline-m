import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/utils/validation'// 注册初始化表单验证
import '@/utils/register-vant'
import 'amfe-flexible'
import '@/styles/bass.less'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
