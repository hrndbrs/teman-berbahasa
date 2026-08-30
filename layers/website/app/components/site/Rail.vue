<script setup lang="ts">
const loop = '日本語を学ぶ · ことば · 文化 · 友達 · '.repeat(3);
</script>

<template>
  <aside
    aria-hidden="true"
    class="w-rail border-rule bg-ink shell:block fixed inset-y-0 left-0 z-30 hidden overflow-hidden border-r"
  >
    <div class="rail-track">
      <span>{{ loop }}</span>
      <span>{{ loop }}</span>
    </div>
  </aside>
</template>

<style scoped>
@reference "@website/assets/css/main.css";

.rail-track {
  @apply tracking-rail text-faint/70 absolute top-0 left-0 flex h-max w-full flex-row items-center text-sm font-medium;
  writing-mode: vertical-rl;
  animation: rail-drift 80s linear infinite;
  will-change: transform;
}

.rail-track span {
  @apply py-8 whitespace-nowrap;
}

@keyframes rail-drift {
  to {
    transform: translateY(-50%);
  }
}

@media (prefers-reduced-motion: reduce) {
  .rail-track {
    animation: none;
  }
}
</style>
