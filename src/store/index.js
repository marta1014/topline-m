import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storage'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: getItem('user')
    // user: window.localStorage.getItem('user')
  },
  mutations: {
    setUser (state, data) { // 此处没有this
      state.user = data
      // 本地存储只能存储字符串格式 所以需要转换对象
      // window.localStorage.setItem('user', JSON.stringify(state.user))
      setItem('user', state.user)
    }
  },
  actions: {
  },
  modules: {
  }
})
