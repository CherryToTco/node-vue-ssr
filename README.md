# Vue-Ssr-1.0

## 特征

> 注意：实际上，对于这种大小的应用程序（每个异步块只有几千字节），没有必要进行代码分割，也不是提取额外的CSS文件（只有1kb） - 它们是只是因为这是一个演示应用程序展示所有支持的功能。在真实应用程序中，您应该始终根据实际的应用程序限制进行测量和优化。

- 服务器端渲染
  - Vue + vue-router + vuex一起工作
  - 服务器端数据预取
  - Client-side state & DOM 混合
  - Automatically inlines CSS used by rendered components only   自动内联由渲染组件使用的CSS
  - Preload / prefetch resource hints   预加载/预取资源提示
  - Route-level code splitting   路由级代码分割
- Progressive Web App  渐进的Web应用程序
  - App manifest   应用清单
  - Service worker   服务人员
  - 100/100 Lighthouse score  100/100灯塔比分
- Single-file Vue Components  单文件Vue组件
  - Hot-reload in development  在开发中重新加载
  - CSS extraction for production  CSS提取生产
- Animation  动画
  - Effects when switching route views   切换路由视图时的效果
  - Real-time list updates with FLIP Animation   实时列表更新与FLIP动画

## 架构概述

<img width="973" alt="screen shot 2016-08-11 at 6 06 57 pm" src="https://cloud.githubusercontent.com/assets/499550/17607895/786a415a-5fee-11e6-9c11-45a2cfdf085c.png">


## Build Setup

**Requires Node.js 7+**

``` bash
# install dependencies
npm install

# serve in dev mode, with hot reload at localhost:8080
npm run dev

# build for production
npm run build

# serve in production mode
npm start
```

## License

MIT
