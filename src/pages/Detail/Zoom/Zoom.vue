<template lang="">
  <div class="spec-preview">
    <img :src="imgObj.imgUrl" />
    <div class="event" @mousemove="move"></div>
    <div class="big">
      <img :src="imgObj.imgUrl" ref="bigImg"/>
    </div>
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
  export default {
    name: "Zoom",
    props:['skuImageList'],
    data() {
      return {
        currentIndex:0
      }
    },
    computed: {
      imgObj() {
        return this.skuImageList[this.currentIndex] || {}
      }
    },
    mounted() {
      this.$bus.$on('changeImgUrl',(index) => {
        this.currentIndex = index
      })
    },
    methods: {
      move(e) {
        
      let maskWidth = this.$refs.mask.offsetWidth
      let maskHeight = this.$refs.mask.offsetHeight

      let maskLeft = e.offsetX - maskWidth / 2
      let maskTop = e.offsetY - maskHeight / 2

      if(maskLeft <= 0 ) {
        maskLeft = 0
      } else if(maskLeft>=e.target.offsetWidth-maskWidth) {
        maskLeft = e.target.offsetWidth-maskWidth
      }
      if(maskTop <=0 ) {
        maskTop = 0
      } else if(maskTop>=e.target.offsetHeight-maskHeight) {
        maskTop = e.target.offsetHeight-maskHeight
      }

      this.$refs.mask.style.left = maskLeft + 'px'
      this.$refs.mask.style.top = maskTop + 'px'

      this.$refs.bigImg.style.left = -(maskLeft * 2) + 'px'
      this.$refs.bigImg.style.top = -(maskTop * 2) + 'px'

      }
    },
  }
</script>

<style lang="less">
  .spec-preview {
    position: relative;
    width: 400px;
    height: 400px;
    border: 1px solid #ccc;

    img {
      width: 100%;
      height: 100%;
    }

    .event {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 998;
    }

    .mask {
      width: 50%;
      height: 50%;
      background-color: rgba(0, 255, 0, 0.3);
      position: absolute;
      left: 0;
      top: 0;
      display: none;
    }

    .big {
      width: 100%;
      height: 100%;
      position: absolute;
      top: -1px;
      left: 100%;
      border: 1px solid #aaa;
      overflow: hidden;
      z-index: 998;
      display: none;
      background: white;

      img {
        width: 200%;
        max-width: 200%;
        height: 200%;
        position: absolute;
        left: 0;
        top: 0;
      }
    }

    .event:hover~.mask,
    .event:hover~.big {
      display: block;
    }
  }
</style>