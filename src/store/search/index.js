import { reqGetSearchInfo } from "@/api";
// search模块的小仓库
const state = {
    searchList:{}
}
const mutations = {
    // 获取search模块的数据
    GETSEARCHLIST(state,searchList) {
        state.searchList = searchList
    }
}
const actions = {
    // 发请求获取search模块的数据
    async getSearchList({commit},params={}) {
        let result = await reqGetSearchInfo(params)
        if(result.code==200) {
            commit('GETSEARCHLIST',result.data)
        }
    }
}
// 计算属性
// 项目当中getters主要的作用是：简化仓库中的数据(为简化数据而生)
// 可以把我们将来在组件当中需要用到的数据简化一下[将来组件在获取数据的时候就方便了]
const getters = {
    // 当前形参state，是现在search模块小仓库的state
    goodsList(state) {
        return state.searchList.goodsList || []
    },
    trademarkList(state) {
        return state.searchList.trademarkList || []
    },
    attrsList(state) {
        return state.searchList.attrsList || []
    }
}
export default{
    state,
    mutations,
    actions,
    getters
}