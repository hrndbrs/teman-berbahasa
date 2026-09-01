export function useCoursePage() {
  const { course } = useCourse();
  const { whatsappUrl } = useContact();

  const program = computed<Program>(() => {
    const index = courses.findIndex((c) => c.slug === course.value.slug);
    return toProgram(course.value, index < 0 ? 0 : index);
  });

  useSeoMeta({
    title: () => `${course.value.title} - Teman Berbahasa`,
    description: () => course.value.seoDescription,
    ogTitle: () => `${course.value.title} - Teman Berbahasa`,
    ogDescription: () => course.value.seoDescription,
    ogType: 'website',
    twitterCard: 'summary_large_image',
    twitterTitle: () => `${course.value.title} - Teman Berbahasa`,
    twitterDescription: () => course.value.seoDescription,
  });

  defineOgImage('Default', {
    title: () => `${course.value.title} - Teman Berbahasa`,
    description: () => course.value.seoDescription,
  });

  useSchemaOrg([
    {
      '@type': 'Course',
      name: course.value.title,
      description: course.value.description,
      url: `/courses/${course.value.slug}`,
      image: course.value.image,
      provider: { '@type': 'EducationalOrganization', name: 'Teman Berbahasa' },
      inLanguage: 'id',
      hasCourseInstance: course.value.schedules.map((schedule) => ({
        '@type': 'CourseInstance',
        courseMode: 'online',
        inLanguage: 'id',
        startDate: schedule.startDate.toISOString(),
        location: { '@type': 'VirtualLocation', url: 'https://zoom.us' },
        offers: {
          '@type': 'Offer',
          price: course.value.price,
          priceCurrency: 'IDR',
          url: schedule.registrationUrl,
          validFrom: schedule.startDate.toISOString(),
          availability:
            new Date() > schedule.startDate
              ? 'https://schema.org/SoldOut'
              : 'https://schema.org/InStock',
        },
      })),
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Beranda', item: '/' },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Program Belajar',
          item: '/courses',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: course.value.title,
          item: `/courses/${course.value.slug}`,
        },
      ],
    },
  ]);

  return { program, whatsappUrl };
}
