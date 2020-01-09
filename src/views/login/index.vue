<template>
  <div class="login">
    <van-nav-bar title="登陆" />
    <ValidationObserver ref="loginForm">
      <van-row class="loginInfo">
        <ValidationProvider name="手机号" rules="required|mobile" v-slot="{ errors }">
        <van-field v-model="user.mobile" required clearable
        label="手机号" placeholder="请输入手机号" />
        <!-- <span>{{errors[0]}}</span> -->
        </ValidationProvider>
      </van-row>
      <van-row class="loginInfo">
        <ValidationProvider name="验证码" rules="required|code">
        <van-field v-model="user.code" label="验证码"
          placeholder="请输入验证码" required>
          <van-button slot="button" size="mini" type="round"
          v-if="!isCountDown" @click="getVerify"
          class="btn"  @finish="isCountDown"
          >发送验证码</van-button>
          <van-count-down
          v-else
          slot="button"
          millisecond
          :time="1000 * 60"
          format="ss s"
          />
        </van-field>
        </ValidationProvider>
      </van-row>
    </ValidationObserver>
    <van-row class="loginBtn">
      <van-button type="info" @click="toLogin">登陆</van-button>
    </van-row>
  </div>
</template>

<script>
import { login, getCode } from '@/api/user'
import { validate } from 'vee-validate'
// validate方法专门用来验证某个字段 需单独载入使用
export default {
  name: 'login',
  data () {
    return {
      user: {
        // 初始化数据 双向绑定
        mobile: '13911111111',
        code: '246810'
      },
      isCountDown: false
    }
  },
  methods: {
    async getVerify () { // 发送验证码
      let { mobile } = this.user// 获取手机号
      // 验证手机号是否正确有效
      // validate(参数1:要验证的数据,参数2:规则,参数3:可选配置对象，例如字段name)
      // 返回值  => 对象
      const res = await validate('mobile', 'required|mobile', {
        name: '手机号'
      })
      if (!res.valid) { // 验证失败 提示消息  valid 是固定语法内置的
        console.log(res)
        this.$toast(res.errors[0])
        return
      }
      try {
        await getCode(mobile)
        this.isCountDown = true
      } catch (err) {
        // console.log(err)
        this.isCountDown = false
      }
    },
    async toLogin () {
      const user = this.user
      // 验证
      let success = await this.$refs.loginForm.validate()// 手动触发验证
      if (!success) {
        // 通过vue调试工具可以看到ValidationObserver组件里的errors对象
        // 可以看到具体的错误消息 错误对象
        // 通过js拿到的是空的 好像是延迟一样
        // 该组件库有提示错误消息 而我们只用它的验证规则
        // 我们的需求是轻提示错误消息
        // 把结果放到定时器里稍微延迟 就可以拿到
        setTimeout(() => {
          // const { errors } = this.$refs.loginForm
          // console.log(errors)
          // Object 有一方法 Object.keys() Object.values()
          // 省去le遍历对象然后再去访问数组
          const errors = this.$refs.loginForm.errors
          // find方法找到第一个有错误消息的
          const item = Object.values(errors).find(item => {
            return item[0]// 有效则返回拥有错误信息的并停止遍历 否则返回是undefined
          })
          // 简写 const item = object.values.find(item => item[0])
          // console.log(item, item[0])
          this.$toast(item[0])
        }, 100)
        return
      }
      this.$toast.loading({// 通过使用$toast轻提示
        duration: 0, // 持续展示 toast
        message: '登陆中...',
        forbidClick: true // 是否禁止背景点击
      })
      try {
        const res = await login(user)
        // console.log(res)
        // res.data.data => {token:'xxx',refresh_token: 'xxx' }
        // 将token存储至vuex容器中 达到共享
        this.$store.commit('setUser', res.data.data)
        this.$router.push('/')
        this.$toast.success('成功登陆')
      } catch (error) {
        this.$toast.fail('登陆失败')
        // console.log('登陆失败', error)
      }
    }
  }
}
</script>

<style scoped lang="less">
.login {
  height: 100vh;
  .loginInfo {
    display: flex;
    .van-button{
      padding: 2px 4px;
    }
  }
  .btn {
    background-color: #ccc;
    border: none;
    margin-left: 30px;
  }
  .loginBtn {
    padding: 25px 15px;
    .van-button {
      width: 100%;
    }
  }
}
</style>
