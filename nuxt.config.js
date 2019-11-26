import axios from 'axios'

export default {
  mode: 'spa',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff', height: '3px' },
  /*
   ** Global CSS
   */
  css: ['@/assets/scss/main.scss'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~plugins/serie-filters.js',
    '~plugins/link-filters.js',
    '~plugins/edition-filters.js'
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://buefy.github.io/#/documentation
    ['nuxt-buefy', { css: false }],
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/style-resources',
    '@nuxtjs/proxy',
    '@nuxtjs/markdownit',
    '@nuxtjs/google-analytics'
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    proxy: !process.env.API_URL
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      config.module.rules.push({
        test: /\.vue$/,
        loader: 'vue-svg-inline-loader'
      })
    }
  },
  /*
   ** Style resources.
   */
  styleResources: {
    scss: ['~assets/scss/_variables.scss']
  },
  /*
   ** Router configuration
   */
  router: {
    middleware: ['navbar']
  },
  /*
   ** Proxy configuration
   */
  proxy: {
    '**/*.json': 'https://brmdb-data.netlify.com'
  },
  /*
   ** MarkdownIt configuration
   */
  markdownit: {
    injected: true
  },
  /*
   ** PageTransition configuration
   */
  pageTransition: 'fade',
  /*
   ** Generate configuration
   */
  generate: {
    async routes() {
      const res = await axios.get(
        'https://brmdb-data.netlify.com/series/list.json'
      )

      return res.data.map((serie) => `/series/${serie.slug}`)
    }
  },
  /*
   ** Google Analytics setup.
   */
  googleAnalytics: {
    id: 'UA-117196425-2'
  }
}
