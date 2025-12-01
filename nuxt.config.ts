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
      siteUrl: process.env.SITE_URL || 'https://temanberbahasa.com',
    },
  },

  app: {
    head: {
      htmlAttrs: { lang: 'id' },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    },
  },

  site: {
    url: process.env.SITE_URL || 'https://temanberbahasa.com',
    name: 'Teman Berbahasa',
    description:
      'Teman Berbahasa adalah tempat bimbingan belajar bahasa asing yang menyenangkan dan interaktif. Belajar bahasa Jepang dengan discussion partner dari mahasiswa Indonesia di Jepang.',
    defaultLocale: 'id',
  },

  ogImage: {
    enabled: true,
  },

  sitemap: {
    enabled: true,
  },

  robots: {
    enabled: true,
  },

  seo: {
    meta: {
      themeColor: '#0013c2',
      author: 'Teman Berbahasa',
    },
  },

  schemaOrg: {
    identity: {
      type: 'Organization',
      name: 'Teman Berbahasa',
      url: process.env.SITE_URL || 'https://temanberbahasa.com',
      logo: '/logo.png',
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
    '@nuxtjs/seo',
  ],
});
