import axios from 'axios'


export default class ContentSdk {
  constructor(contentDomain, timeout) {
    this.axiosInstance = axios.create({
      baseURL: contentDomain || 'http://content.biedese.cn/content.webapi/',
      timeout: timeout || 15000,
      transformResponse:[function(data){
        if (typeof data === 'string') {
          data = data.replace(/\+/g, '%20')
          try {
            data = JSON.parse(decodeURIComponent(data))
          } catch (e) {
            // donothing
          }
        }
        return data
      }]
    })
  }

  // 根据分类获取内容列表
  getContentListByType ({type1Code, type2Code, productCode, pageNum, pageSize, onlyType1, userId, channelId, sort, sortType}) {
    return new Promise((resolve, reject) => {
      this.axiosInstance({
        url: 'content_list_by_type_query',
        method: 'post',
        data: {
          type1Code,
          type2Code,
          productCode,
          pageNum,
          pageSize,
          onlyType1,
          sort,
          sortType,
          userId,
          channelId
        }
      })
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  // 获取分类1列表及分类1内容
  getType1ListAndContentList ({pageNum, pageSize, productCode, channelId}) {
    return new Promise((resolve, reject) => {
      this.axiosInstance({
        url: 'type1_with_content_query',
        method: 'post',
        data: {
          pageNum,
          pageSize,
          productCode,
          channelId
        }
      })
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  // 获取分类2列表及分类2内容
  getType2ListAndContentList ({pageNum, pageSize, productCode, channelId}) {
    return new Promise((resolve, reject) => {
      this.axiosInstance({
        url: 'type2_with_content_query',
        method: 'post',
        data: {
          pageNum,
          pageSize,
          productCode,
          channelId
        }
      })
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  // 获取分类1列表
  getType1List ({pageNum, pageSize, productCode, channelId}) {
    return new Promise((resolve, reject) => {
      this.axiosInstance({
        url: 'type1_query',
        method: 'post',
        data: {
          pageNum,
          pageSize,
          productCode,
          channelId
        }
      })
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  // 获取分类2列表
  getType2List ({pageNum, pageSize, productCode, channelId}) {
    return new Promise((resolve, reject) => {
      this.axiosInstance({
        url: 'type2_query',
        method: 'post',
        data: {
          pageNum,
          pageSize,
          productCode,
          channelId
        }
      })
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  // 获取内容资源
  getSource ({productCode, channelId, isMain, contentId}) {
    return new Promise((resolve, reject) => {
      this.axiosInstance({
        url: 'content_source_query',
        method: 'post',
        data: {
          productCode,
          channelId,
          isMain,
          contentId
        }
      })
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  // 获取内容（带是否关注等信息）
  getSourceWithUserAct ({productCode, channelId, isMain, contentId, userId}) {
    return new Promise((resolve, reject) => {
      this.axiosInstance({
        url: 'content_user_action',
        method: 'post',
        data: {
          productCode,
          channelId,
          isMain,
          contentId,
          userId
        }
      })
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  // 内容使用状态上报
  reportPlayState ({productCode, channelId, isMain, contentId, userId, status}) {
    return new Promise((resolve, reject) => {
      this.axiosInstance({
        url: 'content_report',
        method: 'post',
        data: {
          channelId,
          productCode,
          ip: '123',
          isMain,
          userId,
          status,
          contentId
        }
      })
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  // 模糊搜索
  vagueQuery ({productCode, channelId, isMain, contentNameLike, pageNum, pageSize}) {
    return new Promise((resolve, reject) => {
      this.axiosInstance({
        url: 'content_vague_query',
        method: 'post',
        data: {
          channelId,
          productCode,
          isMain,
          contentNameLike,
          pageNum,
          pageSize
        }
      })
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  // 付费查询
  paidQuery ({productCode, channelId, contentId}) {
    return new Promise((resolve, reject) => {
      this.axiosInstance({
        url: 'paid_content_query',
        method: 'post',
        data: {
          productCode,
          channelId,
          contentId
        }
      })
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  // 页面数据查询
  pageDataQuery ({productCode, channelId, pageNum, pageSize, pageCode}) {
    return new Promise((resolve, reject) => {
      this.axiosInstance({
        url: 'page_data_by_section_query',
        method: 'post',
        data: {
          productCode,
          channelId,
          pageNum,
          pageSize,
          pageCode
        }
      })
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  // 专区内容查询
  sectionDataQuery ({productCode, channelId, pageNum, pageSize, sectionId}) {
    return new Promise((resolve, reject) => {
      this.axiosInstance({
        url: 'content_list_of_section_query',
        method: 'post',
        data: {
          productCode,
          channelId,
          pageNum,
          pageSize,
          sectionId
        }
      })
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  // 内容使用次数查询
  contentPlayQuery ({productCode, channelId, contentId}) {
    return new Promise((resolve, reject) => {
      this.axiosInstance({
        url: 'content_play_query',
        method: 'post',
        data: {
          productCode,
          channelId,
          contentId
        }
      })
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  // 查询用户收藏列表
  collectListQueryById ({productCode, pageNum, pagesize, objectType, userId}) {
    return new Promise((resolve, reject) => {
      this.axiosInstance({
        baseURL: 'http://content.biedese.cn/data.webapi/',
        url: 'collect_list_query',
        method: 'post',
        data: {
          productCode,
          pageNum,
          pagesize,
          objectType,
          userId
        }
      })
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  // 根据内容actor查询内容
  getContentListByActor ({productCode, pageNum, pagesize, channelId, actor}) {
    return new Promise((resolve, reject) => {
      this.axiosInstance({
        url: 'content_list_of_actor_query',
        method: 'post',
        data: {
          productCode,
          channelId,
          pageNum,
          pagesize,
          actor
        }
      })
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  // 查询自内容列表（不带detail）
  getSubContentsWithoutDetail ({productCode, pageNum, pageSize, channelId, mainId}) {
    return new Promise((resolve, reject) => {
      this.axiosInstance({
        url: 'subId_query',
        method: 'post',
        data: {
          productCode,
          channelId,
          pageNum,
          pageSize,
          mainId
        }
      })
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  // 查看上一集或下一集
  getSubContentPrevOrNext ({productCode, channelId, mainId, subId, currSubSeq, addSubSeq}) {
    return new Promise((resolve, reject) => {
      this.axiosInstance({
        url: 'content_sub_lastornext',
        method: 'post',
        data: {
          productCode,
          channelId,
          mainId,
          subId,
          currSubSeq,
          addSubSeq
        }
      })
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  // 根据内容创建者查询内容
  getContentListByCreator ({productCode, pageNum, pagesize, channelId, creatorAccount}) {
    return new Promise((resolve, reject) => {
      this.axiosInstance({
        url: 'content_list_of_creator_query',
        method: 'post',
        data: {
          productCode,
          channelId,
          pageNum,
          pagesize,
          creatorAccount
        }
      })
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  // 根据多个ID查询多条内容
  getContentListWithPrecise ({productCode, channelId, contentId, isMian}) {
    return new Promise((resolve, reject) => {
      this.axiosInstance({
        url: 'content_list_precise_query',
        method: 'post',
        data: {
          requestList:[{
            productCode,
            channelId,
            contentId,
            isMian
          }]
        }
      })
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
}
