import type { Course, CourseCategory } from '../types/course';

export const courseCategories: CourseCategory[] = [
  'Kelas Reguler',
  'Kelas Intensif JLPT',
];

export const courses: Course[] = [
  {
    id: '1',
    slug: 'kiso',
    title: 'Kelas Dasar Bahasa Jepang',
    category: 'Kelas Reguler',
    description:
      'Kelas ini dirancang bagi peserta yang ingin belajar bahasa Jepang dari tingkat dasar. Program terdiri dari 30 kali pertemuan dengan materi yang disusun secara bertahap, sehingga peserta dapat membangun kemampuan bahasa Jepang secara kuat, terstruktur, dan mudah dipraktikkan dalam kehidupan sehari-hari.',
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
    slug: 'jlpt-n4',
    title: 'Kelas Intensif JLPT N4',
    description:
      'Kelas N4 Bahasa Jepang terdiri dari 30 pertemuan yang dirancang untuk peserta yang telah memiliki dasar bahasa Jepang dan ingin meningkatkan kemampuan ke level N4. Program ini mencakup materi kosakata, tata bahasa, pola kalimat, dan percakapan yang sesuai dengan standar JLPT N4. Program ini juga dilengkapi dengan latihan praktik dan evaluasi untuk memastikan peserta dapat menguasai materi secara bertahap dan efektif.',
    category: 'Kelas Intensif JLPT',
    maxStudents: 10,
    price: 1_950_000,
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
