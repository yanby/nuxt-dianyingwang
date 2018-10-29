<template>
  <div class="top-container">
   <div class="top">
     <div id="logo" class="top-left">
       <h2><a href="http://www.dfdy5.com/">巅峰电影网</a></h2>
     </div>
     <div class="top-middle">
       <p :class="{active: active == 1}"><a :href="active == 1 ? 'javascript:void;' : '/'">首页</a></p>
       <p :class="{active: active == 2}"><a :href="active == 2 ? 'javascript:void;' : '/movies/0/0/1.html'">电影</a></p>
       <p :class="{active: active == 3}"><a :href="active == 3 ? 'javascript:void;' : '/tv/0/0/1.html'">电视剧</a></p>
       <p :class="{active: active == 4}"><a :href="active == 4 ? 'javascript:void;' : '/duanshipin/1.html'">短视频</a></p>
     </div>
     <div class="top-right">
       <form action="javascript:void(0);" @submit="search()">
         <input v-model="keyword" placeholder="输入关键字" type="search">
         <button>搜索</button>
       </form>
     </div>
   </div>
  </div>
</template>

<script>
export default {
  props: ['active'],
  data () {
    return {
      keyword: ''
    }
  },
  methods: {
    search () {
      let keyword = this.keyword
      keyword = keyword.replace(/^\s+/, '')
      keyword = keyword.replace(/\s+$/, '')
      if (keyword.length >= 30) {
        this.$alert('请不要输入超过30个字符', '友情提示', {
          confirmButtonText: '确定',
          callback: action => {
            this.keyword = ''
          }
        })
      } else if (/[#%]/.test(keyword)) {
        this.$alert('请不要输入非法字符，如：#，%', '友情提示', {
          confirmButtonText: '确定',
          callback: action => {
            this.keyword = ''
          }
        })
      } else if (!keyword) {
        this.$alert('请输入有效字符', '友情提示', {
          confirmButtonText: '确定',
          callback: action => {
            this.keyword = ''
          }
        })
      } else {
        window.open('/search/' + keyword + '/1.html?type=movie', '_blank')
      }
    }
  }
}
</script>

<style lang="less">
@import 'element-ui/lib/theme-chalk/index.css';
@import '../css/head.less';
</style>