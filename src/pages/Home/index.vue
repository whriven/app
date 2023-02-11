<template lang="">
    <div>
        <!-- 三级联动全局组件 -->
        <TypeNav></TypeNav>
        <ListContainer></ListContainer>
        <Recommend></Recommend>
        <GoodsRank></GoodsRank>,
        <Like></Like>
        <Floor v-for="(floor, index) in floorList" :key="floor.id" :list="floor"></Floor>
        <Brand></Brand>
    </div>
</template>
<script>
import TypeNav from '@/components/TypeNav'
import ListContainer from '@/pages/Home/ListContainer'
import Recommend from '@/pages/Home/Recommend'
import GoodsRank from '@/pages/Home/GoodsRank'
import Like from '@/pages/Home/Like'
import Floor from '@/pages/Home/Floor'
import Brand from '@/pages/Home/Brand'
import { mapState } from 'vuex'

export default {
    name:'Home',
    components:{
        TypeNav,
        ListContainer,
        Recommend,
        GoodsRank,
        Like,
        Floor,
        Brand
    },
    mounted() {
        this.$store.dispatch('getFloorList')

    },
    computed: {
        ...mapState({
            floorList:state=>state.home.floorList
        })
    }
}
</script>
<style lang="">
    
</style>