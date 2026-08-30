<script setup lang="ts">
import '../assets/css/main.css';

const { recede } = usePageCurtain();
</script>

<template>
  <div class="site-root bg-ink min-h-dvh">
    <SiteCurtain />
    <SiteRail />
    <div class="shell:ml-rail ml-0">
      <SiteHeader />
      <SiteCursorTag />
      <div
        class="page-recede"
        :class="{ 'page-recede--active': recede }"
      >
        <slot />
      </div>
      <SiteFooter />
    </div>
  </div>
</template>
