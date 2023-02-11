// 要配置路由就要引入路由组件
import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'
import MyOrder from '@/pages/Center/myOrder'
import TeamOrder from '@/pages/Center/teamOrder'

export default[
    // 购物车页面
    {
        name:'shopcart',
        path:'/shopcart',
        component:ShopCart,
        meta:{
            show:true
        }
    },
    // 添加购物车成功
    {
        name:'addcartsuccess',
        path:'/addcartsuccess',
        component:AddCartSuccess,
        meta:{
            show:true
        }
    },
    // 首页
    {
        path:'/home',
        component:Home,
        meta: {
            show:true
        }
    },
    // 搜索页
    {
        path:'/search/:keyWord?',
        component:Search,
        meta: {
            show:true
        },
        name:'search',
        // props传递参数
        // 第一种布尔值写法 但是这种写法只能传递params参数
        // props:true

        // 对象写法：可以额外的给路由组件传递一些参数
        //props:{a:1,b:2}

        // 函数写法：可以传递params参数和query参数
        /* props:($route)=>{
            return {
                keyWord:$route.params.keyWord,
                k:$route.query.k
            }
        } */
    },
    // 登录页
    {
        name:'login',
        path:'/login',
        component:Login,
        meta: {
            show:false
        }
    },
    // 注册页
    {
        path:'/register',
        component:Register,
        meta: {
            show:false
        }
    },
    // 详情页
    {
        path:'/detail/:skuId',
        component:Detail,
        meta:{
            show:true
        }

    },
    // 重定向，在项目跑起来的时候，访问/，立马定向到首页
    {
        path:'*',
        redirect:'/home'
    },
    // 订单支付页面
    {
        path:'/trade',
        component:Trade,
        meta:{
            show:true
        },
        beforeEnter:(to,from,next) => {
            if(from.path=='/shopcart') {
                next()
            } else {
                next(false)
            }
        }
    },
    // 支付路由
    {
        path:'/pay',
        component:Pay,
        meta:{
            show:true
        },
        beforeEnter:(to,from,next) => {
            if(from.path=='/trade') {
                next()
            }else {
                next(false)
            }
        }
    },
    // 支付成功路由
    {
        path:'/paysuccess',
        component:PaySuccess,
        meta:{
            show:true
        }
    },
    // 个人中心路由
    {
        path:'/center',
        component:Center,
        meta:{
            show:true
        },
        // 二级路由组件
        children:[
            {
                path:'myorder',
                component:MyOrder
            },
            {
                path:'teamorder',
                component:TeamOrder
            },
            {
                path:'/center',
                redirect:'/center/myorder'
            }
        ]
    }
]