import { courses } from '#shared/data/courses';

export function useCourseListPage() {
  const description =
    'Temukan program belajar bahasa Jepang yang sesuai dengan kebutuhanmu, mulai dari kelas dasar hingga persiapan ujian JLPT.';

  useSeoMeta({
    title: 'Program Belajar - Teman Berbahasa',
    description,
    ogTitle: 'Program Belajar Bahasa Jepang - Teman Berbahasa',
    ogDescription: description,
    ogType: 'website',
    twitterCard: 'summary_large_image',
    twitterTitle: 'Program Belajar Bahasa Jepang - Teman Berbahasa',
    twitterDescription: description,
    keywords:
      'kursus bahasa jepang, kelas bahasa jepang online, belajar JLPT, teman berbahasa, kelas reguler jepang, intensif JLPT N4',
  });

  useSchemaOrg([
    {
      '@type': 'ItemList',
      name: 'Program Belajar Bahasa Jepang',
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

  return { courses };
}
