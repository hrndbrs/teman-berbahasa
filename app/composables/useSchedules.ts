import { toMinutes, ALL_LEVELS } from '~/utils/schedule';

function startOfWeek(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay(); // 0 = Sun
  const diff = day === 0 ? -6 : 1 - day;
  d.setDate(d.getDate() + diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

function addDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

const DUMMY_SESSIONS: ScheduleSession[] = [
  {
    id: '1',
    code: 'JP-N5',
    course: 'JLPT N5 Foundations',
    day: 0,
    timeStart: '9:00 AM',
    timeEnd: '11:00 AM',
    instructor: 'Taro Tanaka',
    room: 'Sakura 1',
    level: 'Beginner',
    recurrence: 'Weekly',
  },
  {
    id: '2',
    code: 'JP-N4',
    course: 'JLPT N4 Grammar Bridge',
    day: 0,
    timeStart: '1:00 PM',
    timeEnd: '3:00 PM',
    instructor: 'Lena Watanabe',
    room: 'Sakura 2',
    level: 'Bridge',
    recurrence: 'Weekly',
  },
  {
    id: '3',
    code: 'JP-CONV',
    course: 'Conversational Japanese',
    day: 0,
    timeStart: '5:00 PM',
    timeEnd: '7:00 PM',
    instructor: 'Hiro Sato',
    room: 'Momiji',
    level: 'Beginner',
    recurrence: 'Weekly',
  },
  {
    id: '4',
    code: 'JP-N3',
    course: 'JLPT N3 Intermediate',
    day: 1,
    timeStart: '10:00 AM',
    timeEnd: '12:00 PM',
    instructor: 'Aiko Suzuki',
    room: 'Momiji',
    level: 'Intermediate',
    recurrence: 'Weekly',
  },
  {
    id: '5',
    code: 'JP-BIZ',
    course: 'Business Japanese (Keigo)',
    day: 1,
    timeStart: '2:00 PM',
    timeEnd: '4:00 PM',
    instructor: 'Ken Kobayashi',
    room: 'Take',
    level: 'Bridge',
    recurrence: 'Weekly',
  },
  {
    id: '6',
    code: 'JP-KAN',
    course: 'Kanji Intensive',
    day: 1,
    timeStart: '6:00 PM',
    timeEnd: '7:30 PM',
    instructor: 'Yuki Nakamura',
    room: 'Matsu',
    level: 'Specialty',
    recurrence: 'Weekly',
  },
  {
    id: '7',
    code: 'JP-N5',
    course: 'JLPT N5 Foundations',
    day: 2,
    timeStart: '9:00 AM',
    timeEnd: '11:00 AM',
    instructor: 'Taro Tanaka',
    room: 'Sakura 1',
    level: 'Beginner',
    recurrence: 'Weekly',
  },
  {
    id: '8',
    code: 'JP-N2',
    course: 'JLPT N2 Advanced',
    day: 2,
    timeStart: '1:00 PM',
    timeEnd: '3:00 PM',
    instructor: 'Yuki Nakamura',
    room: 'Mizu Lab',
    level: 'Advanced',
    recurrence: 'Weekly',
  },
  {
    id: '9',
    code: 'JP-N4',
    course: 'JLPT N4 Grammar Bridge',
    day: 2,
    timeStart: '4:00 PM',
    timeEnd: '6:00 PM',
    instructor: 'Lena Watanabe',
    room: 'Sakura 2',
    level: 'Bridge',
    recurrence: 'Weekly',
  },
  {
    id: '10',
    code: 'JP-N3',
    course: 'JLPT N3 Intermediate',
    day: 3,
    timeStart: '10:00 AM',
    timeEnd: '12:00 PM',
    instructor: 'Aiko Suzuki',
    room: 'Momiji',
    level: 'Intermediate',
    recurrence: 'Weekly',
  },
  {
    id: '11',
    code: 'JP-CONV',
    course: 'Conversational Japanese',
    day: 3,
    timeStart: '5:00 PM',
    timeEnd: '7:00 PM',
    instructor: 'Hiro Sato',
    room: 'Momiji',
    level: 'Beginner',
    recurrence: 'Weekly',
  },
  {
    id: '12',
    code: 'JP-N5',
    course: 'JLPT N5 Foundations',
    day: 3,
    timeStart: '6:00 PM',
    timeEnd: '8:00 PM',
    instructor: 'Lena Watanabe',
    room: 'Sakura 1',
    level: 'Beginner',
    recurrence: 'Weekly',
  },
  {
    id: '13',
    code: 'JP-N5',
    course: 'JLPT N5 Foundations',
    day: 4,
    timeStart: '9:00 AM',
    timeEnd: '11:00 AM',
    instructor: 'Taro Tanaka',
    room: 'Sakura 1',
    level: 'Beginner',
    recurrence: 'Weekly',
  },
  {
    id: '14',
    code: 'JP-BIZ',
    course: 'Business Japanese (Keigo)',
    day: 4,
    timeStart: '1:00 PM',
    timeEnd: '3:00 PM',
    instructor: 'Ken Kobayashi',
    room: 'Take',
    level: 'Bridge',
    recurrence: 'Weekly',
  },
  {
    id: '15',
    code: 'JP-N2',
    course: 'JLPT N2 Advanced',
    day: 4,
    timeStart: '4:00 PM',
    timeEnd: '6:00 PM',
    instructor: 'Yuki Nakamura',
    room: 'Mizu Lab',
    level: 'Advanced',
    recurrence: 'Weekly',
  },
  {
    id: '16',
    code: 'JP-KAN',
    course: 'Kanji Intensive',
    day: 5,
    timeStart: '11:00 AM',
    timeEnd: '1:00 PM',
    instructor: 'Yuki Nakamura',
    room: 'Matsu',
    level: 'Specialty',
    recurrence: 'Weekly',
  },
  {
    id: '17',
    code: 'JP-N3',
    course: 'JLPT N3 Intermediate',
    day: 5,
    timeStart: '2:00 PM',
    timeEnd: '4:00 PM',
    instructor: 'Aiko Suzuki',
    room: 'Momiji',
    level: 'Intermediate',
    recurrence: 'Weekly',
  },
];

export const useSchedules = () => {
  const sessions = ref<ScheduleSession[]>(
    DUMMY_SESSIONS.map((s) => ({ ...s }))
  );

  const currentWeekStart = ref(startOfWeek(new Date()));

  const weekDays = computed(() =>
    Array.from({ length: 7 }, (_, i) => addDays(currentWeekStart.value, i))
  );

  const weekLabel = computed(() => {
    const start = weekDays.value[0]!;
    const end = weekDays.value[6]!;
    const fmt = (d: Date) =>
      d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    return `${fmt(start)} – ${fmt(end)}, ${start.getFullYear()}`;
  });

  const activeFilters = ref<Set<CourseLevel>>(new Set(ALL_LEVELS));

  const visibleSessions = computed(() =>
    sessions.value.filter((s) => activeFilters.value.has(s.level))
  );

  const totalHours = computed(() => {
    const minutes = visibleSessions.value.reduce(
      (acc, s) => acc + (toMinutes(s.timeEnd) - toMinutes(s.timeStart)),
      0
    );
    return (minutes / 60).toFixed(1);
  });

  function toggleFilter(level: CourseLevel) {
    const f = new Set(activeFilters.value);
    if (f.has(level)) f.delete(level);
    else f.add(level);
    activeFilters.value = f;
  }

  function prev() {
    currentWeekStart.value = addDays(currentWeekStart.value, -7);
  }
  function next() {
    currentWeekStart.value = addDays(currentWeekStart.value, 7);
  }
  function today() {
    currentWeekStart.value = startOfWeek(new Date());
  }

  function reschedule(
    id: string,
    day: DayOfWeek,
    timeStart: string,
    timeEnd: string
  ) {
    const s = sessions.value.find((s) => s.id === id);
    if (s) {
      s.day = day;
      s.timeStart = timeStart;
      s.timeEnd = timeEnd;
    }
  }

  return {
    sessions,
    weekDays,
    weekLabel,
    visibleSessions,
    totalHours,
    activeFilters,
    toggleFilter,
    prev,
    next,
    today,
    reschedule,
  };
};
