<script setup lang="ts">
const tag = useTemplateRef('tag');
const label = ref('');

function onMove(event: PointerEvent) {
  const el = tag.value;
  if (!el) return;
  const zone =
    event.target instanceof Element
      ? event.target.closest<HTMLElement>('[data-cursorzone]')
      : null;
  if (!zone) {
    el.style.opacity = '0';
    return;
  }
  label.value = zone.dataset.cursorzone || '';
  el.style.opacity = '1';
  el.style.transform = `translate(${event.clientX + 16}px, ${event.clientY - 14}px)`;
}

onMounted(() => {
  window.addEventListener('pointermove', onMove, { passive: true });
});

onBeforeUnmount(() => {
  window.removeEventListener('pointermove', onMove);
});
</script>

<template>
  <div
    ref="tag"
    aria-hidden="true"
    class="cursor-tag bg-cobalt text-eyebrow text-paper pointer-events-none fixed top-0 left-0 z-50 rounded-full px-3.5 py-2 whitespace-nowrap uppercase opacity-0 transition-opacity duration-150 ease-out"
  >
    {{ label }} ↗
  </div>
</template>

<style scoped>
@media (hover: none), (pointer: coarse), (prefers-reduced-motion: reduce) {
  .cursor-tag {
    display: none;
  }
}
</style>
