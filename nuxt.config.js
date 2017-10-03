module.exports = {
  env: {
    apiUrl: 'http://www.enelradar.com',
    adminUrl: 'http://www.enelradar.com',
    imagesPath: "Content/StoredImages",
    locationUtc: -300, //in minuts
  },
  /*
  ** Headers of the page
  */
  head: {
    title: 'Radar - Guía de eventos en Cuba',
    prefix: [{
      content: 'og: http://ogp.me/ns# fb: http://ogp.me/ns/fb#' //find right way to insert this
    }],
    meta: [
      { 'http-equiv': 'Content-Type', content:'text/html; charset=utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', id:"mDescription", name: 'description', content: 'Cartelera de fiestas, conciertos, obras de tetro, cine y otros eventos sociales en Cuba' },
      { hid: 'keywords', id:"mKeywords", name: 'keywords', content: 'cuba, eventos, events, musica, bar, bares, fiestas, teatros, cine, movies, shows, espectaculos, conciertos' },
      { name: 'robots', content: 'NOODP' },

      { property: 'fb:app_id', content: '535946089926668' },
      { hid: 'faType', id: 'faType',property: "og:type", content: "website" },
      { hid: 'faImage', id: 'faImage', property: 'og:image', content: 'http://www.enelradar.com/Content/img/logo-fb.jpg' },
      // { hid: 'faUrl', id: 'faUrl', property: 'og:url', content: 'http://www.enelradar.com' },
      { hid: 'faTitle', id: 'faTitle', property: 'og:title', content: 'Radar - Guía de eventos en Cuba' },
      { hid: 'faDescription', id: 'faDescription', property: 'og:description', content: 'Cartelera de fiestas, conciertos, obras de tetro, cine y otros eventos sociales en Cuba' },
    ],
    link: [
      { rel: 'shortcut icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', type: 'text/css', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,700|Roboto+Condensed:400' }
    ]
  },
  css:[ 
    '~/assets/bootstrap-b.min.css',
    '~/assets/css/style.less',
  ],
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#3B8070' },
  plugins: ['~/plugins/moment'],
  
  router: {
    middleware: ['paramsToStore'], 
  },
  /*
  ** Build configuration
  */
  build: {
    vendor: ['ismobilejs', 'axios', 'moment', 'lodash' ]
    /*
    ** Run ESLINT on save
    */
    // extend (config, ctx) {
    //   if (ctx.dev && ctx.isClient) {
    //     config.module.rules.push({
    //       enforce: 'pre',
    //       test: /\.(js|vue)$/,
    //       loader: 'eslint-loader',
    //       exclude: /(node_modules)/
    //     })
    //   }
    // }
  }
}
