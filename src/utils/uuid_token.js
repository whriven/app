import { v4 as uuidv4 } from 'uuid'

export const getUUID = () => {
    // 先从本地存储获取uuid
    let uuid_token = localStorage.getItem('UUIDTOKEN')
    // 判断当前本地存储有没有uuid
    // 如果没有就生成并且存储在本地存储中
    if(!uuid_token) {
        uuid_token = uuidv4()
        localStorage.setItem('UUIDTOKEN',uuid_token)
    }
    return uuid_token
}