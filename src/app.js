import Vue from 'vue'
import App from './App.vue'
import { createStore } from './store'
import { createRouter } from './router'
import { sync } from 'vuex-router-sync'
import titleMixin from './util/title'
import * as filters from './util/filters'
import ElementUI from 'element-ui';

// mixin for handling title
//混合处理标题 这里暂且保留
// Vue.mixin(titleMixin)

Vue.use(ElementUI);

// register global utility filters.
//注册全局实用程序过滤器。
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})


// Expose a factory function that creates a fresh set of store, router,
//公开一个工厂功能，该函数创建一组新的store、路由器，
// app instances on each call (which is called for each SSR request)
//每个调用的应用程序实例（这是为每个SSR请求调用的）
export function createApp () {
  // create store and router instances
  const store = createStore();
  const router = createRouter();

  // sync the router with the vuex store.  将路由器与vuex store同步。
  // this registers `store.state.route`
  sync(store, router);

  // create the app instance.
  // here we inject the router, store and ssr context to all child components,
  //在这里，我们向所有子组件注入路由器、存储和SSR上下文，
  // making them available everywhere as `this.$router` and `this.$store`.
  const app = new Vue({
    router,
    store,
    render: h => h(App)
  })

  // expose the app, the router and the store.
  // note we are not mounting the app here, since bootstrapping will be
  // different depending on whether we are in a browser or on the server.
  //注意，我们没有在这里安装应用程序，因为引导将不同，这取决于我们是在浏览器还是在服务器上。
  return { app, router, store }
}
