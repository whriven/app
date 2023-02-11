import {reqTradeInfo,reqGetUserAddressInfo} from '@/api'

const state = {
    tradeInfo:{},
    addressInfo:[]
}
const mutations = {
    GETTRADEINFO(state,tradeInfo) {
        state.tradeInfo = tradeInfo
    },
    GETADDRESSINFO(state,addressInfo) {
        state.addressInfo = addressInfo
    }
}
const actions = {
    // 获取用户地址信息的action
    async getUserAddressInfo({commit}){
        let result = await reqGetUserAddressInfo()
        if(result.code==200) {
            commit('GETADDRESSINFO',result.data)
        }
    },
    // 获取订单交易页信息的action
    async getTradeInfo({commit}) {
        let result = await reqTradeInfo()
        if(result.code==200) {
            commit('GETTRADEINFO',result.data)
        }
    }
}
const getters = {}

export default {
    state,
    mutations,
    actions,
    getters
}