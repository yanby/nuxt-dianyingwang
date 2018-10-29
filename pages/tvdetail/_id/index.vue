<template>
  <section class="container">
    <Header active="0"></Header>
    <div class="main-container" v-if="movie.mainContent">
      <div class="main">
        <div class="main-top">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item><a href="/">首页</a></el-breadcrumb-item>
            <el-breadcrumb-item><a :href='"/tv/"+movie.mainContent.type1+"/0/1.html"'>{{typeName}}</a></el-breadcrumb-item>
            <el-breadcrumb-item>{{movie.mainContent.title1}}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="main-detail">
          <div class="main-detail-left">
            <img :src="movie.mainContent.image4 ? 'http://static.biedese.cn/image2/' + movie.mainContent.image4 : 'http://image.dfdy5.com/dianfeng/dianshiju/' + movie.mainContent.image1 + '.jpg'" :alt="movie.mainContent.title1 + '在线观看'">
          </div>
          <div class="main-detail-right">
            <h1>{{movie.mainContent.title1}}</h1>
            <p>
              <span>类型：</span><span>{{movie.mainContent.tag}}</span>
            </p>
            <p>
              <span>地区：</span><span>{{movie.mainContent.area1}}</span>
            </p>
            <p>
              <span>年份：</span><span>{{movie.mainContent.publishTime && movie.mainContent.publishTime.slice(0, 4)}}</span>
            </p>
            <p>
              <span>上映：</span><span>{{movie.mainContent.publishTime && movie.mainContent.publishTime.slice(0, 10)}}</span>
            </p>
            <p>
              <span>导演：</span><span>{{movie.mainContent.director}}</span>
            </p>
            <p>
              <span>主演：</span><span>{{movie.mainContent.actors}}</span>
            </p>
            <p>
              <span>豆瓣：</span><span>{{movie.mainContent.extend3 || '暂无评分'}}</span>
            </p>
            <div v-if="allPageNum.fullPageNum <= 0 && !allPageNum.lastPageSize">
              <p style="text-align:center;">
                <img :src="movie.mainContent.image2" v-if="movie.mainContent.image2 + '.jpg'" :alt="movie.mainContent.title1 + '百度云资源'">
                <span v-if="!movie.mainContent.image2">暂无片源</span>
              </p>
              <p style="text-align:center;">
                <strong>打开微信，扫码进入微信公众号“兜乐互娱”</strong>
                <!-- <strong>打开微信，扫码进入微信公众号“兜乐互娱”，<br>即可获得《{{movie.mainContent.title1}}》影片百度云盘资源，<br>在线观看、迅雷下载（完全免费、放心）</strong> -->
              </p>
            </div>
            <div v-if="allPageNum.fullPageNum >= 0 && allPageNum.lastPageSize" class="subcontent">
              <div class="subpagernation-wrap">
                <div class="subpagernation">
                  <span :class="{selected: index + 1 === page + 1}" @click="changePage(index + 1)" v-for="(item, index) in allPageNum.fullPageNum" :key="'seletc' + index">{{index * 30 + 1}}-{{index * 30 + 30}}</span>
                  <span :class="{selected: allPageNum.fullPageNum + 1 === page + 1}" @click="changePage(allPageNum.fullPageNum + 1)">{{allPageNum.fullPageNum * 30 + 1}}-{{allPageNum.fullPageNum * 30 + allPageNum.lastPageSize}}</span>
                </div>
              </div>
              <div class="subpager">
                <a target="_blank" :href="'/tvdetail/'+$route.params.id.replace('.html', '')+'/'+subData[n + page * 30 - 1].id + '.html'" v-for="n in subCountInPage" :key="n">{{n + page * 30}}</a>
              </div>
            </div>
          </div>
        </div>
        <div class="main-abstract">
          <div class="main-abstract-header">《{{movie.mainContent.title1}}》电视剧剧情介绍</div>
          <div class="main-abstract-content" v-html="movie.mainContent.detail"></div>
        </div>
      </div>
      <div class="guess">
        <h3>猜你喜欢</h3>
        <ul class="move-list">
          <li v-for="(item, index) in guessList" v-if="item.mainContent" :key="index">
           <a :href="'/tvdetail/' + item.mainContent.id + '.html'" target="_blank">
             <img :src="item.mainContent.image4 ? 'http://static.biedese.cn/image2/' + item.mainContent.image4 : 'http://image.dfdy5.com/dianfeng/dianshiju/' + item.mainContent.image1 + '.jpg'" :alt="item.mainContent.title1 + '下载'">
             <span>{{item.mainContent.title1 || ''}}</span>
             <p :class="(+item.mainContent.extend3) ?'number':''">{{(+item.mainContent.extend3) ? item.mainContent.extend3 : '暂无评分'}}</p>
           </a>
          </li>
        </ul>
      </div>
    </div>
    <div class="ranking-container" v-if="movie.mainContent">
     <h3>最近更新</h3>
     <ul>
       <li class="ranking-item" v-for="(item, index) in rankingList1.slice(0, 12)" v-if="item.mainContent" :key="index">
         <a :href="'/tvdetail/' + item.mainContent.id + '.html'" target="_blank">
           <i>{{index + 1}}</i>
           <span class="score time">{{(item.mainContent.updateTime || '').slice(0, 10)}}</span>
           <span class="tite">{{item.mainContent.title1 || ''}}</span>
         </a>
       </li>
     </ul>
     <h3 style="margin-top:15px;">热门榜</h3>
     <ul>
       <li class="ranking-item" v-for="(item, index) in rankingList2.slice(0, 12)" v-if="item.mainContent" :key="index">
         <a :href="'/tvdetail/' + item.mainContent.id + '.html'" target="_blank">
           <i>{{index + 1}}</i>
           <span class="score">{{(+item.mainContent.extend3) ? item.mainContent.extend3 : '暂无评分'}}</span>
           <span class="tite">{{item.mainContent.title1 || ''}}</span>
         </a>
       </li>
     </ul>
    </div>
    <div v-if="!movie.mainContent" style="margin-top:170px;"></div>
    <error-c v-if="!movie.mainContent"></error-c>
    <script type="application/ld+json" v-if="movie.mainContent">
     {
      "@context": "https://ziyuan.baidu.com/contexts/cambrian.jsonld",
      "@id": "http://www.dfdy5.com/tvdetail/{{$route.params.id}}",
      "title": "{{this.TDK.T}}",
      "images": [
        "{{movie.mainContent.image4 ? 'http://static.biedese.cn/image2/' + movie.mainContent.image4 : 'http://image.dfdy5.com/dianfeng/dianshiju/' + movie.mainContent.image1 + '.jpg'}}",
        "{{movie.mainContent.image2}}"
      ],
      "description": "{{this.TDK.D}}",
      "pubDate": "{{pubDate}}",
      "upDate": "{{upDate}}"
     }
    </script>
  </section>
