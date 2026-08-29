<script setup lang="ts">
withDefaults(
  defineProps<{
    title: string;
    emphasis?: string;
    subtitle?: string;
    to?: string;
    linkLabel?: string;
  }>(),
  {
    linkLabel: 'View all',
  }
);
</script>

<template>
  <div class="ring-default bg-default rounded-lg shadow-(--shadow-soft) ring-1">
    <div
      class="border-muted flex items-center justify-between border-b px-5 py-4"
    >
      <div>
        <h2 class="text-subhead text-default font-semibold">
          {{ title
          }}<template v-if="emphasis">
            <em
              :style="{ fontFamily: 'var(--font-display)' }"
              class="italic"
              >{{ emphasis }}</em
            ></template
          >
        </h2>
        <p
          v-if="subtitle"
          class="text-label text-dimmed mt-0.5 font-mono tracking-widest uppercase"
        >
          {{ subtitle }}
        </p>
      </div>
      <NuxtLink
        v-if="to"
        :to
        class="text-muted hover:text-default flex items-center gap-1 text-xs transition-colors"
      >
        {{ linkLabel }}
        <UIcon
          name="i-lucide-arrow-right"
          class="size-3"
        />
      </NuxtLink>
    </div>
    <slot />
  </div>
</template>
