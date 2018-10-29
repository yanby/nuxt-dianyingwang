<template>
  <section class="container">
    <Header active="3"></Header>
    <div class="breadcrumbContainer">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><a href="/">首页</a></el-breadcrumb-item>
        <el-breadcrumb-item>{{typeName}}电视剧</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="types">
     <ul class="types-contanier">
       <li class="types-content">
         <div class="type-name">类型：</div>
         <ul class="tag-container">
          <li :class="['tags', {selected: type1 == '0'}]">
            <a :href="'/tv/' + '0' + '/' + type2 + '/1.html'">全部</a>
          </li>
           <li :class="['tags', {selected: item.type1Code == type1}]" v-for="(item, index) in type1List" :key="index + 'type1'">
             <a :href="'/tv/' + item.type1Code + '/' + type2 + '/1.html'">{{item.name}}</a>
           </li>
         </ul>
       </li>
       <li class="types-content">
         <div class="type-name">年代：</div>
         <ul class="tag-container">
          <li :class="['tags', {selected: type2 == '0'}]">
            <a :href="'/tv/' + type1 + '/' + '0' + '/1.html'">全部</a>
          </li>
           <li :class="['tags', {selected: item.type2Code == type2}]" v-for="(item, index) in type2List" :key="index + 'type2'">
             <a :href="'/tv/' + type1 + '/' + item.type2Code + '/1.html'">{{item.name}}</a>
           </li>
         </ul>
       </li>
     </ul>
    </div>
    <ul class="move-list">
     <li v-for="(item, index) in moveList.contentList" :key="index">
       <a :href="'/tvdetail/' + item.mainContent.id + '.html'" target="_blank">
         <div class="imgwrap">
           <img :alt="item.mainContent.title1 + '下载'" :src="item.mainContent.image4 ? 'http://static.biedese.cn/image2/' + item.mainContent.image4 : 'http://image.dfdy5.com/dianfeng/dianshiju/' + item.mainContent.image1 + '.jpg'">
         </div>
         <span>{{item.mainContent.title1 || ''}}</span>
         <i>全{{item.mainContent.subCount || ''}}集</i>
         <p :class="(+item.mainContent.extend3) ?'number':''">{{(+item.mainContent.extend3) ? item.mainContent.extend3 : '暂无评分'}}</p>
       </a>
     </li>
    </ul>
    <div class="fenlei-pager">
      <el-pagination
        v-if="moveList.totalPage"
        background
        layout="prev, slot, next, jumper"
        :goto='"跳转"'
        prev-text="上一页"
        next-text="下一页"
        :current-page="moveList.currPageNum"
        @current-change="changePage"
        :page-count="moveList.totalPage">
        <my-pager :currentPage="+moveList.currPageNum" :pageCount="+moveList.totalPage" :pagerCount="7" :disabled="false" :path="'/tv/'+type1+'/'+type2+'/'"></my-pager>
      </el-pagination>
    </div>
    <script type="application/ld+json" v-if="moveList.contentList[0]">
     {
      "@context": "https://ziyuan.baidu.com/contexts/cambrian.jsonld",
      "@id": "http://www.dfdy5.com/tv/{{type1}}/{{type2}}/{{pageNum}}.html",
      "title": "{{this.TDK.T}}",
      "images": [
        "{{moveList.contentList[0].mainContent.image4 ? 'http://static.biedese.cn/image2/' + moveList.contentList[0].mainContent.image4 : 'http://image.dfdy5.com/dianfeng/dianshiju/' + moveList.contentList[0].mainContent.image1 + '.jpg'}}"
      ],
      "description": "{{this.TDK.D}}",
      "pubDate": "2018-08-10T15:00:01",
      "upDate": "{{upDate}}"
     }
    </script>
  </section>
</template>

<script>
import { getType1List, getType2List, getContentListByType } from '../../../../api/movie.js'
import '~/common/index.js'
import MyPager from '~/components/MyPager.vue'
import Header from '~/components/Header.vue'

