export function useHomePage() {
  useSeoMeta({
    title: 'Teman Berbahasa - Belajar Bahasa Jepang',
    description:
      'Teman Berbahasa adalah tempat bimbingan belajar bahasa asing yang menyenangkan dan interaktif. Belajar bahasa Jepang dengan discussion partner dari mahasiswa Indonesia di Jepang.',
    ogTitle: 'Teman Berbahasa - Belajar Bahasa Jepang',
    ogDescription:
      'Belajar bahasa Jepang dengan cara yang menyenangkan dan interaktif bersama Teman Berbahasa.',
    ogType: 'website',
    twitterCard: 'summary_large_image',
    twitterTitle: 'Teman Berbahasa - Belajar Bahasa Jepang',
    twitterDescription:
      'Belajar bahasa Jepang dengan cara yang menyenangkan dan interaktif bersama Teman Berbahasa.',
  });

  useSchemaOrg([
    {
      '@type': 'WebSite',
      name: 'Teman Berbahasa',
      description:
        'Platform pembelajaran bahasa Jepang online berbasis diskusi interaktif bersama Discussion Partner.',
      url: '/',
    },
  ]);

  return {
    programs: courses.map(toProgram),
    miniCourses: events.map(toMiniCourse),
    faqs,
  };
}
