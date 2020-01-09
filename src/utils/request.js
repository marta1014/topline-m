import axios from 'axios'
import store from '@/store' // 引入
// import jsonBig from 'json-bigint'// 处理后端返回数据超出 JS 安全整数范围问题
// create an axios instance
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/'// 配置基础路径
})

// 拦截器 interceptor

// Add a request interceptor
request.interceptors.request.use(function (config) {
  // 统一设置token
  // Do something before request is sent
  // 此处后端要求把token放到请求头中 使用指定名字 Authorization
  // config.headers 获取到本次的请求头对象 这是axios的固定API
  const { user } = store.state
  if (user) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// Add a response interceptor
request.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error)
})

export default request
