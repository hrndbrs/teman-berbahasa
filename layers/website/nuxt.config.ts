const siteUrl = process.env.SITE_URL || 'https://temanberbahasa.com';

export default defineNuxtConfig({
  modules: ['@nuxtjs/seo'],

  runtimeConfig: {
    public: {
      phoneNumber: process.env.CONTACT_PHONE_NUMBER || '',
      instagramHandle: process.env.CONTACT_INSTAGRAM_HANDLE || '',
      tiktokHandle: process.env.CONTACT_TIKTOK_HANDLE || '',
      eventRegistrationUrl: process.env.EVENT_REGISTRATION_URL || '',
      siteUrl,
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
});
