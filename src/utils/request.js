import axios from 'axios'
// import jsonBig from 'json-bigint'// 处理后端返回数据超出 JS 安全整数范围问题
// create an axios instance
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/'// 配置基础路径
})

// 拦截器 request interceptor

// Do something before request is sent

// Do something with request error

// respone interceptor

export default request
