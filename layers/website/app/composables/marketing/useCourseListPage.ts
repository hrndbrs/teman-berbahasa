export function useCourseListPage() {
  const description =
    'Temukan program belajar bahasa yang sesuai dengan kebutuhanmu, mulai dari kelas dasar hingga persiapan ujian.';

  useSeoMeta({
    title: 'Program Belajar Bahasa - Teman Berbahasa',
    description,
    ogTitle: 'Program Belajar Bahasa - Teman Berbahasa',
    ogDescription: description,
    ogType: 'website',
    twitterCard: 'summary_large_image',
    twitterTitle: 'Program Belajar Bahasa - Teman Berbahasa',
    twitterDescription: description,
  });

  defineOgImage('Default', {
    title: 'Program Belajar Bahasa - Teman Berbahasa',
    description,
  });

  useSchemaOrg([
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
      ],
    },
    {
      '@type': 'ItemList',
      name: 'Program Belajar Bahasa',
      description,
      numberOfItems: courses.length,
      itemListElement: courses.map((course, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: course.title,
        item: `/courses/${course.slug}`,
      })),
    },
  ]);

  return { programs: courses.map(toProgram) };
}
