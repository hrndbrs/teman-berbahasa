<script setup lang="ts">
defineProps<{
  eyebrow: string;
  title: string;
  description?: string;
}>();
</script>

<template>
  <div class="pb-4 border-b border-muted shrink-0 space-y-4">
    <div
      class="flex flex-col-reverse sm:flex-row sm:items-start justify-between gap-3 sm:gap-4"
    >
      <div class="min-w-0">
        <p
          class="text-label font-mono tracking-looser uppercase text-dimmed mb-1"
        >
          {{ eyebrow }}
        </p>
        <h1 class="text-3xl sm:text-4xl font-bold text-default leading-tight">
          <em class="not-italic font-(--font-display)">{{ title }}</em>
        </h1>
        <p
          v-if="description"
          class="mt-1 text-sm text-muted"
        >
          {{ description }}
        </p>
      </div>

      <div
        v-if="$slots.actions"
        class="flex items-center self-end sm:self-start gap-2 shrink-0 sm:mt-1"
      >
        <slot name="actions" />
      </div>
    </div>

    <slot />
  </div>
</template>
