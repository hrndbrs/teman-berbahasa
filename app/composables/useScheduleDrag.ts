import type { Ref } from 'vue';
import type { ScheduleSession, DayOfWeek } from '#shared/types/schedule';
import {
  toMinutes,
  minutesToTime,
  GRID_START,
  GRID_END,
  HOUR_HEIGHT,
  SNAP_MINUTES,
} from '~/utils/schedule';

export interface DragState {
  sessionId: string;
  floatX: number;
  floatY: number;
  targetDay: DayOfWeek;
  targetStartMin: number;
  duration: number;
}

export function useScheduleDrag(
  dayColumnRefs: Ref<HTMLElement[]>,
  onSelect: (session: ScheduleSession) => void,
  onReschedule: (
    id: string,
    day: DayOfWeek,
    timeStart: string,
    timeEnd: string
  ) => void
) {
  const dragState = ref<DragState | null>(null);

  let activeSession: ScheduleSession | null = null;
  let grabOffsetY = 0;
  let startX = 0;
  let startY = 0;

  function startDrag(event: PointerEvent, session: ScheduleSession) {
    event.preventDefault();

    const blockEl = event.currentTarget as HTMLElement;
    const blockRect = blockEl.getBoundingClientRect();
    grabOffsetY = event.clientY - blockRect.top;
    startX = event.clientX;
    startY = event.clientY;
    activeSession = session;

    const duration = toMinutes(session.timeEnd) - toMinutes(session.timeStart);

    dragState.value = {
      sessionId: session.id,
      floatX: event.clientX - 8,
      floatY: event.clientY - grabOffsetY,
      targetDay: session.day,
      targetStartMin: toMinutes(session.timeStart),
      duration,
    };

    document.addEventListener('pointermove', onMove);
    document.addEventListener('pointerup', onUp, { once: true });
  }

  function onMove(event: PointerEvent) {
    if (!dragState.value || !activeSession) return;
    event.preventDefault();

    dragState.value.floatX = event.clientX - 8;
    dragState.value.floatY = event.clientY - grabOffsetY;

    const cols = dayColumnRefs.value;
    let targetDay: DayOfWeek = activeSession.day;
    for (let i = 0; i < cols.length; i++) {
      const rect = cols[i]!.getBoundingClientRect();
      if (event.clientX >= rect.left && event.clientX <= rect.right) {
        targetDay = i as DayOfWeek;
        break;
      }
    }

    const colRect = (cols[targetDay] ??
      cols[activeSession.day])!.getBoundingClientRect();
    const rawMin =
      ((event.clientY - grabOffsetY - colRect.top) / HOUR_HEIGHT) * 60 +
      GRID_START;
    const snapped = Math.round(rawMin / SNAP_MINUTES) * SNAP_MINUTES;
    const { duration } = dragState.value;
    const clamped = Math.min(
      Math.max(snapped, GRID_START),
      GRID_END - duration
    );

    dragState.value.targetDay = targetDay;
    dragState.value.targetStartMin = clamped;
  }

  function onUp(event: PointerEvent) {
    document.removeEventListener('pointermove', onMove);

    if (!dragState.value || !activeSession) {
      dragState.value = null;
      return;
    }

    const moved =
      Math.abs(event.clientX - startX) + Math.abs(event.clientY - startY);

    if (moved < 8) {
      onSelect(activeSession);
    } else {
      const { targetDay, targetStartMin, duration } = dragState.value;
      onReschedule(
        activeSession.id,
        targetDay,
        minutesToTime(targetStartMin),
        minutesToTime(targetStartMin + duration)
      );
    }

    dragState.value = null;
    activeSession = null;
  }

  onUnmounted(() => {
    document.removeEventListener('pointermove', onMove);
    document.removeEventListener('pointerup', onUp);
  });

  return { dragState, startDrag };
}
