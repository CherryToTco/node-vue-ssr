import Vue from 'vue'
import 'es6-promise/auto'
import { createApp } from './app'
import ProgressBar from './components/ProgressBar.vue'

// global progress bar
const bar = Vue.prototype.$bar = new Vue(ProgressBar).$mount()
document.body.appendChild(bar.$el)

// a global mixin that calls `asyncData` when a route component's params change
//全球混合调用` asyncdata `当路由组件的参数变化

//匹配要渲染的视图后，再获取数据：
// 此策略将客户端数据预取逻辑，放在视图组件的 beforeMount 函数中。当路由导航被触发时，可以立即切换视
// 图，因此应用程序具有更快的响应速度。然而，传入视图在渲染时不会有完整的可用数据。因此，对于使用此策
// 略的每个视图组件，都需要具有条件加载状态。
// 这可以通过纯客户端(client-only)的全局 mixin 来实现：

// Vue.mixin({
//   beforeMount () {
//     const { asyncData } = this.$options
//     if (asyncData) {
//       // 将获取数据操作分配给 promise
//       // 以便在组件中，我们可以在数据准备就绪后
//       // 通过运行 `this.dataPromise.then(...)` 来执行其他任务
//       this.dataPromise = asyncData({
//         store: this.$store,
//         route: this.$route
//       })
//     }
//   }
// })


//这两种策略是根本上不同的用户体验决策，应该根据你创建的应用程序的实际使用场景进行挑选。但是无论你选择哪
//种策略，当路由组件重用（同一路由，但是 params 或 query 已更改，例如，从 user/1 到 user/2）时，也应该调用
//asyncData 函数。我们也可以通过纯客户端(client-only)的全局 mixin 来处理这个问题：
Vue.mixin({
  // 在当前路由改变，但是该组件被复用时调用
  // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
  // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
  // 可以访问组件实例 `this`
  beforeRouteUpdate (to, from, next) {
    const { asyncData } = this.$options
    if (asyncData) {
      asyncData({
        store: this.$store,
        route: to
      }).then(next).catch(next)
    } else {
      next()
    }
  }
})

const { app, router, store } = createApp()

// prime the store with server-initialized state.
//初始化具有服务器初始化状态的存储区。
// the state is determined during SSR and inlined in the page markup.
//状态确定在SSR和内联在页面标记。
if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}

// wait until router has resolved all async before hooks
// and async components...   等到路由器解决了异步前钩和异步组件…
router.onReady(() => {
  // Add router hook for handling asyncData.
  // Doing it after initial route is resolved so that we don't double-fetch  在初始路由之后执行它，这样我们就不会重复读取。
  // the data that we already have. Using router.beforeResolve() so that all
  // async components are resolved.  我们已有的数据。使用路由器。beforeresolve()使所有异步组件解决。
  // 使用 `router.beforeResolve()`，以便确保所有异步组件都 resolve。
  router.beforeResolve((to, from, next) => {
    const matched = router.getMatchedComponents(to)
    const prevMatched = router.getMatchedComponents(from)
    let diffed = false;
    // 把目标路由没有渲染到的组件过滤出来
    const activated = matched.filter((c, i) => {
      // 源路由和目标路由比较不一样的返回true
      return diffed || (diffed = (prevMatched[i] !== c))
    })
    // 过滤出需要获取数据的组件钩子
    const asyncDataHooks = activated.map(c => c.asyncData).filter(_ => _);
    // 没有需要获取数据的组件钩子的时候，就让这个路由导航next
    if (!asyncDataHooks.length) {
      return next()
    }
    //  这里如果有加载指示器(loading indicator)，就触发进度条开始，跟菊花图一样的道理
    bar.start();
    // 然后开始获取过滤后组件钩子的异步数据
    Promise.all(asyncDataHooks.map(hook => hook({ store, route: to })))
      .then(() => {
        // 停止加载指示器(loading indicator)
        // 获取完成之后，store当中有了数据，就关闭这个菊花图
        bar.finish();
        // 路由导航next
        next()
      })
      // 报错的话，路由导航next
      .catch(next)
  })

  // actually mount to DOM
  app.$mount('#app')
})

// service worker
if ('https:' === location.protocol && navigator.serviceWorker) {
  navigator.serviceWorker.register('/service-worker.js')
}
