<template>
  <div class="duanshipin">
    <Header active="4"></Header>
    <div class="breadcrumbContainer">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><a href="/">首页</a></el-breadcrumb-item>
        <el-breadcrumb-item>短视频</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <ul class="duanshipin-list">
     <li @click="reportAndPlay(item.mainContent.playURL, item.mainContent.id)" v-for="(item, index) in duanshipin.contentList" :key="index">
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
     <div class="clearfix"></div>
    </ul>
    <div class="fenlei-pager">
      <el-pagination
        v-if="duanshipin.totalPage"
        background
        layout="prev, slot, next, jumper"
        :goto='"跳转"'
        prev-text="上一页"
        next-text="下一页"
        :current-page="duanshipin.currPageNum"
        @current-change="changePage"
        :page-count="duanshipin.totalPage">
        <my-pager :currentPage="+duanshipin.currPageNum" :pageCount="+duanshipin.totalPage" :pagerCount="7" :disabled="false" :path="'/duanshipin/'"></my-pager>
      </el-pagination>
    </div>
  </div>
</template>

<script>
import Header from '~/components/Header.vue'
import MyPager from '~/components/MyPager.vue'
import { getContentListByType, reportPlayState } from '~/api/movie.js'

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
  head () {
    return {
      attribute: null,
      title: '巅峰电影网_免费在线观看_迅雷下载_全网高清影视大全网站',
      meta: [
        { name: 'description', content: '巅峰电影网拥有全网海量电影资源,是一个完全免费的影视大全网站,高清1080p电影在线观看、迅雷下载就在巅峰电影网（www.dfdy5.com）。' },
        { name: 'keywords', content: '最新短视频，短视频大全，在线观看，火热短视频，巅峰电影网，巅峰影院' },
        { charset: 'utf-8' }
      ]
    }
  },
  async asyncData (_this) {
    let getContentListByTypeMessage = {}
    getContentListByTypeMessage.type1Code = 1897
    getContentListByTypeMessage.productCode = 'dianfengduanshipin'
    getContentListByTypeMessage.pageNum = _this.route.params.pageNum.replace('.html', '')
    getContentListByTypeMessage.pageSize = 30
    getContentListByTypeMessage.channelId = '25'

    let items = await getContentListByType(getContentListByTypeMessage)
    return {
      duanshipin: items.data
    }
  },
  methods: {
    changePage (page) {
      location.href = (`/duanshipin/${page}.html`)
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
  components: {
    Header,
    MyPager
  }
}
</script>

<style lang="less">
@import "../../css/font/iconfont.css";

body{
  // background-color:#000;
  background-color:#f1f1f1;
}
.duanshipin{
  width:1200px;
  margin:90px auto 0;
  background-color:#fff;
  padding: 20px 25px;
  .breadcrumbContainer{
    margin-left:5.7px;
    margin-bottom: 20px;
  }
}
.duanshipin-list{
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
