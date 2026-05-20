export function useCourseDetailPage() {
  const { course } = useCourse();
  const { whatsappUrl } = useContact();

  useSeoMeta({
    title: () => `${course.value.title} - Teman Berbahasa`,
    description: () => course.value.description,
    keywords: () =>
      `${course.value.title}, kelas bahasa jepang online, teman berbahasa, ${course.value.category.toLowerCase()}, belajar bahasa jepang`,
    ogTitle: () => `${course.value.title} - Teman Berbahasa`,
    ogDescription: () => course.value.description,
    ogType: 'website',
    twitterCard: 'summary_large_image',
    twitterTitle: () => `${course.value.title} - Teman Berbahasa`,
    twitterDescription: () => course.value.description,
  });

  useSchemaOrg([
    {
      '@type': 'Course',
      name: course.value.title,
      description: course.value.description,
      provider: { '@type': 'EducationalOrganization', name: 'Teman Berbahasa' },
      courseMode: 'online',
      inLanguage: ['id', 'ja'],
      offers: course.value.schedules.map((s) => ({
        '@type': 'Offer',
        price: course.value.price,
        priceCurrency: 'IDR',
        validFrom: s.startDate.toISOString(),
        url: s.registrationUrl,
        availability:
          new Date() > s.startDate
            ? 'https://schema.org/SoldOut'
            : 'https://schema.org/InStock',
      })),
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Beranda', item: '/' },
        { '@type': 'ListItem', position: 2, name: 'Program Belajar', item: '/courses' },
        { '@type': 'ListItem', position: 3, name: course.value.title },
      ],
    },
  ]);

  return { course, whatsappUrl };
}
