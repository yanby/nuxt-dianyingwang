<template>
  <section class="search-container">
    <Header active="0"></Header>
    <div class="search-box">
      <form name="2" action="javascript:void(0);" @submit="search()" class="search-box-container">
        <input type="search" placeholder="请输入关键字" autocomplete="off" v-model="keyword">
        <span target="_blank" tag="span" @click="search()"><img src="~/assets/images/search.png" alt=""></span>
      </form>
    </div>
    <div class="subnav">
      <a @click="changeChannel(1)" :class="{selected:channel==1}">电影（{{seachResult.totalSize}}）</a>
      <a @click="changeChannel(2)" :class="{selected:channel==2}">电视剧（{{seachResultTv.totalSize}}）</a>
      <!-- <a @click="changeChannel(3)" :class="{selected:channel==3}">短视频（{{seachResultDuanshipin.totalSize}}）</a> -->
    </div>
    <div class="container">
      <ul v-if="channel != 3" class="search-result-box">
        <li class="movie-item" v-for="(item,index) in result.content" :key="index">
          <a target="_blank" :href="'/'+(channel==1?'detail':'tvdetail')+'/' + item.mainContent.id + '.html'">
            <div class="img">
              <img :src="item.mainContent.image4 ? 'http://static.biedese.cn/image2/' + item.mainContent.image4 : (channel == 1 ? 'http://image.dfdy5.com/dianfeng/index/' + item.mainContent.image1 + '.jpg' : 'http://image.dfdy5.com/dianfeng/dianshiju/' + item.mainContent.image1 + '.jpg')" :alt="item.mainContent.title1 + '下载'">
            </div>
          </a>
          <div class="info">
            <a :href="'/'+(channel==1?'detail':'tvdetail')+'/' + item.mainContent.id + '.html'">
              <p class="movie-item-title">{{item.mainContent.title1}}</p>
            </a>
            <p class="movie-item-subtitle">{{item.mainContent.title2 === 'null' ? '' : item.mainContent.title2}}</p>
            <div class="score-info">
              <p :class="['channel-detail', {number: (+item.mainContent.extend3)}]">{{(+item.mainContent.extend3) ? item.mainContent.extend3 : '暂无评分'}}</p>
              <p class="movie-item-cat">{{item.mainContent.tag}}</p>
              <p v-if="item.mainContent.publishTime" class="movie-item-pub">{{item.mainContent.publishTime.slice(0, 10)}}上映</p>
            </div>
          </div>
        </li>
        <li class="empty-list" v-if="result.content.length==0">
          <h3>很抱歉，没有找到相关影视剧</h3>
          <dl>
            <dt>建议您：</dt>
            <dd>1.检查输入的关键词是否有误</dd>
            <dd>2.请缩短关键词</dd>
          </dl>
        </li>
      </ul>
      <ul class="duanshipin-list" v-if="channel == 3">
        <li @click="reportAndPlay(item.mainContent.playURL, item.mainContent.id)" v-for="(item, index) in result.content" :key="index">
          <a href="javascript:;">
           <div class="imgwrap">
             <img :alt="item.mainContent.title1 + '下载'" :src="item.mainContent.image4 ? 'http://static.biedese.cn/image2/' + item.mainContent.image4 : 'http://image.dfdy5.com/dianfeng/duanshipin/' + item.mainContent.image1 + '.jpg'">
             <div class="mask"></div>
           </div>
           <span class="title">{{item.mainContent.title1 || ''}}</span>
           <i v-if="item.mainContent.tag" :class="['tag', {p1080: item.mainContent.tag == '1080P'}]">{{item.mainContent.tag}}</i>
           <i class="duration">{{changeTime2Str(item.mainContent.duration)}}</i>
           <div class="meta">
             <i class="iconfont icon-play"></i>
             <span class="useCount">{{item.mainContent.useCount}}</span>
             <span class="time">{{changeStr2Day(item.mainContent.createTime)}}</span>
           </div>
          </a>
        </li>
        <li class="empty-list" v-if="result.content.length==0">
          <h3>很抱歉，没有找到相关影视剧</h3>
          <dl>
            <dt>建议您：</dt>
            <dd>1.检查输入的关键词是否有误</dd>
            <dd>2.请缩短关键词</dd>
          </dl>
        </li>
      </ul>
      <div class="clearfix"></div>
      <div class="pager">
        <el-pagination
          background
          layout="prev, slot, next, jumper"
          prev-text="上一页"
          next-text="下一页"
          :current-page="result.currPageNum"
          @current-change="changePage"
          :page-count="result.totalPage">
          <my-pager :currentPage="+result.currPageNum" :pageCount="+result.totalPage" :pagerCount="7" :disabled="false" :query="'?type=' + query" :path="'/search/' + $route.params.kw + '/'"></my-pager>
        </el-pagination>
      </div>
    </div>
  </section>
