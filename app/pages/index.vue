<script setup lang="ts">
const { events } = useHomePage();
</script>

<template>
  <AppSectionsHomeHero />
  <AppSectionsHomeSocial />
  <AppSectionsHomeFeaturedCourses />
  <AppSectionsHomeFaq />
  <section
    aria-labelledby="past-events"
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
