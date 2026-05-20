<script setup lang="ts">
import type { ScheduleSession } from '#shared/types/schedule';
import { LEVEL_COLORS } from '~/utils/schedule';

const props = defineProps<{
  session: ScheduleSession;
  top: number;
  height: number;
  colIndex?: number;
  colCount?: number;
  isDragging?: boolean;
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
    class="absolute rounded-lg border p-2 overflow-hidden transition-opacity"
    :class="[
      LEVEL_COLORS[session.level],
      isDragging ? 'opacity-0' : 'cursor-grab',
    ]"
    :style="blockStyle"
    @pointerdown="emit('dragstart', $event, session)"
  >
    <div class="flex items-start gap-1.5 mb-0.5">
      <UBadge
        :label="session.code"
        size="xs"
        variant="subtle"
        color="neutral"
        class="shrink-0"
      />
      <span class="text-xs font-semibold leading-tight line-clamp-1">
        {{ session.course }}
      </span>
    </div>
    <p class="text-label truncate opacity-80">
      {{ session.timeStart }} – {{ session.timeEnd }} · {{ session.room }}
    </p>
    <p class="text-label truncate opacity-70">{{ session.instructor }}</p>
  </div>
</template>
