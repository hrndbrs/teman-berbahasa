export function useCoursesPage() {
  const api = useApi();
  const { can } = useAuth();
  const toast = useToast();

  const isAdmin = can(['admin']);

  const courses = ref<ApiCourseWithStats[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const totalCount = ref(0);

  const statusFilter = ref<ApiCourseStatus | 'all'>('all');

  const activeCount = computed(
    () => courses.value.filter((c) => c.status === 'active').length
  );
  const archivedCount = computed(
    () => courses.value.filter((c) => c.status === 'archived').length
  );

  const filteredCourses = computed(() => {
    if (statusFilter.value === 'all') return courses.value;
    return courses.value.filter((c) => c.status === statusFilter.value);
  });

  const fetchCourses = async () => {
    loading.value = true;
    error.value = null;
    try {
      const res = await api<{
        data: ApiCourseWithStats[];
        pagination: { total: number };
      }>('/courses', { query: { per_page: 20 } });
      courses.value = res.data;
      totalCount.value = res.pagination.total;
    } catch {
      error.value = 'Gagal memuat data kursus.';
    } finally {
      loading.value = false;
    }
  };

  const isCreateModalOpen = ref(false);
  const editingCourse = ref<ApiCourseWithStats | null>(null);

  const openCreate = () => {
    isCreateModalOpen.value = true;
  };

  const openEdit = (course: ApiCourseWithStats) => {
    editingCourse.value = course;
  };

  const closeCreate = () => {
    isCreateModalOpen.value = false;
  };

  const closeEdit = () => {
    editingCourse.value = null;
  };

  const onSaved = () => {
    isCreateModalOpen.value = false;
    editingCourse.value = null;
    fetchCourses();
    toast.add({
      title: 'Kursus disimpan',
      color: 'success',
      icon: 'i-lucide-check-circle',
    });
  };

  const onArchived = async (course: ApiCourseWithStats) => {
    try {
      await api(`/courses/${course.id}/archive`, { method: 'PATCH' });
      fetchCourses();
      toast.add({
        title: `${course.course_name} diarsipkan`,
        color: 'neutral',
        icon: 'i-lucide-archive',
      });
    } catch {
      toast.add({
        title: 'Gagal mengarsipkan kursus',
        color: 'error',
        icon: 'i-lucide-x-circle',
      });
    }
  };

  onMounted(fetchCourses);

  return {
    courses,
    filteredCourses,
    loading,
    error,
    totalCount,
    activeCount,
    archivedCount,
    statusFilter,
    isAdmin,
    isCreateModalOpen,
    editingCourse,
    openCreate,
    openEdit,
    closeCreate,
    closeEdit,
    onSaved,
    onArchived,
    fetchCourses,
  };
}
