<script setup lang="ts">
import '../assets/css/main.css';
</script>

<template>
  <div class="bg-muted flex min-h-dvh items-center justify-center px-4">
    <div class="w-full max-w-md">
      <div class="mb-8 text-center">
        <NuxtLink to="/">
          <Icon
            name="svg:tb"
            class="mx-auto h-12 w-auto"
            aria-hidden="true"
          />
        </NuxtLink>
      </div>
      <div class="border-default bg-elevated rounded-2xl border p-8 shadow-sm">
        <slot />
      </div>
    </div>
  </div>
</template>
