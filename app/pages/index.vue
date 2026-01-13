<script setup lang="ts">
import { events } from '#shared/data/events';

useSeoMeta({
  title: 'Teman Berbahasa - Belajar Bahasa Jepang',
  description:
    'Teman Berbahasa adalah tempat bimbingan belajar bahasa asing yang menyenangkan dan interaktif. Belajar bahasa Jepang dengan discussion partner dari mahasiswa Indonesia di Jepang.',
  ogTitle: 'Teman Berbahasa - Belajar Bahasa Jepang',
  ogDescription:
    'Belajar bahasa Jepang dengan cara yang menyenangkan dan interaktif bersama Teman Berbahasa.',
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Teman Berbahasa - Belajar Bahasa Jepang',
  twitterDescription:
    'Belajar bahasa Jepang dengan cara yang menyenangkan dan interaktif bersama Teman Berbahasa.',
});
</script>

<template>
  <AppSectionsHomeHero />
  <AppSectionsHomeSocial />
  <AppSectionsHomeFeaturedCourses />
  <AppSectionsHomeFaq />
  <section
    aria-labelledby="ongoing-courses-heading"
    class="bg-white py-8"
  >
    <div class="container px-6">
      <div class="mb-12">
        <h2
          id="past-events"
          class="mb-4 text-3xl font-bold text-gray-900 md:text-4xl"
        >
          Past Events
        </h2>
        <p class="max-w-xl text-sm text-gray-600">
          Ikuti mini course kami untuk belajar bahasa Jepang dengan cara yang
          menyenangkan dan praktis dalam waktu singkat.
        </p>
      </div>
    </div>
    <AppSectionsSharedEventCards :events />
  </section>
</template>
