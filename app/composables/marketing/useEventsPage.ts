import { events } from '#shared/data/events';

export function useEventsPage() {
  const seoDescription = 'Mini course dan webinar belajar bahasa Jepang dari Teman Berbahasa.';

  useSeoMeta({
    title: 'Mini Courses - Teman Berbahasa',
    description: seoDescription,
    ogTitle: 'Mini Courses - Teman Berbahasa',
    ogDescription: seoDescription,
    ogType: 'website',
    twitterCard: 'summary_large_image',
    twitterTitle: 'Mini Courses - Teman Berbahasa',
    twitterDescription: seoDescription,
    keywords:
      'mini course bahasa jepang, webinar bahasa jepang, belajar bahasa jepang online, kursus jepang, beasiswa jepang',
  });

  useSchemaOrg([
    defineWebPage({ name: 'Mini Courses', description: seoDescription }),
    ...events.map((event) => ({
      '@type': 'Event',
      name: event.title,
      description: event.description,
      eventStatus: 'https://schema.org/EventScheduled',
      eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
      location: { '@type': 'VirtualLocation', url: 'https://zoom.us' },
      organizer: { '@type': 'Organization', name: 'Teman Berbahasa' },
      startDate: event.dates[0]?.start,
      endDate: event.dates.at(-1)?.end,
      image: event.image,
    })),
  ]);

  return { events };
}
