export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  runtimeConfig: {
    public: {
      baseURL: process.env.API_BASE_URL || '',
    }
  },
  css: [
    '@/assets/styles/style.scss',
  ],
  modules: [
    '@pinia/nuxt',
    '@primevue/nuxt-module'
  ]
})