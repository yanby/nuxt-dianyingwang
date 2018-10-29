module.exports = {
  /*
  ** Headers of the page
  */
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  head: {
    meta: [
      { charset: 'utf-8' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'preload', href: '/js/uacheck.js', as: 'script' }
    ],
    meta: [
      { hid: 'description', name: 'viewport', content: 'width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no' }
    ],
    script: [
      {src: '/js/uacheck.js'},
      {src: 'https://hm.baidu.com/hm.js?57a294cb15d2871aed10b0fed33cb2ca'},
      {src: 'http://push.zhanzhang.baidu.com/push.js'},
      {src: 'https://www.googletagmanager.com/gtag/js?id=UA-124901990-1'}
    ]
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  plugins: [
    '@/plugins/element-ui',
    '@/plugins/baidutongji'
  ],
  css: [
    '~/css/mynormalize.css',
    'element-ui/lib/theme-chalk/index.css',
  ]
}

