const Sku = () => import('../views/Sku.vue');

const routers = [
  { path: '/hello/sku', component: Sku, name: '第一级路由' },
]

export default routers;
