<template lang="">
  <div class="pagination">
    <!-- 上半部分 -->
    <button :disabled="pageNo==1" @click="$emit('changePage',pageNo-1)">上一页</button>
    <button v-if="pageStartAndEnd.start>=2" @click="$emit('changePage',1)" :class="{active:pageNo==1}">1</button>
    <button v-if="pageStartAndEnd.start>2">···</button>
    <!-- 连续页码处 -->
    <button v-for="(page,index) in pageStartAndEnd.end" :key="index" v-if="page>=pageStartAndEnd.start" @click="getPage(page)" :class="{active:pageNo==page}">{{page}}</button>
    <!-- 下半部分 -->
    <button v-if="pageStartAndEnd.end < (totalPage-1)">···</button>
    <button v-if="pageStartAndEnd.end<=(totalPage-1)" @click="$emit('changePage',totalPage)" :class="{active:pageNo==totalPage}">{{totalPage}}</button>
    <button :disabled="pageNo==totalPage" @click="$emit('changePage',pageNo+1)">下一页</button>
    
    <button style="margin-left: 30px">共{{total}}条</button>
  </div>
</template>

<script>
  export default {
    name: "Pagination",
    props:['pageNo','pageSize','total','continues'],
    computed: {
      // 总共多少页
      totalPage() {
        // 向上取整计算页数
        return Math.ceil(this.total / this.pageSize)
      },
      // 计算出连续页码的起始数字与结束数字
      pageStartAndEnd() {
        let start = 0
        let end = 0
        if(this.continues > this.totalPage) {
          start = 1
          end = this.totalPage
        } else {
          // 正常现象
          // 起始数字
          start = this.pageNo - parseInt(this.continues / 2)
          // 结束数字
          end = this.pageNo + parseInt(this.continues / 2)

          // 注意不正常的现象【start数字出现小于1的情况】
          if(start < 1) {
            start = 1
            end = this.continues
          } 
          if (end > this.totalPage) {
            end = this.totalPage
            start = this.totalPage - this.continues + 1
          }
        }
        return {start,end}
      }
    },
    methods: {
      // 点击连续页码按钮
      getPage(page) {
        this.$emit('changePage',page)
      }
    },
  }
</script>

<style lang="less" scoped>
  .pagination {
    text-align: center;
    button {
      margin: 0 5px;
      background-color: #f4f4f5;
      color: #606266;
      outline: none;
      border-radius: 2px;
      padding: 0 4px;
      vertical-align: top;
      display: inline-block;
      font-size: 13px;
      min-width: 35.5px;
      height: 28px;
      line-height: 28px;
      cursor: pointer;
      box-sizing: border-box;
      text-align: center;
      border: 0;

      &[disabled] {
        color: #c0c4cc;
        cursor: not-allowed;
      }

      &.active {
        cursor: not-allowed;
        background-color: #409eff;
        color: #fff;
      }
    }
  }
  .active {
    background-color: skyblue;
  }
</style>