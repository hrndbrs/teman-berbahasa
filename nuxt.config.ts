import tailwindcss from '@tailwindcss/vite';

const siteUrl = process.env.SITE_URL || 'https://temanberbahasa.com';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2026-06-30',
  devtools: { enabled: true },
  vite: { plugins: [tailwindcss()] },

  app: {
    head: {
      htmlAttrs: { lang: 'id' },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
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
    '@nuxt/eslint',
    '@nuxt/image',
    'nuxt-security',
    '@nuxt/ui',
    '@vueuse/nuxt',
  ],

  ui: {
    colorMode: false,
  },

  image: {
    domains: ['images.unsplash.com'],
    format: ['avif', 'webp'],
  },

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
        'connect-src': [
          "'self'",
          process.env.API_BASE_URL || 'http://localhost:8000',
        ],
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
