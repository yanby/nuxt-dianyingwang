<template>
  <div>
    <section class="container">
     <Header active="1"></Header>
     <div class="hot-container">
       <div class="hot-content">
         <h2>热门电影</h2>
         <ul class="move-list">
           <li v-for="(item, index) in moveList" v-if="item.mainContent" :key="index">
             <a :href="'/detail/' + item.mainContent.id + '.html'" target="_blank">
               <img :src="item.mainContent.image4 ? 'http://static.biedese.cn/image2/' + item.mainContent.image4 : 'http://image.dfdy5.com/dianfeng/index/' + item.mainContent.image1 + '.jpg'" :alt="item.mainContent.title1 + '下载'">
               <span>{{item.mainContent.title1 || ''}}</span>
               <p :class="(+item.mainContent.extend3) ?'number':''">{{(+item.mainContent.extend3) ? item.mainContent.extend3 : '暂无评分'}}</p>
             </a>
           </li>
         </ul>
       </div>
       <div class="ranking-container">
         <h2>最近更新</h2>
         <ul>
           <li class="ranking-item" v-for="(item, index) in rankingList1.slice(0, 15)" v-if="item.mainContent" :key="index">
             <a :href="'/detail/' + item.mainContent.id + '.html'" target="_blank">
               <i>{{index + 1}}</i>
               <span class="score time">{{(item.mainContent.updateTime || '').slice(0, 10)}}</span>
               <span class="tite">{{item.mainContent.title1 || ''}}</span>
             </a>
           </li>
         </ul>
         <h2 style="margin-top:15px;">好看的电影排行榜</h2>
         <ul>
           <li class="ranking-item" v-for="(item, index) in rankingList2.slice(0, 15)" v-if="item.mainContent" :key="index">
             <a :href="'/detail/' + item.mainContent.id + '.html'" target="_blank">
               <i>{{index + 1}}</i>
               <span class="score">{{(+item.mainContent.extend3) ? item.mainContent.extend3 : '暂无评分'}}</span>
               <span class="tite">{{item.mainContent.title1 || ''}}</span>
             </a>
           </li>
         </ul>
         <p class="more"><a href="/movies/0/0/1.html">更多电影>></a></p>
       </div>
       <div class="clearfix"></div>
     </div>
     <div class="hot-container">
        <div class="hot-content">
          <h2>热门电视剧</h2>
           <ul class="move-list">
             <li v-for="(item, index) in tvList" v-if="item.mainContent" :key="index">
               <a :href="'/tvdetail/' + item.mainContent.id + '.html'" target="_blank">
                 <div class="imgwrap">
                   <img :src="item.mainContent.image4 ? 'http://static.biedese.cn/image2/' + item.mainContent.image4 : 'http://image.dfdy5.com/dianfeng/dianshiju/' + item.mainContent.image1 + '.jpg'" :alt="item.mainContent.title1 + '下载'">
                 </div>
                 <span>{{item.mainContent.title1 || ''}}</span>
                 <i>全{{item.mainContent.subCount || ''}}集</i>
                 <p :class="(+item.mainContent.extend3) ?'number':''">{{(+item.mainContent.extend3) ? item.mainContent.extend3 : '暂无评分'}}</p>
               </a>
             </li>
           </ul>
        </div>
        <div class="ranking-container">
         <h2>最近更新</h2>
         <ul>
           <li class="ranking-item" v-for="(item, index) in rankingList3.slice(0, 15)" v-if="item.mainContent" :key="index">
             <a :href="'/tvdetail/' + item.mainContent.id + '.html'" target="_blank">
               <i>{{index + 1}}</i>
               <span class="score time">{{(item.mainContent.updateTime || '').slice(0, 10)}}</span>
               <span class="tite">{{item.mainContent.title1 || ''}}</span>
             </a>
           </li>
         </ul>
         <h2 style="margin-top:15px;">好看的电视剧排行榜</h2>
         <ul>
           <li class="ranking-item" v-for="(item, index) in rankingList4.slice(0, 15)" v-if="item.mainContent" :key="index">
             <a :href="'/tvdetail/' + item.mainContent.id + '.html'" target="_blank">
               <i>{{index + 1}}</i>
               <span class="score">{{(+item.mainContent.extend3) ? item.mainContent.extend3 : '暂无评分'}}</span>
               <span class="tite">{{item.mainContent.title1 || ''}}</span>
             </a>
           </li>
         </ul>
         <p class="more"><a href="/tv/0/0/1.html">更多电视剧>></a></p>
        </div>
        <div class="clearfix"></div>
     </div>
    </section>
   <div class="footer-index" v-html="youqinglianjie"></div>
   <script v-if="moveList.length && tvList.length" type="application/ld+json">
     {
      "@context": "https://ziyuan.baidu.com/contexts/cambrian.jsonld",
      "@id": "http://www.dfdy5.com",
      "title": "巅峰电影网_全网最新高清1080p电影大全_在线观看_电影下载",
      "images": [
        "{{moveList[0].mainContent.image4 ? 'http://static.biedese.cn/image2/' + moveList[0].mainContent.image4 : 'http://image.dfdy5.com/dianfeng/index/' + moveList[0].mainContent.image1 + '.jpg'}}",
        "{{tvList[0].mainContent.image4 ? 'http://static.biedese.cn/image2/' + tvList[0].mainContent.image4 : 'http://image.dfdy5.com/dianfeng/index/' + tvList[0].mainContent.image1 + '.jpg'}}"
      ],
      "description": "巅峰电影网拥有全网海量电影资源,是一个完全免费的电影大全网站,高清1080p电影在线观看、迅雷下载就在巅峰电影网（www.dfdy5.com）。",
      "pubDate": "2018-08-10T15:00:01",
      "upDate": "{{upDate}}"
     }
   </script>
  </div>
