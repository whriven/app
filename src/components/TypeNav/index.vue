<template lang="">
    <div class="type-nav">
        <div class="container">
            <div @mouseleave="leaveIndex" @mouseenter="enterShow">
                <h2 class="all">全部商品分类</h2>
                <transition name="sort">
                  <div class="sort" v-show="show">
                    <div class="all-sort-list2" @click="goSearch">
                        <div class="item" v-for="(c1, index) in categoryList" :key="c1.categoryId">
                            <h3 @mouseenter="changeIndex(index)" :class="{cur:currentIndex==index}">
                                <a :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId">{{c1.categoryName}}--{{index}}</a>
                            </h3>
                            <!-- 二三级分类 -->
                            <div class="item-list clearfix" :style="{display:currentIndex==index?'block':'none'}">
                                <div class="subitem" v-for="(c2, index) in c1.categoryChild" :key="c2.categoryId">
                                    <dl class="fore">
                                        <dt>
                                            <a :data-categoryName="c2.categoryName" :data-category2Id="c2.categoryId">{{c2.categoryName}}</a>
                                        </dt>
                                        <dd>
                                            <em v-for="(c3, index) in c2.categoryChild" :key="c3.categoryId">
                                                <a :data-categoryName="c3.categoryName" :data-category3Id="c3.categoryId">{{c3.categoryName}}</a>
                                            </em>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>
                  </div>
                </transition>
            </div>
            <nav class="nav">
                <a href="###">服装城</a>
                <a href="###">美妆馆</a>
                <a href="###">尚品汇超市</a>
                <a href="###">全球购</a>
                <a href="###">闪购</a>
                <a href="###">团购</a>
                <a href="###">有趣</a>
                <a href="###">秒杀</a>
            </nav>
        </div>
    </div>
</template>
<script>
import {mapState} from 'vuex'
// 引入lodash使用节流 按需引入
import throttle from 'lodash/throttle'
export default {
  name: "TypeNav",
  data() {
    return {
        // 存储三级联动一级分类的索引
        currentIndex:-1,
        // 控制三级联动的显示与隐藏
        show:true
    }
  },
  // 组件挂载完毕就可以向服务器发请求
  mounted() {
    if(this.$route.path != '/home') {
      this.show = false
    }
  },
  computed: {
    // 解析 categoryList 数据
    ...mapState({
        categoryList:state=>state.home.categoryList
    })
  },
  methods: {
    // 改变index值来控制一级分类的背景颜色
    // 使用lodash的节流(throttle)函数
    changeIndex:throttle(function(index){
      this.currentIndex = index
    },50), 
    // 重置currentIndex，以便下次触发事件时进行对比
    leaveIndex() {
        this.currentIndex = -1
        // 离开元素时，若不是home模块则不显示商品分类
        if(this.$route.path != '/home') {
          this.show = false
        }
    },
    // 进入元素时显示三级联动
    enterShow() {
        this.show = true
    },
    // 三级联动的路由跳转
    goSearch(event) {
      // 获取到点击元素
      let element = event.target
      // 元素身上有一个dataset方法可以获取到自定义属性以及属性值
      // 结构出需要的自定义属性
      let {categoryname,category1id,category2id,category3id} = element.dataset
      // 判断点击元素的身上是否有categoryname自定义属性
      if(categoryname) {
        // 整理路由跳转的参数
        let location = {name:'search'}
        let query = {categoryName:categoryname}
        // 判断点击的元素是几级分类
        if(category1id) {
          // 动态添加query参数
          query.category1Id = category1id
        } else if (category2id) {
          query.category2Id = category2id
        } else {
          query.category3Id = category3id
        }
        // 整理完参数进行汇整
        location.query = query
        // 如果有params参数也要带过去
        if(this.$route.params) {
          location.params = this.$route.params
        }
        // 再进行路由跳转
        this.$router.push(location)
      }
    }
  },
};
</script>
<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .item {
          h3 {
            line-height: 27px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            &.cur {
                background-color: skyblue;
            }

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

        }
      }
    }
    .sort-enter {
      opacity: 0;
    }
    .sort-enter-active {
      transition: all .5s linear;
    }
    .sort-enter-to {
      opacity: 1;
    }
  }
}
</style>