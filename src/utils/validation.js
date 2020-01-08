//  基于vue 专门提供用来表单验证（整个表单）

// a.  npm i vee-validate
// b.  初始化配置规则

// 基本使用
// 1、使用 ValidationObserver 把需要校验的整个表单包起来

// 2、使用 ValidationProvider 把需要校验的具体表单元素包起来，例如 input

// 3、通过 ValidationProvider 配置具体的校验规则

// name 配置验证字段的名称

// rules 验证规则

// rules="requried" 单个验证规则
// rules="required|length:4" 多个验证规则使用 | 管道符分隔
// v-slot="{ errors }" 获取错误消息，使用 errors[0] 绑定展示错误消息
// v-slot="{ errors }" 是组件作用域内部提供插槽 位置随意放 展示错误信息
import Vue from 'vue'

// 加载需要使用的验证组件
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate'

// 加载内置的所有验证规则
import * as rules from 'vee-validate/dist/rules'

// 加载中文语言包
// 官方文档：https://logaretm.github.io/vee-validate/guide/rules.html#importing-the-rules
import { messages } from 'vee-validate/dist/locale/zh_CN.json'

// 注册全局组件
Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)

// 配置验证规则和中文提示消息
Object.keys(rules).forEach(rule => {
  extend(rule, {
    ...rules[rule],
    message: messages[rule]
  })
})
// extend专门用来添加自定义验证规则
// extend('验证规则名字', 被验证数据的字段 => {基本用法
// return rules
// })
extend('mobile', {// 手机自定义验证规则
  validate: value => {
    return /^1(3|5|6|7|8|9)\d{9}$/.test(value)
  },
  //   message: '手机号码格式错误'
  // 组件提供的语法{_field_}代表被验证字段的name
  message: '{_field_}格式错误'
})
extend('code', {// 验证码自定义验证规则
  validate: value => {
    return /^\d{6}$/.test(value)
  },
  message: '{_field_}格式错误'
})
