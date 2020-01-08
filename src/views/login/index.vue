<template>
  <div class="login">
    <van-nav-bar title="登陆" />
    <van-cell-group>
      <van-row class="loginInfo">
        <van-field v-model="user.mobile" required clearable
        label="手机号" placeholder="请输入手机号" />
      </van-row>
      <van-row class="loginInfo">
        <van-field v-model="user.code" label="验证码"
          placeholder="请输入验证码" required>
          <van-button slot="button" size="mini" type="round"
          v-if="!isCountDown" @click="getVerify"
          class="btn">发送验证码</van-button>
          <van-count-down
          v-else
          slot="button"
          millisecond
          :time="1000 * 60"
          format="ss s"
          />
        </van-field>
      </van-row>
    </van-cell-group>
    <van-row class="loginBtn">
      <van-button type="info" @click="toLogin">登陆</van-button>
    </van-row>
  </div>
</template>

<script>
import { login, getCode } from '@/api/user'
export default {
  name: 'login',
  data () {
    return {
      user: {
        // 初始化数据 双向绑定
        mobile: '',
        code: ''
      },
      isCountDown: false
    }
  },
  methods: {
    async getVerify () { // 发送验证码
      let { mobile } = this.user
      try {
        await getCode(mobile)
        this.isCountDown = true
      } catch (err) {
        // console.log(err)
        this.isCountDown = false
      }
    },
    async toLogin () {
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        message: '登陆中...',
        forbidClick: true // 是否禁止背景点击
      })
      const user = this.user
      // 验证
      try {
        const res = await login(user)
        console.log(res)
        // window.localStorage.setItem('user-token', res.data.data.token)
        // this.$router.push('/home')
        this.$toast.success('成功登陆')
      } catch (error) {
        this.$toast.fail('登陆失败')
        console.log('登陆失败', error)
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
  }
  .loginBtn {
    padding: 25px 15px;
    .van-button {
      width: 100%;
    }
  }
}
</style>
