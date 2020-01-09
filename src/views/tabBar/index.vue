<template>
  <div>
  <router-view/>
  <van-tabbar>
  <van-tabbar-item to="/" icon="wap-home-o">首页</van-tabbar-item>
  <van-tabbar-item to="/qa" icon="comment-o">问答</van-tabbar-item>
  <van-tabbar-item to="/video" icon="video-o">视频</van-tabbar-item>
  <van-tabbar-item to="/my" icon="user-o">{{$store.state.user ? '我的' : '未登录'}}</van-tabbar-item>
</van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'tab-bar'

}
</script>

<style>

</style>
