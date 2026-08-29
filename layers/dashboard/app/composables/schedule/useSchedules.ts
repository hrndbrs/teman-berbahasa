function startOfWeek(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  d.setDate(d.getDate() + diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

function addDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

function toISODate(date: Date): string {
  const y = date.getFullYear();
  const m = (date.getMonth() + 1).toString().padStart(2, '0');
  const d = date.getDate().toString().padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export const useSchedules = (api: ReturnType<typeof useApi>) => {
  const rawSessions = ref<ApiSession[]>([]);
  const sessions = ref<ScheduleSession[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const currentWeekStart = ref(startOfWeek(new Date()));

  const weekDays = computed(() =>
    Array.from({ length: 7 }, (_, i) => addDays(currentWeekStart.value, i))
  );

  const weekLabel = computed(() => {
    const start = weekDays.value[0]!;
    const end = weekDays.value[6]!;
    const fmt = (d: Date) =>
      d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    return `${fmt(start)} – ${fmt(end)}, ${start.getFullYear()}`;
  });

  const activeFilters = ref<Set<CourseLevel>>(new Set(ALL_LEVELS));

  const visibleSessions = computed(() =>
    sessions.value.filter((s) => activeFilters.value.has(s.level))
  );

  const totalHours = computed(() => {
    const minutes = visibleSessions.value.reduce(
      (acc, s) => acc + (toMinutes(s.timeEnd) - toMinutes(s.timeStart)),
      0
    );
    return (minutes / 60).toFixed(1);
  });

  function toggleFilter(level: CourseLevel) {
    const f = new Set(activeFilters.value);
    if (f.has(level)) f.delete(level);
    else f.add(level);
    activeFilters.value = f;
  }

  async function fetchWeek(weekStart?: Date) {
    if (weekStart) currentWeekStart.value = weekStart;
    loading.value = true;
    error.value = null;
    try {
      const res = await api<ApiWeeklyResponse>('/schedules/weekly', {
        query: { week_start: toISODate(currentWeekStart.value) },
      });
      rawSessions.value = res.data;
      sessions.value = res.data.map(apiSessionToScheduleSession);
    } catch (err) {
      error.value = isApiError(err) ? err.message : 'Gagal memuat jadwal.';
    } finally {
      loading.value = false;
    }
  }

  function prev() {
    if (loading.value) return;
    currentWeekStart.value = addDays(currentWeekStart.value, -7);
    fetchWeek();
  }
  function next() {
    if (loading.value) return;
    currentWeekStart.value = addDays(currentWeekStart.value, 7);
    fetchWeek();
  }
  function today() {
    if (loading.value) return;
    currentWeekStart.value = startOfWeek(new Date());
    fetchWeek();
  }

  async function listBatchSchedules(batchId: string): Promise<ApiSchedule[]> {
    const res = await api<{ data: ApiSchedule[] }>(
      `/batches/${batchId}/schedules`
    );
    return res.data;
  }

  return {
    rawSessions,
    sessions,
    loading,
    error,
    weekDays,
    weekLabel,
    visibleSessions,
    totalHours,
    activeFilters,
    toggleFilter,
    prev,
    next,
    today,
    fetchWeek,
    listBatchSchedules,
  };
};
