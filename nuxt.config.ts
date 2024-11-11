export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  css: [
    '@/assets/styles/style.scss',
  ],
  modules: [
    '@pinia/nuxt',
    '@primevue/nuxt-module'
  ]
})