// 当前这个模块：API进行统一管理
import requests from './request'
// 引入mock数据requests
import mockRequests from './mockRequest'

// 三级联动接口
// /api/product/getBaseCategoryList get 无参数



export const reqCategoryList = () => {
    // 发请求 axios发请求返回结果是Promise对象
    return requests({
        url:'/product/getBaseCategoryList',
        method:'get'
    })
}

// 发起mock数据请求banner数据
export const reqGetBannerList = () => {
    return mockRequests({
        url:'/banner',
        method:'get'
    })
}

// 发起mock数据请求floor数据
export const reqGetFloorList = () => {
    return mockRequests({
        url:'/floor',
        method:'get'
    })
}

// 获取搜索模块数据 /api/list post 参数：需要带参数
/* 
{
  "category3Id": "61",
  "categoryName": "手机",
  "keyword": "小米",
  "order": "1:desc",
  "pageNo": 1,
  "pageSize": 10,
  "props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],
  "trademark": "4:小米"
}
*/
export const reqGetSearchInfo = (params)=>{
    return requests({
        url:'/list',
        method:'post',
        data:params
    })
}

// 详情页面获取数据
export const reqGetgoodsDetail = (skuId)=>{
    return requests({
        url:`/item/${skuId}`,
        method:'get'
    })
}

// 将产品添加到购物车中（或者更改某一个产品的数量）
// /api/cart/addToCart/{ skuId }/{ skuNum }  POST
export const reqAddOrUpdateShopCart = (skuId,skuNum) => {
    return requests({
        url:`/cart/addToCart/${skuId}/${skuNum}`,
        method:'post'
    })
}

// 获取购物车数据
// /api/cart/cartList get
export const reqShopCartInfo = () => {
    return requests({
        url:'/cart/cartList',
        method:'get'
    })
}

// 删除购物车商品数据
// /api/cart/deleteCart/{skuId} delete
export const reqDeleteShopCart = (skuId) => {
    return requests({
        url:`/cart/deleteCart/${skuId}`,
        method:'delete'
    })
}

// 改变商品选中状态
// /api/cart/checkCart/{skuID}/{isChecked}  get
export const reqChangeGoodChecked = (skuId,isChecked) => {
    return requests({
        url:`/cart/checkCart/${skuId}/${isChecked}`,
        method:'get'
    })
}

// 获取注册验证码
// /api/user/passport/sendCode/{phone}  get
export const reqRegisterCode = (phone) => {
    return requests({
        url:`/user/passport/sendCode/${phone}`,
        method:'get'
    })
}

// 注册业务请求
// /api/user/passport/register  post
export const reqUserRegister = (data) => {
    return requests({
        url:'/user/passport/register',
        method:'post',
        data
    })
}

// 登录
// /api/user/passport/login post
export const reqUserLogin = (user) => {
    return requests({
        url:'/user/passport/login',
        method:'post',
        data:user
    })
}

// 用户登录之后携带token获取用户信息
// /api/user/passport/auth/getUserInfo get
export const reqGetUserInfo = () => {
    return requests({
        url:'/user/passport/auth/getUserInfo',
        method:'get'
    })
}

// 退出登录
// /api/user/passport/logout get
export const reqLogOut = () => {
    return requests({
        url:'/user/passport/logout',
        method:'get'
    })
}

// 获取用户地址信息
// /api/user/userAddress/auth/findUserAddressList  get
export const reqGetUserAddressInfo = () => {
    return requests({
        url:'/user/userAddress/auth/findUserAddressList',
        method:'get'
    })
}

// 获取订单交易页信息
// /api/order/auth/trade  get
export const reqTradeInfo = () => {
    return requests({
        url:'/order/auth/trade',
        method:'get'
    })
}

// 提交订单
// /api/order/auth/submitOrder?tradeNo={tradeNo}
export const reqSubmitOrder = (tradeNo,order) => {
    return requests({
        url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,
        method:'post',
        data:order
    })
}

// 获取订单支付信息
// /api/payment/weixin/createNative/{orderId}  get
export const reqOrderPayment = (orderId) => {
    return requests({
        url:`/payment/weixin/createNative/${orderId}`,
        method:'get'
    })
}

// 获取支付订单状态
// /api/payment/weixin/queryPayStatus/{orderId} get
export const reqPayStatus = (orderId) => {
    return requests({
        url:`/payment/weixin/queryPayStatus/${orderId}`,
        method:'get'
    })
}

// 获取我的订单列表
// /api/order/auth/{page}/{limit} get
export const reqGetMyOrderList = ({page,limit}) => {
    return requests({
        url:`/order/auth/${page}/${limit}`,
        method:'get'
    })
}

