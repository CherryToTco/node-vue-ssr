import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

import skuRouter from './sku';

// route-level code splitting
// const createListView = id => () => import('../views/CreateListView').then(m => m.default(id))
// const ItemView = () => import('../views/ItemView.vue')
// const UserView = () => import('../views/UserView.vue')
/*
* 应用程序的代码分割或惰性加载，有助于减少浏览器在初始渲染中下载的资源体积，
* 可以极大地改善大体积 bundle 的可交互时间(TTI - time-to-interactive)。这里的关键在于，对初始首屏而言，"只加载所需"。
*
* */
const HomeView = () => import('../views/Home.vue');
const UserView = () => import('../views/User.vue');

export function createRouter () {
  return new Router({
    mode: 'history',
    fallback: false,
    scrollBehavior: () => ({ y: 0 }),
    routes: [
      // { path: '/top/:page(\\d+)?', component: createListView('top') },
      // { path: '/new/:page(\\d+)?', component: createListView('new') },
      // { path: '/show/:page(\\d+)?', component: createListView('show') },
      // { path: '/ask/:page(\\d+)?', component: createListView('ask') },
      // { path: '/job/:page(\\d+)?', component: createListView('job') },
      // { path: '/item/:id(\\d+)', component: ItemView },
      // { path: '/user/:id', component: UserView },
      { path: '/home', component: HomeView, redirect: '/hello/sku', children:skuRouter},
      { path: '/user', component: UserView },
      { path: '/', redirect: '/home' }
    ]
  })
}
