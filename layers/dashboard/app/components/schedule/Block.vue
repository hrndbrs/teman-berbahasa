<script setup lang="ts">
const props = defineProps<{
  session: ScheduleSession;
  top: number;
  height: number;
  colIndex?: number;
  colCount?: number;
  isDragging?: boolean;
  canDrag?: boolean;
}>();

const emit = defineEmits<{
  dragstart: [event: PointerEvent, session: ScheduleSession];
}>();

const blockStyle = computed(() => {
  const ci = props.colIndex ?? 0;
  const cc = props.colCount ?? 1;
  return {
    top: `${props.top}px`,
    height: `${props.height}px`,
    left: `calc(${((ci / cc) * 100).toFixed(4)}% + 4px)`,
    width: `calc(${(100 / cc).toFixed(4)}% - 8px)`,
  };
});
</script>

<template>
  <div
    class="absolute overflow-hidden rounded-lg border p-2 transition-opacity"
    :class="[
      LEVEL_COLORS[session.level],
      isDragging ? 'opacity-0' : canDrag ? 'cursor-grab' : 'cursor-pointer',
    ]"
    :style="blockStyle"
    @pointerdown="canDrag && emit('dragstart', $event, session)"
  >
    <div class="mb-0.5 flex items-start gap-1.5">
      <UBadge
        :label="session.code"
        size="xs"
        variant="subtle"
        color="neutral"
        class="shrink-0"
      />
      <span class="line-clamp-1 text-xs leading-tight font-semibold">
        {{ session.course }}
      </span>
    </div>
    <p class="text-label truncate opacity-80">
      {{ session.timeStart }} – {{ session.timeEnd }} · {{ session.room }}
    </p>
    <p class="text-label truncate opacity-70">{{ session.instructor }}</p>
  </div>
</template>
