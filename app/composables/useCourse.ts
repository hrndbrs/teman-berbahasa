import { courses } from '#shared/data/courses';
import type { Course } from '#shared/types/course';

export const useCourse = () => {
  const route = useRoute();

  const course = computed(() =>
    courses.find((c) => c.slug === route.params.slug)
  );

  if (!course.value) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Program tidak ditemukan',
      fatal: true,
    });
  }

  return { course: course as ComputedRef<Course> };
};
