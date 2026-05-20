<script setup lang="ts">
import type { ScheduleSession, DayOfWeek } from '#shared/types/schedule';
import {
  GRID_START_HOUR,
  GRID_END_HOUR,
  HOUR_HEIGHT,
  GRID_START,
  TIMETABLE_HOURS,
  DAY_NAMES,
  LEVEL_COLORS,
  formatHour,
  blockTop,
  blockHeight,
  layoutDaySessions,
} from '~/utils/schedule';
import type { DragState } from '~/composables/useScheduleDrag';
import { useScheduleDrag } from '~/composables/useScheduleDrag';

const props = defineProps<{
  sessions: ScheduleSession[];
  weekDays: Date[];
}>();

const emit = defineEmits<{
  select: [session: ScheduleSession];
  reschedule: [id: string, day: DayOfWeek, timeStart: string, timeEnd: string];
}>();

const TOTAL_HEIGHT = (GRID_END_HOUR - GRID_START_HOUR) * HOUR_HEIGHT;

const today = new Date();
function isToday(date: Date): boolean {
  return (
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate()
  );
}

function layoutForDay(dayIndex: number) {
  return layoutDaySessions(props.sessions.filter((s) => s.day === dayIndex));
}

const dayColumnRefs = ref<HTMLElement[]>([]);

const { dragState, startDrag } = useScheduleDrag(
  dayColumnRefs,
  (session) => emit('select', session),
  (id, day, timeStart, timeEnd) =>
    emit('reschedule', id, day, timeStart, timeEnd)
);

const draggingSession = computed(() =>
  dragState.value
    ? (props.sessions.find((s) => s.id === dragState.value!.sessionId) ?? null)
    : null
);

function ghostTop(state: DragState): number {
  return ((state.targetStartMin - GRID_START) / 60) * HOUR_HEIGHT;
}

function ghostHeight(state: DragState): number {
  return (state.duration / 60) * HOUR_HEIGHT;
}
</script>

<template>
  <div class="overflow-x-auto select-none">
    <div class="min-w-265">
      <!-- Day header row -->
      <div class="flex border-b border-muted">
        <div class="w-16 shrink-0" />
        <div
          v-for="(date, i) in weekDays"
          :key="i"
          class="flex-1 min-w-35 py-2.5 text-center border-l border-muted"
        >
          <p class="text-label font-mono tracking-loose uppercase text-dimmed">
            {{ DAY_NAMES[i] }}
          </p>
          <p
            class="text-lg font-bold mt-0.5"
            :class="isToday(date) ? 'text-primary' : 'text-default'"
          >
            {{ date.getDate() }}
          </p>
        </div>
      </div>

      <!-- Timetable body -->
      <div class="flex">
        <!-- Time column -->
        <div
          class="w-16 shrink-0 relative"
          :style="{ height: `${TOTAL_HEIGHT}px` }"
        >
          <div
            v-for="hour in TIMETABLE_HOURS"
            :key="hour"
            class="absolute right-2 text-label text-dimmed font-mono whitespace-nowrap"
            :style="{ top: `${(hour - GRID_START_HOUR) * HOUR_HEIGHT - 8}px` }"
          >
            {{ formatHour(hour) }}
          </div>
        </div>

        <!-- Day columns -->
        <div class="flex flex-1">
          <div
            v-for="(_, dayIndex) in weekDays"
            :key="dayIndex"
            :ref="
              (el) => {
                if (el) dayColumnRefs[dayIndex] = el as HTMLElement;
              }
            "
            class="flex-1 min-w-35 relative border-l border-muted"
            :style="{ height: `${TOTAL_HEIGHT}px` }"
          >
            <!-- Hour grid lines -->
            <div
              v-for="hour in TIMETABLE_HOURS"
              :key="hour"
              class="absolute inset-x-0 border-t border-muted/60"
              :style="{ top: `${(hour - GRID_START_HOUR) * HOUR_HEIGHT}px` }"
            />

            <!-- Session blocks -->
            <ScheduleBlock
              v-for="{ session, colIndex, colCount } in layoutForDay(dayIndex)"
              :key="session.id"
              :session
              :top="blockTop(session.timeStart)"
              :height="blockHeight(session.timeStart, session.timeEnd)"
              :col-index="colIndex"
              :col-count="colCount"
              :is-dragging="dragState?.sessionId === session.id"
              @dragstart="startDrag"
            />

            <!-- Ghost placeholder (drop target indicator) -->
            <div
              v-if="dragState && dragState.targetDay === dayIndex"
              class="absolute inset-x-1 rounded-lg border-2 border-dashed border-primary-400 bg-primary-50/30 dark:bg-primary-900/20 pointer-events-none"
              :style="{
                top: `${ghostTop(dragState)}px`,
                height: `${ghostHeight(dragState)}px`,
              }"
            />
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Floating clone (follows pointer during drag) -->
  <Teleport to="body">
    <div
      v-if="dragState && draggingSession"
      class="fixed pointer-events-none z-50 w-40 rounded-lg border p-2 opacity-90 shadow-lg"
      :class="LEVEL_COLORS[draggingSession.level]"
      :style="{
        left: `${dragState.floatX}px`,
        top: `${dragState.floatY}px`,
      }"
    >
      <div class="flex items-start gap-1.5 mb-0.5">
        <UBadge
          :label="draggingSession.code"
          size="xs"
          variant="subtle"
          color="neutral"
          class="shrink-0"
        />
        <span class="text-xs font-semibold leading-tight line-clamp-1">
          {{ draggingSession.course }}
        </span>
      </div>
      <p class="text-label truncate opacity-80">
        {{ draggingSession.timeStart }} – {{ draggingSession.timeEnd }}
      </p>
    </div>
  </Teleport>
</template>
