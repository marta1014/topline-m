<!-- 频道编辑弹层组件 -->
<template>
  <div class="channels-edit">
    <!----------------------- 我的频道 ------------------------------------->
    <van-cell title="我的频道" :border="false">
      <van-button size="mini" round type="danger" plain
      @click="openORno = !openORno">{{openORno ? '完成' : '编辑'}}
      </van-button>
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item v-for="(item,index) in channels"
      :key="item.id" @click="chooseAndCut(index)">
      <!-- 删除数组的某个元素需要根据索引 -->
        <span slot="text" class="channel-name"
        :class="{activeItem : value === index}">{{item.name}}</span>
        <van-icon name="close" slot="icon"
        v-show="openORno && index !== 0">
        </van-icon>
      </van-grid-item>
    </van-grid>
    <!-- ----------------------推荐频道---------------------------------- -->
    <van-cell title="推荐频道" :border="false">
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item v-for="(item) in remainChannels"
      :key="item.id" :text="item.name" @click="add(item,openORno)"/>
    </van-grid>
  </div>
</template>

<script>
import { getAllChannels } from '@/api/channels'
import { setItem } from '@/utils/storage'
export default {
  data () {
    return {
      allChannels: [],
      openORno: false
    }
  },
  props: {
    channels: {// 接收父组件tab数据并展示
      type: Array,
      required: true
    },
    value: {// 因为是v-model绑定 ==>  必须  <== 是名叫value
      type: Number,
      required: true
    }
  },
  methods: {
    async  getAllchannel () { // 获取所有频道
      const { data } = await getAllChannels()
      this.allChannels = data.data.channels
    },
    add (item, openORno) { // 增加
      if (openORno) {
        this.channels.push(item)
      }
      // else {//此处是还未实现的功能
      // 非编辑状态下 访问为关注的频道可以跳转至该频道 但不关注
      //   this.$emit('input', id)// 修改激活标签
      //   this.$emit('close')// 通知父组件关闭弹层
      // }
    },
    chooseAndCut (index) {
      // 编辑状态 删除 否则 切换跳转 关闭弹层
      if (this.openORno && index !== 0) {
        this.channels.splice(index, 1)
      } else {
        this.$emit('input', index)// 修改激活标签
        this.$emit('close')// 通知父组件关闭弹层
      }
    }
  },
  created () {
    this.getAllchannel()
  },
  computed: {
    remainChannels () {
      // 剩余频道 = 所有 - 我的
      // const { channels, allChannels } = this
      const rm = []
      this.allChannels.forEach(item => {
        // 如果没有该项 添加至rm剩余频道
        if (!this.channels.find(c => c.id === item.id)) {
          rm.push(item)
        }
      })
      return rm
    }
  },
  watch: {
    channels () {
      setItem('my-channels', this.channels)
    }
  }
}
</script>

<style lang="less" scoped>
.channels-edit {
  padding: 40px 0;
 ::v-deep .van-grid-item__content{
    position: relative;
  .van-grid-item__icon-wrapper{
    position: absolute;
    top:-2px;
    right: -6px;
    font-size: 16px;
    z-index: 2;
  }
  }
  .activeItem {
    color: red;
  }
  .channel-name{
    font-size: 12px;
  }
}
</style>