</template>

<script>
import AppLogo from '~/components/AppLogo.vue'
import axios from 'axios'
import { searchContent } from '~/api/movie.js'
import MyPager from '~/components/MyPager.vue'
import Header from '~/components/Header.vue'

const prefixNum = (num, length) => {
  let arr =[]
  for (let i = 0; i < length; i++) {
    arr.push('0')
  }
  num = '' + num
  if (typeof +num !== 'number') {
    return '参数num错误'
  } else if (num.length > length) {
    return num
  } else {
    arr = arr.slice(0, length - num.length)
    arr.push(num)
    return arr.join('')
  }
}

export default {
  data () {
    return {
      pageNum: this.$route.params.pageNum,
      keyword: this.$route.params.kw || '',
      channel: this.$route.query.type == 'tv' ? 2 : (this.$route.query.type == 'duanshipin' ? 3 : 1)
    }
  },
  async asyncData (_this) {
    let searchContentMessage = {}
    searchContentMessage.productCode = 'dianyingzhan'
    searchContentMessage.channelId = '23'
    searchContentMessage.isMain = 1
    searchContentMessage.pageNum = +(_this.pageNum || _this.route.params.pageNum.replace('.html', '')),
    searchContentMessage.pageSize = 20
    searchContentMessage.contentNameLike = _this.route.params.kw

    let searchContentMessageTv = {}
    searchContentMessageTv.productCode = 'dianshiju'
    searchContentMessageTv.channelId = '23'
    searchContentMessageTv.isMain = 1
    searchContentMessageTv.pageNum = +(_this.pageNum || _this.route.params.pageNum.replace('.html', '')),
    searchContentMessageTv.pageSize = 20
    searchContentMessageTv.contentNameLike = _this.route.params.kw

    let searchContentMessageDuanshipin = {}
    searchContentMessageDuanshipin.productCode = 'dianfengduanshipin'
    searchContentMessageDuanshipin.channelId = '23'
    searchContentMessageDuanshipin.isMain = 1
    searchContentMessageDuanshipin.pageNum = +(_this.pageNum || _this.route.params.pageNum.replace('.html', '')),
    searchContentMessageDuanshipin.pageSize = 20
    searchContentMessageDuanshipin.contentNameLike = _this.route.params.kw

    let allDataRes = await Promise.all([
      searchContent(searchContentMessage),
      searchContent(searchContentMessageTv),
      searchContent(searchContentMessageDuanshipin)
    ])

    return {
      seachResult: allDataRes[0].data,
      seachResultTv: allDataRes[1].data,
      seachResultDuanshipin: allDataRes[2].data
    }
  },
  watch: {
    async pageNum (v) {
      let productCode
      if (this.channel == 1) {
        productCode = 'dianyingzhan'
      } else if (this.channel == 2) {
        productCode = 'dianshiju'
      } else {
        productCode = 'dianfengduanshipin'
      }
      let searchContentMessage = {}
      searchContentMessage.productCode = productCode
      searchContentMessage.channelId = '23'
      searchContentMessage.isMain = 1
      searchContentMessage.pageNum = +v
      searchContentMessage.pageSize = 20
      searchContentMessage.contentNameLike = this.$route.params.kw
      let xx = await searchContent(searchContentMessage)
      if (this.channel == 1) {
        this.seachResult = xx.data
      } else if (this.channel == 2) {
        this.seachResultTv = xx.data
      } else {
        this.seachResultDuanshipin = xx.data
      }
    }
  },
  computed: {
    result () {
      if (this.channel == 1) {
        return this.seachResult
      } else if (this.channel == 2) {
        return this.seachResultTv
      } else {
        return this.seachResultDuanshipin
      }
    },
    query () {
      if (this.channel == 1) {
        return 'movie'
      } else if (this.channel == 2) {
        return 'tv'
      } else {
        return 'duanshipin'
      }
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
      this.$router.push(`/search/${this.$route.params.kw}/${page}.html?type=${this.$route.query.type}`)
    },
    changeChannel (channel) {
      this.channel = channel
      this.pageNum = 1
    },
    changeTime2Str (time) {
      let seconds = prefixNum(time % 60, 2)
      let minute = prefixNum(parseInt(time / 60), 2)
      return minute + ':' + seconds
    },
    changeStr2Day (str) {
      let timeStr = str.replace('+', ' ')
      let time = new Date(timeStr)
      let now = new Date()
      let timeDiff = now - time
      let day = timeDiff / (1000*60*60*24)
      if (day < 1) {
        return timeStr.slice(11, 16)
      } if (day <= 7 && day >= 1) {
        return Math.floor(day) + '天前'
      } else if (day > 7 && now.getFullYear() > time.getFullYear()) {
        return timeStr.split(' ')[0]
      } else {
        return timeStr.slice(5, 16)
      }
    },
    reportAndPlay (url, id) {
      let reportPlayStateMsg = {}
      reportPlayStateMsg.productCode = 'dianfengduanshipin'
      reportPlayStateMsg.channelId = '25'
      reportPlayStateMsg.isMain = 1
      reportPlayStateMsg.contentId =  id
      reportPlayStateMsg.userId = '00000'
      reportPlayStateMsg.status = 1
      reportPlayState(reportPlayStateMsg)
      window.open(url)
    }
  },
  created () {
    if (this.seachResult.content.length === 0 && this.seachResultTv.content.length > 0) {
      this.channel = 2
      this.pageNum = 1
    }
  },
  mounted () {
    document.body.onscroll = (e => {
      var left = document.documentElement.scrollLeft
      document.getElementsByClassName('top-container')[0].style.left = -left + 'px'
    })
  },
  components: {
    AppLogo,
    MyPager,
    Header
  },
  head () {
    return {
      title: this.$route.params.kw+'_高清完整版_在线观看下载_百度云资源_巅峰电影网_第'+this.result.currPageNum+'页',
      meta: [
        { charset: 'utf-8' }
      ]
    }
  }
}
</script>

