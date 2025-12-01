import tailwindcss from '@tailwindcss/vite';

const siteUrl = process.env.SITE_URL || 'https://temanberbahasa.com';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  future: { compatibilityVersion: 4 },
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  vite: { plugins: [tailwindcss()] },
  css: ['./app/assets/css/main.css'],

  runtimeConfig: {
    public: {
      phoneNumber: process.env.CONTACT_PHONE_NUMBER || '',
      instagramHandle: process.env.CONTACT_INSTAGRAM_HANDLE || '',
      registrationUrl: process.env.REGISTRATION_URL || '',
      siteUrl,
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
    url: siteUrl,
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
      url: siteUrl,
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
    'nuxt-security',
  ],

  security: {
    headers: {
      // Prevent clickjacking
      xFrameOptions: 'DENY',
      // Prevent MIME type sniffing
      xContentTypeOptions: 'nosniff',
      // Referrer policy
      referrerPolicy: 'strict-origin-when-cross-origin',
      // Permissions policy
      permissionsPolicy: {
        camera: [],
        microphone: [],
        geolocation: [],
        payment: [],
      },
      // Content Security Policy
      contentSecurityPolicy: {
        'base-uri': ["'none'"],
        'font-src': ["'self'", 'https:', 'data:'],
        'form-action': ["'self'"],
        'frame-ancestors': ["'none'"],
        'img-src': ["'self'", 'data:', 'https:'],
        'object-src': ["'none'"],
        'script-src-attr': ["'none'"],
        'style-src': ["'self'", "'unsafe-inline'"],
        'script-src': ["'self'", "'unsafe-inline'"],
        'upgrade-insecure-requests': true,
      },
      // Strict Transport Security
      strictTransportSecurity: {
        maxAge: 31536000,
        includeSubdomains: true,
        preload: true,
      },
    },
    // Rate limiting
    rateLimiter: {
      tokensPerInterval: 150,
      interval: 300000,
    },
    // Request size limit
    requestSizeLimiter: {
      maxRequestSizeInBytes: 2000000,
      maxUploadFileRequestInBytes: 8000000,
    },
    // CORS
    corsHandler: {
      origin: siteUrl,
      methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    },
    // Hide powered by header
    hidePoweredBy: true,
  },
});
