# node-express-redis

## 描述

> vue-ssr,做的一个兼容SEO的Demo,这个例子中，将express的服务器端路由和vue-router路由进行合并，可以自定义Header标签中的meta，后续我会将请求接口的东西一一陆续完善。

- 项目相关文件夹
  - src/app.js：工厂函数，生成vue实例
  - src/entry-client.js：前端入口文件
  - src/entry-server.js：服务端入口文件
  - src/index.template.html：模板文件
  - src/App.vue：根实例文件
  - src/views：vue-router下面的模板文件
  - src/components：项目存放的一些组件
  - src/api：调取接口的文件
  - src/router：vue路由文件夹
  - src/store：vuex文件夹，状态管理
  - src/utils：工具
  - config：各个不同环境的配置文件（beta：测试环境；prod：生产环境）
  - node_modules：node依赖的包
  - build：项目打包工具webpack入口文件
  - public：静态资源文件夹，这里存放一些例如图片之类
  - dist：静态资源文件夹，打包生成的文件
  - app.js:入口文件

## 项目架构，这里借鉴的是官方文档的项目架构图

<img width="973" alt="screen shot 2016-08-11 at 6 06 57 pm" src="https://cloud.githubusercontent.com/assets/499550/17607895/786a415a-5fee-11e6-9c11-45a2cfdf085c.png">

**详细的Vue SSR指南可以在 [这里](https://ssr.vuejs.org)找到

## Build Setup

**Requires Node.js 7+**

``` bash
# install dependencies
npm install # or yarn

# serve in dev mode, with hot reload at localhost:8080
npm run dev

# build for production
npm run build

# serve in production mode
npm start
```

## License

MIT