<style lang="less">
body{
  background-color: #fff!important;
}
.search-box{
    width: 100%;
    min-width: 1200px;
    background: #47464a;
    padding-bottom: 60px;
    margin-bottom: -60px;
    margin-top: 85px;
    .search-box-container{
        width: 630px;
        margin: 0 auto;
        padding-top: 38px;
        padding-bottom: 8px;
        position: relative;
        input{
            box-sizing: border-box;
            line-height: 18px;
            width: 630px;
            padding: 15px 50px 15px 20px;
            border: 1px solid #999;
            border-radius: 50px;
            outline: none;
        }
        span{
            position: absolute;
            box-sizing: border-box;
            border: none;
            left: auto;
            top: 51px;
            right: 12px;
            width: 27px;
            height: 27px;
            cursor: pointer
        }
    }
}
.subnav{
    background-color: #47464a;
    height: 60px;
    width: 100%;
    width: 1200px;
    margin:0 auto;
    text-align: center;
    a{
      &:first-child{
        margin-left:420px;
      }
      cursor:pointer;
      display: block;
      font-size: 16px;
      color: #999;
      height: 60px;
      line-height: 60px;
      padding: 0 40px;
      position: relative;
      text-decoration: none;
      color:#999;
      float:left;
      &.selected{
        color: #ef4238;
        &:before{
          content: "";
          width: 2px;
          height: 0;
          display: inline-block;
          position: absolute;
          left: 50%;
          margin-left: -5px;
          top: 53px;
          border-bottom: 7px solid #fff;
          border-left: 8px solid transparent;
          border-right: 8px solid transparent;
          border-top: none;
        }
      }   
    }
}
.container{
    width: 1200px;
    margin: 0 auto;
    .search-result-box{
        width: 980px;
        margin: 0 auto;
        .movie-item{
            width: 460px;
            float: left;
            margin-top: 40px;
            line-height: 1.2;
            position: relative;
            margin-left: 30px;
            box-sizing: border-box;
            .img{
                background-color: #fcfcfc;
                width: 160px;
                height: 220px;
                overflow: hidden;
                position: relative;
                margin-right: 20px;
                float: left;
                &:hover{
                  box-shadow:0 0 10px 5px #bedf8f;
                }
                img{
                    position: absolute;
                    width: 100%;
                    top: 0;
                    left: 0;
                    height: 100%;
                    &.img-default{
                        top: 50%;
                        left: 50%;
                        margin-top: -110px;
                        margin-left: -80px;
                    }
                }
            }
            .info{
                float: left;
                width: 280px;
                position: relative;
                height:220px;
                .movie-item-title{
                    text-align: left;
                    font-size: 26px;
                    width: auto;
                    margin-top: 27px;
                    padding-bottom: 1px;
                    margin-bottom: -1px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
                .movie-item-subtitle{
                    font-size: 14px;
                    color: #999;
                    margin-top: 3px;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    padding-bottom: 1px;
                    margin-bottom: -1px;
                }
                .score-info{
                    position: absolute;
                    right: 0;
                    bottom: 0;
                    border-bottom: 1px solid #e5e5e5;
                    width: 280px;
                    height: 133px;
                    .channel-detail{
                        margin-bottom: 13px;
                        color: #ffb400;
                        height: 31px;
                        line-height: 31px;
                        &.number{
                            font-size: 26px;
                            font-weight: 700;
                            font-family: "Microsoft YaHei", Helvetica, Arial, sans-serif;
                        }
                    }
                    .movie-item-cat{
                        margin-top: 5px;
                        font-size: 16px;
                        color: #333;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        padding-bottom: 1px;
                        margin-bottom: -1px;
                    }
                    .movie-item-pub{
                        color: #999;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        padding-bottom: 1px;
                        margin-bottom: -1px;
                    }
                }
            }
        }
        .empty-list{
            margin: 0 35px;
            h3{
                margin-top: 98px;
                font-size: 26px;
                color: #999;
                font-weight: 400;
            }
            dl{
                margin-top: 27px;
                dt{
                    color: #ef4238;
                }
                dd{
                    color: #333;
                    margin-top: 10px;
                    margin-left: 0;
                }
            }
        }
    }
    .pager{
        margin: 50px 0;
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
}
.duanshipin-list{
  margin-top:50px;
  .empty-list{
    margin: 0 35px;
    h3{
      margin-top: 48px;
      font-size: 26px;
      color: #999;
      font-weight: 400;
    }
    dl{
      margin-top: 27px;
      dt{
        color: #ef4238;
      }
      dd{
        color: #333;
        margin-top: 10px;
        margin-left: 0;
      }
    }
  }
  li{
    float:left;
    width:220px;
    height:180px;
    margin:0 5px 20px;
    a{
      display:block;
      position:relative;
      height:100%;
      cursor:pointer;
      .title{
        line-height: 20px;
        margin-top:5px;
        color:#333;
        font-size: 14px;
        display:-webkit-box;
        -webkit-box-orient:vertical;
        -webkit-line-clamp:2;
        text-overflow:ellipsis;
        overflow:hidden;
        max-height:40px;
        font-family: "Microsoft YaHei","微软雅黑",helvetica,arial,verdana,tahoma,sans-serif;
      }
      .tag{
        position:absolute;
        top:0;
        right:10px;
        padding:0 5px;
        height:22px;
        line-height: 22px;
        border-bottom-right-radius:5px;
        border-bottom-left-radius:5px;
        font-size: 12px;
        text-align:center;
        background-color: rgba(81,81,81,0.9);
        color: #d3c39c;
        &.p1080{
          background-color: rgba(187,155,105,0.9);
          color: #fff;
        } 
      }
      .duration{
        position:absolute;
        top:91px;
        right:10px;
        display: block;
        height: 17px;
        line-height: 17px;
        padding: 0 5px;
        border-radius: 2px;
        background: #000;
        background: rgba(0,0,0,0.5);
        color: #e7e7e7;
        white-space: nowrap;
        font-size: 12px;
      }
      .meta{
        font-size: 12px;
        color:#999;
        line-height: 20px;
        i{
          margin-right:5px;
          font-size: 16px;
        }
        .time{
          float:right;
        }
      }
    }
    img{
      width:220px;
      height:110px;
    }
    .imgwrap{
      position:relative;
      &:hover .mask{
        display:unset;
      }
    }
    .mask{
      background:url('~/assets/images/play.png') center center no-repeat;
      position:absolute;
      top:0;
      left:0;
      width:100%;
      height:100%;
      opacity: .5;
      background-color:#000;
      display:none;
    }
  }
}
</style>

