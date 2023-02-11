import Vue from 'vue'
import App from './App.vue'
// 三级联动组件
import TypeNav from '@/components/TypeNav'
// 轮播图组件
import Carousel from '@/components/Carousel'
// 分页器组件
import Pagination from '@/components/Pagination'
// 按需引入elementUI
import { Button,MessageBox } from 'element-ui';


// 全局注册elementui的button
Vue.component(Button.name,Button)



// 注册三级联动全局组件,第一个参数是组件名字,第二个参数是组件
Vue.component(TypeNav.name,TypeNav)

// 注册轮播图全局组件
Vue.component(Carousel.name,Carousel)

// 注册分页器全局组件
Vue.component(Pagination.name,Pagination)

// 引入api文件
import * as API from '@/api'
// 引入路由
import router from '@/router'
// 引入仓库
import store from '@/store'
// 引入mock数据
import '@/mock/mockServe'
// 引入swiper样式
import "swiper/css/swiper.css"
new Vue({
  render: h => h(App),
  
  beforeCreate() {
    // 全局事件总线$bus配置
    Vue.prototype.$bus = this
    // api接口配置
    Vue.prototype.$API = API
    // 原型对象上挂载elementui
    Vue.prototype.$msgbox = MessageBox;
    Vue.prototype.$alert = MessageBox.alert;
  },
  // 注册路由 当这里书写router的时候，组件身上会拥有$route,$router属性
  router,
  // 注册仓库：组件实例身上会多一个属性$store属性
  store
}).$mount('#app')
