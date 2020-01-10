<template>
  <div>
    <van-nav-bar title="主页" />
    <van-tabs v-model="active">
      <van-tab
      :title="item.name"
      v-for="item of channels"
      :key="item.id"
      >
      <channelsList :channel="item"></channelsList>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>

import { getChannels } from '@/api/art-list'
import channelsList from '@/components/channels-list'
export default {
  components: { channelsList },
  name: 'homePage',
  data () {
    return {
      active: 0,
      channels: []
    }
  },
  methods: {
    async getChannel () {
      const { data } = await getChannels()
      // const res = await getChannels()
      // console.log(data)
      this.channels = data.data.channels
    }
  },
  created () {
    this.getChannel()
  }
}
</script>

<style>
</style>
