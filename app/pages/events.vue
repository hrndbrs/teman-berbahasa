<script setup lang="ts">
import { events } from '#shared/data/events';

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
</script>

<template>
  <AppSectionsEventsHero />
  <AppSectionsSharedEventCards
    class="hidden md:block"
    :events="events"
  />
  <AppSectionsEventsDetails :events="events" />
  <AppSectionsEventsCTA />
</template>