</template>

<script>
import { getHomeData, getContent, getContentListByType } from '~/api/movie.js'
import '~/common/index.js'
import Header from '~/components/Header.vue'

export default {
  head () {
    return {
      attribute: null,
      title: '巅峰电影网_免费在线观看_迅雷下载_全网高清电影大全网站',
      meta: [
        { name: 'description', content: '巅峰电影网拥有全网海量电影资源,是一个完全免费的电影大全网站,高清1080p电影在线观看、迅雷下载就在巅峰电影网（www.dfdy5.com）。' },
        { name: 'keywords', content: '最新电影，电影大全，在线观看，免费电影下载，巅峰电影网，巅峰影院' },
        { charset: 'utf-8' }
      ]
    }
  },
  data () {
    return {
      keyword: ''
    }
  },
  async asyncData () {
    let message = {}
    message.productCode = 'dianyingzhan'
    message.channelId = '23'
    message.pageNum = 1
    message.pageSize = 30
    message.sectionId = 1125

    let messageTv = {}
    messageTv.productCode = 'dianshiju'
    messageTv.channelId = '23'
    messageTv.pageNum = 1
    messageTv.pageSize = 30
    messageTv.sectionId = 1127

    let getContentMessage = {}
    getContentMessage.productCode = 'dianyingzhan'
    getContentMessage.channelId = '23'
    getContentMessage.contentId = 364068

    let getRankingList1Message = {}
    getRankingList1Message.type1Code = 0
    getRankingList1Message.type2Code = 0
    getRankingList1Message.productCode = 'dianyingzhan'
    getRankingList1Message.pageNum = 1
    getRankingList1Message.pageSize = 15
    getRankingList1Message.onlyType1 = false
    getRankingList1Message.channelId = '23'
    getRankingList1Message.sort = 'update_time'
    getRankingList1Message.sortType = 'DESC'

    let getRankingList2Message = {}
    getRankingList2Message.type1Code = 0
    getRankingList2Message.type2Code = 0
    getRankingList2Message.productCode = 'dianyingzhan'
    getRankingList2Message.pageNum = 1
    getRankingList2Message.pageSize = 15
    getRankingList2Message.onlyType1 = false
    getRankingList2Message.channelId = '23'
    getRankingList2Message.sortType = 'DESC'

    let getRankingList3Message = {}
    getRankingList3Message.type1Code = 0
    getRankingList3Message.type2Code = 0
    getRankingList3Message.productCode = 'dianshiju'
    getRankingList3Message.pageNum = 1
    getRankingList3Message.pageSize = 15
    getRankingList3Message.onlyType1 = false
    getRankingList3Message.channelId = '23'
    getRankingList3Message.sort = 'update_time'
    getRankingList3Message.sortType = 'DESC'

    let getRankingList4Message = {}
    getRankingList4Message.type1Code = 0
    getRankingList4Message.type2Code = 0
    getRankingList4Message.productCode = 'dianshiju'
    getRankingList4Message.pageNum = 1
    getRankingList4Message.pageSize = 15
    getRankingList4Message.onlyType1 = false
    getRankingList4Message.channelId = '23'
    getRankingList4Message.sortType = 'DESC'

    let allDataRes = await Promise.all([
      getHomeData(message),
      getHomeData(messageTv),
      getContent(getContentMessage),
      getContentListByType(getRankingList1Message),
      getContentListByType(getRankingList2Message),
      getContentListByType(getRankingList3Message),
      getContentListByType(getRankingList4Message)
    ])

    return {
      moveList: allDataRes[0].data.contentList,
      tvList: allDataRes[1].data.contentList,
      youqinglianjie: allDataRes[2].data.contentSource.content.mainContent.detail,
      rankingList1: allDataRes[3].data.contentList,
      rankingList2: allDataRes[4].data.contentList,
      rankingList3: allDataRes[5].data.contentList,
      rankingList4: allDataRes[6].data.contentList
    }
  },
  computed: {
    upDate () {
      let upDate
      this.rankingList1.forEach(e => {
        upDate = upDate > new Date(e.mainContent.updateTime) ? upDate : new Date(e.mainContent.updateTime)
      })
      this.rankingList3.forEach(e => {
        upDate = upDate > new Date(e.mainContent.updateTime) ? upDate : new Date(e.mainContent.updateTime)
      })
      return upDate.format('yyyy-MM-ddThh:mm:ss')
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
    }
  },
  mounted () {
    document.body.onscroll = (e => {
      var left = document.documentElement.scrollLeft
      document.getElementsByClassName('top-container')[0].style.left = -left + 'px'
    })
  },
  components: {
    Header
  }
}
</script>

