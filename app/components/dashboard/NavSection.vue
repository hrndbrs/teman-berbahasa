<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui';

defineProps<{
  label: string;
  items: NavigationMenuItem[];
  collapsed: boolean;
}>();
</script>

<template>
  <div>
    <p
      v-if="!collapsed"
      class="mb-1 px-3 text-2xs font-mono tracking-looser uppercase text-dimmed"
    >
      {{ label }}
    </p>
    <UNavigationMenu
      :items
      :collapsed
      orientation="vertical"
      color="neutral"
    />
  </div>
</template>
