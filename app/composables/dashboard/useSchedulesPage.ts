export function useSchedulesPage() {
  const api = useApi();
  const { can } = useAuth();
  const toast = useToast();

  const isAdmin = can(['admin']);

  const selectedSession = ref<ScheduleSession | null>(null);
  const isDetailModalOpen = ref(false);
  const isCreateModalOpen = ref(false);
  const editingScheduleId = ref<string | null>(null);
  const createBatchId = ref('');

  const isOverrideModalOpen = ref(false);
  const overrideScheduleId = ref('');
  const overrideDate = ref('');
  const overrideId = ref<string | null>(null);

  const {
    loading,
    error,
    rawSessions,
    visibleSessions,
    weekDays,
    weekLabel,
    totalHours,
    activeFilters,
    toggleFilter,
    prev,
    next,
    today,
    fetchWeek,
  } = useSchedules(api);

  const selectedRawSession = computed(() => {
    if (!selectedSession.value) return null;
    return (
      rawSessions.value.find(
        (r) =>
          r.schedule_id === selectedSession.value!.id &&
          r.date === selectedSession.value!.date
      ) ?? null
    );
  });

  function onSelect(session: ScheduleSession) {
    selectedSession.value = session;
    isDetailModalOpen.value = true;
  }

  function openCreate(batchId: string = '') {
    createBatchId.value = batchId;
    editingScheduleId.value = null;
    isCreateModalOpen.value = true;
  }

  function openEdit(scheduleId: string) {
    editingScheduleId.value = scheduleId;
    isCreateModalOpen.value = true;
  }

  function closeCreate() {
    isCreateModalOpen.value = false;
    editingScheduleId.value = null;
    createBatchId.value = '';
  }

  const onSaved = () => {
    closeCreate();
    fetchWeek();
    toast.add({
      title: 'Jadwal disimpan',
      color: 'success',
      icon: 'i-lucide-check-circle',
    });
  };

  async function onDelete(scheduleId: string) {
    try {
      await api(`/schedules/${scheduleId}`, { method: 'DELETE' });
      isDetailModalOpen.value = false;
      fetchWeek();
      toast.add({
        title: 'Jadwal dihapus',
        color: 'neutral',
        icon: 'i-lucide-trash-2',
      });
    } catch (err: unknown) {
      toast.add({
        title: isApiError(err) ? err.message : 'Gagal menghapus jadwal',
        color: 'error',
        icon: 'i-lucide-x-circle',
      });
    }
  }

  function openAddOverride(scheduleId: string, originalDate: string) {
    overrideScheduleId.value = scheduleId;
    overrideDate.value = originalDate;
    overrideId.value = null;
    isOverrideModalOpen.value = true;
  }

  function openEditOverride(
    id: string,
    scheduleId: string,
    originalDate: string
  ) {
    overrideId.value = id;
    overrideScheduleId.value = scheduleId;
    overrideDate.value = originalDate;
    isOverrideModalOpen.value = true;
  }

  function closeOverride() {
    isOverrideModalOpen.value = false;
    overrideId.value = null;
  }

  const onSavedOverride = () => {
    closeOverride();
    fetchWeek();
    toast.add({
      title: 'Override disimpan',
      color: 'success',
      icon: 'i-lucide-check-circle',
    });
  };

  async function onDeleteOverride(id: string) {
    try {
      await api(`/schedule-overrides/${id}`, { method: 'DELETE' });
      isDetailModalOpen.value = false;
      fetchWeek();
      toast.add({
        title: 'Override dihapus',
        color: 'neutral',
        icon: 'i-lucide-trash-2',
      });
    } catch (err: unknown) {
      toast.add({
        title: isApiError(err) ? err.message : 'Gagal menghapus override',
        color: 'error',
        icon: 'i-lucide-x-circle',
      });
    }
  }

  onMounted(() => fetchWeek());

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
    selectedSession,
    selectedRawSession,
    isDetailModalOpen,
    isCreateModalOpen,
    editingScheduleId,
    createBatchId,
    isOverrideModalOpen,
    overrideScheduleId,
    overrideDate,
    overrideId,
    isAdmin,
    onSelect,
    openCreate,
    openEdit,
    closeCreate,
    onSaved,
    onDelete,
    openAddOverride,
    openEditOverride,
    closeOverride,
    onSavedOverride,
    onDeleteOverride,
  };
}
