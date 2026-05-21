export function useBatchesPage() {
  const api = useApi();
  const { can } = useAuth();
  const toast = useToast();

  const isAdmin = can(['admin']);
  const batches = ref<ApiBatch[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const search = ref('');
  const statusFilter = ref<ApiBatchStatus | 'all'>('all');
  const courseFilter = ref('all');
  const isCreateModalOpen = ref(false);
  const editingBatch = ref<ApiBatch | null>(null);

  const fetchBatches = async () => {
    loading.value = true;
    error.value = null;
    try {
      const res = await api<{ data: ApiBatch[]; pagination: { total: number } }>(
        '/batches',
        { query: { per_page: 100 } },
      );
      batches.value = res.data;
    } catch {
      error.value = 'Gagal memuat data batch.';
    } finally {
      loading.value = false;
    }
  };

  const filteredBatches = computed(() => {
    let result = batches.value;
    if (statusFilter.value !== 'all')
      result = result.filter((b) => b.status === statusFilter.value);
    if (courseFilter.value !== 'all')
      result = result.filter((b) => b.course_code === courseFilter.value);
    if (search.value.trim()) {
      const q = search.value.trim().toLowerCase();
      result = result.filter(
        (b) =>
          b.batch_name.toLowerCase().includes(q) ||
          b.batch_code.toLowerCase().includes(q) ||
          b.instructor_name?.toLowerCase().includes(q),
      );
    }
    return result;
  });

  const statusCounts = computed(() => ({
    all: batches.value.length,
    ongoing: batches.value.filter((b) => b.status === 'ongoing').length,
    upcoming: batches.value.filter((b) => b.status === 'upcoming').length,
    completed: batches.value.filter((b) => b.status === 'completed').length,
  }));

  const courseTabs = computed(() => {
    const map: Record<string, number> = {};
    for (const b of batches.value) map[b.course_code] = (map[b.course_code] ?? 0) + 1;
    return Object.entries(map)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([code, count]) => ({ code, count }));
  });

  const onSaved = () => {
    isCreateModalOpen.value = false;
    editingBatch.value = null;
    fetchBatches();
    toast.add({
      title: 'Batch disimpan',
      color: 'success',
      icon: 'i-lucide-check-circle',
    });
  };

  onMounted(fetchBatches);

  return {
    batches,
    filteredBatches,
    loading,
    error,
    search,
    statusFilter,
    courseFilter,
    statusCounts,
    courseTabs,
    isAdmin,
    isCreateModalOpen,
    editingBatch,
    onSaved,
    fetchBatches,
  };
}
