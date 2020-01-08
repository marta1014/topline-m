<template>
  <div class="login">
    <van-nav-bar title="登陆" />
    <van-cell-group>
      <van-row class="loginInfo">
        <!-- <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-phone1" />
        </svg> -->
        <!-- <span class="iconfont icon-phone1"></span> -->
        <van-field v-model="user.mobile" required clearable label="手机号" placeholder="请输入手机号" />
      </van-row>
      <van-row class="loginInfo">
        <!-- <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-lock" />
        </svg> -->
        <van-field v-model="user.code" label="验证码" placeholder="请输入验证码" required>
          <van-button slot="button" size="small" type="round" class="btn">发送验证码</van-button>
        </van-field>
      </van-row>
    </van-cell-group>
    <van-row class="loginBtn">
      <van-button type="info" @click="toLogin">登陆</van-button>
    </van-row>
  </div>
</template>

<script>
// import '@/iconfont/iconfont.js'// <--------------------
import { login } from '@/api/user'
export default {
  name: 'login',
  data () {
    return {
      user: {
        // 初始化数据 双向绑定
        mobile: '13911111111',
        code: '246810'
      }
    }
  },
  methods: {
    async toLogin () {
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        message: '登陆中...',
        forbidClick: true
      })
      const user = this.user
      // 验证
      try {
        const res = await login(user)
        // console.log(res)
        window.localStorage.setItem('user-token', res.data.data.token)
        this.$router.push('/home')
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
    .icon {
      margin: 12px 0 0 12px;
      font-size: 20px;
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
