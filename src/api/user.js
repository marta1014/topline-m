/**
 * 用户相关接口
 *
 * 当行参只有一个时可以省略小括号
 * 当函数体内只有一条语句时可以省略花括号
 * 并且后面就是return语句，可以省略return
 * 注意如果返回值是一个对象、要加括号
 */
import request from '../utils/request'

// export const login = (data) => { // 小括号可以省略
//   return request({
//     method: 'post',
//     url: '/app/v1_0/authorizations',
//     // headers: {//这里不需要手动添加该属性 因为   **axios**  会默认发送该数据
//     //     'Content-Type':'application/json'
//     // }, // 请求头
//     // params: {}, // 查询参数
//     data: data // 请求提参数 简写为data
//   })
// }
export const login = data => request({
  method: 'post',
  url: '/app/v1_0/authorizations',
  data
})
export const getCode = mobile => request({
  url: `/app/v1_0/sms/codes/${mobile}`
})
export const getUserInfo = () => request({
  url: '/app/v1_0/user'
})
