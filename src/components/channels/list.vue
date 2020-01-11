<template>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <van-list v-model="loading"
        :finished="finished"
        finished-text="没有更多了" @load="onLoad">
        <van-cell v-for="(item,index) in list"
        :key="index" :title="item.title" />
        </van-list>
        <!--LIST组件解释
          v-model 控制上拉加载更多
          ：finished控制是否加载结束 若数据没有了 则不会继续加载更多
          @load=onLoad 快要触底的时候 自动触发加载数据

          List 组件通过loading和finished两个变量控制加载状态
          当组件滚动到底部时，会触发load事件并将loading设置成true
          此时可以发起异步操作并更新数据
          数据更新完毕后，将loading设置成false即可
          若数据已全部加载完毕，则直接将finished设置成true即可。

          运行机制：
          List 会监听浏览器的滚动事件并计算列表的位置
          当列表底部与可视区域的距离小于offset时，List 会触发一次 load 事件
          如果一次请求加载的数据条数较少 导致列表内容无法铺满当前屏幕
          List 会继续触发 load 事件，直到内容铺满屏幕或数据全部加载完成
          因此你需要调整每次获取的数据条数，理想情况下每次请求获取的数据条数应能够填满一屏高度。
          -->
        </van-pull-refresh>
</template>

<script>
import { artList } from '@/api/art-list'
export default {
  name: 'channelslist',
  props: {// 通过props接收到父组件的数据
    channel: {// 严谨规定接收
      type: Object,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      isLoading: false,
      finished: false,
      timestamp: ''// 记录时间戳 作为获取下一次数据的条件之一
    }
  },
  methods: {
    async onLoad () { // 上划加载请求数据
      const { data } = await artList({
        // 携带参数发起请求
        channel_id: this.channel.id,
        timestamp: this.timestamp || Date.now(), // 时间戳
        // 请求新的数据需传当前时间戳 请求历史数据传指定的时间戳
        with_top: 0// 置顶与否
      })
      const res = data.data.results
      // console.log(res, data)
      // 把请求的数据“加”到list中
      // 利用数组的展开操作符（把数组的元素一个个拿出来）给到push方法
      this.list.push(...res)
      // this.list.concat(res)    <====== ?
      // 加载状态结束
      this.loading = false
      // 数据全部加载完成
      if (res.length) {
        // 有数据的情况下 记录时间戳 得以获取历史数据
        this.timestamp = data.data.pre_timestamp
      } else { // 没数据停止加载
        this.finished = true
      }
    },
    async onRefresh () { // 下拉刷新
      const { data } = await artList({
        channel_id: this.channel.id,
        timestamp: Date.now(),
        with_top: 0
      })
      const res = data.data.results
      this.list.unshift(...res)// 放到最前面列表顶部
      this.isLoading = false
      this.$toast(`更新了${res.length}条信息`)
    }
  }
}
</script>

<style lang="less" scoped>
</style>
