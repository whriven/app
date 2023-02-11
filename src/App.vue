<template lang="">
  <div>
    <Header></Header>
    <!-- 路由组件出口的地方 -->
    <router-view></router-view>
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>
<script>
import Header from './components/Header'
import Footer from './components/Footer'
export default {
  name:'App',
  components:{
    Header,
    Footer
  },
  mounted() {
    // 在根组件挂载时进行三级联动数据请求
    this.$store.dispatch('categoryList')

    
  },
}
</script>
<style lang="">
  
</style>
