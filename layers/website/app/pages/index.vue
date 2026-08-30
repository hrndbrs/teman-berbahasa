<script setup lang="ts">
definePageMeta({ pageTransition: { name: 'page', mode: 'out-in' } });

const { programs, miniCourses, faqs } = useHomePage();
</script>

<template>
  <main
    class="screen"
    data-screen-label="Beranda"
  >
    <HomeHero />
    <HomePrograms :programs="programs" />
    <HomeAbout />
    <HomeMiniCourse :items="miniCourses" />
    <HomeFaq :items="faqs" />
  </main>
</template>
