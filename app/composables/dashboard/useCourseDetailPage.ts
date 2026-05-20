export function useCourseDetailPage() {
  const route = useRoute();
  const api = useApi();
  const { can } = useAuth();
  const toast = useToast();

  const isAdmin = can(['admin']);

  const courseId = route.params.id as string;

  const course = ref<ApiCourseWithStats | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const editModalOpen = ref(false);

  const fetchCourse = async () => {
    loading.value = true;
    error.value = null;
    try {
      course.value = await api<ApiCourseWithStats>(`/courses/${courseId}`);
    } catch {
      error.value = 'Gagal memuat detail kursus.';
    } finally {
      loading.value = false;
    }
  };

  const onEditSaved = () => {
    editModalOpen.value = false;
    fetchCourse();
    toast.add({
      title: 'Kursus disimpan',
      color: 'success',
      icon: 'i-lucide-check-circle',
    });
  };

  const onArchived = async () => {
    if (!course.value) return;
    try {
      await api(`/courses/${course.value.id}/archive`, { method: 'PATCH' });
      await fetchCourse();
      toast.add({
        title: `${course.value.course_name} diarsipkan`,
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

  onMounted(fetchCourse);

  return {
    course,
    loading,
    error,
    isAdmin,
    courseId,
    editModalOpen,
    fetchCourse,
    onEditSaved,
    onArchived,
  };
}
