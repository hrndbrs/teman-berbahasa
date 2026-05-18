export type ActivityColor = 'success' | 'info' | 'error' | 'warning' | 'neutral';
export type EventType = 'MEETING' | 'WORKSHOP' | 'HOLIDAY';

export interface Stat {
  label: string;
  value: string;
  unit?: string;
  sub: string;
  trend: 'up' | 'down';
  sparkPath: string;
  inverted: boolean;
}

export interface ClassSession {
  timeStart: string;
  timeEnd: string;
  code: string;
  course: string;
  instructor: string;
  room: string;
  attending: number;
  capacity: number;
}

export interface ActivityItem {
  actor: string;
  action: string;
  time: string;
  color: ActivityColor;
}

export interface CourseLoadItem {
  code: string;
  name: string;
  attending: number;
  capacity: number;
}

export interface UpcomingEvent {
  day: number;
  month: string;
  type: EventType;
  title: string;
  time: string;
  location: string;
}
