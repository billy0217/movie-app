// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  compatibilityDate: '2025-09-15',
  ssr: true,
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/google-fonts'],
  runtimeConfig: {
    public: {
      tmdbApiKey: process.env.TMDB_API_KEY,
      tmdbBaseUrl: 'https://api.themoviedb.org/3'
    }
  },
  nitro: {
    experimental: {
      wasm: true
    }
  },
  app: {
    head: {
      title: 'Martin\'s Movies',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: 'Movify - Movies, Series & Cinema HTML Template' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'stylesheet', href: '//cdnjs.cloudflare.com/ajax/libs/font-awesome/4.6.0/css/font-awesome.min.css' }
      ]
    }
  },

  // tailwindcss setting
  tailwindcss: {
    cssPath: ["~/assets/scss/app.scss", { injectPosition: "first" }],
    configPath: 'tailwind.config',
    exposeConfig: true,
    exposeLevel: 2,
    config: {},
    viewer: true,
  },

  // google font
  googleFonts: {
      families: {
        Quicksand: [100, 300, 400, 500, 600, 700]
      },
      download: true,
      display: 'swap',
  }
})