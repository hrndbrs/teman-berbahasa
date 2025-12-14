import type { Course, CourseCategory } from '../types/course';

export const courseCategories: CourseCategory[] = [
  'Kelas Reguler',
  'Kelas Intensif JLPT',
];

export const courses: Course[] = [
  {
    id: '1',
    title: 'Kelas Dasar Bahasa Jepang',
    category: 'Kelas Reguler',
    description:
      'Kelas yang distruktur menggunakan kurikulum yang dirancang untuk membantu kamu memulai perjalanan belajar bahasa Jepang dari dasar.',
    maxStudents: 10,
    price: 2_736_000,
    schedules: [
      {
        id: '1-1',
        days: 'Senin & Kamis',
        time: '19:30 - 21:00',
        startDate: new Date('2026-01-12'),
        registrationUrl: 'https://forms.gle/AcGdqp5uRG6eq4AN6',
      },
      {
        id: '1-2',
        days: 'Selasa & Jumat',
        time: '19:30 - 21:00',
        startDate: new Date('2026-01-13'),
        registrationUrl: 'https://forms.gle/DCJPiigLP3u9GP2x7',
      },
      {
        id: '1-3',
        days: 'Sabtu',
        time: '09:00 - 12:00',
        startDate: new Date('2026-01-17'),
        registrationUrl: 'https://forms.gle/KbR9caoX8WZ6pncg6',
      },
    ],
  },
  {
    id: '2',
    title: 'Kelas Intensif JLPT N4',
    description:
      'Persiapan khusus untuk ujian JLPT dengan materi yang fokus dan latihan soal yang komprehensif untuk memastikan kelulusan kamu.',
    category: 'Kelas Intensif JLPT',
    maxStudents: 10,
    price: 1_951_000,
    schedules: [
      {
        id: '2-1',
        days: 'Senin & Kamis',
        time: '19:30 - 21:00',
        startDate: new Date('2026-03-26'),
        registrationUrl: 'https://forms.gle/yRkufJY3aKjCPUYB6',
      },
    ],
  },
];