<style lang="less">
@import 'element-ui/lib/theme-chalk/index.css';
@import '../css/ranking.less';
body{
  // background-color:#000;
  background-color:#f6f6f9;
}
.container{
  width:1200px;
  margin:0 auto;
  padding-top:90px;
}
h2{
  position: relative;
  margin-bottom: 15px;
  border-bottom: 1px solid #ccc;
  font-weight: 400;
  font-size: 20px;
  font-weight:bold;
  padding: 10px 0;
  border-left: 4px solid #1db69a;
  padding-left: 10px;
}
.hot-container{
  width:1200px;
  .hot-content{
    width:940px;
    float:left;
  }
}
.move-list{
  display:flex;
  flex-wrap: wrap;
  width:940px;
  li{
    margin-bottom:5px;
    padding:5px 0px;
    margin-right:20px;
    width:140px;
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
      width:140px;
      height:200px;
    }
    img{
      width:140px;
      height:200px;
    }
    span{
      margin-top:5px;
      text-align: center;
      font-size: 16px;
      display:block;
      overflow:hidden;
      // color:#fff;
      color:#333;
      line-height: 1.5em;
      height:1.5em;
    }
    p{
      text-align: center;
      color:#ffb400;
      font-size: 18px;
      margin-top:5px;
      &.number{
        font-style: italic;
      }
    }
    i{
      position:absolute;
      right:0;
      top:179px;
      color:#fff;
      background-color:rgba(0, 0, 0, .5);
      padding:0 5px;
    }
  }
}
.footer-index {
  background-color: #262426;
  padding: 10px 0;
  margin: 0 auto;
  min-width: 1200px;
  margin-bottom: -132px;
  margin-top: 82px;
  text-align: center;
  color:#666;
  font-size: 14px;
  line-height: 20px;
  p{
    width:1080px;
    margin:0 auto;
  }
}
.footer-index a{
  color:#666;
  font-size: 14px;
  line-height: 20px;
}
.footer-index a:hover{
  text-decoration: underline;
}
.more{
  text-align:right;
  padding-bottom:20px;
  margin-top:20px;
  a{
    color:#ef4238;
    font-size: 18px;
  }
}
</style>
