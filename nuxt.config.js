export default {
    head: {
        titleTemplate: 'Martfury - Multi-purpose Ecommerce template with vuejs',
        title: 'Martfury - Multi-purpose Ecommerce template with vuejs',
        meta: [
            { charset: 'utf-8' },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1',
            },
            {
                hid: 'description',
                name: 'description',
                content: 'Martfury - Multipurpose Marketplace Vuejs Ecommerce Template',
            },
        ],
        link: [
            {
                rel: 'stylesheet',
                href: 'https://fonts.googleapis.com/css?family=Work+Sans:300,400,500,600,700&amp;amp;subset=latin-ext',
            },
            {
                rel: 'stylesheet',
                href: 'https://api.mapbox.com/mapbox-gl-js/v2.0.0/mapbox-gl.css',
            },
        ],

        script: [{ src: 'https://js.stripe.com/v3' }],
    },

    css: [
        'swiper/dist/css/swiper.css',
        '~/static/fonts/Linearicons/Font/demo-files/demo.css',
        '~/static/fonts/font-awesome/css/font-awesome.css',
        '~/static/css/bootstrap.min.css',
        '~/assets/scss/style.scss',
    ],

    plugins: [
        { src: '~/plugins/vuelidate.js', ssr: false },
        { src: '~/plugins/swiper-plugin.js', ssr: false },
        { src: '~/plugins/vue-notification.js', ssr: false },
        { src: '~/plugins/axios.js', ssr: false },
        { src: '~/plugins/lazyLoad.js', ssr: false },
        { src: '~/plugins/localStorage.js', ssr: false },
    ],

    buildModules: ['@nuxtjs/vuetify', '@nuxtjs/style-resources', 'cookie-universal-nuxt'],
    /*
     ** Build configuration
     */
    build: {
        babel: {
            presets(env, [preset, options]) {
                return [['@babel/preset-env', options]]
            },
        },
    },

    styleResources: {
        scss: './assets/scss/env.scss',
    },

    modules: ['@nuxtjs/axios', 'nuxt-i18n'],

    i18n: {
        locales: [
            { code: 'en', file: 'en.json' },
            { code: 'fr', file: 'fr.json' },
        ],
        lazy: true,
        defaultLocale: 'en',
        langDir: 'lang/locales/',
    },

    router: {
        linkActiveClass: '',
        linkExactActiveClass: 'active',
    },

    server: {
        port: 4002,
        host: 'localhost',
    },
}
