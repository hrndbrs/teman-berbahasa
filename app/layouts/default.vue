<script setup lang="ts">
import { events } from '#shared/data/events';
</script>

<template>
  <div class="min-h-dvh">
    <AppHeader />
    <main>
      <slot />
    </main>
    <AppFooter :events />
  </div>
</template>
