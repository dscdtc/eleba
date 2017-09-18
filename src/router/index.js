import Vue from 'vue'
import Router from 'vue-router'

const goods = () => import('comp/goods/goods')
const ratings = () => import('comp/ratings/ratings')
const seller = () => import('comp/seller/seller')
Vue.use(Router)

const routes = [{
  path: '/',
  redirect: '/goods'
}, {
  path: '/goods',
  component: goods
}, {
  path: '/ratings',
  component: ratings
}, {
  path: '/seller',
  component: seller
}]

export default new Router({
  linkActiveClass: 'active',
  routes
})
