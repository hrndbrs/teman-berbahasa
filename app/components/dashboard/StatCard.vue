<script setup lang="ts">
defineProps<{ stat: Stat }>();
</script>

<template>
  <div
    class="relative overflow-hidden rounded-lg ring-1 p-5"
    :class="
      stat.inverted
        ? 'bg-inverted dark:bg-linear-to-br dark:from-primary-500 dark:to-primary-700 ring-default dark:ring-primary-600'
        : 'bg-default ring-default shadow-(--shadow-soft)'
    "
  >
    <p
      class="text-label font-mono tracking-loose uppercase mb-2"
      :class="
        stat.inverted ? 'text-inverted/60 dark:text-white/70' : 'text-dimmed'
      "
    >
      {{ stat.label }}
    </p>
    <div class="flex items-end gap-1.5 mb-1">
      <span
        class="text-4xl font-bold leading-none"
        :class="
          stat.inverted ? 'text-inverted dark:text-white' : 'text-default'
        "
      >
        {{ stat.value }}
      </span>
      <span
        v-if="stat.unit"
        class="mb-1 text-sm"
        :class="
          stat.inverted ? 'text-inverted/50 dark:text-white/60' : 'text-muted'
        "
      >
        {{ stat.unit }}
      </span>
    </div>
    <p
      class="text-xs"
      :class="
        stat.inverted
          ? 'text-success-300 dark:text-emerald-300'
          : 'text-success-500'
      "
    >
      {{ stat.sub }}
    </p>
    <svg
      class="absolute bottom-0 right-0 opacity-20"
      width="80"
      height="32"
      viewBox="0 0 70 24"
      fill="none"
      preserveAspectRatio="none"
    >
      <path
        :d="stat.sparkPath"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </div>
</template>
