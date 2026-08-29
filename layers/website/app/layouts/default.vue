<script setup lang="ts">
import '../assets/css/main.css';
</script>

<template>
  <div class="min-h-dvh">
    <AppHeader />
    <main>
      <slot />
    </main>
    <AppFooter />
  </div>
</template>
