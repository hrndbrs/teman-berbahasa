import tailwindcss from '@tailwindcss/vite';

const siteUrl = process.env.SITE_URL || 'https://temanberbahasa.com';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  future: { compatibilityVersion: 4 },
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  vite: { plugins: [tailwindcss()] },
  css: ['./app/assets/css/main.css'],

  imports: {
    dirs: ['./shared/data'],
  },

  routeRules: {
    '/dashboard/**': { ssr: false },
  },

  runtimeConfig: {
    public: {
      phoneNumber: process.env.CONTACT_PHONE_NUMBER || '',
      instagramHandle: process.env.CONTACT_INSTAGRAM_HANDLE || '',
      tiktokHandle: process.env.CONTACT_TIKTOK_HANDLE || '',
      eventRegistrationUrl: process.env.EVENT_REGISTRATION_URL || '',
      siteUrl,
      apiBaseUrl: process.env.API_BASE_URL || 'http://localhost:8000/api',
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
      type: 'EducationalOrganization',
      name: 'Teman Berbahasa',
      url: siteUrl,
      logo: `${siteUrl}/favicon.svg`,
      description:
        'Platform pembelajaran bahasa Jepang online berbasis diskusi interaktif bersama Discussion Partner dari mahasiswa Indonesia di Jepang.',
      sameAs: [
        `https://instagram.com/${process.env.CONTACT_INSTAGRAM_HANDLE || 'teman.berbahasa'}`,
        `https://www.tiktok.com/@${(process.env.CONTACT_TIKTOK_HANDLE || 'teman.berbahasa').replace(/^@/, '')}`,
      ],
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

  colorMode: {
    dataValue: 'theme',
    classSuffix: '',
  },

  modules: [
    'reka-ui/nuxt',
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/hints',
    '@nuxtjs/seo',
    'nuxt-security',
    '@nuxt/ui',
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
