// !(function () {
//   var ua = window.navigator.userAgent.toLowerCase()
//   var ismobile = ua.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
//   if (ismobile) {
//     var pathname = location.pathname
//     var redirectPath = '/'
//     if (pathname.indexOf('/movies/') >= 0) {

//       redirectPath = pathname.replace('movies', 'movie')

//     } else if (pathname.indexOf('/search') >= 0) {

//       var kw = /search\/(\w+)\//.exec(location.href)[1]

//       redirectPath = '/searchlist?kw=' + kw

//     } else if (pathname.indexOf('/detail') >= 0) {

//       redirectPath = pathname.replace('.html', '')

//     } else if (pathname.indexOf('/tvdetail') >= 0) {

//       redirectPath = pathname
      
//     } else if (pathname.indexOf('/tv/') >= 0) {

//       redirectPath = pathname

//     }

//     location.replace('http://m.dfdy5.com' + redirectPath)
//   }
// })();