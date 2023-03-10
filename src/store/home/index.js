import {reqCategoryList,reqGetBannerList,reqGetFloorList} from '@/api'
// home模块的小仓库
const state = {
    categoryList:[],
    bannerList:[],
    floorList:[]
}
const mutations = {
    CATEGORYLIST(state,categoryList) {
        state.categoryList = categoryList
    },
    GETBANNERLIST(state,bannerList) {
        state.bannerList = bannerList
    },
    GETFLOORLIST(state,floorList) {
        state.floorList = floorList
    }
}
const actions = {
    async categoryList({commit}) {
        let result = await reqCategoryList()
        if(result.code == 200) {
            commit('CATEGORYLIST',result.data)
        }
    },

    // 获取mock的轮播图数据
    async getBannerList({commit}) {
        let result = await reqGetBannerList()
        if(result.code==200) {
            commit('GETBANNERLIST',result.data)
        }
    },

    // 获取mock的floor数据
    async getFloorList({commit}) {
        let result = await reqGetFloorList()
        if(result.code==200) {
            commit('GETFLOORLIST',result.data)
        }
    }
}
const getters = {}
export default{
    state,
    mutations,
    actions,
    getters
}