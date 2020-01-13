import Vue from 'vue'

import
{ NavBar, Field, Button,
  Row, Icon, Cell, CellGroup, Toast,
  CountDown, Tabbar, TabbarItem,
  Grid, GridItem, Image, Dialog,
  Tab, Tabs, List, PullRefresh,
  Popup, Search
}
  from 'vant'

Vue.use(NavBar)// 导航栏
  .use(Field)// 输入框
  .use(Button)// 按钮
  .use(Row)// 行
  .use(Icon)// 图标
  .use(Cell)// 单元格
  .use(CellGroup)// 单元组
  .use(Toast)// 轻提示
  .use(CountDown)// 倒计时
  .use(Tabbar)// 标签栏
  .use(TabbarItem)// 标签
  .use(Grid)
  .use(GridItem)// 宫格区块
  .use(Image)
  .use(Dialog)// 弹层
  .use(Tab)
  .use(Tabs)// 标签页
  .use(List)// 列表
  .use(PullRefresh)// 下拉刷新
  .use(Popup)// 弹层
  .use(Search)// 搜索
