export default defineNuxtConfig({
  routeRules: {
    '/dashboard/**': { ssr: false },
  },

  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.API_BASE_URL || 'http://localhost:8000/api',
    },
  },
});
