import {reqRegisterCode,reqUserRegister,reqUserLogin,reqGetUserInfo,reqLogOut} from '@/api'
// 把本地存储token和提取token的函数引入
import {getToken,setToken,removeToken} from '@/utils/token'
const state = {
    token:getToken(),
    userInfo:{}
}
const mutations = {
    USERLOGIN(state,token) {
        state.token = token
    },
    GETUSERINFO(state,userInfo) {
        state.userInfo = userInfo
    },
    // 退出登录后清除一些数据
    CLEAR(state) {
        state.token = ''
        state.userInfo = {}
        removeToken()
    }
}
const actions = {
    // 获取验证码的action
    async getCodeByPhone({commit},phone) {
        let result = await reqRegisterCode(phone)
        if(result.code==200) {
            console.log(result.data)
        }
    },
    // 完成注册的action
    async userRegister({commit},data) {
        let result = await reqUserRegister(data)
        if(result.code==200) {
            return 'ok'
        } else {
            return Promise.reject(new Error(`${result.message}`))
        }
    },
    // 登录的action
    async userLogin({commit},user) {
        let result = await reqUserLogin(user)
        if(result.code==200) {
            setToken(result.data.token)
            return 'ok'
        } else {
            return Promise.reject(new Error(`${result.message}`))
        }
    },
    // 登录成功之后获取用户信息的action
    async getUserInfo({commit}) {
        let result = await reqGetUserInfo()
        if(result.code==200) {
            commit('GETUSERINFO',result.data)
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    // 退出登录的action
    async userLogout({commit}) {
        let result = await reqLogOut()
        if(result.code==200) {
            commit('CLEAR')
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
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