<template>
  <div class="search-list">
  <van-list
  v-model="loading"
  finished-text="没有更多了"
  @load="onLoad"
  >
  <van-cell
    v-for="(item,index) in list"
    :key="index.art_id"
    :title="item.title"
  />
</van-list>
  </div>
</template>

<script>
import { getRes } from '@/api/search'
export default {
  name: 'search-list',
  props: {
    q: {// 接收父组件的搜索内容
      type: String,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      perpage: 20
    }
  },
  methods: {
    async onLoad () {
      const { data } = await getRes({// 请求获取数据
        page: this.page,
        per_page: this.perpage,
        q: this.q
      })
      const { results } = data.data
      this.list.push(...results)// 推入list以便展示
      console.log(this.list)
      this.loading = false// 关闭加载中提示
      if (results.lenght) { // 没数据 停止加载
        this.page++
      } else {
        this.finished = true
      }
    }
  }
}
</script>

<style>

</style>
