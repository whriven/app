// 配置路由的地方
import Vue from 'vue'
// 引入路由插件
import VueRouter from 'vue-router'

// 使用vue-router插件
Vue.use(VueRouter)

// 引入分离的routes
import routes from './routes'
// 引入仓库
import store from '@/store'
// 引入获取token函数
import {getToken} from '@/utils/token'

// 保存一下原型对象上最原本的push方法
let originPush = VueRouter.prototype.push
// 保存一下原型对象上最原本的replace方法
let originReplace = VueRouter.prototype.replace

// 重写push方法进行判断
VueRouter.prototype.push = function(location,resolve,reject) {
    if(resolve && reject) {
        // call||apply区别
        // 相同点：都可以调用函数一次，都可以改变this指向
        // 不同点：call传递参数用逗号隔开，apply传递参数用数组
        originPush.call(this,location,resolve,reject)
    } else {
        originPush.call(this,location,()=>{},()=>{})
    }
}

// 重写replace方法进行判断
VueRouter.prototype.replace = function(location,resolve,reject) {
    if(resolve && reject) {
        originReplace.call(this,location,resolve,reject)
    } else {
        originReplace.call(this,location,()=>{},()=>{})
    }
}

// 配置路由 暴露一个vue-router的实例
let router = new VueRouter({
    // 配置路由信息
    routes,
    // 路由跳转时自动滚动到顶部
    scrollBehavior(to, from, savedPosition) {
        // 始终滚动到顶部
        return { y: 0 }
    }
})

// 全局守卫：前置守卫(在路由跳转之前进行判断)
router.beforeEach(async (to,from,next)=>{
    // to : 可以获取到要跳转到的路由信息
    // from : 可以获取到从哪个路由跳转过来的信息
    // next : 放行函数 next()直接放行 next(path)放行到指定路由 next(false)中断当前导航，返回from而来的路由
    let token = getToken()
    let name = store.state.loginandregister.userInfo.name

    // 如果有token，那么就不能再去登录页面了
    if(token) {
        // 如果有token 还要判断去的哪个路由 如果是login路由就不能跳转
        if(to.path=='/login') {
            // 去login就跳回首页
            next('/home')
        } else {
            // 去的不是登录路由就要判断有没有用户信息了 如果没有则派发dispatch获取
            if(name) {
                next()
            } else {
                try{
                    // 发请求获取用户信息等待成功的结果再跳转
                    await store.dispatch('getUserInfo')
                    next()
                }catch(error){
                    // 说明token过期了
                    // 直接执行登出操作然后等待成功的结果返回再跳转到登录页
                    await store.dispatch('userLogout')
                    next('/login')
                }
            }
        }
    }else {
        // 未登录不能去的路由有trade，pay/paysuccess，center
        let toPath = to.path
        if(toPath=='/trade' || toPath=='/pay' || toPath=='/paysuccess' || toPath=='/center/myorder') {
            next(`/login?redirect=${toPath}`)
        }else {
            next()
        }
    }
})

export default router