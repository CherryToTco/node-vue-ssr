import { createApp } from './app'

const isDev = process.env.NODE_ENV !== 'production';

// This exported function will be called by `bundleRenderer`.
//这里导出的函数将被` bundlerenderer ` 调用
// This is where we perform data-prefetching to determine the
// state of our application before actually rendering it.
//在实际渲染之前，我们执行数据预取以确定应用程序的状态。
// Since data fetching is async, this function is expected to
// return a Promise that resolves to the app instance.
//由于数据获取是异步的，这个函数将返回一个Promise，解决应用程序实例。

// 因为有可能会是异步路由钩子函数或组件，所以我们将返回一个 Promise，
// 以便服务器能够等待所有的内容在渲染前，
// 就已经准备就绪。
export default context => {
  return new Promise((resolve, reject) => {
    const s = isDev && Date.now();
    const { app, router, store } = createApp();

    //拿到上下文的url
    const { url } = context;
    const { fullPath } = router.resolve(url).route;
    console.log('fullPath      '+fullPath);
    console.log('url            '+url);

    //如果不匹配的话，我们初始化router的时候就没有这个值，返回这个错误
    if (fullPath !== url) {
      return reject({ url: fullPath })
    }

    // set router's location  // 设置 vue-router 的路由
    router.push(url);

    // wait until router has resolved possible async hooks
    // 等到 router 将可能的异步组件和钩子函数解析完
    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents();
      // no matched routes 如果没有这个路由底下没有匹配到任何组件
      if (!matchedComponents.length) {
        return reject({ code: 404 })
      }
      // Call fetchData hooks on components matched by the route.
      // A preFetch hook dispatches a store action and returns a Promise,
      // which is resolved when the action is complete and store state has been
      // updated.
      // 对所有匹配的路由组件调用 `asyncData()`
      Promise.all(matchedComponents.map(({ asyncData }) => asyncData && asyncData({
        store,
        route: router.currentRoute
      }))).then(
        Promise.all(matchedComponents.map(component => {
          if (component.preFetch) {
            // console.log(component.preFetch(store));
            var page = component.preFetch(store);
            context.title = page.title
            context.description = page.description
            context.keywords = page.keywords
          }
        }))).then(() => {
        isDev && console.log(`data pre-fetch: ${Date.now() - s}ms`)
        // After all preFetch hooks are resolved, our store is now
        // filled with the state needed to render the app.
        // Expose the state on the render context, and let the request handler
        // inline the state in the HTML response. This allows the client-side
        // store to pick-up the server-side state without having to duplicate
        // the initial data fetching on the client.
        // 在所有预取钩子(preFetch hook) resolve 后，
        // 我们的 store 现在已经填充入渲染应用程序所需的状态。
        // 当我们将状态附加到上下文，
        // 并且 `template` 选项用于 renderer 时，
        // 状态将自动序列化为 `window.__INITIAL_STATE__`，并注入 HTML。

        context.state = store.state;
        resolve(app)
      }).catch(reject)
    }, reject)
  })
}
