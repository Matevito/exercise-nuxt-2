export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - Stack Front',
    title: 'Stack Front para los BO',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Stack Front para los Backoffice',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // To import loading component
  loading: '~/components/general/Loading.vue',

  // Server to specity host and port for server instance
  server: {
    port: 3000, // default: 3000
    host: '0.0.0.0', // default: localhost
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/scss/main.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/axios-custom',
    { src: '~/plugins/mixins', ssr: false },
    { src: '~/plugins/vuelidate', mode: 'both' },
    { src: '~/plugins/otp-input.js', ssr: false },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
  ],

  // Prime vue: https://www.primefaces.org/primevue/showcase/#/setup
  primevue: {
    theme: 'saga-orange',
    ripple: true,
    components: [
      'InputText',
      'Button',
      'Toast',
      'Dropdown',
      'Menu',
      'DataTable',
      'Column',
      'Paginator',
      'Calendar',
      'Dialog',
      'MultiSelect',
    ],
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    'primevue/nuxt',
    'nuxt-client-init-module',
    ['@nuxtjs/dotenv', { filename: 'environments/.env.' + process.env.ENV }],
    ['cookie-universal-nuxt', { alias: 'cookies' }],
    [
      '@nuxtjs/i18n',
      {
        locales: [
          {
            code: 'es',
            file: 'es.js',
            name: 'Español',
          },
        ],
        lazy: true,
        langDir: 'lang/',
        defaultLocale: 'es',
      },
    ],
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
