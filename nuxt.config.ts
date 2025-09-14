// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-09-14',
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      tmdbApiKey: process.env.TMDB_API_KE,
      tmdbBaseUrl: 'https://api.themoviedb.org/3',
      tmdbImageBaseUrl: 'https://image.tmdb.org/t/p'
    }
  },
  app: {
    head: {
      title: 'Martin\'s Movies',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: 'Discover and explore movies with Movify' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap' }
      ]
    }
  }
})