export default {
  validate ({ params }) {
    // Must be a number
    return /^\d+$/.test(params.type1) && /^\d+$/.test(params.type2) && /^\d+(\.html)?$/.test(params.pageNum)
  },
  head () {
    let arr = []

    if (this.pageNum <= 1 && this.moveList.totalPage > 1) {
      arr.push({ rel: 'next', href: 'http://www.dfdy5.com/tv/'+this.type1+'/'+this.type2+'/'+(this.pageNum+1)+'.html' })
    } else if (this.pageNum > 1 && this.pageNum < this.moveList.totalPage) {
      arr.push({ rel: 'prev', href: 'http://www.dfdy5.com/tv/'+this.type1+'/'+this.type2+'/'+(this.pageNum-1)+'.html' })
      arr.push({ rel: 'next', href: 'http://www.dfdy5.com/tv/'+this.type1+'/'+this.type2+'/'+(this.pageNum+1)+'.html' })
    } else if (this.pageNum >= this.moveList.totalPage && this.moveList.totalPage > 1) {
      arr.push({ rel: 'prev', href: 'http://www.dfdy5.com/tv/'+this.type1+'/'+this.type2+'/'+(this.pageNum-1)+'.html' })
    }
    return {
      title: this.TDK.T,
      meta: [
        { hid: 'description', name: 'description', content: this.TDK.D },
        { hid: 'keywords', name: 'keywords', content: this.TDK.K },
        { charset: 'utf-8' }
      ],
      link: arr
    }
  },
  data () {
    return {
      keyword: '',
      pageNum: +this.$route.params.pageNum.replace('.html', ''),
      type1: +this.$route.params.type1,
      type2: +this.$route.params.type2
    }
  },
  computed: {
    upDate () {
      let upDate
      this.moveList.contentList.forEach(e => {
        upDate = upDate > new Date(e.mainContent.updateTime) ? upDate : new Date(e.mainContent.updateTime)
      })
      return upDate.format('yyyy-MM-ddThh:mm:ss')
    },
    typeName () {
      let type = this.type1List.filter(e => e.type1Code === +this.type1)
      return type[0] ? type[0].name : ''
    },
    type2Name () {
      let type = this.type2List.filter(e => e.type2Code === +this.type2)
      return type[0] ? type[0].name : ''
    },
    TDK () {
      let typeName = this.typeName === '其他' ? '综合' : this.typeName
      let type2Name = this.type2Name === '更早' ? '早期' : this.type2Name
      if (typeName && type2Name) {
        return {
          D: `${type2Name}${typeName}电视剧下载、迅雷下载、在线观看、排行榜,${type2Name}${typeName}高清电视剧尽在巅峰电影网，${type2Name}${typeName}电视剧资源大全网站。`,
          K: `${type2Name}${typeName}电视剧下载，${type2Name}${typeName}电视剧迅雷下载，${type2Name}${typeName}电视剧在线观看，${type2Name}${typeName}电视剧排行榜,${type2Name}高清${typeName}电视剧资源`,
          T: `${type2Name}高清${typeName}电视剧资源大全_迅雷下载_在线观看_第${this.pageNum}页_巅峰电影网`
        }
      } else if (typeName && !type2Name) {
        return {
          D: `${typeName}电视剧下载、迅雷下载、在线观看、排行榜,${typeName}高清电视剧尽在巅峰电影网，${typeName}电视剧资源大全网站。`,
          K: `${typeName}电视剧下载，${typeName}电视剧迅雷下载，${typeName}电视剧在线观看，${typeName}电视剧排行榜,高清${typeName}电视剧资源`,
          T: `高清${typeName}电视剧资源大全_迅雷下载_在线观看_第${this.pageNum}页_巅峰电影网`
        }
      } else if (!typeName && type2Name) {
        return {
          D: `${type2Name}电视剧下载、迅雷下载、在线观看、排行榜,${type2Name}高清电视剧尽在巅峰电影网，${type2Name}电视剧资源大全网站。`,
          K: `${type2Name}电视剧下载，${type2Name}电视剧迅雷下载，${type2Name}电视剧在线观看，${type2Name}电视剧排行榜,${type2Name}高清电视剧资源`,
          T: `${type2Name}高清电视剧资源大全_迅雷下载_在线观看_第${this.pageNum}页_巅峰电影网`
        }
      } else if (!typeName && !type2Name) {
        return {
          D: `最新电视剧下载、迅雷下载、在线观看、排行榜,高清大全尽在巅峰电影网，全网最多的电视剧资源网站。`,
          K: `最新电视剧下载，迅雷下载，在线观看，电视剧排行榜,电视剧大全`,
          T: `最新高清电视剧大全_迅雷下载_在线观看_巅峰电影网`
        }
      }
    }
  },
  async asyncData (_this) {
    let getTypeListMessage = {}
    getTypeListMessage.pageNum = 1
    getTypeListMessage.pageSize = 100
    getTypeListMessage.productCode = 'dianshiju'
    getTypeListMessage.channelId = '23'
    
    let getContentListByTypeMessage = {}
    getContentListByTypeMessage.type1Code = _this.route.params.type1
    getContentListByTypeMessage.type2Code = _this.route.params.type2
    getContentListByTypeMessage.productCode = 'dianshiju'
    getContentListByTypeMessage.pageNum = _this.route.params.pageNum.replace('.html', '')
    getContentListByTypeMessage.pageSize = 30
    getContentListByTypeMessage.onlyType1 = false
    getContentListByTypeMessage.channelId = '23'

    let allDataRes = await Promise.all([
      getType1List(getTypeListMessage),
      getType2List(getTypeListMessage),
      getContentListByType(getContentListByTypeMessage)
    ])

    return {
      type1List: allDataRes[0].data.typeList || [],
      type2List: allDataRes[1].data.typeList || [],
      moveList: allDataRes[2].data
    }
  },
  methods: {
    delHtmlTag(str){
      return str.replace(/<[^>]+>/g,"");//去掉所有的html标记
    },
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
    },
    changePage (page) {
      if (this.jump) {
        return
      }
      this.jump = true
      location.href = (`/tv/${this.type1}/${this.type2}/${page}.html`)
    }
  },
  mounted () {
    document.body.onscroll = (e => {
      var left = document.documentElement.scrollLeft
      document.getElementsByClassName('top-container')[0].style.left = -left + 'px'
    })
  },
  components: {
    MyPager,
    Header
  }
}
</script>

