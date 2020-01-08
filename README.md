# topline

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
### step

1. 基本准备工作

- vue cli 创建个性化项目 vue create 项目名
- 初始化项目目录结构
- git管理 创库 => 连接git remote add 远程仓库地址 => git push -u origin master
- 调整目录 src 创建api utils styles 文件夹
- 安装导入 vant => npm i vant  => 配置自动按需加、按需加载npm i babel-plugin-import -D
- 修改babel.config.js 并重启
plugins: [
    [
      "import",
      {
        libraryName: "vant",
        libraryDirectory: "es",
        style: true
      },
      "vant"
    ]
  ]
- 封装组件注册使用、详见 utils ergister按需加载
- 第三方包补充 vue官方awesome资源
- 初始化预处理样式文件、关于normallize（vant已内置）
     npm i normalize.css
     main.js  import 'normalize.css'
- 字体图标 iconfont
- 配置rem适配 => 使用 amfe-flexible 动态设置 REM 基准值（html 标签的字体大小） npm i amfe-flexible =>  main.js 中加载执行该模块 import 'amfe-flexible' => 使用 postcss-pxtorem 将 px 转为 rem npm install postcss-pxtorem -D (-D 是 --save-dev 的简写
n) => 项目根目录中创建 postcss.config.js 文件 => module.exports = {
  plugins: {
    "postcss-pxtorem": {
      // 设计稿 375:37.5
      // 设计稿：750:75
      // Vant 是基于 375
      rootValue: 37.5,
      propList: ["*"]
    }
  }
}
** 注意：

只能转换单独的 .css|.less|.scss 之类的文件、.vue 文件中的 style 中的 px
不能转换行内样式中的 px **

- 封装axios请求 npm i axios => 创建request.js 设置请求拦截器
- 处理后端返回数据超出js安全数范围  npm i json-bigint => 在utils request下  import jsonBig from 'json-bigint'

2. 登陆

- 创建登陆组件配置路由
- 布局(用到的vant组件NavBar,field,Button,以及阿里iconfont) 全局样式、局部样式的处理
- 数据绑定 => 请求模块封装api => 页面加载调用 => 请求处理 => 以及登陆中的vant轻提示交互(toast)
- 关于表单验证
 a. h5自带兼容不好
 b. 使用组件内置 例如element内置验证功能、 vant没提供
 c. 验证插件 vuelidate、veevalidate 。。。

 vee-validate  1. npm i vee-validate
               2. 配置规则