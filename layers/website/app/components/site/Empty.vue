<script setup lang="ts"></script>

<template>
  <div class="py-flow border-rule-bright border px-8">
    <p
      class="font-display text-headline mb-6 max-w-[16ch] font-normal text-balance"
    >
      <slot name="heading" />
    </p>
    <p
      v-if="$slots.body"
      class="text-lead text-paper/55 mb-8 max-w-[44ch] text-pretty"
    >
      <slot name="body" />
    </p>
    <div
      v-if="$slots.action"
      class="flex flex-wrap items-center gap-x-7 gap-y-3 max-sm:flex-col max-sm:items-stretch"
    >
      <slot name="action" />
    </div>
  </div>
</template>

<style scoped>
@reference "@website/assets/css/main.css";

:slotted(em) {
  @apply text-lilac;
  /* font-style: italic; */
}
</style>
