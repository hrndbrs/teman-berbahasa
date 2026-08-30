export function toProgram(course: Course, index: number): Program {
  return {
    id: course.id,
    slug: course.slug,
    num: String(index + 1).padStart(2, '0'),
    kind: course.category,
    title: course.title,
    language: course.language,
    price: formatCurrency(course.price),
    priceValue: course.price,
    desc: course.description,
    facts: [
      `${course.sessionCount} kali pertemuan`,
      course.schedules[0]?.days ?? '',
      course.schedules[0]?.time ?? '',
      `Maks. ${course.maxStudents} orang`,
    ].filter(Boolean),
    image: course.image,
    imageAlt: course.imageAlt,
    schedules: course.schedules.map((schedule, i) => ({
      id: schedule.id,
      label: `Angkatan ${String(i + 1).padStart(2, '0')}`,
      days: schedule.days,
      time: schedule.time,
      start: formatShortDate(schedule.startDate),
      open: !isPast(schedule.startDate),
      registrationUrl: schedule.registrationUrl,
    })),
  };
}

export function toMiniCourse(event: TbEvent): MiniCourse {
  return {
    id: event.id,
    tag: event.tag,
    title: event.title,
    description: event.description,
    meta: `${event.tag} · ${event.platform}`,
    dates: event.dates.map((date) => formatSessionDateTime(date.start)),
    speaker: event.speaker,
    image: event.image,
    past: event.dates.every((date) => isPast(date.start)),
  };
}
