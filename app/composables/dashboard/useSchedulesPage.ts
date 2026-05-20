import { ALL_LEVELS, LEVEL_COLORS } from '~/utils/schedule';

export function useSchedulesPage() {
  const {
    visibleSessions,
    weekDays,
    weekLabel,
    totalHours,
    activeFilters,
    toggleFilter,
    prev,
    next,
    today,
    reschedule,
  } = useSchedules();

  const selectedSession = ref<ScheduleSession | null>(null);
  const isModalOpen = ref(false);

  function onSelect(session: ScheduleSession) {
    selectedSession.value = session;
    isModalOpen.value = true;
  }

  return {
    ALL_LEVELS,
    LEVEL_COLORS,
    visibleSessions,
    weekDays,
    weekLabel,
    totalHours,
    activeFilters,
    toggleFilter,
    prev,
    next,
    today,
    reschedule,
    selectedSession,
    isModalOpen,
    onSelect,
  };
}
