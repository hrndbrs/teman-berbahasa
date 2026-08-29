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
      class="text-2xs tracking-looser text-dimmed mb-1 px-3 font-mono uppercase"
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
