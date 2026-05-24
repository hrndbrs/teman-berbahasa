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

  const isDragConfirmOpen = ref(false);
  const dragSaving = ref(false);
  const pendingReschedule = ref<{
    session: ScheduleSession;
    rawSession: ApiSession;
    targetDay: DayOfWeek;
    targetDate: string;
    targetStart: string;
    targetEnd: string;
    startMin: number;
    endMin: number;
  } | null>(null);

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

  function onReschedule(
    session: ScheduleSession,
    targetDay: DayOfWeek,
    startMin: number,
    endMin: number
  ) {
    const rawSession = rawSessions.value.find(
      (r) => r.schedule_id === session.id && r.date === session.date
    );
    if (!rawSession) return;

    const targetDateObj = weekDays.value[targetDay];
    if (!targetDateObj) return;

    pendingReschedule.value = {
      session,
      rawSession,
      targetDay,
      targetDate: toISODate(targetDateObj),
      targetStart: minutesToTime(startMin),
      targetEnd: minutesToTime(endMin),
      startMin,
      endMin,
    };
    isDragConfirmOpen.value = true;
  }

  async function onConfirmReschedule() {
    const p = pendingReschedule.value;
    if (!p) return;

    dragSaving.value = true;
    try {
      const newStartTime = minutesToApiTime(p.startMin);
      const newEndTime = minutesToApiTime(p.endMin);
      const dayChanged = p.targetDay !== p.session.day;

      if (p.rawSession.override?.id) {
        const payload: UpdateOverridePayload = {
          new_start_time: newStartTime,
          new_end_time: newEndTime,
        };
        if (dayChanged) {
          payload.new_date = p.targetDate;
        } else if (p.rawSession.override.new_date) {
          payload.new_date = null;
        }
        await api(`/schedule-overrides/${p.rawSession.override.id}`, {
          method: 'PATCH',
          body: payload,
        });
      } else {
        const payload: CreateOverridePayload = {
          original_date: p.session.date,
          override_type: 'reschedule',
          new_start_time: newStartTime,
          new_end_time: newEndTime,
        };
        if (dayChanged) payload.new_date = p.targetDate;
        await api(`/schedules/${p.session.id}/overrides`, {
          method: 'POST',
          body: payload,
        });
      }

      isDragConfirmOpen.value = false;
      pendingReschedule.value = null;
      fetchWeek();
      toast.add({
        title: 'Sesi dipindahkan',
        color: 'success',
        icon: 'i-lucide-check-circle',
      });
    } catch (err: unknown) {
      toast.add({
        title: isApiError(err) ? err.message : 'Gagal memindahkan sesi',
        color: 'error',
        icon: 'i-lucide-x-circle',
      });
    } finally {
      dragSaving.value = false;
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
    isDragConfirmOpen,
    dragSaving,
    pendingReschedule,
    onReschedule,
    onConfirmReschedule,
  };
}
