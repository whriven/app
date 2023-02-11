const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // 关闭eslint
  lintOnSave:false,
  // 配置代理服务器进行跨域请求
  devServer: {
    port: 8080,
    host: 'localhost',
    //代理跨域
    proxy: {
      "/api": {
        target: "http://gmall-h5-api.atguigu.cn"
      }
    }
  }
})