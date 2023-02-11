import {reqShopCartInfo,reqDeleteShopCart,reqChangeGoodChecked} from '@/api'

const state = {
    cartList:[]
}
const mutations = {
    GETSHOPCARTLIST(state,cartList) {
        state.cartList = cartList
    }
}
const actions = {
    // 获取购物车列表的action
    async getShopCartInfo({commit}) {
        let result = await reqShopCartInfo()
        if(result.code==200) {
            commit('GETSHOPCARTLIST',result.data)
        }
    },
    // 删除购物车产品的action
    async deleteShopCart({commit},skuId) {
        let result = await reqDeleteShopCart(skuId)
        if(result.code==200) {
            // 代表删除购物车成功
           return 'ok'
        } else {
            // 代表删除购物车失败
            return Promise.reject(new Error('faile'))
        }
    },
    // 改变商品选中状态的action
    async changeGoodChecked({commit},{skuId,isChecked}) {
        let result = await reqChangeGoodChecked(skuId,isChecked)
        if(result.code==200) {
            return 'ok'
        } else {
            return new Promise(new Error('faile'))
        }
    },
    // 删除选中商品购物车的action
    deleteAllChecked({getters,dispatch}) {
        // 创建一个空数组用来存储所有promise对象
        let PromiseAll = []
        getters.cartList.cartInfoList.forEach(item => {
            if(item.isChecked==1) {
                let result = dispatch('deleteShopCart',item.skuId)
                PromiseAll.push(result)
            }
        });
        return Promise.all(PromiseAll)
    },
    // 改变全选状态的action
    changeAllChecked({getters,dispatch},isChecked) {
        let PromiseAll = []
        getters.cartList.cartInfoList.forEach(item => {
            if(item.isChecked!=isChecked) {
               let result = dispatch('changeGoodChecked',{skuId:item.skuId,isChecked})
               PromiseAll.push(result)
            }
        })
        return Promise.all(PromiseAll)
    }
}
const getters = {
    cartList(state) {
        return state.cartList[0]||{}
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}