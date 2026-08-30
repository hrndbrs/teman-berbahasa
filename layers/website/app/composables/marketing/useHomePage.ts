export function useHomePage() {
  const description =
    'Belajar bahasa Jepang online bersama discussion partner dari mahasiswa Indonesia di Jepang. Kelas interaktif untuk dasar, percakapan, hingga persiapan JLPT.';

  useSeoMeta({
    title: 'Teman Berbahasa - Belajar Bahasa Jepang',
    description,
    ogTitle: 'Teman Berbahasa - Belajar Bahasa Jepang',
    ogDescription: description,
    ogType: 'website',
    twitterCard: 'summary_large_image',
    twitterTitle: 'Teman Berbahasa - Belajar Bahasa Jepang',
    twitterDescription: description,
  });

  useSchemaOrg([
    {
      '@type': 'WebSite',
      name: 'Teman Berbahasa',
      description:
        'Platform pembelajaran bahasa Jepang online berbasis diskusi interaktif bersama Discussion Partner.',
      url: '/',
    },
    {
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer },
      })),
    },
  ]);

  return {
    programs: courses.map(toProgram),
    miniCourses: events.map(toMiniCourse),
    faqs,
  };
}
