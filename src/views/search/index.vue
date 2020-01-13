<template>
  <div class="search-container">
    <!-- 搜索栏 -->
    <form action="/" class="search-bar">
      <van-search
        v-model="searchContent"
        placeholder="请输入搜索关键词"
        show-action
        background="#3296fa"
        @search="onSearch"
        @cancel="onCancel"
        @focus="isShow=false"
        @input="onSearchinput"
      />
    </form>
      <!-- 搜索结果list -->
      <res-search v-if="isShow" :q="searchContent"></res-search>
      <!-- 联想搜索 -->
      <van-cell-group v-else-if="searchContent">
          <van-cell icon="search"
          @click="onSearch(item)"
          v-for="(item,index) of Proposal" :key="index">
          <div slot="title" v-html="highlight(item)"></div></van-cell>
      </van-cell-group>
      <!-- 历史搜索记录 -->
      <van-cell-group v-else>
      <van-cell title="搜索记录">
      <van-icon name="delete" />
      <span>全部删除</span>
      &nbsp;&nbsp;
      <span>完成</span>
    </van-cell>
          <van-cell :title="item" @click="onSearch(item)"
          v-for="(item,index) of history" :key="index">
            <van-icon name="close"></van-icon>
          </van-cell>
      </van-cell-group>
  </div>
</template>

<script>
import resSearch from '@/components/search/res-list.vue'
import { getProposal } from '@/api/search'
import { setItem, getItem } from '@/utils/storage'
export default {
  components: { resSearch },
  name: 'searchPage',
  data () {
    return {
      searchContent: '',
      isShow: false, // 搜索结果展示
      Proposal: [], // 搜索联想建议
      history: getItem('search-history') || []// 搜索历史
    }
  },
  methods: {
    onSearch (q) {
      // 优化 q 文本框数据本身 / 联想建议文本 / 历史记录文本
      this.searchContent = q
      // 记录搜索历史记录
      const index = this.history.indexOf(this.searchContent)
      // 判断是否存在记录  有的话删除 没有放置最前端
      if (index !== -1) {
        this.history.splice(index, 1)
      }
      this.history.unshift(this.searchContent)
      this.isShow = true// 搜索确认展示结果
    },
    onCancel () {
      this.$router.back('/home')// 回退首页
    },
    async  onSearchinput () { // 输入时请求获取搜索建议
      if (this.searchContent === '') { return }// 为空时不请求
      const { data } = await getProposal(this.searchContent)
      this.Proposal = data.data.options
    },
    highlight (str) { // 字符串高亮处理 全局处理需要使用正则
      return str.toLowerCase().replace(this.searchContent.toLowerCase(),
        `<span style="color:red">${this.searchContent}</span>`)
    }
    // enterItem (item) {
    //   this.searchContent = item // 点击联想项 搜索框文本更新
    //   this.isShow = true // 展示搜索结果
    // }
  },
  created () {},
  watch: {
    history () { // 监视history的变化 存至本地
      setItem('search-history', this.history)
    }
  }

}
</script>

<style lang="less" scoped>
.search-container{
  padding-top: 54px;
  .search-bar{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
}
}

</style>
