export function useEventsPage() {
  const seoDescription =
    'Ikuti mini course dan webinar bahasa Jepang dari Teman Berbahasa: sesi singkat dan interaktif untuk memperkuat dasar, percakapan, dan persiapan JLPT.';

  const upcomingEvents = events.filter((event) =>
    event.dates.some((date) => !isPast(date.start))
  );

  useSeoMeta({
    title: 'Mini Courses - Teman Berbahasa',
    description: seoDescription,
    ogTitle: 'Mini Courses - Teman Berbahasa',
    ogDescription: seoDescription,
    ogType: 'website',
    twitterCard: 'summary_large_image',
    twitterTitle: 'Mini Courses - Teman Berbahasa',
    twitterDescription: seoDescription,
    robots: upcomingEvents.length > 0 ? undefined : 'noindex, follow',
  });

  useSchemaOrg([
    defineWebPage({
      name: 'Mini Course Bahasa Jepang',
      description: seoDescription,
    }),
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Beranda', item: '/' },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Mini Course',
          item: '/events',
        },
      ],
    },
    ...upcomingEvents.flatMap((event) =>
      event.dates
        .filter((date) => !isPast(date.start))
        .map((session) => ({
          '@type': 'Event',
          name: event.title,
          description: event.description,
          eventStatus: 'https://schema.org/EventScheduled',
          eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
          location: { '@type': 'VirtualLocation', url: 'https://zoom.us' },
          organizer: { '@type': 'Organization', name: 'Teman Berbahasa' },
          startDate: session.start,
          endDate: session.end,
          image: event.image,
        }))
    ),
  ]);

  return { miniCourses: events.map(toMiniCourse) };
}
