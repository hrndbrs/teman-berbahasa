<script setup lang="ts">
defineProps<{
  eyebrow: string;
  title: string;
  description?: string;
}>();
</script>

<template>
  <div class="border-muted shrink-0 space-y-4 border-b pb-4">
    <div
      class="flex flex-col-reverse justify-between gap-3 sm:flex-row sm:items-start sm:gap-4"
    >
      <div class="min-w-0">
        <p
          class="text-label tracking-looser text-dimmed mb-1 font-mono uppercase"
        >
          {{ eyebrow }}
        </p>
        <h1 class="text-default text-3xl leading-tight font-bold sm:text-4xl">
          <em class="font-(--font-display) not-italic">{{ title }}</em>
        </h1>
        <p
          v-if="description"
          class="text-muted mt-1 text-sm"
        >
          {{ description }}
        </p>
      </div>

      <div
        v-if="$slots.actions"
        class="flex shrink-0 items-center gap-2 self-end sm:mt-1 sm:self-start"
      >
        <slot name="actions" />
      </div>
    </div>

    <slot />
  </div>
</template>
