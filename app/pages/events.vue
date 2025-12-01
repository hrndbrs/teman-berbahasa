<script setup lang="ts">
definePageMeta({
  layout: 'events',
});

const seoDescription =
  'Mini course dan webinar belajar bahasa Jepang dari Teman Berbahasa.';

useSeoMeta({
  title: 'Mini Courses - Teman Berbahasa',
  description: seoDescription,
  ogTitle: 'Mini Courses - Teman Berbahasa',
  ogDescription: seoDescription,
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Mini Courses - Teman Berbahasa',
  twitterDescription: seoDescription,
  keywords:
    'mini course bahasa jepang, webinar bahasa jepang, belajar bahasa jepang online, kursus jepang, beasiswa jepang',
});

useSchemaOrg([
  defineWebPage({
    name: 'Mini Courses',
    description: seoDescription,
  }),
]);

interface EventDate {
  start: string;
  end: string;
}

interface Event {
  id: number;
  title: string;
  description: string;
  dates: EventDate[];
  platform: string;
  duration: number;
  image: string;
  speaker_image: string;
}

const events: Event[] = [
  {
    id: 1,
    title: 'Ngomong Bahasa Jepang Dalam 90 Menit',
    description:
      'Kelas ini dirancang buat kamu yang pengen mulai belajar bahasa Jepang tapi bingung harus mulai dari mana. Dalam 90 menit, kamu akan belajar cara memperkenalkan diri dalam bahasa Jepang dengan percaya diri. Formatnya interaktif dan langsung praktik, bukan cuma teori. Cocok banget buat first step kamu sebelum lanjut ke kelas yang lebih intensif. Bonus e-certificate, worksheet self-introduction, plus voucher diskon kelas utama!',
    dates: [
      {
        start: '2025-12-05T12:30:00.000Z',
        end: '2025-12-05T14:00:00.000Z',
      },
      {
        start: '2025-12-13T03:30:00.000Z',
        end: '2025-12-13T05:00:00.000Z',
      },
    ],
    platform: 'Zoom Meeting',
    duration: 90,
    image:
      'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=600&h=500&fit=crop',
    speaker_image:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop',
  },
  {
    id: 2,
    title: 'Spill Cara Dapat Beasiswa Ke Jepang',
    description:
      'Bukan kelas curhat beasiswa, tapi strategi real dari awardee MEXT yang langsung ke intinya. Ada live review CV/essay untuk peserta terpilih, plus tips aplikatif kayak STAR Method dan formula "Why Me + Why This Program + Why Now". Di akhir ada game bahasa Jepang berhadiah voucher!',
    dates: [
      {
        start: '2025-12-06T03:30:00.000Z',
        end: '2025-12-06T05:00:00.000Z',
      },
      {
        start: '2025-12-12T12:30:00.000Z',
        end: '2025-12-12T14:00:00.000Z',
      },
    ],
    platform: 'Zoom Meeting',
    duration: 90,
    image:
      'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&h=500&fit=crop',
    speaker_image:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
  },
];
</script>

<template>
  <AppSectionsEventsHeader :events="events" />
  <AppSectionsEventsHero />
  <AppSectionsEventsEventCards :events="events" />
  <AppSectionsEventsEventDetails :events="events" />
  <AppSectionsEventsCTA />
  <AppFooter :events="events" />
</template>
