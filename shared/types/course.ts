export type CourseCategory = 'Kelas Reguler' | 'Kelas Intensif JLPT';

export interface CourseSchedule {
  id: string;
  days: string;
  time: string;
  startDate: Date;
  registrationUrl: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  category: CourseCategory;
  maxStudents: number;
  price: number;
  schedules: CourseSchedule[];
}
