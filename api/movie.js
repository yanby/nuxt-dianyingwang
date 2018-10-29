import ContentSdk from './jc.content.sdk.js'

const contentSdk = new ContentSdk()

export const getHomeData = ({productCode, channelId, pageNum, pageSize, sectionId}) => {
  return contentSdk.sectionDataQuery({productCode, channelId, pageNum, pageSize, sectionId})
}

export const getType1List = ({pageNum, pageSize, productCode, channelId}) => {
  return contentSdk.getType1List({pageNum, pageSize, productCode, channelId})
}
export const getType2List = ({pageNum, pageSize, productCode, channelId}) => {
  return contentSdk.getType2List({pageNum, pageSize, productCode, channelId})
}
export const getContentListByType = ({type1Code, type2Code, productCode, pageNum, pageSize, onlyType1, userId, channelId, sort, sortType}) => {
  return contentSdk.getContentListByType({type1Code, type2Code, productCode, pageNum, pageSize, onlyType1, userId, channelId, sort, sortType})
}
export const getContent = ({productCode, channelId, isMain, contentId}) => {
  return contentSdk.getSource({productCode, channelId, isMain, contentId})
}
export const searchContent = ({productCode, channelId, isMain, contentNameLike, pageNum, pageSize}) => {
  return contentSdk.vagueQuery({productCode, channelId, isMain, contentNameLike, pageNum, pageSize})
}
export const getSubContentsWithoutDetail = ({productCode, pageNum, pageSize, channelId, mainId}) => {
  return contentSdk.getSubContentsWithoutDetail({productCode, pageNum, pageSize, channelId, mainId})
}
export const reportPlayState = ({productCode, channelId, isMain, contentId, userId, status}) => {
  return contentSdk.reportPlayState({productCode, channelId, isMain, contentId, userId, status})
}