<!-- 首页组件-->
<template>
  <div class="container">
    <!-- <van-nav-bar title="主页" fixed >
      <van-button
        class="search-btn"
        round
        type="info"
        size="small"
        icon="search"
        @click="$router.push('/search')"
      >搜索</van-button>
    </van-nav-bar> -->
    <div class="nav-bar">
      <div class="logo"></div>
      <van-button
        class="search-btn"
        round
        type="info"
        size="small"
        icon="search"
        @click="$router.push('/search')"
      >搜索</van-button>
    </div>
    <van-tabs v-model="active">
      <!-- 面包按钮
      tabs标签栏组件 支持插槽 故插入icon
      点击该按钮 弹层弹出-->
      <van-icon
    slot="nav-right"
    name="wap-nav"
    class="wap-nav"
    @click="isChannelEditShow = true"
  />
  <!-- 面包按钮 -->
      <van-tab :title="item.name" v-for="item of channels" :key="item.id">
        <channelsList :channel="item"></channelsList>
        <!-- 弹窗 -->
        <van-popup
          v-model="isChannelEditShow"
          position="bottom"
          closeable
          close-icon-position="top-left"
          :style="{ height: '100%' }"
        >
        <!-- 通过v-model让子组件双向绑定active
        在子组件上使用v-model 默认会传一个名叫value的数据 其实就是:value="active"
        还会默认监听一个名叫input的事件 @input=“active = 事件参数”
        当子组件内部发布：this.$emit('input')
        v-model 本质还是父子通信 当需要父子组件同步一些数据的时候 使用v-model挺好
        -->
        <!-- 参考文档 vue官网 搜索v-model 在组件上使用v-model -->
        <channelsEdit :channels="channels" v-model="active"
        @close="isChannelEditShow = false"
        ></channelsEdit>
        </van-popup>
        <!-- 弹窗 -->
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getChannels } from '@/api/art-list'
import { getItem } from '@/utils/storage'
import channelsList from '@/components/channels/list'
import channelsEdit from '@/components/channels/edit'
export default {
  components: { channelsList, channelsEdit },
  name: 'homePage',
  data () {
    return {
      active: 0,
      channels: [],
      isChannelEditShow: false
    }
  },
  methods: {
    async getChannel () {
      // let local = []
      const localChannels = getItem('my-channels')
      if (localChannels) {
        // local = localChannels
        this.channels = localChannels
      } else {
        const { data } = await getChannels()
        // const res = await getChannels()
        this.channels = data.data.channels
      }
      // this.channels = local
    }
  },
  created () {
    this.getChannel()
  }
}
</script>

<style lang="less" scoped>
.container {
  padding: 90px 0 50px 0;
   .nav-bar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px;
    height: 46px;
    background-color: #3196fa;
    z-index: 1;
    .logo {
      background: url("./logo.png") no-repeat;
      background-size: cover;
      width: 100px;
      height: 30px;
    }
    .search-btn {
      background-color: #5babfb;
      width: 50%;
    }
  }
  .wap-nav {
    position: fixed;
    right: 0;
    line-height: 44px;
    background: #fff;
  }
}
</style>
