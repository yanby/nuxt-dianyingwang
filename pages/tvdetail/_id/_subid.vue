<template>
  <section class="container">
    <Header active="0"></Header>
    <div v-if="maindata.mainContent && movie" class="main">
      <div class="main-top">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item><a href="/">首页</a></el-breadcrumb-item>
          <el-breadcrumb-item><a :href='"/tv/"+maindata.mainContent.type1+"/0/1.html"'>{{typeName}}</a></el-breadcrumb-item>
          <el-breadcrumb-item><a :href='"/tvdetail/"+maindata.mainContent.id+".html"'>{{maindata.mainContent.title1}}</a></el-breadcrumb-item>
          <el-breadcrumb-item>{{movie.title1}}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="main-detail">
        <div class="main-detail-left">
          <div v-if="allPageNum.fullPageNum >= 0 && allPageNum.lastPageSize" class="subcontent">
            <div class="subpagernation-wrap">
              <div class="subpagernation">
                <span :class="{selected: index + 1 === page + 1}" @click="changePage(index + 1)" v-for="(item, index) in allPageNum.fullPageNum" :key="'seletc' + index">{{index * 30 + 1}}-{{index * 30 + 30}}</span>
                <span :class="{selected: allPageNum.fullPageNum + 1 === page + 1}" @click="changePage(allPageNum.fullPageNum + 1)">{{allPageNum.fullPageNum * 30 + 1}}-{{allPageNum.fullPageNum * 30 + allPageNum.lastPageSize}}</span>
              </div>
            </div>
            <div class="subpager">
              <a :class="{selected:(n + page * 30) == (movie.subSeq)}" :href="'/tvdetail/'+$route.params.id.replace('.html', '')+'/'+subData[n + page * 30 - 1].id + '.html'" v-for="n in subCountInPage" :key="n"><span>{{n + page * 30}}</span></a>
            </div>
          </div>
          <div v-else>暂无剧集</div>
        </div>
        <div class="main-detail-right">
          <p>
            <img :src="maindata.mainContent.image2" v-if="maindata.mainContent.image2 + '.jpg'" :alt="maindata.mainContent.title1 + '第' + (movie.subSeq) + '集' + '百度云资源'">
            <span v-if="!maindata.mainContent.image2">暂无片源</span>
          </p>
          <p>
            <strong>打开微信，扫码进入微信公众号“兜乐互娱”</strong>
            <!-- <strong>打开微信，扫码进入微信公众号“兜乐互娱”，<br>即可获得《{{maindata.mainContent.title1}}》影片百度云盘资源，<br>
            在线观看、迅雷下载（完全免费、放心）</strong> -->
          </p>
        </div>
      </div>
      <div class="main-abstract">
        <div class="main-abstract-header">{{maindata.mainContent.title1}}{{movie.title1}}剧情介绍</div>
        <div class="main-abstract-content" v-html="movie.detail.replace(/<p>(\S{0,20})<\/p>/g,'')"></div>
      </div>
    </div>
    <div v-if="!maindata.mainContent || !movie" style="margin-top:170px;"></div>
    <error-c v-if="!maindata.mainContent || !movie"></error-c>
    <script v-if="maindata.mainContent && movie" type="application/ld+json">
     {
      "@context": "https://ziyuan.baidu.com/contexts/cambrian.jsonld",
      "@id": "http://www.dfdy5.com/tvdetail/{{$route.params.id}}/{{$route.params.subid}}",
      "title": "{{this.TDK.T}}",
      "images": [
        "{{maindata.mainContent.image2}}"
      ],
      "description": "{{this.TDK.D}}",
      "pubDate": "{{pubDate}}",
      "upDate": "{{upDate}}"
     }
    </script>
  </section>
</template>

<script>
import { getType1List, getContent, getSubContentsWithoutDetail } from '~/api/movie.js'
import '~/common/index.js'
import Header from '~/components/Header.vue'
import ErrorC from '~/layouts/error.vue'

