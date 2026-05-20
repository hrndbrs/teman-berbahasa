import { courses } from '#shared/data/courses';

export function useLinktreePage() {
  const { whatsappUrl, instagramUrl, tiktokUrl } = useContact();

  useSeoMeta({
    title: 'Link - Teman Berbahasa',
    description:
      'Semua link resmi Teman Berbahasa: pendaftaran, WhatsApp, dan media sosial.',
    ogTitle: 'Link - Teman Berbahasa',
    ogDescription:
      'Semua link resmi Teman Berbahasa: pendaftaran, WhatsApp, dan media sosial.',
    ogType: 'website',
    twitterCard: 'summary_large_image',
    twitterTitle: 'Link - Teman Berbahasa',
    twitterDescription:
      'Semua link resmi Teman Berbahasa: pendaftaran, WhatsApp, dan media sosial.',
  });

  const registrationLinks = computed(() =>
    courses.flatMap((course) =>
      course.schedules
        .filter((schedule) => !!schedule.registrationUrl)
        .map((schedule) => ({
          id: schedule.id,
          title: course.title,
          label: `${schedule.days} • ${schedule.time}`,
          url: schedule.registrationUrl,
          isExpired: new Date() > new Date(schedule.startDate),
        }))
    )
  );

  return { whatsappUrl, instagramUrl, tiktokUrl, registrationLinks };
}