</template>

<script>
import { getType1List, getContent, getSubContentsWithoutDetail, getContentListByType } from '~/api/movie.js'
import '~/common/index.js'
import Header from '~/components/Header.vue'
import ErrorC from '~/layouts/error.vue'

export default {
  validate ({ params }) {
    return /^\d+(\.html)?$/.test(params.id)
  },
  data () {
    return {
      keyword: '',
      page: 0
    }
  },
  computed: {
    upDate () {
      return new Date(this.movie.mainContent.updateTime).format('yyyy-MM-ddThh:mm:ss')
    },
    pubDate () {
      return new Date(this.movie.mainContent.createTime).format('yyyy-MM-ddThh:mm:ss')
    },
    typeName () {
      if (!this.movie.mainContent)
        return ''
      let type = this.type1List.filter(e => e.type1Code === +this.movie.mainContent.type1)
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
      if (!this.movie.mainContent)
        return {
        D: ``,
        K: ``,
        T: `404`
      }
      let typeName = this.typeName === '其他' ? '' : this.typeName
      return {
        D: `${this.movie.mainContent.title1.replace('电视剧', '')}电视剧全集完整版百度云资源，${this.movie.mainContent.title1.replace('电视剧', '')}高清完整版在线观看、迅雷下载，剧情简介:${this.movie.mainContent.detail.replace(/<[^>]+>/g, '').slice(0, 50)}...`,
        K: `${this.movie.mainContent.title1.replace('电视剧', '')}电视剧，${this.movie.mainContent.title1.replace('电视剧', '')}全集，${this.movie.mainContent.title1.replace('电视剧', '')}在线观看,${this.movie.mainContent.title1.replace('电视剧', '')}百度云`,
        T: `${this.movie.mainContent.title1.replace('电视剧', '')}全集_在线观看_百度云_${typeName.replace('电视剧', '')}电视剧_巅峰电影网`
      }
    },
    startIndex () {
      return Math.floor(Math.random()*(this.rankingList1.length - 6))
    }
  },
  async asyncData (_this) {
    let getContentMessage = {}
    getContentMessage.channelId = '23'
    getContentMessage.productCode = 'dianshiju'
    getContentMessage.contentId = _this.route.params.id.replace('.html', '')
    let data = await getContent(getContentMessage).catch(e => console.log(e))

    let getTypeListMessage = {}
    getTypeListMessage.pageNum = 1
    getTypeListMessage.pageSize = 100
    getTypeListMessage.channelId = '23'
    getTypeListMessage.productCode = 'dianshiju'
    
    let getSubContentsWithoutDetailReq = {}
    getSubContentsWithoutDetailReq.productCode = 'dianshiju'
    getSubContentsWithoutDetailReq.pageNum = 1
    getSubContentsWithoutDetailReq.pageSize = 1000
    getSubContentsWithoutDetailReq.channelId = '23'
    getSubContentsWithoutDetailReq.mainId = _this.route.params.id.replace('.html', '')

    let type1 = data.data.contentSource.content.mainContent && data.data.contentSource.content.mainContent.type1
    let type2 = data.data.contentSource.content.mainContent && data.data.contentSource.content.mainContent.type2

    let getRankingList1Message = {}
    getRankingList1Message.type1Code = type1
    getRankingList1Message.type2Code = 0
    getRankingList1Message.productCode = 'dianyingzhan'
    getRankingList1Message.pageNum = 1
    getRankingList1Message.pageSize = 15
    getRankingList1Message.onlyType1 = false
    getRankingList1Message.channelId = '23'
    getRankingList1Message.sort = 'update_time'
    getRankingList1Message.sortType = 'DESC'

    let getRankingList2Message = {}
    getRankingList2Message.type1Code = type1
    getRankingList2Message.type2Code = 0
    getRankingList2Message.productCode = 'dianyingzhan'
    getRankingList2Message.pageNum = 1
    getRankingList2Message.pageSize = 15
    getRankingList2Message.onlyType1 = false
    getRankingList2Message.channelId = '23'
    getRankingList2Message.sortType = 'DESC'

    let getRankingList3Message = {}
    getRankingList3Message.type1Code = type1
    getRankingList3Message.type2Code = 0
    getRankingList3Message.productCode = 'dianyingzhan'
    getRankingList3Message.pageNum = 1
    getRankingList3Message.pageSize = 6
    getRankingList3Message.onlyType1 = false
    getRankingList3Message.channelId = '23'
    getRankingList3Message.sort = 'random'
    getRankingList3Message.sortType = 'DESC'

    let allDataRes = await Promise.all([
      getContentListByType(getRankingList1Message),
      getContentListByType(getRankingList2Message),
      getType1List(getTypeListMessage),
      getSubContentsWithoutDetail(getSubContentsWithoutDetailReq),
      getContentListByType(getRankingList3Message)
    ])

    return {
      movie: data.data.contentSource.content,
      rankingList1: allDataRes[0].data.contentList,
      rankingList2: allDataRes[1].data.contentList,
      type1List: allDataRes[2].data.typeList || [],
      subData: allDataRes[3].data.subs.subContentList,
      guessList: allDataRes[4].data.contentList
    }
  },
  methods: {
    changePage (page) {
      this.page = page - 1
    },
    getFullPage (num) {
      let fullPage = {}
      fullPage.fullPageNum = Math.floor(num / 30)
      fullPage.lastPageSize = num % 30
      return fullPage
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
  components: {
    Header,
    ErrorC
  }
}
</script>

<style lang="less">
@import '../../../css/ranking.less';
@import '../../../css/detail.less';
</style>