export default {
  validate ({ params }) {
    return /^\d+(\.html)?$/.test(params.subid) && /^\d+$/.test(params.id)
  },
  data () {
    return {
      keyword: '',
      page: 0
    }
  },
  computed: {
    upDate () {
      return new Date(this.movie.updateTime).format('yyyy-MM-ddThh:mm:ss')
    },
    pubDate () {
      return new Date(this.movie.createTime).format('yyyy-MM-ddThh:mm:ss')
    },
    typeName () {
      let type = this.type1List.filter(e => e.type1Code === +this.maindata.mainContent.type1)
      let typeName = type[0] ? type[0].name : '全部'
      return typeName.indexOf('电视剧') >=0 ? typeName : (typeName + '电视剧')
    },
    allPageNum: function () {
      return this.getFullPage(this.subData.length)
    },
    subCountInPage () {
      let totalPage = Math.ceil(this.subData.length / 30)
      if (this.page + 1 >= totalPage) {
        return this.subData.length % 30 || 30
      } else {
        return 30
      }
    },
    TDK () {
      if (!this.maindata.mainContent || !this.movie) {
        return {
          D: ``,
          K: ``,
          T: `404`
        }
      }
      return {
        D: `${this.maindata.mainContent.title1.replace('电视剧', '')}第${this.movie.subSeq}集百度云资源，${this.maindata.mainContent.title1.replace('电视剧', '')}在线观看、迅雷下载，剧情简介:${this.movie.detail.replace(/<[^>]+>/g, '').slice(0, 50)}...`,
        K: `${this.maindata.mainContent.title1.replace('电视剧', '')}在线播放，${this.maindata.mainContent.title1.replace('电视剧', '')}第${this.movie.subSeq}集在线播放，${this.maindata.mainContent.title1.replace('电视剧', '')}百度云,${this.maindata.mainContent.title1.replace('电视剧', '')}迅雷下载`,
        T: `正在播放_${this.maindata.mainContent.title1.replace('电视剧', '')}_第${this.movie.subSeq}集_百度云_迅雷下载_巅峰电影网`
      }
    }
  },
  async asyncData (_this) {
    let getTypeListMessage = {}
    getTypeListMessage.pageNum = 1
    getTypeListMessage.pageSize = 100
    getTypeListMessage.productCode = 'dianshiju'
    getTypeListMessage.channelId = '23'
    
    let getContentMessage = {}
    getContentMessage.productCode = 'dianshiju'
    getContentMessage.channelId = '23'
    getContentMessage.isMain = 1
    getContentMessage.contentId = _this.route.params.id.replace('.html', '')

    let getSubContentMessage = {}
    getSubContentMessage.productCode = 'dianshiju'
    getSubContentMessage.channelId = '23'
    getSubContentMessage.isMain = 0
    getSubContentMessage.contentId = _this.route.params.subid.replace('.html', '')

    let getSubContentsWithoutDetailReq = {}
    getSubContentsWithoutDetailReq.productCode = 'dianshiju'
    getSubContentsWithoutDetailReq.pageNum = 1
    getSubContentsWithoutDetailReq.pageSize = 1000
    getSubContentsWithoutDetailReq.channelId = '23'
    getSubContentsWithoutDetailReq.mainId = _this.route.params.id.replace('.html', '')

    let allDataRes = await Promise.all([
      getType1List(getTypeListMessage),
      getContent(getContentMessage),
      getContent(getSubContentMessage),
      getSubContentsWithoutDetail(getSubContentsWithoutDetailReq)
    ])

    return {
      movie: allDataRes[2].data.contentSource.content.subContentList && allDataRes[2].data.contentSource.content.subContentList[0],
      type1List: allDataRes[0].data.typeList || [],
      maindata: allDataRes[1].data.contentSource.content,
      subData: allDataRes[3].data.subs.subContentList
    }
  },
  methods: {
    changePage (page) {
      this.page = page - 1
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
    getFullPage (num) {
      let fullPage = {}
      fullPage.fullPageNum = Math.floor(num / 30)
      fullPage.lastPageSize = num % 30
      return fullPage
    }
  },
  head () {
    return {
      title: this.TDK.T,
      meta: [
        { hid: 'description', name: 'description', content: this.TDK.D},
        { hid: 'keywords', name: 'keywords', content: this.TDK.K },
        { charset: 'utf-8' }
      ]
    }
  },
  created () {
    if (!this.movie)
      return
    this.page = Math.ceil(this.movie.subSeq / 30) - 1
  },
  mounted () {
    document.body.onscroll = (e => {
      var left = document.documentElement.scrollLeft
      document.getElementsByClassName('top-container')[0].style.left = -left + 'px'
    })
  },
  components: {
    Header,
    ErrorC
  }
}
</script>

<style lang="less">
body{
  // background-color:#000;
  background-color:#f0f0f0;
}
.container{
  width:1200px;
  margin:0 auto;
}
.main{
  width:100%;
  margin-top:90px;
  border:1px solid #ccc;
  margin-bottom:20px;
  .main-top{
    height:50px;
    background-color:#edeff1;
    box-shadow: 0 1px 2px rgba(0,0,0,.1);
    line-height: 50px;
    padding-left:35px;
    .el-breadcrumb__inner{
      line-height: 50px;
    }
  }
  .main-detail{
    padding:15px 20px;
    overflow:hidden;
    background-color:#fff;
    .main-detail-left{
      float:left;
      width:576px;
      height:400px;
      img {
        width:360px;
        height:528px;
      }
    }
    .main-detail-right{
      float:left;
      width:582px;
      padding-left:20px;
      text-align:center;
      h1{
        font-size: 24px;
        color: #5a5e5f;
        margin-bottom:10px;
      }
      p{
        color:#575a5a;
        font-size: 12px;
        line-height: 24px;
      }
      .detailHeader{
        font-size: 40px;
        line-height: 1.5em;
        color:#333;
      }
      .detailContent{
        font-size: 18px;
        line-height:1.5em;
        color:#333;
      }
      img{
        width:200px;
        height:200px;
      }
      strong{
        font-size:25px;
        color:red;
        line-height:43px;
      }
    }
  }
  .main-abstract{
    background-color: #f8f8f8;
    padding-bottom:20px;
    .main-abstract-header{
      border-left:4px solid #00b2c2;
      height:40px;
      line-height: 40px;
      padding-left:10px;
    }
    .main-abstract-content{
      padding:0 20px;
      line-height: 1.8em;
      p{
        line-height: 2em;
        margin-bottom:10px;
        text-indent:2em;
      }
    }
  }
}
.subcontent{
  height:391px;
  color:#666;
  .subpagernation{
    background-color:#ccc;
    overflow:hidden;
    height:55px;
    span{
      display:block;
      float:left;
      font-size: 19px;
      width:72px;
      text-align:center;
      line-height: 55px;
      cursor:pointer;
      &.selected{
        color:#2692db;
      }
    }
  }
  .subpager{
    background-color:#f8f8f8;
    overflow:hidden;
    height:336px;
    a{
      display:block;
      color:#666;
      float:left;
      width:72px;
      height:86px;
      text-align:center;
      line-height: 86px;
      font-size: 22px;
      span{
        display:block;
        color:#666;
        width:72px;
        height:72px;
        text-align:center;
        line-height: 72px;
        font-size: 22px;
        border-radius:50%;
      }
      &:hover span, &.selected span{
        color:#2692db;
        background-color:#f1f1f1;
      }
    }
  }
}
</style>
