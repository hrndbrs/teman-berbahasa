import tailwindcss from '@tailwindcss/vite';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  vite: { plugins: [tailwindcss()] },
  css: ['./app/assets/css/main.css'],

  runtimeConfig: {
    public: {
      phoneNumber: process.env.CONTACT_PHONE_NUMBER || '',
      instagramHandle: process.env.CONTACT_INSTAGRAM_HANDLE || '',
      registrationUrl: process.env.REGISTRATION_URL || '',
    },
  },

  icon: {
    mode: 'svg',
    customCollections: [
      {
        prefix: 'svg',
        dir: './app/assets/icons',
      },
    ],
  },

  modules: [
    'reka-ui/nuxt',
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/hints',
  ],
});
