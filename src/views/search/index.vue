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
      />
    </form>
      <!-- 搜索结果list -->
      <res-search v-if="isShow"></res-search>
      <!-- 联想搜索 -->
      <van-cell-group v-else-if="searchContent  ">
          <!-- <van-cell icon="search" title="单元格"></van-cell> -->
          <van-cell icon="search" title="单元格" />
      </van-cell-group>
      <!-- 历史搜索记录 -->
      <van-cell-group v-else>
      <van-cell title="历史记录">
      <van-icon name="delete" />
      <span>全部删除</span>
      &nbsp;&nbsp;
      <span>完成</span>
    </van-cell>
          <van-cell>
            <van-icon name="close"></van-icon>
          </van-cell>
      </van-cell-group>
  </div>
</template>

<script>
import resSearch from '@/components/search/res-list.vue'
export default {
  components: { resSearch },
  name: 'searchPage',
  data () {
    return {
      searchContent: '',
      isShow: false // 搜索结果展示
    }
  },
  methods: {
    onSearch () {
      console.log('正在搜索')
      this.isShow = true
    },
    onCancel () {
      this.$router.back('/home')
    }
  },
  created () {},
  watch: {}

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