<style lang="less">

body{
  // background-color:#000;
  background-color:#f1f1f1;
}
.container{
  width:1200px;
  margin:90px auto 0;
  background-color:#fff;
  padding-top:20px;
}
.types{
  padding: 0 20px;
  width:1120px;
  border:1px solid #e5e5e5;
  margin:20px auto;
  .types-content{
    overflow:hidden;
    padding: 10px 0;
    border-bottom:1px dotted #e5e5e5;
    &:last-child{
      border-bottom:0 none;
    }
    .type-name{
      color:#999;
      font-size: 14px;
      height:24px;
      line-height: 24px;
      float:left;
    }
    .tag-container{
      float:left;
      overflow:hidden;
      width:1028px;
      .tags{
        border-radius: 14px;
        padding: 3px 9px;
        display: inline-block;
        margin-left: 12px;
        color: #333;
        font-size: 14px;
        &.selected{
          background: #f34d41;
          a{
            color: #fff;
          }
        }
      }
    }
  }
  .tag-container{

  }
  .tags{

  }
}
.breadcrumbContainer{
  padding-left: 40px;
}
.move-list{
  display:flex;
  flex-wrap: wrap;
  width:100%;
  padding:0 25px;
  li{
    margin-bottom:30px;
    padding:5px 15px;
    width:190px;
    cursor:pointer;
    a{
      display:block;
      position:relative;
    }
    &:hover{
      box-shadow:0 0 10px 1px #bedf8f;
      // background-color:#b9b9b9;
    }
    &:nth-child(6n){
      margin-right:0;
    }
    .imgwrap{
      width:160px;
      height:220px;
    }
    img{
      width:160px;
      height:220px;
    }
    span{
      margin-top:10px;
      text-align: center;
      font-size: 16px;
      display:block;
      // color:#fff;
      color:#333;
    }
    p{
      text-align: center;
      color:#ffb400;
      font-size: 18px;
      margin-top:10px;
      &.number{
        font-style: italic;
      }
    }
    i{
      position:absolute;
      right:0;
      top:199px;
      color:#fff;
      background-color:rgba(0, 0, 0, .5);
      padding:0 5px;
    }
  }
}
.fenlei-pager{
  padding: 30px 0;
  text-align: center;
  .el-pagination button, .el-pagination .number{
    height:30px;
    font-size: 16px;
  }
  .el-pagination.is-background .btn-next, .el-pagination.is-background .btn-prev, .el-pagination.is-background .el-pager li{
    background-color:#fff;
    border:1px solid #ccc;
    padding:0 12px;
    &.number{
      padding:0;
      a{
        padding:0 12px;
        display:block;
      }
    }
  }
  .el-pagination.is-background .el-pager li:not(.disabled).active{
    background-color:#ef4238;
  }
  .el-pagination.is-background .el-pager li:not(.disabled):hover{
    color: rgb(96, 98, 102);
    border-color:#ef4238;
  }
}
</style>
