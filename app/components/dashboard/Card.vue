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
  <div class="rounded-lg ring-1 ring-default bg-default shadow-(--shadow-soft)">
    <div
      class="flex items-center justify-between px-5 py-4 border-b border-muted"
    >
      <div>
        <h2 class="text-subhead font-semibold text-default">
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
          class="text-label font-mono tracking-widest uppercase text-dimmed mt-0.5"
        >
          {{ subtitle }}
        </p>
      </div>
      <NuxtLink
        v-if="to"
        :to
        class="flex items-center gap-1 text-xs text-muted hover:text-default transition-colors"
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
