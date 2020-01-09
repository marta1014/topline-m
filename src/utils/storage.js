// 专门操作本地存储的工具模块

// export const getItem = function (name) {
export const getItem = name => { // 获取token
  const data = window.localStorage.getItem(name)
  try { // 尝试把data转换成对象 失败就进入catch 直接返回
    return JSON.parse(data)
  } catch (err) {
    return data
  }
}

export const setItem = (name, tk) => { // 设置存储token
  // 判断值 如果值是对象 就对其进行转换处理 否则原值返回
  const re = typeof tk === 'object' ? JSON.stringify(tk) : tk
  window.localStorage.setItem(name, re)
}

export const removeItem = name => window.localStorage.removeItem(name)
