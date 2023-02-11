import {reqGetgoodsDetail,reqAddOrUpdateShopCart} from '@/api'
import {getUUID} from '@/utils/uuid_token'
// 封装游客身份模块uuid--->生成一个随机字符串(不能再变化)
const state = {
    goodInfo:{},
    // 游客临时身份
    uuid_token:getUUID()
}
const mutations = {
    GETGOODSDETAIL(state,goodInfo) {
        state.goodInfo = goodInfo
    },
}
const actions = {
    // 获取商品详情的action
    async getDoodsDetail({commit},skuId) {
        let result = await reqGetgoodsDetail(skuId)
        if(result.code==200) {
            commit('GETGOODSDETAIL',result.data)
        }
    },

    // 添加或者更新购物车的action
    async addOrUpdateShopCart({commit},{skuId,skuNum}) {
        let result = await reqAddOrUpdateShopCart(skuId,skuNum)
        if(result.code==200) {
            // 代表加入购物车成功
           return 'ok'
        } else {
            // 代表加入购物车失败
            return Promise.reject(new Error('faile'))
        }
    }
}
const getters = {
    categoryView(state) {
        return state.goodInfo.categoryView || {}
    },
    skuInfo(state) {
        return state.goodInfo.skuInfo || {}
    },
    spuSaleAttrList(state) {
        return state.goodInfo.spuSaleAttrList || []
    }
}


export default {
    state,
    mutations,
    actions,
    getters
}