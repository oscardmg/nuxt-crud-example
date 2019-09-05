const i18n = require('./config/locales')
export default {
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Global CSS
  */
  css: [
    '@/assets/scss/app.scss'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~/plugins/vue-notifications', ssr: false },
    // {src: '~/plugins/vee-validate'},
    { src: '~/plugins/vue-moment' }
  ],
  router: {
    middleware: ['auth']
  },
  bootstrapVue: {
    css: false//, // Or `css: false`
    // bootstrapVueCSS: false // Or `bvCSS: false`
  },
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: '/auth/login', method: 'post', propertyName: 'jwt' },
          logout: { url: '/auth/logout', method: 'post' },
          user: { url: '/users/1', method: 'get', propertyName: 'user' }
        }
      }
    }
  },
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    'bootstrap-vue/nuxt',
    '@nuxtjs/auth',
    '@nuxtjs/axios',
    ['nuxt-i18n', i18n]
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    /* set API_URL environment variable to configure access to the API
    */
    baseURL: process.env.API_URL || 'http://localhost:3001/',
    redirectError: {
      401: '/login',
      404: '/notfound'
    }
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}
