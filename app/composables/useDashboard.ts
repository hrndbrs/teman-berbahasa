export const useDashboard = () => {
  const todayLabel = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const stats: Stat[] = [
    {
      label: 'Active Students',
      value: '18',
      sub: '+8 this month',
      trend: 'up',
      sparkPath: 'M0,20 L10,18 L20,15 L30,17 L40,12 L50,10 L60,8 L70,6',
      inverted: false,
    },
    {
      label: 'Classes Today',
      unit: 'sessions',
      value: '3',
      sub: '+2 starting soon',
      trend: 'up',
      sparkPath: 'M0,20 L10,19 L20,18 L30,16 L40,14 L50,12 L60,10 L70,8',
      inverted: false,
    },
    {
      label: 'Forms Open',
      unit: 'published',
      value: '2',
      sub: '+267 responses',
      trend: 'up',
      sparkPath: 'M0,20 L10,20 L20,18 L30,16 L40,15 L50,13 L60,11 L70,9',
      inverted: false,
    },
    {
      label: 'Revenue MTD',
      value: '$18.4k',
      sub: '+12% vs last month',
      trend: 'up',
      sparkPath: 'M0,20 L10,17 L20,14 L30,15 L40,11 L50,9 L60,7 L70,5',
      inverted: true,
    },
  ];

  const todaysClasses: ClassSession[] = [
    {
      timeStart: '9:00 AM',
      timeEnd: '11:00 AM',
      code: 'JP-N5',
      course: 'JLPT N5 Foundations',
      instructor: 'Taro Tanaka',
      room: 'Sakura 1',
      attending: 11,
      capacity: 16,
    },
    {
      timeStart: '1:00 PM',
      timeEnd: '3:00 PM',
      code: 'JP-N4',
      course: 'JLPT N4 Grammar Bridge',
      instructor: 'Lena Watanabe',
      room: 'Sakura 2',
      attending: 8,
      capacity: 14,
    },
    {
      timeStart: '5:00 PM',
      timeEnd: '7:00 PM',
      code: 'JP-CONV',
      course: 'Conversational Japanese',
      instructor: 'Hiro Sato',
      room: 'Momiji',
      attending: 3,
      capacity: 12,
    },
  ];

  const recentActivity: ActivityItem[] = [
    {
      actor: 'Maya Castellanos',
      action: 'enrolled in JLPT N3 Intermediate',
      time: '12 min ago',
      color: 'success',
    },
    {
      actor: 'Daniel Cho',
      action: 'completed payment for Business Japanese',
      time: '32 min ago',
      color: 'success',
    },
    {
      actor: 'End-of-Term Feedback',
      action: 'received 4 new responses',
      time: '1 h ago',
      color: 'info',
    },
    {
      actor: 'Felix Aaronson',
      action: 'marked absent in JLPT N5 (Mon 09:00)',
      time: '2 h ago',
      color: 'error',
    },
    {
      actor: 'Suzuki Sensei',
      action: 'rescheduled JLPT N3 to Tue 10:00',
      time: '3 h ago',
      color: 'info',
    },
    {
      actor: 'Tutor Observation Rubric',
      action: 'saved as draft by you',
      time: '5 h ago',
      color: 'neutral',
    },
    {
      actor: 'Calligraphy Workshop',
      action: 'reminder sent to 64 students',
      time: 'yesterday',
      color: 'neutral',
    },
  ];

  const courseLoad: CourseLoadItem[] = [
    { code: 'JP-N5', name: 'JLPT N5 Foundations', attending: 14, capacity: 16 },
    {
      code: 'JP-N4',
      name: 'JLPT N4 Grammar Bridge',
      attending: 8,
      capacity: 14,
    },
    { code: 'JP-N3', name: 'JLPT N3 Intermediate', attending: 3, capacity: 12 },
    {
      code: 'JP-CONV',
      name: 'Conversational Japanese',
      attending: 3,
      capacity: 12,
    },
    { code: 'JP-N2', name: 'JLPT N2 Advanced', attending: 2, capacity: 10 },
    {
      code: 'JP-BIZ',
      name: 'Business Japanese (Keigo)',
      attending: 0,
      capacity: 10,
    },
  ];

  const upcomingEvents: UpcomingEvent[] = [
    {
      day: 19,
      month: 'MAY',
      type: 'MEETING',
      title: 'Tutor Sync (Weekly)',
      time: '8:30 AM',
      location: 'Mizu Lab',
    },
    {
      day: 20,
      month: 'MAY',
      type: 'WORKSHOP',
      title: 'Calligraphy Workshop (Shodō)',
      time: '3:00 PM',
      location: 'Take Studio',
    },
    {
      day: 22,
      month: 'MAY',
      type: 'WORKSHOP',
      title: 'Japanese Movie Night — Tonari no Totoro',
      time: '7:00 PM',
      location: 'Lobby',
    },
    {
      day: 25,
      month: 'MAY',
      type: 'HOLIDAY',
      title: 'Center Closed — Showa Day',
      time: '12:00 AM',
      location: '—',
    },
  ];

  return {
    todayLabel,
    stats,
    todaysClasses,
    recentActivity,
    courseLoad,
    upcomingEvents,
  };
};
