import { ALL_LEVELS, LEVEL_COLORS } from '~/utils/schedule';

export function useSchedulesPage() {
  const loading = ref(true);
  const error = ref<string | null>(null);

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

  onMounted(async () => {
    loading.value = true;
    error.value = null;
    try {
      await Promise.resolve();
    } catch {
      error.value = 'Gagal memuat jadwal.';
    } finally {
      loading.value = false;
    }
  });

  return {
    ALL_LEVELS,
    LEVEL_COLORS,
    loading,
    error,
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
